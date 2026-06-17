import { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import {
  AlertTriangle, CheckCircle2, Beaker, Users, ChevronDown,
  FlaskConical, Save, RotateCcw, Search, Info, XCircle,
  AlertCircle, ClipboardList, Settings2, Pencil, Trash2, Plus, X
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Lab {
  id: string;
  name: string;
  building: string;
  room: string;
  capacity: number;
  type: string;
  equipment: string[];
}

interface ConfigLab {
  id: string;
  name: string;
  capacity: number;
}

interface CourseSection {
  id: string;
  courseCode: string;
  courseName: string;
  section: string;
  year: number;
  studentCount: number;
  labType: string;
  credits: number;
  schedule: string;
}

type AllocationMap = Record<string, string>;
type LabUsedForMap = Record<string, string>;
type LabUsedDuringMap = Record<string, string>;
type ActiveTab = 'assignment' | 'validation' | 'configuration';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockLabs: Lab[] = [
  { id: 'lab-a101', name: 'Lab A-101', building: 'Block A', room: '101', capacity: 35, type: 'Computer Lab', equipment: ['Workstations × 35', 'Projector', 'Whiteboard'] },
  { id: 'lab-b202', name: 'Lab B-202', building: 'Block B', room: '202', capacity: 35, type: 'Electronics Lab', equipment: ['Workstations × 35', 'Oscilloscopes', 'Circuit Boards'] },
  { id: 'lab-c303', name: 'Lab C-303', building: 'Block C', room: '303', capacity: 50, type: 'Programming Lab', equipment: ['Workstations × 50', 'Dual Screens', 'IDE Suite'] },
  { id: 'lab-d101', name: 'Lab D-101', building: 'Block D', room: '101', capacity: 30, type: 'Networking Lab', equipment: ['Workstations × 30', 'Network Racks', 'Cisco Kits'] },
  { id: 'lab-e205', name: 'Lab E-205', building: 'Block E', room: '205', capacity: 45, type: 'Embedded Systems Lab', equipment: ['Workstations × 45', 'Arduino Kits', 'FPGA Boards'] },
  { id: 'lab-f110', name: 'Lab F-110', building: 'Block F', room: '110', capacity: 38, type: 'Software Engineering Lab', equipment: ['Workstations × 38', 'CI/CD Tools', 'Test Rig'] },
];

const INITIAL_CONFIG_LABS: ConfigLab[] = [
  { id: 'cfg-1', name: 'Lab A-101', capacity: 40 },
  { id: 'cfg-2', name: 'Lab B-202', capacity: 35 },
  { id: 'cfg-3', name: 'Lab C-303', capacity: 50 },
  { id: 'cfg-4', name: 'Lab D-404', capacity: 30 },
  { id: 'cfg-5', name: 'Lab E-505', capacity: 25 },
];

const mockSections: CourseSection[] = [
  { id: 'CS101-01', courseCode: 'CS101', courseName: 'Introduction to Programming', section: '01', year: 1, studentCount: 45, labType: 'Computer Lab', credits: 3, schedule: 'Mon 8–10am' },
  { id: 'CS101-02', courseCode: 'CS101', courseName: 'Introduction to Programming', section: '02', year: 1, studentCount: 42, labType: 'Computer Lab', credits: 3, schedule: 'Mon 2–4pm' },
  { id: 'CS202-01', courseCode: 'CS202', courseName: 'Data Structures', section: '01', year: 2, studentCount: 38, labType: 'Programming Lab', credits: 3, schedule: 'Tue 10am–12pm' },
  { id: 'CS205-01', courseCode: 'CS205', courseName: 'Algorithms', section: '01', year: 2, studentCount: 32, labType: 'Computer Lab', credits: 3, schedule: 'Wed 8–10am' },
  { id: 'CS302-01', courseCode: 'CS302', courseName: 'Operating Systems', section: '01', year: 3, studentCount: 48, labType: 'Computer Lab', credits: 3, schedule: 'Thu 10am–12pm' },
  { id: 'CS303-01', courseCode: 'CS303', courseName: 'Database Systems', section: '01', year: 3, studentCount: 35, labType: 'Software Engineering Lab', credits: 3, schedule: 'Fri 8–10am' },
  { id: 'CS401-01', courseCode: 'CS401', courseName: 'Computer Networks', section: '01', year: 4, studentCount: 28, labType: 'Networking Lab', credits: 3, schedule: 'Mon 10am–12pm' },
  { id: 'CS404-01', courseCode: 'CS404', courseName: 'Software Engineering', section: '01', year: 4, studentCount: 25, labType: 'Software Engineering Lab', credits: 3, schedule: 'Tue 2–4pm' },
  { id: 'EE201-01', courseCode: 'EE201', courseName: 'Circuit Theory', section: '01', year: 2, studentCount: 33, labType: 'Electronics Lab', credits: 3, schedule: 'Wed 2–4pm' },
  { id: 'EE301-01', courseCode: 'EE301', courseName: 'Embedded Systems', section: '01', year: 3, studentCount: 29, labType: 'Embedded Systems Lab', credits: 3, schedule: 'Thu 2–4pm' },
];

const LAB_USED_DURING_OPTIONS = [
  'Whole Semester',
  'First Half',
  'Second Half',
  'Alternate Weeks',
  'As Scheduled',
];

// ─── Portal Dropdown ──────────────────────────────────────────────────────────

function LabDropdown({
  section,
  labs,
  selectedLabId,
  onChange,
  isOverCapacity,
}: {
  section: CourseSection;
  labs: Lab[];
  selectedLabId: string | null;
  onChange: (labId: string | null) => void;
  isOverCapacity: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selectedLab = labs.find(l => l.id === selectedLabId);

  const DROPDOWN_W = 280;
  const DROPDOWN_MAX_H = 330;
  const MARGIN = 8;

  const calcPos = () => {
    if (!buttonRef.current) return;
    const r = buttonRef.current.getBoundingClientRect();
    let left = r.left;
    if (left + DROPDOWN_W > window.innerWidth - MARGIN) left = r.right - DROPDOWN_W;
    left = Math.max(MARGIN, left);
    let top = r.bottom + 4;
    if (top + DROPDOWN_MAX_H > window.innerHeight - MARGIN) {
      top = r.top - DROPDOWN_MAX_H - 4;
      if (top < MARGIN) top = MARGIN;
    }
    setPos({ top, left });
  };

  useEffect(() => {
    if (!open) return;
    calcPos();
    window.addEventListener('scroll', calcPos, true);
    window.addEventListener('resize', calcPos);
    return () => {
      window.removeEventListener('scroll', calcPos, true);
      window.removeEventListener('resize', calcPos);
    };
  }, [open]);

  const handleOpen = () => { calcPos(); setOpen(o => !o); };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className={`
          w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-sm transition-all
          ${isOverCapacity
            ? 'border-[#EF4444] bg-[#FEF2F2] text-[#DC2626]'
            : selectedLab
              ? 'border-[#16A34A] bg-[#F0FDF4] text-[#065F46]'
              : 'border-[#D1D5DB] bg-white text-gray-500 hover:border-[#900021]'
          }
        `}
      >
        <span className="truncate">{selectedLab ? selectedLab.name : 'Select a lab…'}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && createPortal(
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)} />
          <div
            style={{ position: 'fixed', top: pos.top, left: pos.left, width: DROPDOWN_W, zIndex: 9999 }}
            className="bg-white border border-[#c5c5c5] rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-2 border-b border-[#F3F4F6]">
              <p className="text-xs text-gray-500 px-2">
                Recommended type:{' '}
                <span className="font-semibold text-[#900021]">{section.labType}</span>
              </p>
            </div>
            <div className="max-h-60 overflow-y-auto">
              <button
                onClick={() => { onChange(null); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#F4F4F4] text-sm text-gray-400 italic"
              >
                <XCircle className="w-4 h-4" />
                Unassign
              </button>
              {labs.map(lab => {
                const over = section.studentCount > lab.capacity;
                return (
                  <button
                    key={lab.id}
                    onClick={() => { onChange(lab.id); setOpen(false); }}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 hover:bg-[#F4F4F4] text-left transition-colors ${selectedLabId === lab.id ? 'bg-[#FFF0F3]' : ''}`}
                  >
                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${over ? 'bg-[#EF4444]' : 'bg-[#10B981]'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-800">{lab.name}</span>
                        <span className={`text-xs font-semibold ${over ? 'text-[#EF4444]' : 'text-[#10B981]'}`}>Cap: {lab.capacity}</span>
                      </div>
                      <p className="text-xs text-gray-500">{lab.type} · {lab.building}</p>
                      {over && <p className="text-xs text-[#EF4444] mt-0.5">⚠ Exceeds by {section.studentCount - lab.capacity}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

// ─── Inline "Used During" select ──────────────────────────────────────────────

function UsedDuringSelect({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full h-9 px-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-[#900021] focus:border-[#900021] ${
        disabled
          ? 'bg-[#F9FAFB] border-[#E5E7EB] text-gray-400 cursor-not-allowed'
          : 'bg-white border-[#E5E7EB] text-[#111827]'
      }`}
    >
      {LAB_USED_DURING_OPTIONS.map(o => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

// ─── Validation Summary Tab ───────────────────────────────────────────────────

function ValidationSummary({
  allocations,
  violations,
  hasViolations,
  assignedCount,
  configLabs,
}: {
  allocations: AllocationMap;
  violations: Record<string, { section: CourseSection; lab: Lab; overflow: number }>;
  hasViolations: boolean;
  assignedCount: number;
  configLabs: ConfigLab[];
}) {
  const capacityUsagePercent = (students: number, capacity: number) =>
    Math.min(Math.round((students / capacity) * 100), 100);

  const entries = useMemo(() => {
    return Object.entries(allocations)
      .map(([sectionId, labId]) => {
        const section = mockSections.find(s => s.id === sectionId);
        const lab = mockLabs.find(l => l.id === labId);
        if (!section || !lab) return null;
        const over = section.studentCount > lab.capacity;
        return { section, lab, over, overflow: over ? section.studentCount - lab.capacity : 0 };
      })
      .filter(Boolean) as { section: CourseSection; lab: Lab; over: boolean; overflow: number }[];
  }, [allocations]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#c5c5c5] shadow-sm px-5 py-4 text-center">
          <div className="text-3xl font-semibold text-[#900021]">{assignedCount}</div>
          <div className="text-sm text-gray-500 mt-1">Sections Assigned</div>
        </div>
        <div className={`bg-white rounded-xl border shadow-sm px-5 py-4 text-center ${hasViolations ? 'border-[#FECACA]' : 'border-[#c5c5c5]'}`}>
          <div className={`text-3xl font-semibold ${hasViolations ? 'text-[#EF4444]' : 'text-[#10B981]'}`}>
            {Object.keys(violations).length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Capacity Violations</div>
        </div>
        <div className="bg-white rounded-xl border border-[#c5c5c5] shadow-sm px-5 py-4 text-center">
          <div className="text-3xl font-semibold text-gray-700">{mockSections.length - assignedCount}</div>
          <div className="text-sm text-gray-500 mt-1">Unassigned Sections</div>
        </div>
      </div>

      {hasViolations && (
        <div className="flex items-start gap-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3.5">
          <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#DC2626]">Over-Capacity Alert</p>
            <p className="text-sm text-[#EF4444] mt-0.5">
              {Object.keys(violations).length} section{Object.keys(violations).length !== 1 ? 's' : ''} exceed
              their assigned lab's capacity. Resolve all violations before saving.
            </p>
          </div>
        </div>
      )}

      {!hasViolations && assignedCount > 0 && (
        <div className="flex items-start gap-3 bg-[#F0FDF4] border border-[#A7F3D0] rounded-xl px-4 py-3.5">
          <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#065F46]">All Allocations Valid</p>
            <p className="text-sm text-[#10B981] mt-0.5">No capacity violations detected. You can save your allocation.</p>
          </div>
        </div>
      )}

      {entries.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#c5c5c5] py-20 text-center">
          <Beaker className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p className="text-gray-400">No labs assigned yet.</p>
          <p className="text-sm text-gray-400 mt-1">Go to the <span className="font-medium text-[#900021]">Lab Assignment</span> tab to assign labs to course sections.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {entries.map(({ section, lab, over, overflow }) => {
            const usagePct = capacityUsagePercent(section.studentCount, lab.capacity);
            return (
              <div key={section.id} className={`bg-white rounded-xl border p-4 shadow-sm transition-colors ${over ? 'border-[#FECACA]' : 'border-[#c5c5c5]'}`}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-800">{section.courseCode}</span>
                      <span className="text-xs bg-[#FFF0F3] text-[#900021] px-1.5 py-0.5 rounded-md">Sec {section.section}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{section.courseName}</p>
                  </div>
                  {over ? (
                    <div className="flex items-center gap-1 bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-2 py-1 flex-shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />
                      <span className="text-xs font-semibold text-[#DC2626]">+{overflow}</span>
                    </div>
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  )}
                </div>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${over ? 'bg-[#FFF7F7]' : 'bg-[#F4F4F4]'}`}>
                  <FlaskConical className={`w-4 h-4 flex-shrink-0 ${over ? 'text-[#EF4444]' : 'text-[#900021]'}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800">{lab.name}</p>
                    <p className="text-xs text-gray-500">{lab.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-500">Students:</span>
                    <span className={`font-semibold ${over ? 'text-[#DC2626]' : 'text-gray-800'}`}>{section.studentCount}</span>
                  </div>
                  <span className="text-gray-500">Lab Cap: <span className="font-semibold text-gray-800">{lab.capacity}</span></span>
                </div>
                <div className="w-full h-2.5 bg-[#c5c5c5] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${over ? 'bg-[#EF4444]' : usagePct >= 90 ? 'bg-[#F59E0B]' : 'bg-[#10B981]'}`}
                    style={{ width: `${over ? 100 : usagePct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className={`text-xs font-medium ${over ? 'text-[#DC2626]' : 'text-gray-500'}`}>
                    {over ? `OVER CAPACITY (+${overflow})` : `${usagePct}% used`}
                  </span>
                  <span className="text-xs text-gray-400">
                    {lab.capacity - section.studentCount >= 0
                      ? `${lab.capacity - section.studentCount} seats free`
                      : `${Math.abs(lab.capacity - section.studentCount)} deficit`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#c5c5c5] shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-[#c5c5c5] bg-[#F4F4F4]">
          <span className="text-sm font-semibold text-gray-700">Lab Directory</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-[#F3F4F6]">
          {configLabs.map(lab => (
            <div key={lab.id} className="px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{lab.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-gray-700">Cap: {lab.capacity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Lab Configuration Tab ────────────────────────────────────────────────────

function LabConfiguration() {
  const [labs, setLabs] = useState<ConfigLab[]>(INITIAL_CONFIG_LABS);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [editTarget, setEditTarget] = useState<ConfigLab | null>(null);
  const [formName, setFormName] = useState('');
  const [formCapacity, setFormCapacity] = useState('');
  const [nameError, setNameError] = useState(false);

  const openAdd = () => {
    setFormName(''); setFormCapacity(''); setNameError(false);
    setEditTarget(null); setModalMode('add');
  };

  const openEdit = (lab: ConfigLab) => {
    setFormName(lab.name); setFormCapacity(String(lab.capacity));
    setNameError(false); setEditTarget(lab); setModalMode('edit');
  };

  const closeModal = () => { setModalMode(null); setEditTarget(null); setNameError(false); };

  const handleSave = () => {
    if (!formName.trim() || !formCapacity.trim()) {
      toast.error('All fields are required.'); return;
    }
    const isDuplicate = labs.some(l =>
      l.name.toLowerCase() === formName.trim().toLowerCase() &&
      (modalMode === 'add' || l.id !== editTarget?.id)
    );
    if (isDuplicate) { setNameError(true); return; }

    if (modalMode === 'add') {
      setLabs(prev => [...prev, { id: Date.now().toString(), name: formName.trim(), capacity: Number(formCapacity) }]);
      toast.success(`${formName.trim()} added to lab configuration.`);
    } else if (modalMode === 'edit' && editTarget) {
      setLabs(prev => prev.map(l => l.id === editTarget.id ? { ...l, name: formName.trim(), capacity: Number(formCapacity) } : l));
      toast.success('Lab updated successfully.');
    }
    closeModal();
  };

  const handleDelete = (lab: ConfigLab) => {
    setLabs(prev => prev.filter(l => l.id !== lab.id));
    toast.success(`${lab.name} removed.`);
  };

  return (
    <>
      <p className="text-xs text-[#6B7280] italic mb-4">
        Configure physical laboratories and their maximum seat capacities for use in capacity validation.
      </p>

      {/* Action row */}
      <div className="flex justify-end mb-4">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#900021] hover:bg-[#5C001F] text-white text-sm font-medium rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Lab
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]" style={{ height: '44px' }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Laboratory Name</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ width: '160px' }}>Max Capacity</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ width: '100px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {labs.map(lab => (
              <tr key={lab.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors" style={{ height: '56px' }}>
                <td className="px-6 py-4 text-sm font-medium text-[#111827]">{lab.name}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#111827] text-center">{lab.capacity}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-4">
                    <button onClick={() => openEdit(lab)} className="text-[#6B7280] hover:text-[#900021] transition-colors" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(lab)} className="text-[#6B7280] hover:text-[#DC2626] transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalMode !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative bg-white rounded-xl shadow-2xl p-6 z-10 w-[calc(100vw-2rem)] max-w-[440px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-[#111827]">
                {modalMode === 'add' ? 'Add New Lab' : 'Edit Lab'}
              </h2>
              <button onClick={closeModal} className="text-[#6B7280] hover:text-[#111827] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Laboratory Name */}
              <div>
                <label className="block text-xs font-medium text-[#374151] mb-1.5">
                  Laboratory Name <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={e => { setFormName(e.target.value); setNameError(false); }}
                  placeholder="e.g. Lab A-101"
                  className={`w-full h-10 px-3 text-sm text-[#111827] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent ${nameError ? 'border-[#DC2626]' : 'border-[#E5E7EB]'}`}
                />
                {nameError && (
                  <div className="mt-2 mb-1 px-3 py-2 bg-[#FEE2E2] border-l-[3px] border-[#DC2626] rounded text-xs font-medium text-[#991B1B]">
                    Duplicate lab name — this laboratory already exists.
                  </div>
                )}
                <p className="text-xs text-[#6B7280] mt-1.5">Must be unique. Duplicate names will be blocked.</p>
              </div>

              {/* Max Capacity */}
              <div>
                <label className="block text-xs font-medium text-[#374151] mb-1.5">
                  Maximum Seat Capacity <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="number"
                  value={formCapacity}
                  onChange={e => setFormCapacity(e.target.value)}
                  placeholder="e.g. 40"
                  min="1"
                  className="h-10 px-3 text-sm text-[#111827] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                  style={{ width: '120px' }}
                />
                <p className="text-xs text-[#6B7280] mt-1.5">Used for enrollment vs capacity validation.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={closeModal} className="px-4 py-2.5 text-sm font-medium text-[#374151] bg-white border border-[#E5E7EB] rounded-md hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} className="px-5 py-2.5 text-sm font-medium text-white bg-[#900021] hover:bg-[#5C001F] rounded-md transition-colors">
                {modalMode === 'add' ? 'Save Lab' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function LabResourcePlanner() {
  const [allocations, setAllocations] = useState<AllocationMap>({
    'CS101-01': 'lab-c303',
    'CS202-01': 'lab-a101',
  });
  const [labUsedFor, setLabUsedFor] = useState<LabUsedForMap>({
    'CS101-01': 'Programming Lab',
  });
  const [labUsedDuring, setLabUsedDuring] = useState<LabUsedDuringMap>({
    'CS101-01': 'Whole Semester',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');
  const [savedOnce, setSavedOnce] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('assignment');

  const filteredSections = useMemo(() => {
    return mockSections.filter(s => {
      const matchSearch =
        s.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.courseName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchYear = yearFilter === 'all' || s.year === yearFilter;
      return matchSearch && matchYear;
    });
  }, [searchQuery, yearFilter]);

  const violations = useMemo(() => {
    const result: Record<string, { section: CourseSection; lab: Lab; overflow: number }> = {};
    Object.entries(allocations).forEach(([sectionId, labId]) => {
      const section = mockSections.find(s => s.id === sectionId);
      const lab = mockLabs.find(l => l.id === labId);
      if (section && lab && section.studentCount > lab.capacity) {
        result[sectionId] = { section, lab, overflow: section.studentCount - lab.capacity };
      }
    });
    return result;
  }, [allocations]);

  const hasViolations = Object.keys(violations).length > 0;
  const violationCount = Object.keys(violations).length;
  const assignedCount = Object.keys(allocations).length;

  const handleAllocate = (sectionId: string, labId: string | null) => {
    setAllocations(prev => {
      const next = { ...prev };
      if (labId === null) delete next[sectionId];
      else next[sectionId] = labId;
      return next;
    });
    // Clear used-for/during if unassigned or lab changed
    if (labId === null) {
      setLabUsedFor(prev => { const n = { ...prev }; delete n[sectionId]; return n; });
      setLabUsedDuring(prev => { const n = { ...prev }; delete n[sectionId]; return n; });
    }
  };

  const handleReset = () => {
    setAllocations({});
    setLabUsedFor({});
    setLabUsedDuring({});
    setSavedOnce(false);
  };

  const handleSave = () => {
    if (hasViolations || assignedCount === 0) return;
    setSavedOnce(true);
    toast.success(`Lab allocations saved — ${assignedCount} section${assignedCount !== 1 ? 's' : ''} assigned.`, { duration: 3500 });
  };

  return (
    <TooltipProvider>
      <div className="space-y-5">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl mb-1 flex items-center gap-3">
              <Beaker className="w-8 h-8 text-[#900021]" />
              Lab Resource Planner
            </h1>
            <p className="text-gray-500 text-sm">
              Assign course sections to laboratories. Capacity violations are flagged automatically.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm text-gray-500 hidden sm:block">
              {assignedCount} / {mockSections.length} assigned
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#c5c5c5] bg-white text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSave}
                  disabled={hasViolations || assignedCount === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    hasViolations || assignedCount === 0
                      ? 'bg-[#D1D5DB] text-white cursor-not-allowed opacity-60'
                      : 'bg-[#900021] hover:bg-[#5C001F] text-white shadow-sm active:scale-[0.99]'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  Save Allocation
                  {savedOnce && !hasViolations && assignedCount > 0 && (
                    <CheckCircle2 className="w-3.5 h-3.5 ml-0.5" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {hasViolations
                  ? 'Cannot save: resolve all over-capacity violations first.'
                  : assignedCount === 0
                    ? 'Assign at least one lab before saving.'
                    : `Save ${assignedCount} lab allocation${assignedCount !== 1 ? 's' : ''}.`}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* ── Tab Bar ─────────────────────────────────────────────── */}
        <div className="flex items-end border-b border-[#c5c5c5] gap-1">
          <button
            onClick={() => setActiveTab('assignment')}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg border border-b-0 transition-all -mb-px ${
              activeTab === 'assignment'
                ? 'bg-white border-[#c5c5c5] text-[#900021] shadow-sm'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/60'
            }`}
          >
            <Beaker className="w-4 h-4" />
            Lab Assignment
          </button>

          <button
            onClick={() => setActiveTab('validation')}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg border border-b-0 transition-all -mb-px ${
              activeTab === 'validation'
                ? 'bg-white border-[#c5c5c5] text-[#900021] shadow-sm'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/60'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Validation Summary
            {violationCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-xs font-semibold bg-[#EF4444] text-white">{violationCount}</span>
            )}
            {violationCount === 0 && assignedCount > 0 && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('configuration')}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg border border-b-0 transition-all -mb-px ${
              activeTab === 'configuration'
                ? 'bg-white border-[#c5c5c5] text-[#900021] shadow-sm'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/60'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            Lab Configuration
          </button>

          <div className="ml-auto mb-1 flex items-center gap-1.5 text-xs text-gray-400 pb-1">
            <Info className="w-3.5 h-3.5" />
            <span>Save is blocked when violations exist</span>
          </div>
        </div>

        {/* ── Tab: Lab Assignment ──────────────────────────────────── */}
        {activeTab === 'assignment' && (
          <div className="space-y-4">
            {hasViolations && (
              <div className="flex items-center gap-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-4 py-2.5">
                <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
                <p className="text-sm text-[#DC2626]">
                  <span className="font-semibold">{violationCount} over-capacity violation{violationCount !== 1 ? 's' : ''}</span>
                  {' '}— rows highlighted in red. Switch to the{' '}
                  <button onClick={() => setActiveTab('validation')} className="underline font-semibold">
                    Validation Summary
                  </button>{' '}
                  tab for details.
                </p>
              </div>
            )}

            {/* Filters */}
            <div className="flex gap-3 items-center flex-wrap">
              <div className="relative flex-1 min-w-[220px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by course code or name…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#c5c5c5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#900021]/20 focus:border-[#900021] placeholder-gray-400"
                />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {(['all', 1, 2, 3, 4] as const).map(y => (
                  <button
                    key={y}
                    onClick={() => setYearFilter(y)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                      yearFilter === y
                        ? 'bg-[#900021] border-[#900021] text-white'
                        : 'border-[#c5c5c5] bg-white text-gray-600 hover:border-[#900021] hover:text-[#900021]'
                    }`}
                  >
                    {y === 'all' ? 'All Years' : `Year ${y}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Table — 7 columns: horizontal scroll on smaller screens */}
            <div className="overflow-x-auto">
            <div className="bg-white rounded-xl border border-[#c5c5c5] shadow-sm overflow-visible min-w-[900px]">
              {/* Header */}
              <div className="grid gap-0 border-b border-[#c5c5c5] bg-[#F4F4F4] px-5 py-3 rounded-t-xl"
                style={{ gridTemplateColumns: '2fr 1fr 110px 180px 160px 170px 90px' }}>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Course Section</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Schedule</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Enrollment</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Assigned Lab</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Lab Used For</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Lab Used During</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Status</span>
              </div>

              {filteredSections.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No sections match your search.</p>
                </div>
              ) : (
                filteredSections.map((section, idx) => {
                  const labId = allocations[section.id] ?? null;
                  const lab = mockLabs.find(l => l.id === labId);
                  const isOver = lab ? section.studentCount > lab.capacity : false;
                  const isAssigned = !!labId;
                  const extraEnabled = isAssigned && !isOver;

                  return (
                    <div
                      key={section.id}
                      className={`grid gap-0 items-center px-5 py-3.5 border-b border-[#F3F4F6] last:border-0 last:rounded-b-xl transition-colors ${
                        isOver
                          ? 'bg-[#FFF7F7] hover:bg-[#FEF2F2]'
                          : idx % 2 === 0
                            ? 'bg-white hover:bg-[#F0F7FF]'
                            : 'bg-[#FAFAFA] hover:bg-[#F0F7FF]'
                      }`}
                      style={{ gridTemplateColumns: '2fr 1fr 110px 180px 160px 170px 90px' }}
                    >
                      {/* Course Info */}
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-gray-800">{section.courseCode}</span>
                          <span className="text-xs bg-[#FFF0F3] text-[#900021] px-1.5 py-0.5 rounded-md">Sec {section.section}</span>
                          <span className="text-xs bg-[#F3F4F6] text-gray-500 px-1.5 py-0.5 rounded-md">Y{section.year}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{section.courseName}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{section.labType}</p>
                      </div>

                      {/* Schedule */}
                      <div className="text-xs text-gray-500">{section.schedule}</div>

                      {/* Enrollment */}
                      <div className="flex justify-center">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
                          isOver
                            ? 'bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]'
                            : 'bg-[#F0FDF4] border-[#A7F3D0] text-[#065F46]'
                        }`}>
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-sm font-semibold">{section.studentCount}</span>
                        </div>
                      </div>

                      {/* Assigned Lab dropdown */}
                      <div className="px-2">
                        <LabDropdown
                          section={section}
                          labs={mockLabs}
                          selectedLabId={labId}
                          onChange={newLabId => handleAllocate(section.id, newLabId)}
                          isOverCapacity={isOver}
                        />
                      </div>

                      {/* Lab Used For */}
                      <div className="px-1">
                        <input
                          type="text"
                          value={extraEnabled ? (labUsedFor[section.id] ?? '') : ''}
                          onChange={e => setLabUsedFor(prev => ({ ...prev, [section.id]: e.target.value }))}
                          disabled={!extraEnabled}
                          placeholder={extraEnabled ? 'e.g. Programming Lab' : ''}
                          className={`w-full h-9 px-2.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-[#900021] focus:border-[#900021] ${
                            !extraEnabled
                              ? 'bg-[#F9FAFB] border-[#E5E7EB] text-gray-400 cursor-not-allowed'
                              : 'bg-white border-[#E5E7EB] text-[#111827]'
                          }`}
                        />
                      </div>

                      {/* Lab Used During */}
                      <div className="px-1">
                        <UsedDuringSelect
                          value={labUsedDuring[section.id] ?? 'Whole Semester'}
                          onChange={v => setLabUsedDuring(prev => ({ ...prev, [section.id]: v }))}
                          disabled={!extraEnabled}
                        />
                      </div>

                      {/* Status */}
                      <div className="flex justify-center">
                        {isOver ? (
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-1 px-2 py-1 bg-[#FEF2F2] border border-[#FECACA] rounded-lg">
                                <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                                <span className="text-xs font-semibold text-[#DC2626]">
                                  +{section.studentCount - (lab?.capacity ?? 0)}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Over capacity by {section.studentCount - (lab?.capacity ?? 0)} student{section.studentCount - (lab?.capacity ?? 0) !== 1 ? 's' : ''}</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : isAssigned ? (
                          <Tooltip>
                            <TooltipTrigger>
                              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                            </TooltipTrigger>
                            <TooltipContent><p>Allocation OK</p></TooltipContent>
                          </Tooltip>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="w-5 h-5 rounded-full border-2 border-dashed border-[#D1D5DB]" />
                            </TooltipTrigger>
                            <TooltipContent><p>Not assigned</p></TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 text-xs text-gray-400 px-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Within capacity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                <span>Over capacity — save blocked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#D1D5DB]" />
                <span>Unassigned</span>
              </div>
            </div>
            </div>{/* end overflow-x-auto wrapper */}
          </div>
        )}

        {/* ── Tab: Validation Summary ──────────────────────────────── */}
        {activeTab === 'validation' && (
          <ValidationSummary
            allocations={allocations}
            violations={violations}
            hasViolations={hasViolations}
            assignedCount={assignedCount}
            configLabs={INITIAL_CONFIG_LABS}
          />
        )}

        {/* ── Tab: Lab Configuration ───────────────────────────────── */}
        {activeTab === 'configuration' && <LabConfiguration />}

      </div>
    </TooltipProvider>
  );
}

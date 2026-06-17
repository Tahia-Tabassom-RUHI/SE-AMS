import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Users, Plus, X, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { SectionDetailsModal } from '../components/SectionDetailsModal';

type AssignmentStatus = 'unassigned' | 'assigned';
type FilterTab = 'all' | 'unassigned' | 'assigned';

interface CourseSection {
  id: string;
  courseCode: string;
  section: string;
  courseName: string;
  credits: number;
  year: number;
  enrollment: number;
  status: AssignmentStatus;
}

const INITIAL_SECTIONS: CourseSection[] = [
  // Unassigned
  { id: 'cs101-02', courseCode: 'CS101', section: '02', courseName: 'Introduction to Programming', credits: 3, year: 1, enrollment: 42, status: 'unassigned' },
  { id: 'cs301-01', courseCode: 'CS301', section: '01', courseName: 'Operating Systems', credits: 3, year: 3, enrollment: 48, status: 'unassigned' },
  { id: 'ma202-01', courseCode: 'MA202', section: '01', courseName: 'Linear Algebra', credits: 3, year: 2, enrollment: 42, status: 'unassigned' },
  // Assigned
  { id: 'cs101-01', courseCode: 'CS101', section: '01', courseName: 'Introduction to Programming', credits: 3, year: 1, enrollment: 45, status: 'assigned' },
  { id: 'cs202-01', courseCode: 'CS202', section: '01', courseName: 'Data Structures', credits: 3, year: 2, enrollment: 38, status: 'assigned' },
  { id: 'cs205-01', courseCode: 'CS205', section: '01', courseName: 'Algorithms', credits: 3, year: 2, enrollment: 32, status: 'assigned' },
  { id: 'cs303-01', courseCode: 'CS303', section: '01', courseName: 'Database Systems', credits: 3, year: 3, enrollment: 35, status: 'assigned' },
  { id: 'cs404-01', courseCode: 'CS404', section: '01', courseName: 'Software Engineering', credits: 3, year: 4, enrollment: 28, status: 'assigned' },
  { id: 'ma101-02', courseCode: 'MA101', section: '02', courseName: 'Calculus I', credits: 4, year: 1, enrollment: 50, status: 'assigned' },
];

const YEAR_STYLES: Record<number, { bg: string; text: string }> = {
  1: { bg: '#EDE9FE', text: '#5B21B6' },
  2: { bg: '#EDE9FE', text: '#5B21B6' },
  3: { bg: '#EAF3DE', text: '#3B6D11' },
  4: { bg: '#EAF3DE', text: '#3B6D11' },
};

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unassigned', label: 'Unassigned' },
  { key: 'assigned', label: 'Assigned' },
];

function DividerRow({ label }: { label: string }) {
  return (
    <tr style={{ borderBottom: '0.5px solid #F3F4F6' }}>
      <td colSpan={6} style={{
        background: '#F9FAFB', padding: '6px 16px',
        fontSize: '12px', fontWeight: 500, color: '#6B7280',
      }}>
        {label}
      </td>
    </tr>
  );
}

function SectionRow({ s, onAssign, onEdit }: { s: CourseSection; onAssign: (id: string) => void; onEdit: (s: CourseSection) => void }) {
  const yearStyle = YEAR_STYLES[s.year] ?? { bg: '#F3F4F6', text: '#374151' };
  return (
    <tr style={{ height: '60px', borderBottom: '0.5px solid #F3F4F6' }}>
      {/* Course Section */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 mb-0.5">
          <span style={{ color: '#900021', fontSize: '14px', fontWeight: 500 }}>{s.courseCode}</span>
          <span style={{
            background: '#F1F5F9', color: '#475569', fontSize: '11px',
            borderRadius: '4px', padding: '1px 6px',
          }}>
            Sec {s.section}
          </span>
        </div>
        <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: 400 }}>{s.courseName}</div>
      </td>

      {/* Credits */}
      <td className="text-center" style={{ width: '80px' }}>
        <span style={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>{s.credits}</span>
        <span style={{ color: '#6B7280', fontSize: '11px' }}> CR</span>
      </td>

      {/* Year */}
      <td className="text-center" style={{ width: '70px' }}>
        <span style={{
          background: yearStyle.bg, color: yearStyle.text,
          fontSize: '11px', fontWeight: 500,
          borderRadius: '20px', padding: '2px 7px',
          display: 'inline-block',
        }}>
          Y{s.year}
        </span>
      </td>

      {/* Enrollment */}
      <td className="text-center" style={{ width: '100px' }}>
        <div className="flex items-center justify-center gap-1">
          <Users style={{ width: '13px', height: '13px', color: '#6B7280' }} />
          <span style={{ fontSize: '13px', color: '#6B7280' }}>{s.enrollment}</span>
        </div>
      </td>

      {/* Status */}
      <td className="text-center" style={{ width: '110px' }}>
        {s.status === 'unassigned' ? (
          <span style={{
            background: '#FEE2E2', color: '#991B1B',
            fontSize: '11px', fontWeight: 500,
            borderRadius: '20px', padding: '3px 10px',
            display: 'inline-block',
          }}>
            Unassigned
          </span>
        ) : (
          <span style={{
            background: '#DCFCE7', color: '#166534',
            fontSize: '11px', fontWeight: 500,
            borderRadius: '20px', padding: '3px 10px',
            display: 'inline-block',
          }}>
            Assigned
          </span>
        )}
      </td>

      {/* Action */}
      <td className="text-center" style={{ width: '90px', paddingRight: '12px' }}>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit(s)}
            className="hover:opacity-60 transition-opacity"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
            title="Edit section details"
          >
            <Pencil style={{ width: '16px', height: '16px', color: '#6B7280' }} />
          </button>
          {s.status === 'unassigned' ? (
            <button
              onClick={() => onAssign(s.id)}
              className="hover:opacity-80 transition-opacity"
              style={{
                background: '#900021', color: 'white',
                fontSize: '11px', fontWeight: 500,
                borderRadius: '4px', padding: '4px 10px',
                border: 'none', cursor: 'pointer',
              }}
            >
              Assign →
            </button>
          ) : (
            <button
              className="hover:bg-[#FFF0F3] transition-colors"
              style={{
                background: 'white', color: '#900021',
                fontSize: '11px', fontWeight: 500,
                borderRadius: '4px', padding: '4px 10px',
                border: '0.5px solid #900021', cursor: 'pointer',
              }}
            >
              View
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export function CourseCatalog() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<CourseSection[]>(INITIAL_SECTIONS);
  const [filter, setFilter] = useState<FilterTab>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<CourseSection | null>(null);

  const [formCode, setFormCode] = useState('');
  const [formSection, setFormSection] = useState('');
  const [formName, setFormName] = useState('');
  const [formCredits, setFormCredits] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formEnrollment, setFormEnrollment] = useState('');

  const unassigned = sections.filter(s => s.status === 'unassigned');
  const assigned = sections.filter(s => s.status === 'assigned');

  const showUnassigned = filter === 'all' || filter === 'unassigned';
  const showAssigned = filter === 'all' || filter === 'assigned';

  const openAdd = () => {
    setFormCode(''); setFormSection(''); setFormName('');
    setFormCredits(''); setFormYear(''); setFormEnrollment('');
    setShowAddModal(true);
  };

  const closeAdd = () => setShowAddModal(false);

  const handleSave = () => {
    if (!formCode.trim() || !formName.trim() || !formCredits || !formYear || !formEnrollment || !formSection.trim()) {
      toast.error('All fields are required.');
      return;
    }
    const newSection: CourseSection = {
      id: `${formCode.toLowerCase()}-${formSection}-${Date.now()}`,
      courseCode: formCode.trim().toUpperCase(),
      section: formSection.trim().padStart(2, '0'),
      courseName: formName.trim(),
      credits: Number(formCredits),
      year: Number(formYear),
      enrollment: Number(formEnrollment),
      status: 'unassigned',
    };
    setSections(prev => [newSection, ...prev]);
    toast.success(`${newSection.courseCode} Sec ${newSection.section} added.`);
    closeAdd();
  };

  const handleAssign = (id: string) => {
    navigate('/assignment', { state: { prefillCourseId: id.toUpperCase() } });
  };

  const handleEdit = (section: CourseSection) => {
    setSelectedSection(section);
    setShowDetailsModal(true);
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-3xl mb-2">Course Catalog</h1>
        <p className="text-gray-600">All course sections and their assignment status at a glance</p>
      </div>

      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                filter === tab.key
                  ? 'bg-[#900021] border-[#900021] text-white'
                  : 'border-[#c5c5c5] bg-white text-gray-600 hover:border-[#900021] hover:text-[#900021]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 text-white hover:bg-[#5C001F] transition-colors"
          style={{
            background: '#900021', fontSize: '14px', fontWeight: 500,
            borderRadius: '6px', padding: '10px 16px', border: 'none', cursor: 'pointer',
          }}
        >
          <Plus className="w-4 h-4" />
          Add New Course
        </button>
      </div>

      {/* Main Table Card */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', height: '44px', borderBottom: '1px solid #E5E7EB' }}>
              <th className="px-4 text-left" style={{ fontSize: '12px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Course Section
              </th>
              <th className="text-center" style={{ width: '80px', fontSize: '12px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Credits
              </th>
              <th className="text-center" style={{ width: '70px', fontSize: '12px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Year
              </th>
              <th className="text-center" style={{ width: '100px', fontSize: '12px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Enrollment
              </th>
              <th className="text-center" style={{ width: '110px', fontSize: '12px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Status
              </th>
              <th className="text-center" style={{ width: '90px', fontSize: '12px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {showUnassigned && unassigned.length > 0 && (
              <>
                <DividerRow label={`Unassigned — ${unassigned.length} section${unassigned.length !== 1 ? 's' : ''}`} />
                {unassigned.map(s => <SectionRow key={s.id} s={s} onAssign={handleAssign} onEdit={handleEdit} />)}
              </>
            )}
            {showAssigned && assigned.length > 0 && (
              <>
                <DividerRow label={`Assigned — ${assigned.length} section${assigned.length !== 1 ? 's' : ''}`} />
                {assigned.map(s => <SectionRow key={s.id} s={s} onAssign={handleAssign} onEdit={handleEdit} />)}
              </>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add New Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeAdd} />
          <div className="relative bg-white rounded-xl shadow-2xl p-6 z-10 w-[calc(100vw-2rem)] max-w-[460px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-[#111827]">Add New Course Section</h2>
              <button onClick={closeAdd} className="text-[#6B7280] hover:text-[#111827] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Course Code *</label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={e => setFormCode(e.target.value)}
                    placeholder="e.g. CS101"
                    className="w-full h-10 px-3 text-sm text-[#111827] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Section *</label>
                  <input
                    type="text"
                    value={formSection}
                    onChange={e => setFormSection(e.target.value)}
                    placeholder="e.g. 01"
                    className="w-full h-10 px-3 text-sm text-[#111827] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#374151] mb-1.5">Course Name *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Introduction to Programming"
                  className="w-full h-10 px-3 text-sm text-[#111827] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Credits *</label>
                  <input
                    type="number"
                    value={formCredits}
                    onChange={e => setFormCredits(e.target.value)}
                    placeholder="3"
                    min="1" max="6"
                    className="w-full h-10 px-3 text-sm text-[#111827] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Year *</label>
                  <select
                    value={formYear}
                    onChange={e => setFormYear(e.target.value)}
                    className="w-full h-10 px-3 text-sm text-[#111827] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                  >
                    <option value="">Year</option>
                    <option value="1">Y1</option>
                    <option value="2">Y2</option>
                    <option value="3">Y3</option>
                    <option value="4">Y4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">Enrollment *</label>
                  <input
                    type="number"
                    value={formEnrollment}
                    onChange={e => setFormEnrollment(e.target.value)}
                    placeholder="e.g. 40"
                    min="1"
                    className="w-full h-10 px-3 text-sm text-[#111827] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={closeAdd}
                className="px-4 py-2.5 text-sm font-medium text-[#374151] bg-white border border-[#E5E7EB] rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 text-sm font-medium text-white bg-[#900021] hover:bg-[#5C001F] rounded-md transition-colors"
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section Details Modal */}
      <SectionDetailsModal
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        section={selectedSection ? {
          courseCode: selectedSection.courseCode,
          courseName: selectedSection.courseName,
          section: selectedSection.section,
          credits: selectedSection.credits,
        } : null}
      />
    </>
  );
}

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { CourseSelector } from '../components/CourseSelector';
import { LecturerSelector } from '../components/LecturerSelector';
import { WorkloadMonitor } from '../components/WorkloadMonitor';
import { ModeratorSection } from '../components/ModeratorSection';
import { StaffContextCard } from '../components/StaffContextCard';
import { AdministrativeStatusModal } from '../components/AdministrativeStatusModal';
import { Button } from '../components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { Info, Search, Users, User, ChevronDown, CalendarDays, ArrowRightLeft } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import type { Course, Staff } from '../types';
import { mockCourses, mockStaff } from '../data/mockData';
import { useAppData } from '../contexts/AppDataContext';
import { useAuth } from '../contexts/AuthContext';

type UnassignedCourse = {
  id: string;
  code: string;
  name: string;
  section: string;
  year: number;
  schedule: string;
  studentCount: number;
  deadline: string;
  urgency: 'urgent' | 'soon' | 'pending';
  credits: number;
};

// Unassigned courses data
const unassignedCourses: UnassignedCourse[] = [
  { id: 'CS301-01', code: 'CS301', name: 'Operating Systems', section: '01', year: 3, schedule: 'Mon 10am–12pm', studentCount: 48, deadline: 'Due May 5', urgency: 'urgent', credits: 3.0 },
  { id: 'CS401-01', code: 'CS401', name: 'Computer Networks', section: '01', year: 4, schedule: 'Tue 2pm–4pm', studentCount: 28, deadline: 'Due May 5', urgency: 'urgent', credits: 3.0 },
  { id: 'MA202-01', code: 'MA202', name: 'Linear Algebra', section: '01', year: 2, schedule: 'Wed 8am–10am', studentCount: 42, deadline: 'Due May 6', urgency: 'soon', credits: 4.0 },
  { id: 'CS105-02', code: 'CS105', name: 'Web Development', section: '02', year: 1, schedule: 'Thu 2pm–4pm', studentCount: 36, deadline: 'Due May 10', urgency: 'pending', credits: 3.0 },
  { id: 'CS206-01', code: 'CS206', name: 'Software Design', section: '01', year: 2, schedule: 'Fri 10am–12pm', studentCount: 30, deadline: 'Due May 10', urgency: 'pending', credits: 3.0 },
];

// Exemption tab: all staff in specified order
const exemptionStaff = [
  mockStaff[0], // Dr. Aisyah Rahman
  mockStaff[1], // Prof. Muhammad Ali
  mockStaff[2], // Dr. Siti Aminah
  mockStaff[3], // Dr. Ahmad Hassan
  mockStaff[4], // Dr. Fatimah Zahra
  mockStaff[6], // Dr. Noor Hayati
  mockStaff[5], // Prof. Ibrahim Malik
  mockStaff[7], // Dr. Zatul Alwani
];

const YEAR_BADGE: Record<number, { bg: string; text: string }> = {
  1: { bg: '#EDE9FE', text: '#5B21B6' },
  2: { bg: '#EDE9FE', text: '#5B21B6' },
  3: { bg: '#EAF3DE', text: '#3B6D11' },
  4: { bg: '#EAF3DE', text: '#3B6D11' },
};

export function AssignmentTool() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { staff, updateStaffStatus, sendAssignment, isStaffExemptionActive } = useAppData();

  const prefillCourseId = (location.state as { prefillCourseId?: string } | null)?.prefillCourseId ?? null;
  const prefillCourse = prefillCourseId ? mockCourses.find(c => c.id === prefillCourseId) ?? null : null;

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(prefillCourse);
  const [prefillActive, setPrefillActive] = useState(!!prefillCourse);
  const [selectedLecturer, setSelectedLecturer] = useState<Staff | null>(null);
  const [primaryModerator, setPrimaryModerator] = useState<Staff | null>(null);
  const [secondaryModerator, setSecondaryModerator] = useState<Staff | null>(null);
  const [showError, setShowError] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Tab state — default to 'assign'
  const [activeTab, setActiveTab] = useState<'assign' | 'exemptions'>('assign');

  // Unassigned courses tab state
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState<'all' | 1 | 2 | 3 | 4>('all');

  // Staff Leave & Status tab state
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedStatusStaff, setSelectedStatusStaff] = useState<Staff>(
    staff.find(s => s.id === 'staff-2') || exemptionStaff[1]
  );
  const [statusType, setStatusType] = useState<'onleave' | 'adjunct' | 'seconded'>('onleave');
  const [leaveType, setLeaveType] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [adjunctActive, setAdjunctActive] = useState(false);
  const [adjunctReason, setAdjunctReason] = useState('');
  const [secondedActive, setSecondedActive] = useState(false);
  const [homeDepartment, setHomeDepartment] = useState('');
  const [secondedReason, setSecondedReason] = useState('');

  const handleSelectStatusStaff = (person: Staff) => {
    const latest = staff.find(s => s.id === person.id) || person;
    setSelectedStatusStaff(latest);
    setStatusDropdownOpen(false);
    if (person.id === 'staff-4') {
      setStatusType('onleave');
      setLeaveType('Maternity Leave');
      setLeaveStartDate('2026-01-01');
      setLeaveEndDate('2026-12-31');
    } else {
      setStatusType('onleave');
      setLeaveType('');
      setLeaveStartDate('');
      setLeaveEndDate('');
    }
    setAdjunctActive(false);
    setAdjunctReason('');
    setSecondedActive(false);
    setHomeDepartment('');
    setSecondedReason('');
  };

  const projectedLoad = selectedLecturer && selectedCourse
    ? selectedLecturer.currentLoad + selectedCourse.credits
    : selectedLecturer?.currentLoad || 0;

  const isOverLimit = projectedLoad > 15;
  const canSave = selectedCourse && selectedLecturer && !isOverLimit;

  const handleExemptionSave = (exemptionData: {
    exemptionFlag: boolean;
    exemptionType?: 'Maternity Leave' | 'Adjunct Status' | 'Borrowed Staff';
    exemptionStartDate?: Date;
    exemptionExpiryDate?: Date;
    exemptionReason?: string;
  }) => {
    const targetLecturer = selectedLecturer;
    if (!targetLecturer) return;

    const updated = updateStaffStatus(targetLecturer.id, exemptionData, user ? `${user.firstName} ${user.lastName}` : 'Coordinator');
    if (updated) setSelectedLecturer(updated);

    const message = exemptionData.exemptionFlag
      ? `Exemption status activated for ${targetLecturer.name}`
      : `Exemption status deactivated for ${targetLecturer.name}`;

    toast.success(message, { duration: 3000 });
  };

  const handleSave = () => {
    if (!canSave) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    sendAssignment(
      selectedCourse,
      selectedLecturer,
      [primaryModerator, secondaryModerator].filter(Boolean) as Staff[],
      user ? `${user.firstName} ${user.lastName}` : 'Coordinator'
    );

    toast.success(`Assignment sent to ${selectedLecturer?.name}`, { duration: 3000 });

    setSelectedCourse(null);
    setSelectedLecturer(null);
    setPrimaryModerator(null);
    setSecondaryModerator(null);
  };

  const handleAssignCourse = (unassignedCourse: typeof unassignedCourses[0]) => {
    const courseToAssign: Course = {
      id: unassignedCourse.id,
      code: unassignedCourse.code,
      name: unassignedCourse.name,
      section: unassignedCourse.section,
      credits: unassignedCourse.credits,
      year: unassignedCourse.year,
      studentCount: unassignedCourse.studentCount,
      labHours: 0,
      tutorialHours: 0,
    };

    setSelectedCourse(courseToAssign);
    setActiveTab('assign');
  };

  const filteredUnassignedCourses = unassignedCourses.filter(course => {
    const matchesSearch = searchQuery === '' ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = yearFilter === 'all' || course.year === yearFilter;
    return matchesSearch && matchesYear;
  });

  const getDeadlineBadge = (urgency: string, deadline: string) => {
    if (urgency === 'urgent') return <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">{deadline}</Badge>;
    if (urgency === 'soon') return <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">{deadline}</Badge>;
    return <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">{deadline}</Badge>;
  };

  const getStatusDot = (urgency: string) => {
    if (urgency === 'urgent') return <div className="w-2 h-2 rounded-full bg-red-500"></div>;
    if (urgency === 'soon') return <div className="w-2 h-2 rounded-full bg-orange-500"></div>;
    return <div className="w-2 h-2 rounded-full bg-gray-400"></div>;
  };

  // Active exemptions for the summary table
  const activeExemptions = staff.filter(s => s.exemptionFlag);

  return (
    <>
      {/* Error Banner */}
      {showError && (
        <div className="bg-[#DC2626] text-white px-4 py-3 text-sm font-medium rounded-lg mb-4 flex items-center gap-2">
          <span aria-hidden="true">⚠</span>
          <span>Assignment blocked — this would exceed the 15-credit semester limit (FR-03).</span>
        </div>
      )}

      <div className="mb-4">
        <h1 className="text-3xl mb-2">Assignment Tool</h1>
        <p className="text-gray-600 mb-4">
          Assign course sections to academic staff (including yourself)
        </p>

        {/* Tabs */}
        <div className="border-b border-gray-300">
          <div className="flex gap-8">
            {(['assign', 'exemptions'] as const).map((tab) => {
              const labels = { assign: 'Assign Lecturer', exemptions: 'Staff Leave & Status' };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab ? 'text-[#900021]' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {labels[tab]}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#900021]"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Assign Lecturer Tab */}
      {activeTab === 'assign' && (
        <div>
          <p className="text-sm text-gray-600 italic mb-4">
            Select a course section and assign it to a lecturer. Use{' '}
            <button
              onClick={() => navigate('/course-catalog')}
              className="underline hover:opacity-70 transition-opacity"
              style={{ color: '#7B1A2A', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
            >
              Course Catalog
            </button>{' '}
            to browse all unassigned sections.
          </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Input Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
              <h2 className="text-xl mb-6 flex items-center gap-2">
                Assignment Details
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      FR-03 Policy: Academic staff teaching load must not exceed 15 credits per semester.
                      The system will prevent assignments that violate this limit.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </h2>

              <div className="space-y-6">
                <div>
                  <CourseSelector
                    courses={mockCourses}
                    selectedCourse={selectedCourse}
                    onSelectCourse={(course) => {
                      setSelectedCourse(course);
                      setPrefillActive(false);
                    }}
                  />
                  {prefillActive && selectedCourse ? (
                    <div
                      className="flex items-center gap-6 mt-2"
                      style={{
                        background: '#F9FAFB',
                        border: '0.5px solid #E5E7EB',
                        borderRadius: '6px',
                        padding: '8px 12px',
                      }}
                    >
                      <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '11px', borderRadius: '4px', padding: '2px 7px', fontWeight: 500 }}>
                        Sec {selectedCourse.section}
                      </span>
                      <span style={{
                        background: YEAR_BADGE[selectedCourse.year]?.bg ?? '#F3F4F6',
                        color: YEAR_BADGE[selectedCourse.year]?.text ?? '#374151',
                        fontSize: '11px', borderRadius: '4px', padding: '2px 7px', fontWeight: 500,
                      }}>
                        Y{selectedCourse.year}
                      </span>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>
                        👥 {selectedCourse.studentCount} students
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2">
                      Or go back to Unassigned Courses tab to browse all pending sections
                    </p>
                  )}
                </div>

                <LecturerSelector
                  staff={staff}
                  selectedLecturer={selectedLecturer}
                  onSelectLecturer={setSelectedLecturer}
                  selectedCourse={selectedCourse}
                />

                <ModeratorSection
                  staff={staff}
                  selectedLecturer={selectedLecturer}
                  primaryModerator={primaryModerator}
                  secondaryModerator={secondaryModerator}
                  onSelectPrimary={setPrimaryModerator}
                  onSelectSecondary={setSecondaryModerator}
                />
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={!canSave}
                  className={
                    canSave
                      ? 'bg-[#900021] hover:bg-[#5C001F] h-11 shadow-sm'
                      : 'bg-[#D1D5DB] hover:bg-[#D1D5DB] cursor-not-allowed h-11'
                  }
                >
                  Send Assignment
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Analytics & Workload Monitor */}
          <div className="lg:col-span-1 space-y-6">
            <WorkloadMonitor
              selectedLecturer={selectedLecturer}
              selectedCourse={selectedCourse}
              projectedLoad={projectedLoad}
            />
            <StaffContextCard staff={selectedLecturer} />
          </div>
        </div>
        </div>
      )}

      {/* Staff Leave & Status Tab */}
      {activeTab === 'exemptions' && (
        <div>
          <p className="text-sm text-gray-600 italic mb-6">
            Manage staff who cannot meet the standard 12-credit minimum. Select a lecturer below to view or update their status.
          </p>

          {/* Lecturer Selector */}
          <div className="mb-6 max-w-md">
            <label className="block font-semibold text-gray-900 mb-2">Select Lecturer</label>
            <div className="relative">
              <button
                onClick={() => setStatusDropdownOpen(prev => !prev)}
                className="w-full flex items-center justify-between px-4 py-2.5 border border-[#c5c5c5] rounded-lg bg-white text-left text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#900021]"
              >
                <span className="flex items-center gap-2">
                  {selectedStatusStaff.name}
                  {selectedStatusStaff.exemptionFlag && (
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">On Leave</Badge>
                  )}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </button>
              {statusDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#c5c5c5] rounded-lg shadow-lg z-20 overflow-hidden">
                  {exemptionStaff.map(person => (
                    <button
                      key={person.id}
                      onClick={() => handleSelectStatusStaff(person)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      <span className="font-medium text-gray-900">{person.name}</span>
                      {person.exemptionFlag && (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">On Leave</Badge>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status Type Pill Selector */}
          <div className="mb-2">
            <div className="flex flex-wrap gap-3">
              {([
                { key: 'onleave', icon: CalendarDays, label: 'On Leave' },
                { key: 'adjunct', icon: User, label: 'Hired from outside the university' },
                { key: 'seconded', icon: ArrowRightLeft, label: 'Borrowed from another department' },
              ] as const).map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setStatusType(key)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                    statusType === key
                      ? 'bg-[#900021] text-white border-[#900021]'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Select the applicable situation for this staff member</p>
          </div>

          <hr className="border-gray-200 mb-6" />

          {/* Dynamic Form Card */}
          <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm mb-8">

            {/* On Leave form */}
            {statusType === 'onleave' && (
              <div>
                <p className="text-sm text-gray-500 italic mb-5">For staff temporarily away from work — maternity, medical, study, or annual leave. The leave period will appear on the department calendar.</p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={leaveType}
                    onChange={e => setLeaveType(e.target.value)}
                    placeholder="e.g. Maternity Leave, Medical Leave, Study Leave..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent text-gray-900"
                  />
                </div>

                <div className="mb-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={leaveStartDate}
                        onChange={e => setLeaveStartDate(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={leaveEndDate}
                        onChange={e => setLeaveEndDate(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-red-500 mt-1.5">Both dates are required. Leave period will appear on the department calendar.</p>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3 mt-4 mb-5">
                  <p className="text-xs text-amber-800">
                    This lecturer will be able to freely decline assignments during the leave period without triggering a compliance error.
                  </p>
                </div>

                <Button
                  onClick={() => {
                    if (!leaveType.trim() || !leaveStartDate || !leaveEndDate) {
                      toast.error('All leave fields are required', { duration: 3000 });
                      return;
                    }

                    const updated = updateStaffStatus(
                      selectedStatusStaff.id,
                      {
                        exemptionFlag: true,
                        exemptionType: 'Maternity Leave',
                        exemptionStartDate: new Date(leaveStartDate),
                        exemptionExpiryDate: new Date(leaveEndDate),
                        exemptionReason: leaveType,
                      },
                      user ? `${user.firstName} ${user.lastName}` : 'Coordinator'
                    );
                    if (updated) setSelectedStatusStaff(updated);

                    toast.success(`Leave saved for ${selectedStatusStaff.name}`, { duration: 3000 });
                    setLeaveType('');
                    setLeaveStartDate('');
                    setLeaveEndDate('');
                  }}
                  className="w-full bg-[#900021] hover:bg-[#5C001F] text-white"
                >
                  Save Leave
                </Button>
              </div>
            )}

            {/* Adjunct Lecturer form */}
            {statusType === 'adjunct' && (
              <div>
                <p className="text-sm text-gray-500 italic mb-5">For part-time lecturers hired from outside UTM who cannot carry a full 12-credit teaching load. This status remains active until manually turned off.</p>

                <div className="flex items-center gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setAdjunctActive(prev => !prev)}
                    className={`relative inline-flex h-7 items-center rounded-full transition-colors flex-shrink-0 ${adjunctActive ? 'bg-[#900021]' : 'bg-gray-300'}`}
                    style={{ width: '52px' }}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${adjunctActive ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                  <span className={`text-sm font-medium ${adjunctActive ? 'text-[#900021]' : 'text-gray-500'}`}>
                    {adjunctActive ? 'Active — 12-credit minimum bypassed' : 'Not Active — Standard policies apply'}
                  </span>
                </div>

                {adjunctActive && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Reason / Comments <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={adjunctReason}
                      onChange={e => setAdjunctReason(e.target.value)}
                      placeholder="Briefly explain the external lecturer arrangement, e.g. industry expert engaged for one semester..."
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent resize-none"
                    />
                  </div>
                )}

                <p className="text-xs text-gray-500 mb-4">Hired-from-outside status does not appear on the department calendar.</p>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3 mb-5">
                  <p className="text-xs text-amber-800">
                    This lecturer will be able to freely decline assignments regardless of their current credit total.
                  </p>
                </div>

                <Button
                  disabled={!adjunctActive}
                  onClick={() => {
                    if (!adjunctActive || !adjunctReason.trim()) {
                      toast.error('Please provide a reason for the hired-from-outside status.', { duration: 3000 });
                      return;
                    }

                    const updated = updateStaffStatus(
                      selectedStatusStaff.id,
                      {
                        exemptionFlag: true,
                        exemptionType: 'Adjunct Status',
                        exemptionReason: adjunctReason,
                        exemptionStartDate: undefined,
                        exemptionExpiryDate: undefined,
                      },
                      user ? `${user.firstName} ${user.lastName}` : 'Coordinator'
                    );
                    if (updated) setSelectedStatusStaff(updated);

                    toast.success(`Hired-from-outside status saved for ${selectedStatusStaff.name}.`, { duration: 3000 });
                    setAdjunctActive(false);
                    setAdjunctReason('');
                  }}
                  className={!adjunctActive
                    ? 'w-full bg-[#D1D5DB] text-gray-400 cursor-not-allowed hover:bg-[#D1D5DB]'
                    : 'w-full bg-[#900021] hover:bg-[#5C001F] text-white'
                  }
                >
                  Save Status
                </Button>
              </div>
            )}

            {/* Seconded Staff form */}
            {statusType === 'seconded' && (
              <div>
                <p className="text-sm text-gray-500 italic mb-5">For staff temporarily working across departments — either joining us from another faculty, or our staff working elsewhere.</p>

                <div className="flex items-center gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setSecondedActive(prev => !prev)}
                    className={`relative inline-flex h-7 items-center rounded-full transition-colors flex-shrink-0 ${secondedActive ? 'bg-[#900021]' : 'bg-gray-300'}`}
                    style={{ width: '52px' }}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${secondedActive ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                  <span className={`text-sm font-medium ${secondedActive ? 'text-[#900021]' : 'text-gray-500'}`}>
                    {secondedActive ? 'Active — 12-credit minimum bypassed' : 'Not Active — Standard policies apply'}
                  </span>
                </div>

                {secondedActive && (
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Home Department <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={homeDepartment}
                        onChange={e => setHomeDepartment(e.target.value)}
                        placeholder="e.g. Faculty of Electrical Engineering, Faculty of Computing..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Reason / Comments <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={secondedReason}
                        onChange={e => setSecondedReason(e.target.value)}
                        placeholder="Briefly explain the borrowed-staff arrangement…"
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 mb-4">Borrowed-from-another-department status does not appear on the department calendar.</p>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3 mb-5">
                  <p className="text-xs text-amber-800">
                    This lecturer will be able to freely decline assignments regardless of their current credit total.
                  </p>
                </div>

                <Button
                  disabled={!secondedActive}
                  onClick={() => {
                    if (!secondedActive || !homeDepartment.trim() || !secondedReason.trim()) {
                      toast.error('Please fill in all required fields', { duration: 3000 });
                      return;
                    }

                    const updated = updateStaffStatus(
                      selectedStatusStaff.id,
                      {
                        exemptionFlag: true,
                        exemptionType: 'Borrowed Staff',
                        exemptionReason: `${homeDepartment} — ${secondedReason}`,
                        exemptionStartDate: undefined,
                        exemptionExpiryDate: undefined,
                      },
                      user ? `${user.firstName} ${user.lastName}` : 'Coordinator'
                    );
                    if (updated) setSelectedStatusStaff(updated);

                    toast.success(`Borrowed-from-another-department status saved for ${selectedStatusStaff.name}.`, { duration: 3000 });
                    setSecondedActive(false);
                    setHomeDepartment('');
                    setSecondedReason('');
                  }}
                  className={!secondedActive
                    ? 'w-full bg-[#D1D5DB] text-gray-400 cursor-not-allowed hover:bg-[#D1D5DB]'
                    : 'w-full bg-[#900021] hover:bg-[#5C001F] text-white'
                  }
                >
                  Save Status
                </Button>
              </div>
            )}
          </div>

          {/* Current Staff Status Summary */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Current Staff Status Summary</h2>
            <p className="text-sm text-gray-500 mb-4">All staff currently flagged with an active leave or special status</p>
            <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-[#c5c5c5]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Staff Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activeExemptions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                        No staff currently flagged this semester
                      </td>
                    </tr>
                  ) : (
                    activeExemptions.map(person => (
                      <tr key={person.id} className="hover:bg-[#F3F4F6] transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{person.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {person.exemptionType === 'Adjunct Status'
                            ? 'Hired from outside the university'
                            : person.exemptionType === 'Borrowed Staff'
                            ? 'Borrowed from another department'
                            : 'On Leave'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {person.exemptionType === 'Adjunct Status'
                            ? 'Hired from outside the university'
                            : person.exemptionType === 'Borrowed Staff'
                            ? 'Borrowed from another department'
                            : person.exemptionType ?? '—'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {person.exemptionStartDate && person.exemptionExpiryDate
                            ? `${new Date(person.exemptionStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — ${new Date(person.exemptionExpiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                            : '—'}
                        </td>
                        <td className="px-6 py-4">
                          {isStaffExemptionActive(person.id) ? (
                            <Badge className="bg-[#D1FAE5] text-[#065F46] border-green-200 text-xs">Active</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-600 border-gray-200 text-xs">Expired</Badge>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Administrative Status Modal (used from Assign Lecturer tab if needed) */}
      <AdministrativeStatusModal
        open={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        lecturer={selectedLecturer}
        onSave={handleExemptionSave}
      />
    </>
  );
}

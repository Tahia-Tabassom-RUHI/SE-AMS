import { useState } from 'react';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

type AuditTab = 'assignment' | 'activities' | 'trail';

// ── Assignment Log data ─────────────────────────────────────────────────────

const assignmentRows = [
  { id: 1, lecturer: 'Dr. Aisyah Rahman', exempt: false, course: 'CS101 - 01', name: 'Introduction to Programming', credits: 3, status: 'Accepted', sentDate: 'Apr 20', responseDate: 'Apr 21' },
  { id: 2, lecturer: 'Dr. Aisyah Rahman', exempt: false, course: 'CS202 - 01', name: 'Data Structures', credits: 3, status: 'Pending', sentDate: 'Apr 26', responseDate: null },
  { id: 3, lecturer: 'Prof. Muhammad Ali', exempt: false, course: 'CS303 - 01', name: 'Database Systems', credits: 3, status: 'Accepted', sentDate: 'Apr 18', responseDate: 'Apr 19' },
  { id: 4, lecturer: 'Dr. Ahmad Hassan', exempt: true, course: 'MA101 - 02', name: 'Calculus I', credits: 4, status: 'Rejected', sentDate: 'Apr 15', responseDate: 'Apr 16' },
  { id: 5, lecturer: 'Dr. Siti Aminah', exempt: false, course: 'CS205 - 01', name: 'Algorithms', credits: 3, status: 'Accepted', sentDate: 'Apr 22', responseDate: 'Apr 23' },
  { id: 6, lecturer: 'Dr. Noor Hayati', exempt: false, course: 'CS404 - 01', name: 'Software Engineering', credits: 3, status: 'Rejected', sentDate: 'Apr 19', responseDate: 'Apr 20' },
  { id: 7, lecturer: 'Dr. Fatimah Zahra', exempt: false, course: 'CS301 - 01', name: 'Operating Systems', credits: 3, status: 'Pending', sentDate: 'Apr 27', responseDate: null },
];

// ── Staff Activities data ───────────────────────────────────────────────────

const activityRows = [
  { id: 1, title: 'MJIIT Robotics Seminar', type: 'Service', hours: 40, mode: 'Hybrid', staff: 'Dr. Aisyah Rahman', date: 'Apr 15, 2026' },
  { id: 2, title: 'Machine Learning in Education Research', type: 'Research', hours: 120, mode: 'Hybrid', staff: 'Dr. Aisyah Rahman', date: 'Mar 20, 2026' },
  { id: 3, title: 'NSF Database Optimization Grant', type: 'Grant', hours: 80, mode: 'Hybrid', staff: 'Prof. Muhammad Ali', date: 'Apr 10, 2026' },
  { id: 4, title: 'AI Ethics Committee', type: 'Service', hours: 20, mode: 'Hybrid', staff: 'Dr. Siti Aminah', date: 'Apr 22, 2026' },
  { id: 5, title: 'Distributed Systems Performance Analysis', type: 'Research', hours: 150, mode: 'Hybrid', staff: 'Prof. Muhammad Ali', date: 'Feb 28, 2026' },
  { id: 6, title: 'Ministry of Education Curriculum Review', type: 'Service', hours: 60, mode: 'Hybrid', staff: 'Dr. Fatimah Zahra', date: 'Apr 5, 2026' },
  { id: 7, title: 'Deep Learning for Software Engineering Research', type: 'Research', hours: 120, mode: 'Hybrid', staff: 'Dr. Zatul Alwani', date: 'Mar 15, 2026' },
];

// ── Audit Trail data ────────────────────────────────────────────────────────

const trailRows = [
  { id: 1, timestamp: 'Jun 7, 2026 09:42 AM', user: 'Dr. Zatul Alwani (Coordinator)', type: 'Assignment', details: 'Assigned CS101-01 to Dr. Aisyah Rahman', ip: '192.168.1.10' },
  { id: 2, timestamp: 'Jun 7, 2026 09:35 AM', user: 'Dr. Zatul Alwani (Coordinator)', type: 'Status Change', details: 'Activated On Leave for Dr. Noor Hayati (Jun 10–Jun 30)', ip: '192.168.1.10' },
  { id: 3, timestamp: 'Jun 7, 2026 09:18 AM', user: 'Dr. Aisyah Rahman', type: 'Activity Entry', details: 'Added: Deep Learning for SE Research (120 hrs)', ip: '192.168.1.42' },
  { id: 4, timestamp: 'Jun 6, 2026 04:55 PM', user: 'Dr. Zatul Alwani (Coordinator)', type: 'Export', details: 'Generated ESE Legacy Excel Export — All Sheets', ip: '192.168.1.10' },
  { id: 5, timestamp: 'Jun 6, 2026 03:30 PM', user: 'Prof. Muhammad Ali', type: 'Activity Entry', details: 'Added: NSF Database Optimization Grant (80 hrs)', ip: '192.168.1.55' },
  { id: 6, timestamp: 'Jun 6, 2026 02:14 PM', user: 'Dr. Zatul Alwani (Coordinator)', type: 'Assignment', details: 'Assigned CS303-01 to Prof. Muhammad Ali', ip: '192.168.1.10' },
  { id: 7, timestamp: 'Jun 6, 2026 08:45 AM', user: 'Dr. Noor Hayati', type: 'Login', details: 'Logged in (Role: Lecturer)', ip: '192.168.1.78' },
  { id: 8, timestamp: 'Jun 5, 2026 11:20 AM', user: 'Dr. Zatul Alwani (Coordinator)', type: 'Status Change', details: 'Set Adjunct status for Dr. Ahmad Hassan', ip: '192.168.1.10' },
];

// ── Badge helpers ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Accepted: 'bg-[#DCFCE7] text-[#166534]',
    Pending: 'bg-[#FEF9C3] text-[#854D0E]',
    Rejected: 'bg-[#FEE2E2] text-[#991B1B]',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? 'bg-gray-100 text-gray-700'}`}>
      {status}
      {status === 'Rejected' && <span className="ml-0.5 text-xs opacity-70">ⓘ</span>}
    </span>
  );
}

function ActivityBadge({ type }: { type: string }) {
  const map: Record<string, string> = {
    Research: 'bg-[#EDE9FE] text-[#5B21B6]',
    Grant: 'bg-[#FEF9C3] text-[#854D0E]',
    Service: 'bg-[#DCFCE7] text-[#166534]',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[type] ?? 'bg-gray-100 text-gray-700'}`}>
      {type}
    </span>
  );
}

function TrailBadge({ type }: { type: string }) {
  const map: Record<string, string> = {
    Assignment: 'bg-[#DBEAFE] text-[#1E40AF]',
    Export: 'bg-[#F3E8FF] text-[#6B21A8]',
    'Activity Entry': 'bg-[#DCFCE7] text-[#166534]',
    'Status Change': 'bg-[#FEF9C3] text-[#854D0E]',
    Login: 'bg-[#F1F5F9] text-[#475569]',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[type] ?? 'bg-gray-100 text-gray-700'}`}>
      {type}
    </span>
  );
}

// ── Stat card ───────────────────────────────────────────────────────────────

function StatCard({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg px-6 py-5 flex-1">
      <p className="text-xs text-[#6B7280] mb-2 uppercase tracking-wide font-medium">{label}</p>
      <p className="text-2xl font-semibold" style={{ color: color ?? '#111827' }}>{value}</p>
    </div>
  );
}

// ── Table shell ─────────────────────────────────────────────────────────────

function TableShell({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

// ── Tab 1: Assignment Log ───────────────────────────────────────────────────

function AssignmentLog() {
  const accepted = assignmentRows.filter(r => r.status === 'Accepted').length;
  const pending = assignmentRows.filter(r => r.status === 'Pending').length;
  const rejected = assignmentRows.filter(r => r.status === 'Rejected').length;
  const totalCredits = assignmentRows.filter(r => r.status === 'Accepted').reduce((s, r) => s + r.credits, 0);

  return (
    <div className="space-y-5">
      <div className="flex gap-4">
        <StatCard label="Accepted" value={String(accepted).padStart(2, '0')} color="#166534" />
        <StatCard label="Pending" value={String(pending).padStart(2, '0')} color="#854D0E" />
        <StatCard label="Rejected" value={String(rejected).padStart(2, '0')} color="#991B1B" />
        <StatCard label="Total Credits Assigned" value={totalCredits} color="#900021" />
      </div>

      <TableShell headers={['Lecturer Name', 'Course & Section', 'Credits', 'Status', 'Sent Date']}>
        {assignmentRows.map(row => (
          <tr key={row.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors" style={{ height: '56px' }}>
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#111827] font-medium">{row.lecturer}</span>
                {row.exempt && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FEF9C3] text-[#854D0E]">Exempt</span>
                )}
              </div>
            </td>
            <td className="px-4 py-3">
              <p className="text-sm font-semibold text-[#900021]">{row.course}</p>
              <p className="text-xs text-[#6B7280]">{row.name}</p>
            </td>
            <td className="px-4 py-3 text-sm text-[#374151]">{row.credits}</td>
            <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
            <td className="px-4 py-3">
              <p className="text-sm text-[#374151]">{row.sentDate}</p>
              {row.responseDate && <p className="text-xs text-[#6B7280]">Response: {row.responseDate}</p>}
            </td>
          </tr>
        ))}
      </TableShell>
    </div>
  );
}

// ── Tab 2: Staff Activities ─────────────────────────────────────────────────

function StaffActivities() {
  const total = activityRows.length;
  const research = activityRows.filter(r => r.type === 'Research').length;
  const grants = activityRows.filter(r => r.type === 'Grant').length;
  const totalHours = activityRows.reduce((s, r) => s + r.hours, 0);

  return (
    <div className="space-y-5">
      <div className="flex gap-4">
        <StatCard label="Total Activities" value={total} />
        <StatCard label="Research Projects" value={research} color="#5B21B6" />
        <StatCard label="Active Grants" value={grants} color="#854D0E" />
        <StatCard label="Total Hours" value={totalHours} />
      </div>

      <TableShell headers={['Title', 'Type', 'Hours Spent', 'Mode', 'Staff Name', 'Date']}>
        {activityRows.map(row => (
          <tr key={row.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors" style={{ height: '56px' }}>
            <td className="px-4 py-3 text-sm text-[#111827] font-medium max-w-xs">{row.title}</td>
            <td className="px-4 py-3"><ActivityBadge type={row.type} /></td>
            <td className="px-4 py-3 text-sm text-[#374151]">{row.hours} Hours</td>
            <td className="px-4 py-3 text-sm text-[#374151]">{row.mode}</td>
            <td className="px-4 py-3 text-sm text-[#374151]">{row.staff}</td>
            <td className="px-4 py-3 text-sm text-[#6B7280]">{row.date}</td>
          </tr>
        ))}
      </TableShell>
    </div>
  );
}

// ── Tab 3: Audit Trail ──────────────────────────────────────────────────────

function AuditTrail() {
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const uniqueUsers = Array.from(new Set(trailRows.map(r => r.user)));

  const filtered = trailRows.filter(r => {
    if (actionFilter !== 'all' && r.type !== actionFilter) return false;
    if (userFilter !== 'all' && r.user !== userFilter) return false;
    return true;
  });

  const clearFilters = () => {
    setActionFilter('all');
    setUserFilter('all');
    setFromDate('');
    setToDate('');
  };

  return (
    <div className="space-y-5">
      <p className="text-xs text-[#6B7280] italic">
        Records all system actions per NFR-01 — assignments, exports, activity entries, and status changes are logged with timestamp, user, action type, and IP address.
      </p>

      {/* Filter row */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-44 h-9 text-sm border-[#E5E7EB] bg-white">
            <SelectValue placeholder="All Action Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Action Types</SelectItem>
            <SelectItem value="Assignment">Assignment</SelectItem>
            <SelectItem value="Export">Export</SelectItem>
            <SelectItem value="Activity Entry">Activity Entry</SelectItem>
            <SelectItem value="Status Change">Status Change</SelectItem>
            <SelectItem value="Login">Login</SelectItem>
          </SelectContent>
        </Select>

        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="w-52 h-9 text-sm border-[#E5E7EB] bg-white">
            <SelectValue placeholder="All Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            {uniqueUsers.map(u => (
              <SelectItem key={u} value={u}>{u}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            placeholder="From Date"
            className="h-9 px-3 text-sm border border-[#E5E7EB] rounded-md bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
          />
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            placeholder="To Date"
            className="h-9 px-3 text-sm border border-[#E5E7EB] rounded-md bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
          />
        </div>

        <button
          onClick={clearFilters}
          className="h-9 px-4 text-sm text-[#900021] border border-[#900021] rounded-md bg-white hover:bg-[#FFF0F3] transition-colors font-medium"
        >
          Clear Filters
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <StatCard label="Total Actions" value={47} />
        <StatCard label="Today" value={6} color="#185FA5" />
        <StatCard label="This Week" value={18} />
        <StatCard label="Unique Users" value={8} />
      </div>

      <TableShell headers={['Timestamp', 'User', 'Action Type', 'Details', 'IP Address']}>
        {filtered.map(row => (
          <tr key={row.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors" style={{ height: '56px' }}>
            <td className="px-4 py-3 text-sm text-[#374151] whitespace-nowrap">{row.timestamp}</td>
            <td className="px-4 py-3 text-sm text-[#111827] font-medium">{row.user}</td>
            <td className="px-4 py-3"><TrailBadge type={row.type} /></td>
            <td className="px-4 py-3 text-sm text-[#374151] max-w-xs">{row.details}</td>
            <td className="px-4 py-3 text-xs text-[#6B7280] font-mono">{row.ip}</td>
          </tr>
        ))}
      </TableShell>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

export function SystemAudit() {
  const [activeTab, setActiveTab] = useState<AuditTab>('assignment');

  const tabs: { key: AuditTab; label: string }[] = [
    { key: 'assignment', label: 'Assignment Log' },
    { key: 'activities', label: 'Staff Activities' },
    { key: 'trail', label: 'Audit Trail' },
  ];

  return (
    <>
      <div className="mb-4">
        <h1 className="text-3xl mb-2">System Audit</h1>
        <p className="text-gray-600 mb-4">
          Monitor assignments, staff activities, and system-level action logs
        </p>

        {/* Tab bar */}
        <div className="border-b border-gray-300">
          <div className="flex gap-8">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key ? 'text-[#900021]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#900021]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2">
        {activeTab === 'assignment' && <AssignmentLog />}
        {activeTab === 'activities' && <StaffActivities />}
        {activeTab === 'trail' && <AuditTrail />}
      </div>
    </>
  );
}

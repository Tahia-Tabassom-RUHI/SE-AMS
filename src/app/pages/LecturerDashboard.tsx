import { BookOpen, Bell, Clock, CheckCircle, ChevronRight, Handshake, Badge as BadgeIcon } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, type CalendarEvent, type CalendarSpanEvent, type CalendarLegendItem } from '../components/Calendar';
import { Badge } from '../components/ui/badge';

export function LecturerDashboard() {
  const { user } = useAuth();
  const currentLoad = user?.currentLoad || 13.0;
  const acceptedSections = 4;

  const calendarEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'CS202 — Queue Response Deadline',
      date: new Date(2026, 5, 6),
      type: 'deadline',
      color: '#EF4444',
    },
    {
      id: '2',
      title: 'CS101 — Queue Response Deadline',
      date: new Date(2026, 5, 7),
      type: 'deadline',
      color: '#EF4444',
    },
    {
      id: '3',
      title: 'AI Ethics Committee',
      date: new Date(2026, 5, 10),
      type: 'activity',
      color: '#10B981',
    },
    {
      id: '4',
      title: 'Deep Learning Research',
      date: new Date(2026, 5, 20),
      type: 'research',
      color: '#8B5CF6',
    },
    {
      id: '5',
      title: 'Ministry of Higher Education Grant',
      date: new Date(2026, 5, 25),
      type: 'grant',
      color: '#EAB308',
    },
    ...(user?.status === 'onleave' ? [{
      id: '6',
      title: 'My Leave Expires Dec 31',
      date: new Date(2026, 5, 30),
      type: 'leave',
      color: '#F59E0B',
    }] : []),
  ];

  const calendarSpanEvents: CalendarSpanEvent[] = user?.status === 'onleave' ? [
    {
      id: 'leave-span-1',
      title: 'My Leave Period',
      startDate: new Date(2026, 5, 10),
      endDate: new Date(2026, 5, 20),
      color: '#F59E0B',
      textColor: '#92400E',
    },
  ] : [];

  const calendarLegend: CalendarLegendItem[] = [
    { color: '#EF4444', label: 'Queue Response Deadline' },
    { color: '#10B981', label: 'Service Activity' },
    { color: '#8B5CF6', label: 'Research Activity' },
    { color: '#EAB308', label: 'Grant Activity' },
    ...(user?.status === 'onleave' ? [
      { color: '#F59E0B', label: '🟡 Leave Expiry' },
      { color: '#F59E0B', label: '🟡 My Leave Period' },
    ] : []),
  ];

  const minThreshold = 12;
  const maxThreshold = 15;

  const getStatus = () => {
    if (currentLoad < minThreshold) return { status: 'warning', label: 'Under-allocated', color: '#F59E0B' };
    if (currentLoad > maxThreshold) return { status: 'danger', label: 'Over-allocated', color: '#EF4444' };
    return { status: 'success', label: 'Optimal Range', color: '#10B981' };
  };

  const { status, label, color } = getStatus();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl mb-2">My Dashboard</h1>
        <p className="text-gray-600">
          Personal workspace for individual tasks and workload compliance
        </p>
      </div>

      {/* Current Status Widget */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Currently Accepted Sections</p>
              <p className="text-4xl font-bold text-gray-900">{acceptedSections}</p>
              <p className="text-xs text-gray-500 mt-2">Active course assignments</p>
            </div>
            <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[#10B981]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Calculated Credit Hours</p>
              <p className="text-4xl font-bold text-gray-900">{currentLoad.toFixed(1)}</p>
              <p className="text-xs text-gray-500 mt-2">Current semester credits</p>
            </div>
            <div className="w-16 h-16 bg-[#FFF0F3] rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-[#900021]" />
            </div>
          </div>
        </div>
      </div>

      {/* Workload Compliance Monitor — full width */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm p-6 mb-6">
        <h2 className="text-xl mb-4">Workload Compliance Monitor</h2>
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Current Credits</span>
              <span className="text-sm font-semibold" style={{ color }}>{currentLoad.toFixed(1)} credits</span>
            </div>
            <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="flex-1" style={{ background: '#FEF3C7' }}></div>
                <div className="flex-1" style={{ background: '#D1FAE5' }}></div>
                <div className="flex-1" style={{ background: '#FEE2E2' }}></div>
              </div>
              <div
                className="absolute top-0 left-0 h-full transition-all duration-500"
                style={{ width: `${Math.min((currentLoad / 20) * 100, 100)}%`, background: color }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0</span><span>12</span><span>15</span><span>20+</span>
            </div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${color}20` }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: color }}>
                {currentLoad}
              </div>
            </div>
            <p className="text-xs font-medium" style={{ color }}>{label}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-[#c5c5c5]">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div><span className="text-xs text-gray-700">Under 12: Under-allocated</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#10B981]"></div><span className="text-xs text-gray-700">12-15: Optimal Range</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#EF4444]"></div><span className="text-xs text-gray-700">Over 15: Over-allocated</span></div>
        </div>
      </div>

      {/* Bottom row — 3 equal columns */}
      <div className="grid grid-cols-3 gap-6">
        {/* My Action Items */}
        <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Action Items</h2>
            <div className="w-6 h-6 bg-[#EF4444] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">4</span>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="p-4 bg-[#F4F4F4] rounded-lg border border-[#c5c5c5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FEE2E2] rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">New Pending Assignments</p>
                  <p className="text-xs text-gray-600">4 courses awaiting your response</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#F4F4F4] rounded-lg border border-[#c5c5c5]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#FEF3C7] rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#900021]">CS202 expires in 23h</p>
                  <p className="text-xs text-gray-600">Respond before Jun 6, 11:59 PM</p>
                </div>
                <Badge className="bg-red-100 text-red-700 border-red-200 text-xs self-start">Urgent</Badge>
              </div>
            </div>
          </div>
          <Link to="/queue" className="block w-full text-center py-2 px-4 bg-[#900021] text-white rounded-lg hover:bg-[#5C001F] transition-colors text-sm font-medium">
            View Pending Queue
          </Link>
        </div>

        {/* My Teaching Overview */}
        <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Teaching Overview</h2>
            <Link to="/my-courses" className="text-xs text-[#900021] hover:text-[#5C001F] font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3 mb-3">
            <div className="flex items-center justify-between py-2 border-b border-[#c5c5c5]">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm font-bold text-[#900021]">CS101</span>
                <span className="text-sm text-gray-900 truncate">Introduction to Programming</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Teaching</Badge>
                <span className="text-xs text-gray-600">3 CR</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#c5c5c5]">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm font-bold text-[#900021]">CS205</span>
                <span className="text-sm text-gray-900 truncate">Algorithms</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Teaching</Badge>
                <span className="text-xs text-gray-600">3 CR</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#c5c5c5]">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm font-bold text-[#900021]">CS303</span>
                <span className="text-sm text-gray-900 truncate">Database Systems</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">Moderator</Badge>
                <span className="text-xs text-gray-600">0.5 CR</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm font-bold text-[#900021]">SCSE2243</span>
                <span className="text-sm text-gray-900 truncate">Software Engineering</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Teaching</Badge>
                <span className="text-xs text-gray-600">3 CR</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Total: 13.0 CR across 4 sections</p>
        </div>

        {/* My Research Summary */}
        <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Research Summary</h2>
            <Link to="/my-activity" className="text-xs text-[#900021] hover:text-[#5C001F] font-medium">
              View All →
            </Link>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-[#c5c5c5]">
            <div className="text-center p-3 border border-[#c5c5c5] rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="text-center p-3 border border-[#c5c5c5] rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">215h</p>
            </div>
            <div className="text-center p-3 border border-[#c5c5c5] rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Research Projects</p>
              <p className="text-2xl font-bold text-purple-600">1</p>
            </div>
            <div className="text-center p-3 border border-[#c5c5c5] rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Active Grants</p>
              <p className="text-2xl font-bold text-yellow-600">1</p>
            </div>
          </div>

          {/* Recent Activity Row */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F4F4F4] border border-[#c5c5c5]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-100">
              <Handshake className="w-4 h-4 text-purple-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Kuala Lumpur Tech Outreach</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">Service</Badge>
                <span className="text-xs text-gray-500">Apr 25, 2026 · 15h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mt-6">
        <Calendar
          events={calendarEvents}
          spanEvents={calendarSpanEvents}
          legendItems={calendarLegend}
          onDateClick={(date) => console.log('Date clicked:', date)}
          onEventClick={(event) => console.log('Event clicked:', event)}
        />
      </div>
    </>
  );
}

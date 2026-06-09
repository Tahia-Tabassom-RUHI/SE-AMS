import { AlertCircle, ClipboardCheck, UserPlus, AlertTriangle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { Calendar, type CalendarEvent, type CalendarSpanEvent, type CalendarLegendItem } from '../components/Calendar';
import { Badge } from '../components/ui/badge';

export function CoordinatorDashboard() {
  const priorityAlerts = [
    { type: 'critical', message: 'CS303-02: Lab capacity exceeded (42/35 students)', icon: AlertTriangle, linkTo: '/lab-planner', linkText: 'Fix Now →' },
    { type: 'warning', message: 'Dr. Ahmad Hassan has exceeded 15-credit limit (16.0 credits)', icon: AlertCircle, linkTo: '/status-board', linkText: 'Fix Now →' },
    { type: 'warning', message: 'MA101-01: No moderators assigned', icon: AlertCircle, linkTo: '/course-moderator', linkText: 'Fix Now →' },
    { type: 'critical', message: '3 sections require lecturer assignment by May 5', icon: AlertCircle, linkTo: '/assignment', linkText: 'Fix Now →' },
  ];

  const calendarEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'CS202 — Assign Lecturer Deadline',
      date: new Date(2026, 5, 5),
      type: 'deadline',
      color: '#EF4444',
    },
    {
      id: '2',
      title: 'CS301 — Assign Lecturer Deadline',
      date: new Date(2026, 5, 6),
      type: 'deadline',
      color: '#EF4444',
    },
    {
      id: '3',
      title: 'CS401 — Assign Lecturer Deadline',
      date: new Date(2026, 5, 7),
      type: 'deadline',
      color: '#EF4444',
    },
    {
      id: '4',
      title: 'NSF Database Optimization Grant',
      date: new Date(2026, 5, 10),
      type: 'activity',
      color: '#10B981',
    },
    {
      id: '5',
      title: 'MA202 — Assign Lecturer Deadline',
      date: new Date(2026, 5, 15),
      type: 'deadline',
      color: '#EF4444',
    },
    {
      id: '6',
      title: 'MJIIT Robotics Seminar',
      date: new Date(2026, 5, 25),
      type: 'activity',
      color: '#10B981',
    },
    {
      id: '7',
      title: 'Dr. Noor Hayati — Leave Expires Dec 31',
      date: new Date(2026, 5, 30),
      type: 'leave',
      color: '#F59E0B',
    },
  ];

  const calendarSpanEvents: CalendarSpanEvent[] = [
    {
      id: 'span-1',
      title: 'Dr. Noor Hayati — On Leave',
      startDate: new Date(2026, 5, 10),
      endDate: new Date(2026, 5, 20),
      color: '#F59E0B',
      textColor: '#92400E',
    },
  ];

  const calendarLegend: CalendarLegendItem[] = [
    { color: '#EF4444', label: 'Assign Lecturer Deadline' },
    { color: '#10B981', label: 'Service Activity' },
    { color: '#F59E0B', label: 'Leave Expiry' },
    { color: '#F59E0B', label: 'Staff Leave Period' },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Department Operations</h1>
        <p className="text-gray-600">
          Overview of current semester progress and management tasks
        </p>
      </div>

      {/* Task Status Overview - 3 cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Unassigned Sections</p>
              <p className="text-4xl font-bold text-[#F59E0B]">12</p>
              <p className="text-xs text-gray-500 mt-2">Awaiting lecturer assignment</p>
            </div>
            <div className="w-16 h-16 bg-[#FEF3C7] rounded-full flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-[#F59E0B]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Lecturer Responses</p>
              <p className="text-4xl font-bold text-[#900021]">7</p>
              <p className="text-xs text-gray-500 mt-2">Awaiting accept/reject decision</p>
            </div>
            <div className="w-16 h-16 bg-[#FFF0F3] rounded-full flex items-center justify-center">
              <ClipboardCheck className="w-8 h-8 text-[#900021]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-red-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Staff Over Credit Limit</p>
              <p className="text-4xl font-bold text-[#EF4444]">1</p>
              <p className="text-xs text-gray-500 mt-2">Requires immediate attention</p>
            </div>
            <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-[#EF4444]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Priority Alerts */}
        <div className="col-span-2 h-full">
          <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm h-full flex flex-col">
            <div className="p-6 border-b border-[#c5c5c5]">
              <h2 className="text-xl">Priority Alerts</h2>
              <p className="text-sm text-gray-600 mt-1">
                Urgent issues requiring immediate attention
              </p>
            </div>

            <div className="divide-y divide-[#c5c5c5] flex-1">
              {priorityAlerts.map((alert, index) => {
                const Icon = alert.icon;
                const colors = {
                  critical: { bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]', dot: 'bg-[#DC2626]' },
                  warning: { bg: 'bg-[#FEF3C7]', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]' },
                  info: { bg: 'bg-[#FFF0F3]', text: 'text-[#900021]', dot: 'bg-[#900021]' },
                };
                const style = colors[alert.type as keyof typeof colors];

                return (
                  <div key={index} className="p-4 hover:bg-[#F4F4F4] transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 ${style.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${style.text}`} />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <Link
                          to={alert.linkTo}
                          className="text-sm text-[#900021] hover:text-[#5C001F] font-medium whitespace-nowrap ml-4"
                        >
                          {alert.linkText}
                        </Link>
                      </div>
                      <div className={`w-2 h-2 ${style.dot} rounded-full mt-2 flex-shrink-0`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Department Snapshot */}
        <div className="col-span-1 h-full">
          <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm p-6 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-1">Department Snapshot</h2>
            <p className="text-sm text-gray-600 mb-4">Current semester staff workload overview</p>

            {/* Summary Row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#10B981]">5</div>
                <div className="text-xs text-gray-600 mt-1">At Optimal Load</div>
              </div>
              <div className="text-center border-l border-r border-[#c5c5c5]">
                <div className="text-2xl font-bold text-[#F59E0B]">3</div>
                <div className="text-xs text-gray-600 mt-1">Under-allocated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#EF4444]">1</div>
                <div className="text-xs text-gray-600 mt-1">Over-allocated</div>
              </div>
            </div>

            <div className="border-t border-[#c5c5c5] pt-4 mb-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Urgent Unassigned Courses</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-[#c5c5c5]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#900021]">CS301</span>
                    <span className="text-sm text-gray-900">Operating Systems</span>
                  </div>
                  <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Due May 5</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#c5c5c5]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#900021]">CS401</span>
                    <span className="text-sm text-gray-900">Computer Networks</span>
                  </div>
                  <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Due May 5</Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#900021]">MA202</span>
                    <span className="text-sm text-gray-900">Linear Algebra</span>
                  </div>
                  <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Due May 6</Badge>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-3 text-right">
              <Link to="/assignment" className="text-sm text-[#900021] hover:text-[#5C001F] font-medium">
                View All in Assignment Tool →
              </Link>
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

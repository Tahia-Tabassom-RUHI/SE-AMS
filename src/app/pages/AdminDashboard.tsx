import { Users, BookOpen, Beaker, Shield, Database, Clock, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router';

export function AdminDashboard() {
  const systemUpdates = [
    { time: '2026-05-01 14:30', event: 'System data backup completed successfully' },
    { time: '2026-05-01 09:15', event: 'Course catalog data imported from registry' },
    { time: '2026-04-30 16:45', event: 'Laboratory capacity updated for Fall 2026' },
    { time: '2026-04-30 11:20', event: 'New academic staff accounts created (5 users)' },
    { time: '2026-04-29 18:00', event: 'System maintenance completed' },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl mb-2">System Overview</h1>
        <p className="text-gray-600">
          High-level control center for departmental data management
        </p>
      </div>

      {/* Summary Widgets */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFF0F3] rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-[#900021]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Academic Staff</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F0FDF4] rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Course Sections</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FEF3C7] rounded-full flex items-center justify-center">
              <Beaker className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Laboratories</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* System Health Monitor */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm">
            <div className="p-6 border-b border-[#c5c5c5]">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#900021]" />
                <h2 className="text-xl">System Health Monitor</h2>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Recent system updates and maintenance logs
              </p>
            </div>

            <div className="divide-y divide-[#c5c5c5]">
              {systemUpdates.map((update, index) => (
                <div key={index} className="p-4 hover:bg-[#F4F4F4] transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{update.event}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{update.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Access</h2>

            <div className="space-y-3">
              <Link
                to="/course-moderator"
                className="block p-4 rounded-lg border-2 border-[#c5c5c5] hover:border-[#900021] hover:bg-[#FFF0F3] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF0F3] rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#900021]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Course Catalog</p>
                      <p className="text-xs text-gray-600">& Lab Manager</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>

              <Link
                to="/audit-log"
                className="block p-4 rounded-lg border-2 border-[#c5c5c5] hover:border-[#900021] hover:bg-[#FFF0F3] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF0F3] rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#900021]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">System Security</p>
                      <p className="text-xs text-gray-600">Settings</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>

              <Link
                to="/activity-tracker"
                className="block p-4 rounded-lg border-2 border-[#c5c5c5] hover:border-[#900021] hover:bg-[#FFF0F3] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF0F3] rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-[#900021]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Staff Activity</p>
                      <p className="text-xs text-gray-600">Tracker</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

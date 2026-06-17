import { useState } from 'react';
import { Filter, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import type { StaffActivity } from '../types';

const mockActivities: StaffActivity[] = [
  {
    id: 'act-1',
    staffName: 'Dr. Aisyah Rahman',
    title: 'MJIIT Robotics Seminar',
    type: 'Service',
    hoursSpent: 40,
    mode: 'Hybrid',
    date: new Date('2026-04-15'),
  },
  {
    id: 'act-2',
    staffName: 'Dr. Aisyah Rahman',
    title: 'Machine Learning in Education Research',
    type: 'Research',
    hoursSpent: 120,
    mode: 'Hybrid',
    date: new Date('2026-03-20'),
  },
  {
    id: 'act-3',
    staffName: 'Prof. Muhammad Ali',
    title: 'NSF Database Optimization Grant',
    type: 'Grant',
    hoursSpent: 80,
    mode: 'Hybrid',
    date: new Date('2026-04-10'),
  },
  {
    id: 'act-4',
    staffName: 'Dr. Siti Aminah',
    title: 'AI Ethics Committee',
    type: 'Service',
    hoursSpent: 20,
    mode: 'Hybrid',
    date: new Date('2026-04-22'),
  },
  {
    id: 'act-5',
    staffName: 'Prof. Muhammad Ali',
    title: 'Distributed Systems Performance Analysis',
    type: 'Research',
    hoursSpent: 150,
    mode: 'Hybrid',
    date: new Date('2026-02-28'),
  },
  {
    id: 'act-6',
    staffName: 'Dr. Fatimah Zahra',
    title: 'Ministry of Education Curriculum Review',
    type: 'Service',
    hoursSpent: 60,
    mode: 'Hybrid',
    date: new Date('2026-04-05'),
  },
  {
    id: 'act-7',
    staffName: 'Dr. Zatul Alwani',
    title: 'Deep Learning for Software Engineering Research',
    type: 'Research',
    hoursSpent: 120,
    mode: 'Hybrid',
    date: new Date('2026-03-15'),
  },
  {
    id: 'act-8',
    staffName: 'Dr. Zatul Alwani',
    title: 'Ministry of Higher Education Grant Application',
    type: 'Grant',
    hoursSpent: 80,
    mode: 'Hybrid',
    date: new Date('2026-04-10'),
  },
  {
    id: 'act-9',
    staffName: 'Dr. Zatul Alwani',
    title: 'Kuala Lumpur Tech Outreach',
    type: 'Service',
    hoursSpent: 15,
    mode: 'Hybrid',
    date: new Date('2026-04-25'),
  },
];

export function StaffActivityTracker() {
  const [activities] = useState<StaffActivity[]>(mockActivities);

  const getTypeBadge = (type: StaffActivity['type']) => {
    const styles = {
      Research: 'bg-blue-100 text-blue-700 border-blue-200',
      Grant: 'bg-purple-100 text-purple-700 border-purple-200',
      Service: 'bg-green-100 text-green-700 border-green-200',
    };
    return styles[type];
  };

  const totalHours = activities.reduce((sum, act) => sum + act.hoursSpent, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Staff Activity Tracker</h1>
        <p className="text-gray-600">
          Record-keeping for research, grants, and service activities (not counted in 15-credit teaching limit)
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Activities</div>
          <div className="text-3xl font-bold text-gray-900">{activities.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Research Projects</div>
          <div className="text-3xl font-bold text-blue-600">
            {activities.filter(a => a.type === 'Research').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Active Grants</div>
          <div className="text-3xl font-bold text-purple-600">
            {activities.filter(a => a.type === 'Grant').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Hours</div>
          <div className="text-3xl font-bold text-gray-900">{totalHours}</div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[580px]">
            <thead className="bg-gray-50 border-b border-[#c5c5c5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hours Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Staff Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activities.map((activity, idx) => (
                <tr
                  key={activity.id}
                  className={`hover:bg-[#F3F4F6] transition-colors ${
                    idx % 2 === 1 ? 'bg-[#F4F4F4]' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 max-w-md">{activity.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getTypeBadge(activity.type)}>{activity.type}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-lg font-semibold text-gray-900">{activity.hoursSpent}</div>
                    <div className="text-xs text-gray-500">Hours</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{activity.mode}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{activity.staffName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {activity.date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { Briefcase, Award, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import type { Staff, StaffActivity } from '../types';

interface StaffContextCardProps {
  staff: Staff | null;
}

const mockActivitiesByStaff: Record<string, StaffActivity[]> = {
  'Dr. Zatul Alwani (Me)': [
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
  ],
  'Dr. Aisyah Rahman': [
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
  ],
  'Prof. Muhammad Ali': [
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
      id: 'act-5',
      staffName: 'Prof. Muhammad Ali',
      title: 'Distributed Systems Performance Analysis',
      type: 'Research',
      hoursSpent: 150,
      mode: 'Hybrid',
      date: new Date('2026-02-28'),
    },
  ],
};

export function StaffContextCard({ staff }: StaffContextCardProps) {
  if (!staff || staff.name.includes('(Me)')) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="text-center text-gray-500 text-sm">
          Select a lecturer to view their activity context
        </div>
      </div>
    );
  }

  const activities = mockActivitiesByStaff[staff.name] || [];
  const recentActivities = activities.slice(0, 3);
  const totalHours = recentActivities.reduce((sum, act) => sum + act.hoursSpent, 0);

  const getTypeIcon = (type: StaffActivity['type']) => {
    if (type === 'Research') return Award;
    if (type === 'Grant') return Briefcase;
    return Clock;
  };

  const getTypeBadge = (type: StaffActivity['type']) => {
    const styles = {
      Research: 'bg-blue-100 text-blue-700 border-blue-200',
      Grant: 'bg-purple-100 text-purple-700 border-purple-200',
      Service: 'bg-green-100 text-green-700 border-green-200',
    };
    return styles[type];
  };

  return (
    <div className="bg-white border border-[#c5c5c5] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Staff Context</h3>
        {totalHours > 0 && (
          <Badge variant="secondary" className="text-xs">
            {totalHours} hours (non-teaching)
          </Badge>
        )}
      </div>

      {recentActivities.length > 0 ? (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 mb-3">
            Recent activities (not counted in 15-credit limit):
          </p>
          {recentActivities.map((activity) => {
            const Icon = getTypeIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start gap-2 mb-2">
                  <Icon className="w-4 h-4 text-[#900021] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 line-clamp-2">
                      {activity.title}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={`${getTypeBadge(activity.type)} text-xs`}>
                    {activity.type}
                  </Badge>
                  <span className="text-xs text-gray-500">{activity.hoursSpent}h</span>
                </div>
              </div>
            );
          })}

          {totalHours >= 200 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
              <p className="text-xs text-yellow-800">
                <strong>High workload:</strong> {totalHours}+ hours in non-teaching activities.
                Consider this when assigning courses.
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">
          No recent research, grants, or service activities recorded.
        </p>
      )}
    </div>
  );
}

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { StaffActivity } from '../types';

const initialActivities: StaffActivity[] = [
  {
    id: 'my-1',
    staffName: 'Dr. Zatul Alwani',
    title: 'Deep Learning for Software Engineering Research',
    type: 'Research',
    hoursSpent: 120,
    mode: 'Hybrid',
    date: new Date('2026-03-15'),
  },
  {
    id: 'my-2',
    staffName: 'Dr. Zatul Alwani',
    title: 'Ministry of Higher Education Grant Application',
    type: 'Grant',
    hoursSpent: 80,
    mode: 'Hybrid',
    date: new Date('2026-04-10'),
  },
  {
    id: 'my-3',
    staffName: 'Dr. Zatul Alwani',
    title: 'Kuala Lumpur Tech Outreach',
    type: 'Service',
    hoursSpent: 15,
    mode: 'Hybrid',
    date: new Date('2026-04-25'),
  },
];

interface ActivityContextValue {
  activities: StaffActivity[];
  addActivity: (activity: Omit<StaffActivity, 'id' | 'staffName'>) => void;
  updateActivity: (id: string, activity: Omit<StaffActivity, 'id' | 'staffName'>) => void;
  deleteActivity: (id: string) => void;
}

const ActivityContext = createContext<ActivityContextValue | null>(null);

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<StaffActivity[]>(initialActivities);

  const addActivity = (data: Omit<StaffActivity, 'id' | 'staffName'>) => {
    setActivities(prev => [
      { ...data, id: `act-${Date.now()}`, staffName: 'Dr. Zatul Alwani' },
      ...prev,
    ]);
  };

  const updateActivity = (id: string, data: Omit<StaffActivity, 'id' | 'staffName'>) => {
    setActivities(prev =>
      prev.map(a => (a.id === id ? { ...data, id, staffName: 'Dr. Zatul Alwani' } : a))
    );
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity, updateActivity, deleteActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivityContext() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error('useActivityContext must be used within ActivityProvider');
  return ctx;
}

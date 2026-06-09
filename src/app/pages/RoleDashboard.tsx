import { useAuth } from '../contexts/AuthContext';
import { CoordinatorDashboard } from './CoordinatorDashboard';
import { LecturerDashboard } from './LecturerDashboard';
import { LecturerOnLeaveDashboard } from './LecturerOnLeaveDashboard';

export function RoleDashboard() {
  const { user } = useAuth();

  if (user?.role === 'coordinator') {
    return <CoordinatorDashboard />;
  }

  if (user?.role === 'onleave') {
    return <LecturerOnLeaveDashboard />;
  }

  return <LecturerDashboard />;
}

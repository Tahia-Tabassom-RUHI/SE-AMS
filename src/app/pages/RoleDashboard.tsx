import { useAuth } from '../contexts/AuthContext';
import { CoordinatorDashboard } from './CoordinatorDashboard';
import { LecturerDashboard } from './LecturerDashboard';
// LecturerOnLeaveDashboard removed from flows; on-leave is a lecturer status handled inside LecturerDashboard and other pages.
export function RoleDashboard() {
  const { user } = useAuth();

  if (user?.role === 'coordinator') {
    return <CoordinatorDashboard />;
  }

  return <LecturerDashboard />;
}

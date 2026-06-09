import { LayoutDashboard, UserPlus, Activity, Users, Beaker, Inbox, BookOpen, Download, GraduationCap, ShieldCheck, Library } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function UnifiedSystemSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const isCoordinator = user?.role === 'coordinator';

  const coordinatorItems = [
    { id: 'dashboard', path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'queue', path: '/queue', icon: Inbox, label: 'My Queue' },
    { id: 'my-courses', path: '/my-courses', icon: GraduationCap, label: 'My Courses' },
    { id: 'my-activity', path: '/my-activity', icon: Activity, label: 'My Activity Tracker' },
    { id: 'course-moderator', path: '/course-moderator', icon: BookOpen, label: 'Course & Moderator Manager' },
    { id: 'segmentation', path: '/segmentation', icon: Users, label: 'Student Segmentation' },
    { id: 'lab-planner', path: '/lab-planner', icon: Beaker, label: 'Lab Resource Planner' },
    { id: 'course-catalog', path: '/course-catalog', icon: Library, label: 'Course Catalog' },
    { id: 'assignment', path: '/assignment', icon: UserPlus, label: 'Assignment Tool' },
    { id: 'system-audit', path: '/system-audit', icon: ShieldCheck, label: 'System Audit' },
    { id: 'export-reports', path: '/export-reports', icon: Download, label: 'Export Reports' },
  ];

  const lecturerItems = [
    { id: 'dashboard', path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'queue', path: '/queue', icon: Inbox, label: 'My Queue' },
    { id: 'my-courses', path: '/my-courses', icon: GraduationCap, label: 'My Courses' },
    { id: 'my-activity', path: '/my-activity', icon: Activity, label: 'My Activity Tracker' },
  ];

  const visibleItems = isCoordinator ? coordinatorItems : lecturerItems;


  return (
    <aside className="w-64 bg-white border-r border-[#c5c5c5] py-4">
      <nav className="space-y-0.5 px-3">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5 rounded transition-all text-left text-sm
                ${isActive
                  ? 'bg-[#FFF0F3] text-[#900021] font-semibold relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#900021] before:rounded-l'
                  : 'text-[#333333] hover:bg-[#F4F4F4] font-medium'
                }
              `}
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" style={{ color: isActive ? '#900021' : '#696969' }} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

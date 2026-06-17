import { LayoutDashboard, UserPlus, Activity, Users, Beaker, Inbox, BookOpen, Download, GraduationCap, ShieldCheck, Library } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import utmLogo from '@/imports/logo-512x512-1-1.jpg';

interface UnifiedSystemSidebarProps {
  drawerOpen?: boolean;
  onDrawerClose?: () => void;
}

export function UnifiedSystemSidebar({ drawerOpen = false, onDrawerClose }: UnifiedSystemSidebarProps) {
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

  const NavItems = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="space-y-0.5 px-3">
      {visibleItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');

        return (
          <Link
            key={item.id}
            to={item.path}
            onClick={onNavigate}
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
  );

  return (
    <>
      {/* Permanent sidebar — desktop lg+ */}
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-white border-r border-[#c5c5c5] py-4 overflow-y-auto">
        <NavItems />
      </aside>

      {/* Mobile/tablet drawer — below lg */}
      <Sheet open={drawerOpen} onOpenChange={(open) => { if (!open) onDrawerClose?.(); }}>
        <SheetContent side="left" className="w-72 p-0 flex flex-col">
          <SheetHeader className="px-4 py-4 border-b border-[#c5c5c5] flex-shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={utmLogo}
                alt="UTM emblem"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <SheetTitle className="text-sm font-bold text-[#900021] leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                SE-AMS
              </SheetTitle>
            </div>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto py-3">
            <NavItems onNavigate={onDrawerClose} />
          </div>
          <div className="px-4 py-3 border-t border-[#c5c5c5] flex-shrink-0">
            <p className="text-xs text-gray-500">SE Academic Management System</p>
            <p className="text-xs text-gray-400">MJIIT · Universiti Teknologi Malaysia</p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

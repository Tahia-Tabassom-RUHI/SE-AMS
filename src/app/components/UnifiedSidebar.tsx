import { LayoutDashboard, BookOpen, UserPlus, Activity, Inbox, BarChart3 } from 'lucide-react';

interface UnifiedSidebarProps {
  activeView: 'dashboard' | 'courses' | 'assignment' | 'activity' | 'queue' | 'reports';
  onViewChange: (view: string) => void;
}

export function UnifiedSidebar({ activeView, onViewChange }: UnifiedSidebarProps) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', description: 'Department overview' },
    { id: 'courses', icon: BookOpen, label: 'Course Offerings', description: 'All sections' },
    { id: 'assignment', icon: UserPlus, label: 'Assignment Tool', description: 'Assign courses' },
    { id: 'activity', icon: Activity, label: 'Activity Tracker', description: 'Monitor requests' },
    { id: 'queue', icon: Inbox, label: 'My Pending Queue', description: 'Your assignments' },
    { id: 'reports', icon: BarChart3, label: 'Reports & Analytics', description: 'Insights' },
  ];

  return (
    <aside className="w-64 bg-[#F4F4F4] border-r border-[#c5c5c5] py-6">
      <nav className="space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left
                ${isActive
                  ? 'bg-[#FFF0F3] text-[#900021] font-medium relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#900021] before:rounded-l-lg'
                  : 'text-gray-700 hover:bg-white'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{item.label}</div>
                <div className="text-xs text-gray-500 truncate">{item.description}</div>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

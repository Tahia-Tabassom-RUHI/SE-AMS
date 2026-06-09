import { UserPlus, Activity, BookOpen, Beaker, Inbox, Briefcase, LayoutDashboard } from 'lucide-react';

interface CategorizedSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function CategorizedSidebar({ activeView, onViewChange }: CategorizedSidebarProps) {
  const managementItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'assignment', icon: UserPlus, label: 'Assignment Tool' },
    { id: 'activity', icon: Activity, label: 'Activity Tracker' },
    { id: 'courses', icon: BookOpen, label: 'Course/Moderator Manager' },
    { id: 'lab', icon: Beaker, label: 'Lab Planner' },
  ];

  const personalItems = [
    { id: 'queue', icon: Inbox, label: 'My Pending Queue' },
    { id: 'research', icon: Briefcase, label: 'My Research Portfolio' },
  ];

  const renderNavItem = (item: typeof managementItems[0]) => {
    const Icon = item.icon;
    const isActive = activeView === item.id;

    return (
      <button
        key={item.id}
        onClick={() => onViewChange(item.id)}
        className={`
          w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left text-sm
          ${isActive
            ? 'bg-[#FFF0F3] text-[#900021] font-semibold relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#900021] before:rounded-l-lg'
            : 'text-gray-700 hover:bg-white font-medium'
          }
        `}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-64 bg-[#F4F4F4] border-r border-[#c5c5c5] py-6">
      <nav className="space-y-6 px-3">
        {/* Management Section */}
        <div>
          <div className="px-4 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Management
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Coordinator Role</p>
          </div>
          <div className="space-y-1">
            {managementItems.map(renderNavItem)}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mx-4"></div>

        {/* Personal Section */}
        <div>
          <div className="px-4 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Personal
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Lecturer Role</p>
          </div>
          <div className="space-y-1">
            {personalItems.map(renderNavItem)}
          </div>
        </div>
      </nav>
    </aside>
  );
}

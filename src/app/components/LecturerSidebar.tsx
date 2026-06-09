import { LayoutDashboard, BookOpen, Inbox, Activity, User } from 'lucide-react';

export function LecturerSidebar() {
  return (
    <aside className="w-60 bg-[#F4F4F4] border-r border-[#c5c5c5] py-6">
      <nav className="space-y-1 px-3">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-white rounded-lg transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-sm">Dashboard</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-white rounded-lg transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-sm">Course List</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#900021] before:rounded-l-lg"
        >
          <Inbox className="w-5 h-5" />
          <span className="text-sm">My Queue</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-white rounded-lg transition-colors"
        >
          <Activity className="w-5 h-5" />
          <span className="text-sm">Activity Tracker</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-white rounded-lg transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-sm">Profile</span>
        </a>
      </nav>
    </aside>
  );
}

import { LayoutDashboard, BookOpen, Users, FileText } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-[#c5c5c5] p-6">
      <div className="mb-8">
        <h2 className="font-semibold text-xl">Teaching Load System</h2>
      </div>

      <nav className="space-y-2">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          Course List
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
        >
          <Users className="w-5 h-5" />
          Staff Workload
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FileText className="w-5 h-5" />
          Reports
        </a>
      </nav>
    </aside>
  );
}

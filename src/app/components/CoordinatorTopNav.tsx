import { Search, Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface CoordinatorTopNavProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
}

export function CoordinatorTopNav({
  userName = 'Dr. Zatul Alwani',
  userRole = 'Coordinator/Lecturer',
  notificationCount = 2
}: CoordinatorTopNavProps) {
  return (
    <header className="h-16 bg-white border-b border-[#c5c5c5] px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left Side - Logo/System Name */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#900021] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SE</span>
          </div>
          <h1 className="font-bold text-lg text-[#900021]">
            SE Academic Management System
          </h1>
        </div>

        {/* Global Search */}
        <div className="relative ml-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search courses or staff..."
            className="pl-10 w-80 h-9 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Right Side - Notifications & User Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
            <div className="text-right">
              <div className="font-medium text-sm text-gray-700">{userName}</div>
              <div className="text-xs text-gray-500">{userRole}</div>
            </div>
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-[#900021] text-white text-sm">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

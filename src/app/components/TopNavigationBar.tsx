import { Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface TopNavigationBarProps {
  userName?: string;
  hasNotifications?: boolean;
}

export function TopNavigationBar({
  userName = 'Dr. Aisyah Rahman',
  hasNotifications = true
}: TopNavigationBarProps) {
  return (
    <header className="h-16 bg-white border-b border-[#c5c5c5] px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left Side - Logo/System Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#900021] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">SE</span>
        </div>
        <h1 className="font-semibold text-lg text-[#900021]">
          SE Academic Management System
        </h1>
      </div>

      {/* Right Side - Notifications & User Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          {hasNotifications && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-[#900021] text-white text-sm">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm text-gray-700">{userName}</span>
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

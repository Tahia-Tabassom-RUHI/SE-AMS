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

interface ProfessionalTopNavProps {
  userName?: string;
  notificationCount?: number;
  onSearch?: (query: string) => void;
}

export function ProfessionalTopNav({
  userName = 'Dr. Zatul Alwani',
  notificationCount = 2,
  onSearch
}: ProfessionalTopNavProps) {
  return (
    <header className="h-16 bg-white border-b border-[#c5c5c5] px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Left Side - Logo/System Name */}
      <div className="flex items-center gap-3 w-80">
        <div className="w-9 h-9 bg-[#900021] rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl">SE</span>
        </div>
        <h1 className="font-bold text-base text-[#900021] whitespace-nowrap">
          SE Academic Management System
        </h1>
      </div>

      {/* Center - Global Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search course codes (e.g., SCSE2243) or lecturer names..."
            className="pl-11 h-10 bg-gray-50 border-gray-200 rounded-full shadow-sm focus:shadow-md transition-shadow"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>

      {/* Right Side - Notifications & User Profile */}
      <div className="flex items-center gap-4 w-80 justify-end">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-[#900021] text-white text-sm font-semibold">
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

import { Bell, ChevronDown, LogOut } from 'lucide-react';
import utmLogo from '@/imports/logo-512x512-1-1.jpg';
import { useNavigate } from 'react-router';
import { useAuth, UserRole, StaffStatus } from '../contexts/AuthContext';
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

interface UnifiedTopNavProps {
  notificationCount?: number;
}

export function UnifiedTopNav({ notificationCount = 3 }: UnifiedTopNavProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = () => {
    if (!user) return 'U';
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  const getRoleBadge = () => {
    if (!user) return null;
    const configs: Record<UserRole, { className: string; label: string }> = {
      coordinator: { className: 'bg-[#5C001F] border-[#5C001F] text-white', label: 'Coordinator' },
      lecturer: { className: 'bg-[#10B981] border-[#10B981] text-white', label: 'Lecturer' },
    };
    const config = configs[user.role] ?? configs['lecturer'];
    return (
      <Badge className={`${config.className} text-xs ml-2`}>
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = () => {
    if (!user?.status) return null;
    const configs: Record<StaffStatus, { className: string; label: string }> = {
      onleave: { className: 'bg-amber-400 border-amber-400 text-amber-900', label: 'On Leave' },
      adjunct: { className: 'bg-sky-100 border-sky-200 text-sky-900', label: 'Adjunct' },
      seconded: { className: 'bg-violet-100 border-violet-200 text-violet-900', label: 'Seconded' },
      null: { className: '', label: '' },
    };
    const config = configs[user.status];
    return config.label ? (
      <Badge className={`${config.className} text-xs ml-2`}>
        {config.label}
      </Badge>
    ) : null;
  };

  return (
    <header className="sticky top-0 z-50 flex flex-col">
      {/* Top bar: logo area (light) + maroon nav bar */}
      <div className="flex h-16">
        {/* Logo area — matches sidebar width */}
        <div className="w-64 flex-shrink-0 bg-[#F4F4F4] flex items-center pl-4 pr-10 relative">
          <div className="flex items-center gap-[10px]">
            {/* FIX 1: circular crop, 44×44 */}
            <img
              src={utmLogo}
              alt="UTM emblem"
              className="flex-shrink-0 object-cover rounded-full"
              style={{ width: 44, height: 44 }}
            />
            {/* FIX 2: larger white text, Poppins Bold, two lines */}
            <div className="leading-tight">
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.5px', color: '#900021', textTransform: 'uppercase', margin: 0 }}>
                Universiti Teknologi
              </p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.5px', color: '#900021', textTransform: 'uppercase', margin: 0 }}>
                Malaysia
              </p>
            </div>
          </div>
          {/* FIX 3: diagonal slant — maroon triangle covers right edge, content stays left of it */}
          <div
            className="absolute right-0 top-0 h-full w-10"
            style={{
              background: '#900021',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />
        </div>

        {/* Maroon navigation bar */}
        <div className="flex-1 bg-[#900021] flex items-center justify-end px-6">
          <div className="flex items-center gap-4">
            <button className="relative p-1.5 hover:bg-white/10 rounded transition-colors">
              <Bell className="w-5 h-5 text-white" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#F59E0B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition-colors">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="bg-[#5C001F] text-white text-xs font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <span className="text-white text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {user ? `${user.firstName} ${user.lastName}` : 'User'}
                  </span>
                  {getRoleBadge()}
                  {getStatusBadge()}
                </div>
                <ChevronDown className="w-4 h-4 text-white/70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user ? `${user.firstName} ${user.lastName}` : 'User'}</span>
                    <span className="text-xs text-[#696969] font-normal">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuItem>Help & Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* FIX 4: site name bar — 28px tall, text aligned to sidebar left edge */}
      <div className="bg-[#5C001F] flex items-center" style={{ height: 28 }}>
        <span className="text-white" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 13, paddingLeft: 16 }}>
          SE Academic Management System — MJIIT
        </span>
      </div>
    </header>
  );
}

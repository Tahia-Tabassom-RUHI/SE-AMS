import { useState } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from './ui/sonner';
import { UnifiedTopNav } from './UnifiedTopNav';
import { UnifiedSystemSidebar } from './UnifiedSystemSidebar';
import { TooltipProvider } from './ui/tooltip';
import { ActivityProvider } from '../contexts/ActivityContext';
import { AppDataProvider } from '../contexts/AppDataContext';

export function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppDataProvider>
    <ActivityProvider>
    <TooltipProvider>
      <Toaster />
      <div className="flex flex-col h-screen bg-[#F4F4F4]">
        <UnifiedTopNav onMenuClick={() => setDrawerOpen(true)} />

        <div className="flex flex-1 overflow-hidden">
          <UnifiedSystemSidebar
            drawerOpen={drawerOpen}
            onDrawerClose={() => setDrawerOpen(false)}
          />

          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
    </ActivityProvider>
    </AppDataProvider>
  );
}

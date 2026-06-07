import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

/**
 * Root layout component wrapping all pages with header, sidebar, and content area.
 */
export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background">
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <div className="flex">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-auto">
            <div className="container max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

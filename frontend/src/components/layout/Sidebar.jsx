import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, PenSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const iconMap = {
  LayoutDashboard,
  FileText,
  PenSquare,
};

const navItems = [
  { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
  { label: 'All Posts', path: '/posts', icon: 'FileText' },
  { label: 'Create Post', path: '/posts/new', icon: 'PenSquare' },
];

/**
 * Sidebar navigation with responsive overlay on mobile.
 * @param {object} props
 * @param {boolean} props.isOpen - Whether sidebar is visible on mobile
 * @param {function} props.onClose - Callback to close mobile sidebar
 */
export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:sticky md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Close button - mobile only */}
          <div className="flex items-center justify-end p-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </p>
            {navItems.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group',
                      isActive
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )
                  }
                >
                  {Icon && (
                    <Icon className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  )}
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <Separator />

          {/* Footer */}
          <div className="p-4">
            <div className="rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 p-4">
              <p className="text-sm font-medium mb-1">BlogFlow v1.0</p>
              <p className="text-xs text-muted-foreground">
                Premium blog management
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

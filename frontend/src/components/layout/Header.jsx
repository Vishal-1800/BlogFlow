import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Moon, Sun, PenSquare, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * Application header with logo, theme toggle, and quick actions.
 * @param {object} props
 * @param {function} props.onToggleSidebar - Callback to toggle mobile sidebar
 */
export function Header({ onToggleSidebar }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
              <span className="text-sm font-bold text-white">B</span>
            </div>
            <span className="hidden sm:inline-block text-lg font-bold tracking-tight">
              Blog<span className="gradient-text">Flow</span>
            </span>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-lg"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>

          <Link to="/posts/new">
            <Button size="sm" className="hidden sm:flex gap-1.5">
              <PenSquare className="h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

/**
 * Application-wide constants.
 */

/** Available blog post categories */
export const CATEGORIES = [
  'Technology',
  'Design',
  'Development',
  'Business',
  'Lifestyle',
  'Science',
];

/** Post status options */
export const STATUSES = [
  { value: 'Published', label: 'Published' },
  { value: 'Draft', label: 'Draft' },
];

/** Items per page options for pagination */
export const PAGE_SIZES = [5, 10, 20, 50];

/** Default pagination settings */
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

/** Category color mapping for badges and icons */
export const CATEGORY_COLORS = {
  Technology: 'bg-blue-500/15 text-blue-500 dark:text-blue-400',
  Design: 'bg-pink-500/15 text-pink-500 dark:text-pink-400',
  Development: 'bg-violet-500/15 text-violet-500 dark:text-violet-400',
  Business: 'bg-amber-500/15 text-amber-500 dark:text-amber-400',
  Lifestyle: 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400',
  Science: 'bg-cyan-500/15 text-cyan-500 dark:text-cyan-400',
};

/** Category icons (Lucide icon names) */
export const CATEGORY_ICONS = {
  Technology: 'Cpu',
  Design: 'Palette',
  Development: 'Code2',
  Business: 'TrendingUp',
  Lifestyle: 'Heart',
  Science: 'Atom',
};

/** Navigation links */
export const NAV_LINKS = [
  { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
  { label: 'All Posts', path: '/posts', icon: 'FileText' },
  { label: 'Create Post', path: '/posts/new', icon: 'PenSquare' },
];

/** Query keys for TanStack Query */
export const QUERY_KEYS = {
  posts: 'posts',
  post: 'post',
  stats: 'stats',
  search: 'search',
};

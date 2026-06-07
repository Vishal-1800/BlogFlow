import { Badge } from '@/components/ui/badge';

/**
 * Displays a post status as a styled badge.
 * @param {object} props
 * @param {string} props.status - The status value ('Published' or 'Draft')
 */
export function StatusBadge({ status }) {
  const normalized = (status || '').toLowerCase();
  const variant = normalized === 'published' ? 'success' : 'warning';
  const label = normalized === 'published' ? 'Published' : 'Draft';

  return (
    <Badge variant={variant} className="capitalize">
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </Badge>
  );
}

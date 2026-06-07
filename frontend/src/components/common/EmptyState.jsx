import { FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * Empty state placeholder with icon, message, and optional CTA.
 * @param {object} props
 * @param {string} [props.title='No posts found'] - Title text
 * @param {string} [props.description] - Description text
 * @param {string} [props.actionLabel] - CTA button label
 * @param {string} [props.actionHref] - CTA link destination
 * @param {React.ReactNode} [props.icon] - Custom icon
 */
export function EmptyState({
  title = 'No posts found',
  description = "It looks like there aren't any posts here yet. Create your first post to get started!",
  actionLabel = 'Create New Post',
  actionHref = '/posts/new',
  icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted/50 mb-6">
        {icon || <FileX className="h-10 w-10 text-muted-foreground/50" />}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link to={actionHref}>
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Page header with title, description, and optional breadcrumbs.
 * @param {object} props
 * @param {string} props.title - Page title
 * @param {string} [props.description] - Subtitle or description
 * @param {Array<{label: string, href?: string}>} [props.breadcrumbs] - Breadcrumb trail
 * @param {React.ReactNode} [props.actions] - Action buttons to display on the right
 */
export function PageHeader({ title, description, breadcrumbs, actions }) {
  return (
    <div className="mb-8 animate-fade-in">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
              {crumb.href ? (
                <Link
                  to={crumb.href}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title and actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

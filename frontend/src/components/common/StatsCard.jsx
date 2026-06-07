import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Statistics card for dashboard and list page metrics.
 * @param {object} props
 * @param {string} props.title - Metric label
 * @param {string|number} props.value - Metric value
 * @param {React.ReactNode} props.icon - Icon component
 * @param {string} [props.description] - Optional description
 * @param {string} [props.trend] - Trend indicator text
 * @param {string} [props.className] - Additional CSS classes
 */
export function StatsCard({ title, value, icon, description, trend, className }) {
  return (
    <Card
      className={cn(
        'glass gradient-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300',
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <p className="text-xs text-emerald-500 font-medium">{trend}</p>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

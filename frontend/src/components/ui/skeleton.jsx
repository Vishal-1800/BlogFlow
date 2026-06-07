import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * A skeleton placeholder for loading states.
 * @param {object} props
 * @param {string} [props.className] - Additional CSS classes
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

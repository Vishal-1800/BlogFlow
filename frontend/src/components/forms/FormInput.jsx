import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/**
 * Form input field with label and error display.
 * Uses forwardRef to pass React Hook Form's register ref to the input.
 * @param {object} props
 * @param {string} props.label - Field label
 * @param {string} [props.error] - Error message
 * @param {string} [props.description] - Help text
 * @param {boolean} [props.required] - Whether field is required
 * @param {string} [props.className] - Wrapper class
 */
export const FormInput = React.forwardRef(function FormInput(
  { label, error, description, required, className, ...props },
  ref
) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={props.id || props.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={props.id || props.name}
        className={cn(error && 'border-destructive focus-visible:ring-destructive')}
        ref={ref}
        {...props}
      />
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs text-destructive font-medium animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
});

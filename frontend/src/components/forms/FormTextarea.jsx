import * as React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/**
 * Form textarea field with label and error display.
 * Uses forwardRef to pass React Hook Form's register ref to the textarea.
 * @param {object} props
 * @param {string} props.label - Field label
 * @param {string} [props.error] - Error message
 * @param {string} [props.description] - Help text
 * @param {boolean} [props.required] - Whether field is required
 * @param {string} [props.className] - Wrapper class
 */
export const FormTextarea = React.forwardRef(function FormTextarea(
  { label, error, description, required, className, ...props },
  ref
) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={props.id || props.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
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

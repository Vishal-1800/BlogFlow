import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/**
 * Form select dropdown with label and error display.
 * @param {object} props
 * @param {string} props.label - Field label
 * @param {Array<{value: string, label: string}>} props.options - Select options
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.error] - Error message
 * @param {boolean} [props.required] - Whether field is required
 * @param {string} [props.value] - Current selected value
 * @param {function} props.onValueChange - Value change handler
 * @param {string} [props.className] - Wrapper class
 */
export function FormSelect({
  label,
  options,
  placeholder = 'Select an option',
  error,
  required,
  value,
  onValueChange,
  className,
  name,
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={name}
          className={cn(error && 'border-destructive focus:ring-destructive')}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-xs text-destructive font-medium animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}

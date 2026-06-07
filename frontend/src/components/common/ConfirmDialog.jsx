import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

/**
 * Confirmation dialog for destructive actions.
 * @param {object} props
 * @param {boolean} props.open - Whether dialog is open
 * @param {function} props.onOpenChange - Callback when open state changes
 * @param {string} [props.title='Are you sure?'] - Dialog title
 * @param {string} [props.description] - Description text
 * @param {function} props.onConfirm - Callback on confirm
 * @param {boolean} [props.isLoading] - Whether confirm action is in progress
 * @param {string} [props.confirmText='Delete'] - Confirm button text
 * @param {'destructive'|'default'} [props.variant='destructive'] - Confirm button variant
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title = 'Are you sure?',
  description = 'This action cannot be undone. This will permanently delete this item.',
  onConfirm,
  isLoading = false,
  confirmText = 'Delete',
  variant = 'destructive',
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="mt-1">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant={variant}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

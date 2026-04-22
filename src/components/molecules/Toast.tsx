import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'error';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
}

export function Toast({ message, variant = 'success' }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center',
      )}
    >
      <div
        className={cn(
          'pointer-events-auto rounded-full px-4 py-2 text-sm font-medium text-white shadow-deep',
          variant === 'error' ? 'bg-destructive' : 'bg-warm-900',
        )}
      >
        {message}
      </div>
    </div>
  );
}

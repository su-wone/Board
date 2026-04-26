import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FieldProps {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Field({ label, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-warm-400">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

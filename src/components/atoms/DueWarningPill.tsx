import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DueWarningPillProps {
  children: ReactNode;
  className?: string;
}

export function DueWarningPill({ children, className }: DueWarningPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-2 py-0.5',
        'text-[11px] font-semibold leading-none',
        'bg-semantic-orange/10 text-semantic-orange',
        className,
      )}
    >
      <AlertTriangle className="h-[11px] w-[11px]" strokeWidth={2.5} />
      {children}
    </span>
  );
}

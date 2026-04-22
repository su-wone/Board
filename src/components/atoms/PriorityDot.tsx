import { cn } from '@/lib/utils';
import type { Priority } from '@/types/board';

const PRIORITY_STYLE: Record<Priority, string> = {
  high: 'bg-semantic-orange',
  medium: 'bg-warm-600',
  low: 'bg-newndy-blue-legacy',
};

interface PriorityDotProps {
  priority: Priority;
  className?: string;
}

export function PriorityDot({ priority, className }: PriorityDotProps) {
  return (
    <span
      aria-label={`우선순위 ${priority}`}
      role="img"
      className={cn(
        'inline-block h-[6px] w-[6px] rounded-full',
        PRIORITY_STYLE[priority],
        className,
      )}
    />
  );
}

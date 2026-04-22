import { cn } from '@/lib/utils';
import type { TicketStatus } from '@/types/board';

const STATUS_STYLE: Record<TicketStatus, string> = {
  'TO DO': 'bg-warm-50 text-warm-600',
  'DESIGN IN PROGRESS': 'bg-semantic-orange/10 text-semantic-orange',
  'READY FOR DEV': 'bg-semantic-orange/10 text-semantic-orange',
  'IN PROGRESS': 'bg-newndy-blue/10 text-newndy-blue-active',
  'READY FOR QA': 'bg-badge-blue-bg text-badge-blue-text',
  'READY FOR RELEASE': 'bg-lavender-soft text-lavender-deep',
  DONE: 'bg-semantic-green/10 text-semantic-green',
};

interface StatusPillProps {
  status: TicketStatus;
  className?: string;
}

export function StatusPill({ status, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-sm px-2 py-0.5',
        'text-[11px] font-semibold leading-none',
        STATUS_STYLE[status],
        className,
      )}
    >
      {status}
    </span>
  );
}

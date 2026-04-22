'use client';

import { cn } from '@/lib/utils';
import type { Ticket } from '@/types/board';
import { Avatar } from '../atoms/Avatar';
import { DueWarningPill } from '../atoms/DueWarningPill';
import { EpicPill } from '../atoms/EpicPill';
import { EstimateChip } from '../atoms/EstimateChip';
import { PriorityDot } from '../atoms/PriorityDot';
import { TypeIcon } from '../atoms/TypeIcon';

interface TicketCardProps {
  ticket: Ticket;
  onClick?: (ticket: Ticket) => void;
  className?: string;
}

export function TicketCard({ ticket, onClick, className }: TicketCardProps) {
  const isDone = ticket.status === 'DONE';

  return (
    <button
      type="button"
      data-ticket={ticket.key}
      aria-label={`${ticket.key} ${ticket.title}`}
      onClick={() => onClick?.(ticket)}
      className={cn(
        'flex w-full flex-col gap-2 rounded-lg border border-black/10 bg-white px-3 py-2.5 text-left',
        'shadow-card transition',
        'hover:-translate-y-0.5 hover:shadow-deep',
        'active:scale-[0.99]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <span
        className={cn(
          'text-sm leading-[1.4] text-foreground',
          isDone && 'text-warm-600 line-through',
        )}
      >
        {ticket.title}
      </span>

      {ticket.epic && (
        <EpicPill epic={ticket.epic} className="self-start" />
      )}

      {ticket.dueWarning && (
        <DueWarningPill>{ticket.dueWarning}</DueWarningPill>
      )}

      <div className="mt-0.5 flex items-center gap-2">
        <TypeIcon type={ticket.type} />
        <span className="text-xs font-medium text-warm-600">{ticket.key}</span>
        <div className="flex-1" />
        {ticket.estimate !== undefined && (
          <EstimateChip value={ticket.estimate} />
        )}
        <PriorityDot priority={ticket.priority} />
        <Avatar user={ticket.assignee} size={20} />
      </div>
    </button>
  );
}

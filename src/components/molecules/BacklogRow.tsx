'use client';

import type { KeyboardEvent, ChangeEvent, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import type { Ticket } from '@/types/board';
import { Avatar } from '../atoms/Avatar';
import { EpicPill } from '../atoms/EpicPill';
import { EstimateChip } from '../atoms/EstimateChip';
import { PriorityDot } from '../atoms/PriorityDot';
import { StatusPill } from '../atoms/StatusPill';
import { TypeIcon } from '../atoms/TypeIcon';

interface BacklogRowProps {
  ticket: Ticket;
  selected?: boolean;
  onClick?: (ticket: Ticket) => void;
  onSelectChange?: (id: number, checked: boolean) => void;
  className?: string;
}

export function BacklogRow({
  ticket,
  selected = false,
  onClick,
  onSelectChange,
  className,
}: BacklogRowProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(ticket);
    }
  };

  const handleCheckboxClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSelectChange?.(ticket.id, event.target.checked);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      data-ticket={ticket.key}
      onClick={() => onClick?.(ticket)}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center gap-2.5 border-b border-black/[0.06] px-3 py-2 text-[13px]',
        'cursor-pointer bg-white hover:bg-warm-50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected && 'bg-newndy-blue/5',
        className,
      )}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={handleCheckboxChange}
        onClick={handleCheckboxClick}
        aria-label={`${ticket.key} 선택`}
        className="m-0 accent-newndy-blue"
      />
      <TypeIcon type={ticket.type} />
      <span className="min-w-[92px] font-medium text-warm-600">
        {ticket.key}
      </span>
      <span className="flex-1 truncate text-foreground">{ticket.title}</span>
      {ticket.epic && <EpicPill epic={ticket.epic} />}
      <StatusPill status={ticket.status} />
      {ticket.storyPoint != null && (
        <EstimateChip variant="onGray" value={ticket.storyPoint} />
      )}
      <PriorityDot priority={ticket.priority} />
      <Avatar user={ticket.assignee} size={20} />
    </div>
  );
}

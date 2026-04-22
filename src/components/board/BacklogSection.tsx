'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { BacklogSection as BacklogSectionType, Ticket } from '@/types/board';
import { BacklogRow } from './BacklogRow';
import { useBoardUI } from './use-board-ui';

interface BacklogSectionProps {
  section: BacklogSectionType;
  tickets: Ticket[];
}

const VARIANT_BADGE: Record<
  BacklogSectionType['variant'],
  { label: string; className: string }
> = {
  'active-sprint': {
    label: '활성 스프린트',
    className: 'bg-badge-blue-bg text-badge-blue-text',
  },
  bugs: {
    label: '버그',
    className: 'bg-semantic-orange/10 text-semantic-orange',
  },
  backlog: {
    label: 'Backlog',
    className: 'bg-warm-50 text-warm-600',
  },
};

export function BacklogSection({ section, tickets }: BacklogSectionProps) {
  const [open, setOpen] = useState(true);
  const { openTicket } = useBoardUI();
  const badge = VARIANT_BADGE[section.variant];

  return (
    <div className="mb-4 overflow-hidden rounded-md border border-border bg-background">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-2.5 border-b border-border bg-warm-50 px-3 py-2.5 text-left"
      >
        {open ? (
          <ChevronDown className="size-3" />
        ) : (
          <ChevronRight className="size-3" />
        )}
        <span className="text-sm font-semibold">
          {section.title}
          {section.dateRange && (
            <span className="font-normal">{'  '}{section.dateRange}</span>
          )}
        </span>
        <span className="text-xs text-warm-600">
          ({tickets.length}개의 업무 항목)
        </span>
        <div className="flex-1" />
        {section.estimate != null && (
          <span className="text-xs text-warm-600">
            예상: {section.estimate}
          </span>
        )}
        <span
          className={cn(
            'rounded-sm px-2.5 py-0.5 text-[11px] font-semibold',
            badge.className,
          )}
        >
          {badge.label}
        </span>
      </button>
      {open && (
        <div>
          {tickets.map((ticket) => (
            <BacklogRow
              key={ticket.id}
              ticket={ticket}
              onClick={() => openTicket(ticket)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

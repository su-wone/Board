'use client';

import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { BacklogSection as BacklogSectionType, Ticket } from '@/types/board';
import { BacklogRow } from '../molecules/BacklogRow';
import { useBoardUI } from '@/hooks/use-board-ui';

interface BacklogSectionProps {
  section: BacklogSectionType;
  tickets: Ticket[];
  action?: ReactNode;
}

const VARIANT_BADGE: Record<
  BacklogSectionType['variant'],
  { label: string; className: string }
> = {
  'active-sprint': {
    label: '활성 스프린트',
    className: 'bg-badge-blue-bg text-badge-blue-text',
  },
  'planned-sprint': {
    label: '계획됨',
    className: 'bg-warm-50 text-warm-600',
  },
  backlog: {
    label: 'Backlog',
    className: 'bg-warm-50 text-warm-600',
  },
};

const EMPTY_MESSAGE: Record<BacklogSectionType['variant'], string> = {
  'active-sprint': '스프린트가 비어있습니다',
  'planned-sprint': '스프린트가 비어있습니다',
  backlog: '백로그에 업무가 없습니다',
};

export function BacklogSection({
  section,
  tickets,
  action,
}: BacklogSectionProps) {
  const [open, setOpen] = useState(true);
  const { openTicket, openCreate } = useBoardUI();
  const badge = VARIANT_BADGE[section.variant];

  return (
    <div className="mb-4 overflow-hidden rounded-md border border-border bg-background">
      <div className="flex items-center gap-2.5 border-b border-border bg-warm-50 pl-3 pr-2.5 py-2.5">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex flex-1 items-center gap-2.5 text-left"
        >
          {open ? (
            <ChevronDown className="size-3" />
          ) : (
            <ChevronRight className="size-3" />
          )}
          <span className="text-sm font-semibold">
            {section.title}
            {section.dateRange && (
              <span className="ml-2 font-normal">{section.dateRange}</span>
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
        </button>
        <span
          className={cn(
            'rounded-sm px-2.5 py-0.5 text-[11px] font-semibold',
            badge.className,
          )}
        >
          {badge.label}
        </span>
        {action}
      </div>
      {open && (
        <div>
          {tickets.length === 0 ? (
            <div className="flex items-center justify-between gap-3 px-4 py-4 text-sm text-warm-600">
              <span>{EMPTY_MESSAGE[section.variant]}</span>
              <button
                type="button"
                onClick={openCreate}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-warm-600 hover:bg-warm-200/60"
              >
                <Plus className="size-3" />
                업무 만들기
              </button>
            </div>
          ) : (
            tickets.map((ticket) => (
              <BacklogRow
                key={ticket.id}
                ticket={ticket}
                onClick={() => openTicket(ticket)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import type { Ticket, TicketStatus } from '@/types/board';
import { TicketCard } from './TicketCard';
import { useBoardUI } from '@/hooks/use-board-ui';

interface ColumnProps {
  status: TicketStatus;
  tickets: Ticket[];
}

export function Column({ status, tickets }: ColumnProps) {
  const { openTicket, openCreate } = useBoardUI();

  return (
    <div className="flex min-h-[200px] w-[260px] shrink-0 flex-col gap-2 rounded-[10px] bg-warm-50 p-2.5">
      <div className="flex items-center gap-2 px-1 py-0.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.04em]">
          {status}
        </span>
        <span className="text-xs text-warm-600">{tickets.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onClick={() => openTicket(ticket)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={openCreate}
        className="mt-1 rounded-md px-2 py-1.5 text-left text-[13px] text-warm-600 hover:bg-warm-200/60"
      >
        + 만들기
      </button>
    </div>
  );
}

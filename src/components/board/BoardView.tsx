'use client';

import type { Ticket, TicketStatus } from '@/types/board';
import { Column } from './Column';

interface BoardViewProps {
  tickets: Ticket[];
}

const COLUMN_ORDER: TicketStatus[] = [
  'TO DO',
  'DESIGN IN PROGRESS',
  'READY FOR DEV',
  'IN PROGRESS',
  'READY FOR QA',
  'READY FOR RELEASE',
  'DONE',
];

export function BoardView({ tickets }: BoardViewProps) {
  return (
    <div className="flex min-w-max gap-3 px-6 pb-6 pt-4">
      {COLUMN_ORDER.map((status) => (
        <Column
          key={status}
          status={status}
          tickets={tickets.filter((t) => t.status === status)}
        />
      ))}
    </div>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import { createContext, useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Ticket } from '@/types/board';
import { BoardHeader } from './BoardHeader';
import { CreateIssueModal } from './CreateIssueModal';
import { FilterRow } from './FilterRow';
import { SideNav } from './SideNav';
import { TabBar } from './TabBar';
import { TicketModal } from './TicketModal';
import { TopNav } from './TopNav';

interface BoardUIContextValue {
  openCreate: () => void;
  openTicket: (ticket: Ticket) => void;
  closeTicket: () => void;
}

export const BoardUIContext = createContext<BoardUIContextValue | null>(null);

interface AppShellProps {
  children: ReactNode;
  activeSprintId?: number;
}

export function AppShell({ children, activeSprintId }: AppShellProps) {
  const pathname = usePathname() ?? '/';
  const [creating, setCreating] = useState(false);
  const [openTicket, setOpenTicketState] = useState<Ticket | null>(null);

  const openCreate = useCallback(() => setCreating(true), []);
  const openTicket_ = useCallback(
    (ticket: Ticket) => setOpenTicketState(ticket),
    [],
  );
  const closeTicket = useCallback(() => setOpenTicketState(null), []);

  const value = useMemo<BoardUIContextValue>(
    () => ({ openCreate, openTicket: openTicket_, closeTicket }),
    [openCreate, openTicket_, closeTicket],
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideNav activeItemHref={pathname} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav onCreate={openCreate} />
        <BoardHeader />
        <TabBar activeSprintId={activeSprintId} />
        <FilterRow onCreate={openCreate} />
        <div className="flex-1 overflow-auto">
          <BoardUIContext.Provider value={value}>
            {children}
          </BoardUIContext.Provider>
        </div>
      </div>
      <TicketModal
        ticket={openTicket}
        onOpenChange={(open) => {
          if (!open) setOpenTicketState(null);
        }}
      />
      <CreateIssueModal
        open={creating}
        onOpenChange={setCreating}
        onCreate={(issue) => {
          // TODO: persist via API
          console.log('create issue', issue);
        }}
      />
    </div>
  );
}

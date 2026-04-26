'use client';

import { usePathname } from 'next/navigation';
import { createContext, useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Ticket } from '@/types/board';
import { BoardHeader } from '../organisms/BoardHeader';
import { AICreateIssueModal } from '../organisms/AICreateIssueModal';
import { CreateIssueModal } from '../organisms/CreateIssueModal';
import { FilterRow } from '../molecules/FilterRow';
import { SideNav } from '../organisms/SideNav';
import { TabBar } from '../molecules/TabBar';
import { TicketModal } from '../organisms/TicketModal';
import { TopNav } from '../organisms/TopNav';

interface BoardUIContextValue {
  openCreate: () => void;
  openTicket: (ticket: Ticket) => void;
  closeTicket: () => void;
}

export const BoardUIContext = createContext<BoardUIContextValue | null>(null);

interface AppShellProps {
  children: ReactNode;
  activeSprintId?: number;
  defaultWorkflowId?: number;
  defaultSprintId?: number | null;
}

export function AppShell({
  children,
  activeSprintId,
  defaultWorkflowId,
  defaultSprintId,
}: AppShellProps) {
  const pathname = usePathname() ?? '/';
  const [creating, setCreating] = useState(false);
  const [aiCreating, setAICreating] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const openCreate = useCallback(() => setCreating(true), []);
  const openAICreate = useCallback(() => setAICreating(true), []);
  const openTicket = useCallback(
    (ticket: Ticket) => setSelectedTicket(ticket),
    [],
  );
  const closeTicket = useCallback(() => setSelectedTicket(null), []);

  const value = useMemo<BoardUIContextValue>(
    () => ({
      openCreate,
      openTicket,
      closeTicket,
    }),
    [openCreate, openTicket, closeTicket],
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideNav activeItemHref={pathname} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav onCreate={openCreate} />
        <BoardHeader />
        <TabBar activeSprintId={activeSprintId} />
        <FilterRow onCreate={openCreate} onAICreate={openAICreate} />
        <div className="flex-1 overflow-auto">
          <BoardUIContext.Provider value={value}>
            {children}
          </BoardUIContext.Provider>
        </div>
      </div>
      <TicketModal
        ticket={selectedTicket}
        onOpenChange={(open) => {
          if (!open) setSelectedTicket(null);
        }}
      />
      <CreateIssueModal
        open={creating}
        onOpenChange={setCreating}
        defaultWorkflowId={defaultWorkflowId}
        defaultSprintId={defaultSprintId}
      />
      <AICreateIssueModal
        open={aiCreating}
        onOpenChange={setAICreating}
      />
    </div>
  );
}

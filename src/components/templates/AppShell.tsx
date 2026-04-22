'use client';

import { usePathname } from 'next/navigation';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { Ticket } from '@/types/board';
import { BoardHeader } from '../organisms/BoardHeader';
import { CreateIssueModal } from '../organisms/CreateIssueModal';
import { FilterRow } from '../molecules/FilterRow';
import { SideNav } from '../organisms/SideNav';
import { TabBar } from '../molecules/TabBar';
import { TicketModal } from '../organisms/TicketModal';
import { Toast, type ToastVariant } from '../molecules/Toast';
import { TopNav } from '../organisms/TopNav';

interface BoardUIContextValue {
  openCreate: () => void;
  openTicket: (ticket: Ticket) => void;
  closeTicket: () => void;
  showToast: (message: string, variant?: ToastVariant) => void;
}

export const BoardUIContext = createContext<BoardUIContextValue | null>(null);

interface ToastState {
  id: number;
  message: string;
  variant: ToastVariant;
}

const TOAST_DURATION_MS = 2600;

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
  const [openTicket, setOpenTicketState] = useState<Ticket | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCreate = useCallback(() => setCreating(true), []);
  const openTicketHandler = useCallback(
    (ticket: Ticket) => setOpenTicketState(ticket),
    [],
  );
  const closeTicket = useCallback(() => setOpenTicketState(null), []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      setToast({ id: Date.now(), message, variant });
    },
    [],
  );

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    toastTimerRef.current = timer;
    return () => clearTimeout(timer);
  }, [toast]);

  const value = useMemo<BoardUIContextValue>(
    () => ({
      openCreate,
      openTicket: openTicketHandler,
      closeTicket,
      showToast,
    }),
    [openCreate, openTicketHandler, closeTicket, showToast],
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
        defaultWorkflowId={defaultWorkflowId}
        defaultSprintId={defaultSprintId}
        onToast={showToast}
      />
      {toast && <Toast message={toast.message} variant={toast.variant} />}
    </div>
  );
}

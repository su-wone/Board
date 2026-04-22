import { AppShell } from '@/components/board/AppShell';
import { BacklogView } from '@/components/board/BacklogView';
import { BACKLOG_SECTIONS, TICKETS } from '@/lib/mock/board-mock';

// TODO: replace with server fetch (getSprints / getCards)
export default function Page() {
  return (
    <AppShell>
      <BacklogView sections={BACKLOG_SECTIONS} tickets={TICKETS} />
    </AppShell>
  );
}

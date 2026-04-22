import { notFound } from 'next/navigation';
import { AppShell } from '@/components/board/AppShell';
import { BoardView } from '@/components/board/BoardView';
import { getCards } from '@/lib/api/cards';
import { getSprints } from '@/lib/api/sprints';

export default async function Page() {
  const [sprints, cards] = await Promise.all([getSprints(), getCards()]);
  const active = sprints.find((s) => s.isActive) ?? sprints[0];
  if (!active) notFound();
  const tickets = cards.filter((t) => t.sprintId === active.id);

  return (
    <AppShell activeSprintId={active.id}>
      <BoardView tickets={tickets} />
    </AppShell>
  );
}

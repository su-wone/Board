import { notFound } from 'next/navigation';
import { AppShell } from '@/components/board/AppShell';
import { BoardView } from '@/components/board/BoardView';
import { getCards } from '@/lib/api/cards';
import { getSprint } from '@/lib/api/sprints';

interface Props {
  params: Promise<{ sprintId: string }>;
}

export default async function SprintBoardPage({ params }: Props) {
  const { sprintId } = await params;
  const id = Number(sprintId);
  if (!Number.isInteger(id)) notFound();

  const [sprint, tickets] = await Promise.all([
    getSprint(id).catch(() => null),
    getCards(id),
  ]);
  if (!sprint) notFound();

  return (
    <AppShell activeSprintId={sprint.id}>
      <BoardView tickets={tickets} />
    </AppShell>
  );
}

import { notFound } from 'next/navigation';
import { AppShell } from '@/components/board/AppShell';
import { BoardView } from '@/components/board/BoardView';
import { SPRINTS, TICKETS } from '@/lib/mock/board-mock';

interface Props {
  params: Promise<{ sprintId: string }>;
}

export default async function SprintBoardPage({ params }: Props) {
  const { sprintId } = await params;
  const sprint = SPRINTS.find((s) => s.id === Number(sprintId));
  if (!sprint) notFound();

  const sprintTickets = TICKETS.filter((t) =>
    sprint.ticketIds.includes(t.id),
  );

  return (
    <AppShell>
      <BoardView tickets={sprintTickets} />
    </AppShell>
  );
}

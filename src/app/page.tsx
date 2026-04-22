import { notFound } from 'next/navigation';
import { AppShell } from '@/components/board/AppShell';
import { BoardView } from '@/components/board/BoardView';
import { getCards } from '@/lib/api/cards';
import { getSprints } from '@/lib/api/sprints';
import { getWorkflows } from '@/lib/api/workflows';

export default async function Page() {
  const [sprints, cards, workflows] = await Promise.all([
    getSprints(),
    getCards(),
    getWorkflows(),
  ]);
  const active = sprints.find((s) => s.status === 'active') ?? sprints[0];
  if (!active) notFound();
  const tickets = cards.filter((t) => t.sprintId === active.id);
  const todoWorkflowId = workflows.find((w) => w.title === 'TO DO')?.id;

  return (
    <AppShell
      activeSprintId={active.id}
      defaultWorkflowId={todoWorkflowId}
      defaultSprintId={active.id}
    >
      <BoardView tickets={tickets} />
    </AppShell>
  );
}

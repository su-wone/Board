import { notFound } from 'next/navigation';
import { AppShell } from '@/components/templates/AppShell';
import { BoardView } from '@/components/templates/BoardView';
import { getCards } from '@/lib/api/cards';
import { getSprints } from '@/lib/api/sprints';
import { getWorkflows } from '@/lib/api/workflows';

export default async function Page() {
  const [sprints, workflows] = await Promise.all([
    getSprints(),
    getWorkflows(),
  ]);
  const active = sprints.find((s) => s.status === 'IN_PROGRESS') ?? sprints[0];
  if (!active) notFound();
  const tickets = await getCards(active.id);
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

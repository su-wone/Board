import { notFound } from 'next/navigation';
import { AppShell } from '@/components/board/AppShell';
import { BacklogView } from '@/components/board/BacklogView';
import { getCards } from '@/lib/api/cards';
import { getWorkflows } from '@/lib/api/workflows';
import type { BacklogSection } from '@/types/board';

interface Props {
  params: Promise<{ sprintId: string }>;
}

export default async function SprintBacklogPage({ params }: Props) {
  const { sprintId } = await params;
  const id = Number(sprintId);
  if (!Number.isInteger(id)) notFound();

  const [tickets, workflows] = await Promise.all([
    getCards('null'),
    getWorkflows(),
  ]);
  const todoWorkflowId = workflows.find((w) => w.title === 'TO DO')?.id;

  const sections: BacklogSection[] = [
    {
      id: 'section-backlog',
      title: 'Backlog',
      variant: 'backlog',
      ticketIds: tickets.map((t) => t.id),
    },
  ];

  return (
    <AppShell
      activeSprintId={id}
      defaultWorkflowId={todoWorkflowId}
      defaultSprintId={null}
    >
      <BacklogView sections={sections} tickets={tickets} />
    </AppShell>
  );
}

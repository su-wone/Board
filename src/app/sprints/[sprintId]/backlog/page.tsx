import { notFound } from 'next/navigation';
import { AppShell } from '@/components/board/AppShell';
import { BacklogView } from '@/components/board/BacklogView';
import { getCards } from '@/lib/api/cards';
import type { BacklogSection } from '@/types/board';

interface Props {
  params: Promise<{ sprintId: string }>;
}

export default async function SprintBacklogPage({ params }: Props) {
  const { sprintId } = await params;
  const id = Number(sprintId);
  if (!Number.isInteger(id)) notFound();

  const tickets = await getCards('null');

  const sections: BacklogSection[] = [
    {
      id: 'section-backlog',
      title: 'Backlog',
      variant: 'backlog',
      ticketIds: tickets.map((t) => t.id),
    },
  ];

  return (
    <AppShell activeSprintId={id}>
      <BacklogView sections={sections} tickets={tickets} />
    </AppShell>
  );
}

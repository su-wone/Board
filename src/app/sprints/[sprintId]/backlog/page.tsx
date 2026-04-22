import { notFound } from 'next/navigation';
import { AppShell } from '@/components/board/AppShell';
import { BacklogSection } from '@/components/board/BacklogSection';
import { CreateSprintButton } from '@/components/board/CreateSprintButton';
import { getCards } from '@/lib/api/cards';
import { getEpics } from '@/lib/api/epics';
import { getSprints } from '@/lib/api/sprints';
import { getWorkflows } from '@/lib/api/workflows';
import type {
  BacklogSection as BacklogSectionType,
  Sprint,
  Ticket,
} from '@/types/board';

interface Props {
  params: Promise<{ sprintId: string }>;
}

function sumStoryPoints(tickets: Ticket[]): number {
  return tickets.reduce((sum, t) => sum + (t.storyPoint ?? 0), 0);
}

function compareSprint(a: Sprint, b: Sprint): number {
  const aDate = a.startDate ? Date.parse(a.startDate) : Number.POSITIVE_INFINITY;
  const bDate = b.startDate ? Date.parse(b.startDate) : Number.POSITIVE_INFINITY;
  if (aDate !== bDate) return aDate - bDate;
  return a.id - b.id;
}

function toVariant(status: Sprint['status']): BacklogSectionType['variant'] {
  return status === 'active' ? 'active-sprint' : 'planned-sprint';
}

export default async function SprintBacklogPage({ params }: Props) {
  const { sprintId } = await params;
  const paramId = Number(sprintId);
  if (!Number.isInteger(paramId)) notFound();

  const [sprints, backlogTickets, workflows] = await Promise.all([
    getSprints(),
    getCards('null'),
    getWorkflows(),
    getEpics(),
  ]);

  const visibleSprints = sprints
    .filter((s) => s.status !== 'done')
    .sort(compareSprint);

  const sprintTicketLists = await Promise.all(
    visibleSprints.map((s) => getCards(s.id)),
  );

  const todoWorkflowId = workflows.find((w) => w.title === 'TO DO')?.id;

  return (
    <AppShell
      activeSprintId={paramId}
      defaultWorkflowId={todoWorkflowId}
      defaultSprintId={null}
    >
      <div className="px-6 py-4">
        {visibleSprints.map((sprint, index) => {
          const tickets = sprintTicketLists[index];
          const section: BacklogSectionType = {
            id: `section-sprint-${sprint.id}`,
            title: sprint.name,
            variant: toVariant(sprint.status),
            ticketIds: tickets.map((t) => t.id),
            estimate: sumStoryPoints(tickets),
            dateRange: sprint.dateRange || '날짜 미정',
          };
          const action = (
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="다음 단계에서 연결"
              className="inline-flex h-7 cursor-not-allowed items-center rounded-md border border-border bg-background px-2.5 text-xs font-medium text-warm-600 opacity-60"
            >
              {sprint.status === 'active' ? '스프린트 완료' : '스프린트 시작'}
            </button>
          );
          return (
            <BacklogSection
              key={sprint.id}
              section={section}
              tickets={tickets}
              action={action}
            />
          );
        })}

        <BacklogSection
          section={{
            id: 'section-backlog',
            title: 'Backlog',
            variant: 'backlog',
            ticketIds: backlogTickets.map((t) => t.id),
            estimate: sumStoryPoints(backlogTickets),
          }}
          tickets={backlogTickets}
        />

        <CreateSprintButton />
      </div>
    </AppShell>
  );
}

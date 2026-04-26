import { notFound } from 'next/navigation';
import { AppShell } from '@/components/templates/AppShell';
import { BacklogSection } from '@/components/organisms/BacklogSection';
import { CreateSprintButton } from '@/components/molecules/CreateSprintButton';
import { getCards } from '@/lib/api/cards';
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
  return status === 'IN_PROGRESS' ? 'active-sprint' : 'planned-sprint';
}

const KO_MONTHS = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
];

function formatDateRange(start: string | null, end: string | null): string {
  const fmt = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()}. ${KO_MONTHS[d.getMonth()]}`;
  };
  if (start && end) return `${fmt(start)} – ${fmt(end)}`;
  if (start) return fmt(start);
  if (end) return fmt(end);
  return '날짜 미정';
}

export default async function SprintBacklogPage({ params }: Props) {
  const { sprintId } = await params;
  const paramId = Number(sprintId);
  if (!Number.isInteger(paramId)) notFound();

  const [sprints, backlogTickets, workflows] = await Promise.all([
    getSprints(),
    getCards('null'),
    getWorkflows(),
  ]);

  const visibleSprints = sprints
    .filter((s) => s.status !== 'DONE')
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
            dateRange: formatDateRange(sprint.startDate, sprint.endDate),
          };
          const action = (
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="다음 단계에서 연결"
              className="inline-flex h-7 cursor-not-allowed items-center rounded-md border border-border bg-background px-2.5 text-xs font-medium text-warm-600 opacity-60"
            >
              {sprint.status === 'IN_PROGRESS' ? '스프린트 완료' : '스프린트 시작'}
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

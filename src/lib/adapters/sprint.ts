import type { Sprint, SprintStatus } from '@/types/board';
import type { ServerSprint, ServerSprintStatus } from '@/types/server';

const KO_MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

function formatPart(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()}. ${KO_MONTHS[d.getMonth()]}`;
}

function formatRange(start: string | null, end: string | null): string {
  if (start && end) return `${formatPart(start)} – ${formatPart(end)}`;
  if (start) return formatPart(start);
  if (end) return formatPart(end);
  return '';
}

function mapStatus(status: ServerSprintStatus): SprintStatus {
  switch (status) {
    case 'IN_PROGRESS':
      return 'active';
    case 'DONE':
      return 'done';
    case 'PLANNED':
    default:
      return 'planned';
  }
}

export function toSprint(s: ServerSprint): Sprint {
  return {
    id: s.id,
    name: s.title,
    status: mapStatus(s.status),
    dateRange: formatRange(s.startDate, s.endDate),
    estimate: s.cardCount ?? 0,
    ticketIds: [],
    startDate: s.startDate,
    endDate: s.endDate,
  };
}

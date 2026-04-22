import type { IssueType, Priority, Ticket, TicketStatus } from '@/types/board';
import type { ServerCard, ServerCardType } from '@/types/server';

const KNOWN_STATUSES: readonly TicketStatus[] = [
  'TO DO',
  'DESIGN IN PROGRESS',
  'READY FOR DEV',
  'IN PROGRESS',
  'READY FOR QA',
  'READY FOR RELEASE',
  'DONE',
];

function mapStatus(title: string): TicketStatus {
  if ((KNOWN_STATUSES as readonly string[]).includes(title)) {
    return title as TicketStatus;
  }
  throw new Error(`Unknown workflow title from server: "${title}"`);
}

function mapType(type: ServerCardType): IssueType {
  switch (type) {
    case 'BUG':
      return 'bug';
    case 'STORY':
      return 'story';
    case 'EPIC':
      return 'epic';
    case 'SUB_TASK':
    case 'TASK':
    default:
      return 'task';
  }
}

function mapPriority(p: ServerCard['priority']): Priority {
  return p.toLowerCase() as Priority;
}

export function toTicket(c: ServerCard): Ticket {
  return {
    id: c.id,
    key: c.key,
    title: c.title,
    description: c.description ?? undefined,
    status: mapStatus(c.workflow.title),
    type: mapType(c.type),
    priority: mapPriority(c.priority),
    storyPoint: c.storyPoint,
    dueDate: c.dueDate,
    assignee: c.assignee
      ? {
          id: c.assignee.id,
          name: c.assignee.name,
          initial: c.assignee.name.slice(0, 1).toUpperCase(),
          avatarColor: '#615d59',
        }
      : undefined,
    reporter: c.reporter
      ? {
          id: c.reporter.id,
          name: c.reporter.name,
          initial: c.reporter.name.slice(0, 1).toUpperCase(),
          avatarColor: '#615d59',
        }
      : undefined,
    epic: c.epic
      ? { id: c.epic.id, name: c.epic.name, color: c.epic.color }
      : undefined,
    labels: c.labels.map((l) => ({ id: l.id, name: l.name, color: l.color })),
    workflowId: c.workflowId,
    sprintId: c.sprintId ?? undefined,
  };
}

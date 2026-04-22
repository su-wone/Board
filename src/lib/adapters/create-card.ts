import type { IssueType, Priority } from '@/types/board';
import type { ServerCardPriority, ServerCardType } from '@/types/server';

export interface UICreateInput {
  title: string;
  type: IssueType;
  priority: Priority;
  workflowId: number;
  sprintId: number | null;
  epicId?: number;
}

export interface ServerCreateCardDto {
  title: string;
  workflowId: number;
  sprintId: number | null;
  type: ServerCardType;
  priority: ServerCardPriority;
  epicId?: number;
}

function mapType(t: IssueType): ServerCardType {
  switch (t) {
    case 'bug':
      return 'BUG';
    case 'story':
      return 'STORY';
    case 'epic':
      return 'EPIC';
    case 'task':
    default:
      return 'TASK';
  }
}

function mapPriority(p: Priority): ServerCardPriority {
  return p.toUpperCase() as ServerCardPriority;
}

export function fromCreateTicket(input: UICreateInput): ServerCreateCardDto {
  const dto: ServerCreateCardDto = {
    title: input.title,
    workflowId: input.workflowId,
    sprintId: input.sprintId,
    type: mapType(input.type),
    priority: mapPriority(input.priority),
  };
  if (input.epicId !== undefined) dto.epicId = input.epicId;
  return dto;
}

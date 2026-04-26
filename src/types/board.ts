export type IssueType = 'TASK' | 'BUG' | 'STORY' | 'EPIC' | 'SUB_TASK';
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type TicketStatus =
  | 'TO DO'
  | 'DESIGN IN PROGRESS'
  | 'READY FOR DEV'
  | 'IN PROGRESS'
  | 'READY FOR QA'
  | 'READY FOR RELEASE'
  | 'DONE';

export type EpicColor = string;

export interface User {
  id: number;
  name: string;
}

export interface Epic {
  id: number;
  name: string;
  color: string;
}

export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface Workflow {
  id: number;
  title: string;
}

export interface Ticket {
  id: number;
  key: string;
  title: string;
  type: IssueType;
  status: TicketStatus;
  priority: Priority;
  workflowId: number;
  assignee?: User | null;
  reporter?: User | null;
  epic?: Epic | null;
  labels?: Label[];
  sprintId?: number | null;
  description?: string | null;
  dueDate?: string | null;
  storyPoint?: number | null;
  order?: number;
}

export type SprintStatus = 'PLANNED' | 'IN_PROGRESS' | 'DONE';

export interface Sprint {
  id: number;
  name: string;
  status: SprintStatus;
  startDate: string | null;
  endDate: string | null;
  cardCount: number;
}

export interface BacklogSection {
  id: string;
  title: string;
  variant: 'active-sprint' | 'planned-sprint' | 'backlog';
  ticketIds: number[];
  estimate?: number;
  dateRange?: string;
}

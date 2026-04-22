export type IssueType = 'task' | 'bug' | 'story' | 'epic';
export type Priority = 'high' | 'medium' | 'low';
export type TicketStatus =
  | 'TO DO'
  | 'DESIGN IN PROGRESS'
  | 'READY FOR DEV'
  | 'IN PROGRESS'
  | 'READY FOR QA'
  | 'READY FOR RELEASE'
  | 'DONE';

export type EpicColor = 'lavender' | 'teal' | 'orange' | 'purple' | 'brown';

export interface User {
  id: number;
  name: string;
  initial: string;
  avatarColor: string;
}

export interface Epic {
  id: number;
  name: string;
  color: EpicColor;
}

export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface Ticket {
  id: number;
  key: string;
  title: string;
  type: IssueType;
  status: TicketStatus;
  priority: Priority;
  assignee?: User;
  reporter?: User;
  epic?: Epic;
  estimate?: number;
  dueWarning?: string;
  labels?: Label[];
  workflowId?: number;
  sprintId?: number;
  description?: string;
  dueDate?: string | null;
  storyPoint?: number | null;
}

export interface Sprint {
  id: number;
  name: string;
  dateRange: string;
  estimate: number;
  ticketIds: number[];
  isActive?: boolean;
}

export interface BacklogSection {
  id: string;
  title: string;
  variant: 'active-sprint' | 'bugs' | 'backlog';
  ticketIds: number[];
  estimate?: number;
  dateRange?: string;
}

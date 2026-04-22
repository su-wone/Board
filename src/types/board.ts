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

export interface User {
  id: string;
  name: string;
  initial: string;
  avatarColor: string;
}

export interface Epic {
  id: string;
  name: string;
  color: 'lavender' | 'teal' | 'orange' | 'purple' | 'brown';
}

export interface Ticket {
  id: string;
  title: string;
  type: IssueType;
  status: TicketStatus;
  priority: Priority;
  assignee?: User;
  reporter?: User;
  epic?: Epic;
  estimate?: number;
  dueWarning?: string;
  labels?: string[];
  sprintId?: string;
  description?: string;
}

export interface Sprint {
  id: string;
  name: string;
  dateRange: string;
  estimate: number;
  ticketIds: string[];
  isActive?: boolean;
}

export interface BacklogSection {
  id: string;
  title: string;
  variant: 'active-sprint' | 'bugs' | 'backlog';
  ticketIds: string[];
  estimate?: number;
  dateRange?: string;
}

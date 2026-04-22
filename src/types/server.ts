export type ServerWorkflow = { id: number; title: string };

export type ServerUser = { id: number; name: string };

export type ServerLabel = { id: number; name: string; color: string };

export type ServerEpicColor =
  | 'lavender'
  | 'teal'
  | 'orange'
  | 'purple'
  | 'brown';

export type ServerEpic = {
  id: number;
  name: string;
  color: ServerEpicColor;
};

export type ServerCardType = 'EPIC' | 'STORY' | 'TASK' | 'SUB_TASK' | 'BUG';

export type ServerCardPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export type ServerCardRef = {
  id: number;
  title: string;
  type: ServerCardType;
};

export type ServerCard = {
  id: number;
  key: string;
  title: string;
  description: string | null;
  type: ServerCardType;
  priority: ServerCardPriority;
  workflowId: number;
  workflow: ServerWorkflow;
  sprintId: number | null;
  assignee: ServerUser | null;
  reporter: ServerUser | null;
  dueDate: string | null;
  storyPoint: number | null;
  order: number;
  labels: ServerLabel[];
  epic: ServerEpic | null;
  parent?: ServerCardRef | null;
  children?: ServerCardRef[];
};

export type ServerSprintStatus = 'PLANNED' | 'IN_PROGRESS' | 'DONE';

export type ServerSprint = {
  id: number;
  title: string;
  status: ServerSprintStatus;
  startDate: string | null;
  endDate: string | null;
  goal?: string | null;
  cardCount?: number;
};

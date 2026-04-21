export type CardPriority = "LOW" | "MEDIUM" | "HIGH";
export type CardType = "EPIC" | "STORY" | "TASK" | "SUB_TASK" | "BUG";

export interface Card {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  workflowId: number;
  sprintId: number | null;
  reporterId: number | null;
  parentId: number | null;
  type: CardType;
  title: string;
  description: string | null;
  order: number;
  dueDate: string | null;
  priority: CardPriority;
}

export type CardPriority = "low" | "medium" | "high";

export interface Card {
  id: number;
  key: string; // e.g. "BOARD-12"
  title: string;
  workflowId: number;
  sprintId: number | null;
  priority: CardPriority;
  order: number;
  storyPoint?: number | null;
}

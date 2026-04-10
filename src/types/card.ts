export type CardPriority = "low" | "medium" | "high";
export type CardType = "task" | "story" | "bug";

export interface Card {
  id: number;
  key: string; // e.g. "BOARD-12"
  title: string;
  type: CardType;
  workflowId: number;
  sprintId: number | null;
  priority: CardPriority;
  order: number;
  storyPoint?: number | null;
}

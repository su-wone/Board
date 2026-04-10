export type SprintStatus = "planned" | "active" | "completed";

export interface Sprint {
  id: number;
  title: string;
  status: SprintStatus;
  startDate: string; // ISO
  endDate: string;   // ISO
  cardCount?: number;
}

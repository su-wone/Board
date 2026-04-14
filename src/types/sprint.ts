export type SprintStatus = "PLANNED" | "IN_PROGRESS" | "DONE";

export interface Sprint {
  id: number;
  title: string;
  status: SprintStatus;
  startDate: string | null;
  endDate: string | null;
  cardCount: number;
}

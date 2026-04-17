export type SprintStatus = "PLANNED" | "IN_PROGRESS" | "DONE";

export interface Sprint {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  status: SprintStatus;
  startDate: string | null;
  endDate: string | null;
  cardCount: number;
}

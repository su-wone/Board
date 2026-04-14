import { Sprint } from "@/types/sprint";

export const mockSprints: Sprint[] = [
  {
    id: 1,
    title: "Sprint 1 - 초기 셋업",
    status: "DONE",
    startDate: "2026-03-01T00:00:00.000Z",
    endDate: "2026-03-14T00:00:00.000Z",
    cardCount: 8,
  },
  {
    id: 2,
    title: "Sprint 2 - 인증/유저",
    status: "IN_PROGRESS",
    startDate: "2026-03-15T00:00:00.000Z",
    endDate: "2026-03-28T00:00:00.000Z",
    cardCount: 12,
  },
  {
    id: 3,
    title: "Sprint 3 - 보드 MVP",
    status: "PLANNED",
    startDate: "2026-03-29T00:00:00.000Z",
    endDate: "2026-04-11T00:00:00.000Z",
    cardCount: 6,
  },
];

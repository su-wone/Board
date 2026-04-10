import { create } from "zustand";
import { Card } from "@/types/card";
import { mockCards } from "@/mocks/cards.mock";
import { mockSprints } from "@/mocks/sprints.mock";

const DEFAULT_WORKFLOW_ID = 1; // "To Do"
const BACKLOG_SECTION_ID = "backlog";

export const sprintSectionId = (sprintId: number) => `sprint-${sprintId}`;
export const backlogSectionId = () => BACKLOG_SECTION_ID;

interface AddCardInput {
  title: string;
  sprintId: number | null;
}

interface DashboardStore {
  cards: Card[];
  addCard: (input: AddCardInput) => void;

  collapsedSectionIds: Set<string>;
  toggleSection: (id: string) => void;
}

// 초기 접힘 상태: 모든 섹션을 접은 채로 시작
const initialCollapsed = new Set<string>([
  ...mockSprints.map((s) => sprintSectionId(s.id)),
  backlogSectionId(),
]);

export const useDashboardStore = create<DashboardStore>((set) => ({
  cards: mockCards,
  addCard: ({ title, sprintId }) =>
    set((state) => {
      const nextId = Math.max(0, ...state.cards.map((c) => c.id)) + 1;
      const sameGroup = state.cards.filter(
        (c) => c.sprintId === sprintId && c.workflowId === DEFAULT_WORKFLOW_ID
      );
      const nextOrder = Math.max(0, ...sameGroup.map((c) => c.order)) + 1;

      const newCard: Card = {
        id: nextId,
        key: `BOARD-${nextId}`,
        title,
        type: "story",
        workflowId: DEFAULT_WORKFLOW_ID,
        sprintId,
        priority: "medium",
        order: nextOrder,
      };

      return { cards: [...state.cards, newCard] };
    }),

  collapsedSectionIds: initialCollapsed,
  toggleSection: (id) =>
    set((state) => {
      const next = new Set(state.collapsedSectionIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { collapsedSectionIds: next };
    }),
}));
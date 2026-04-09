import { create } from "zustand";
import { Card } from "@/features/dashboard/types/card";
import { mockCards } from "@/features/dashboard/mocks/cards.mock";

const DEFAULT_WORKFLOW_ID = 1; // "To Do"

interface AddCardInput {
  title: string;
  sprintId: number | null;
}

interface DashboardStore {
  cards: Card[];
  addCard: (input: AddCardInput) => void;
}

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
}));
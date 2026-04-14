import { create } from "zustand";
import { mockSprints } from "@/mocks/sprints.mock";

const BACKLOG_SECTION_ID = "backlog";

export const sprintSectionId = (sprintId: number) => `sprint-${sprintId}`;
export const backlogSectionId = () => BACKLOG_SECTION_ID;

interface DashboardStore {
  collapsedSectionIds: Set<string>;
  toggleSection: (id: string) => void;
}

const initialCollapsed = new Set<string>([
  ...mockSprints.map((s) => sprintSectionId(s.id)),
  backlogSectionId(),
]);

export const useDashboardStore = create<DashboardStore>((set) => ({
  collapsedSectionIds: initialCollapsed,
  toggleSection: (id) =>
    set((state) => {
      const next = new Set(state.collapsedSectionIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { collapsedSectionIds: next };
    }),
}));

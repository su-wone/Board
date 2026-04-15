import { create } from "zustand";

export const sprintSectionId = (sprintId: number) => `sprint-${sprintId}`;
export const backlogSectionId = () => "backlog";

interface DashboardStore {
  collapsedSectionIds: Set<string>;
  toggleSection: (id: string) => void;
}

const initialCollapsed = new Set<string>([backlogSectionId()]);

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

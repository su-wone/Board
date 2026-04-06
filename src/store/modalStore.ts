import { create } from "zustand";
import { Memo } from "@/types/memo";

interface ModalState {
  editingMemo: Memo | null;
  setEditingMemo: (memo: Memo | null) => void;
  deleteTargetMemo: Memo | null;
  setDeleteTargetMemo: (memo: Memo | null) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  editingMemo: null,
  setEditingMemo: (memo) => set({ editingMemo: memo }),
  deleteTargetMemo: null,
  setDeleteTargetMemo: (memo) => set({ deleteTargetMemo: memo }),
}));

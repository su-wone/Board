'use client';

import { Plus } from 'lucide-react';
import { useBoardUI } from '@/hooks/use-board-ui';

export function CreateSprintButton() {
  const { showToast } = useBoardUI();

  // TODO: POST /sprints 연동은 Phase 4 에서 처리.
  const handleClick = () => {
    showToast('다음 단계에서 연결');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-dashed border-border px-3 py-2 text-sm text-warm-600 hover:bg-warm-50"
    >
      <Plus className="size-3.5" />
      스프린트 만들기
    </button>
  );
}

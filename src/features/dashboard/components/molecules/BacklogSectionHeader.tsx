import { ChevronRight } from "lucide-react";

interface Props {
  cardCount: number;
  isCollapsed: boolean;
  onToggle: () => void;
  contentId: string;
}

export default function BacklogSectionHeader({
  cardCount,
  isCollapsed,
  onToggle,
  contentId,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={!isCollapsed}
          aria-controls={contentId}
          className="flex h-5 w-5 items-center justify-center rounded text-gray-500 hover:bg-gray-100"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform ${isCollapsed ? "" : "rotate-90"}`}
          />
        </button>
        <h2 className="text-base font-semibold text-gray-900">백로그</h2>
      </div>
      <span className="text-xs text-gray-500">{cardCount} cards</span>
    </div>
  );
}
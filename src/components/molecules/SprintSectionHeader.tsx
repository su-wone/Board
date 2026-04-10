import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Sprint } from "@/types/sprint";
import SprintDateRange from "@/components/atoms/SprintDateRange";
import StatusBadge from "@/components/atoms/StatusBadge";

interface Props {
  sprint: Sprint;
  cardCount: number;
  isCollapsed: boolean;
  onToggle: () => void;
  contentId: string;
}

export default function SprintSectionHeader({
  sprint,
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
        <h2 className="text-base font-semibold text-gray-900">{sprint.title}</h2>
        <SprintDateRange startDate={sprint.startDate} endDate={sprint.endDate} />
        <StatusBadge status={sprint.status} />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">{cardCount} cards</span>
        <Link
          href={`/sprints/${sprint.id}/board`}
          className="rounded border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          보드 열기
        </Link>
      </div>
    </div>
  );
}
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sprint } from "@/types/sprint";
import SprintDateRange from "@/components/atoms/SprintDateRange";
import StatusBadge from "@/components/atoms/StatusBadge";

interface Props {
  sprint: Sprint;
  cardCount: number;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function SprintSectionHeader({
  sprint,
  cardCount,
  isCollapsed,
  onToggle,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onToggle}
        >
          <ChevronRight
            className={`transition-transform ${isCollapsed ? "" : "rotate-90"}`}
          />
        </Button>
        <h2 className="text-base font-semibold text-gray-900">{sprint.title}</h2>
        <SprintDateRange startDate={sprint.startDate} endDate={sprint.endDate} />
        <StatusBadge status={sprint.status} />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">{cardCount} cards</span>
        <Button variant="outline" size="xs" asChild>
          <Link href={`/sprints/${sprint.id}/board`}>
            보드 열기
          </Link>
        </Button>
      </div>
    </div>
  );
}
import Link from "next/link";
import { Sprint } from "@/features/dashboard/types/sprint";
import SprintDateRange from "@/features/dashboard/components/atoms/SprintDateRange";
import StatusBadge from "@/features/dashboard/components/atoms/StatusBadge";

interface Props {
  sprint: Sprint;
  cardCount: number;
}

export default function SprintSectionHeader({ sprint, cardCount }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
      <div className="flex items-center gap-3">
        <h2 className="text-base font-semibold text-gray-900">{sprint.title}</h2>
        <SprintDateRange startDate={sprint.startDate} endDate={sprint.endDate} />
        <StatusBadge status={sprint.status} />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">{cardCount} cards</span>
        <Link
          href={`/dashboard/sprints/${sprint.id}/board`}
          className="rounded border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          보드 열기
        </Link>
      </div>
    </div>
  );
}
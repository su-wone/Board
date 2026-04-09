import Link from "next/link";
import { Sprint } from "@/features/dashboard/types/sprint";
import StatusBadge from "@/features/dashboard/components/atoms/StatusBadge";
import SprintDateRange from "@/features/dashboard/components/atoms/SprintDateRange";

interface Props {
  sprint: Sprint;
}

export default function SprintListItem({ sprint }: Props) {
  return (
    <Link
      href={`/dashboard/sprints/${sprint.id}/board`}
      className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-50"
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-gray-900">{sprint.title}</p>
        <SprintDateRange startDate={sprint.startDate} endDate={sprint.endDate} />
      </div>
      <div className="flex items-center gap-3">
        {typeof sprint.cardCount === "number" && (
          <span className="text-xs text-gray-500">{sprint.cardCount} cards</span>
        )}
        <StatusBadge status={sprint.status} />
      </div>
    </Link>
  );
}

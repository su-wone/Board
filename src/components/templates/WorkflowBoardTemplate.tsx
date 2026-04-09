import Link from "next/link";
import { Card } from "@/types/card";
import { Sprint } from "@/types/sprint";
import { Workflow } from "@/types/workflow";
import SprintDateRange from "@/components/atoms/SprintDateRange";
import StatusBadge from "@/components/atoms/StatusBadge";
import WorkflowBoard from "@/components/organisms/WorkflowBoard";

interface Props {
  sprint: Sprint;
  workflows: Workflow[];
  cards: Card[];
}

export default function WorkflowBoardTemplate({ sprint, workflows, cards }: Props) {
  return (
    <main className="p-6">
      <div className="mb-6 flex flex-col gap-1">
        <Link href="/dashboard" className="text-xs text-gray-500 hover:underline">
          ← Sprints
        </Link>
        <h1 className="text-2xl font-bold">{sprint.title}</h1>
        <div className="flex items-center gap-2">
          <SprintDateRange startDate={sprint.startDate} endDate={sprint.endDate} />
          <StatusBadge status={sprint.status} />
        </div>
      </div>
      <WorkflowBoard workflows={workflows} cards={cards} />
    </main>
  );
}

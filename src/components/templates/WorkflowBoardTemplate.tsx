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
    <div className="p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-2xl font-bold">{sprint.title}</h1>
          <div className="flex items-center gap-2">
            <SprintDateRange startDate={sprint.startDate} endDate={sprint.endDate} />
            <StatusBadge status={sprint.status} />
            <span className="text-sm text-gray-500">· {sprint.cardCount} issues</span>
          </div>
        </div>
      </div>
      <WorkflowBoard workflows={workflows} cards={cards} />
    </div>
  );
}

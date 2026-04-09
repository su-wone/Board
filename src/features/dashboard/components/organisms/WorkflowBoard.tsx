import { Card } from "@/features/dashboard/types/card";
import { Workflow } from "@/features/dashboard/types/workflow";
import WorkflowLane from "@/features/dashboard/components/organisms/WorkflowLane";

interface Props {
  workflows: Workflow[];
  cards: Card[];
}

export default function WorkflowBoard({ workflows, cards }: Props) {
  const sortedWorkflows = [...workflows].sort((a, b) => a.order - b.order);

  return (
    <div className="flex gap-4">
      {sortedWorkflows.map((workflow) => (
        <WorkflowLane
          key={workflow.id}
          workflow={workflow}
          cards={cards.filter((c) => c.workflowId === workflow.id)}
        />
      ))}
    </div>
  );
}

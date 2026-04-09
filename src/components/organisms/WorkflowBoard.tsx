import { Card } from "@/types/card";
import { Workflow } from "@/types/workflow";
import WorkflowLane from "@/components/organisms/WorkflowLane";

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

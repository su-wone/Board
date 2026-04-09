import { Card } from "@/features/dashboard/types/card";
import { Workflow } from "@/features/dashboard/types/workflow";
import CardItem from "@/features/dashboard/components/molecules/CardItem";
import WorkflowHeader from "@/features/dashboard/components/molecules/WorkflowHeader";

interface Props {
  workflow: Workflow;
  cards: Card[];
}

export default function WorkflowLane({ workflow, cards }: Props) {
  const sorted = [...cards].sort((a, b) => a.order - b.order);

  return (
    <div className="flex-1 rounded-lg bg-gray-100 p-4">
      <WorkflowHeader title={workflow.title} count={cards.length} />
      <div className="flex flex-col gap-2">
        {sorted.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import WorkflowBoardTemplate from "@/features/dashboard/components/templates/WorkflowBoardTemplate";
import { mockSprints } from "@/features/dashboard/mocks/sprints.mock";
import { mockWorkflows } from "@/features/dashboard/mocks/workflows.mock";
import { mockCards } from "@/features/dashboard/mocks/cards.mock";

interface Props {
  params: Promise<{ sprintId: string }>;
}

export default async function SprintBoardPage({ params }: Props) {
  const { sprintId } = await params;
  const id = Number(sprintId);

  const sprint = mockSprints.find((s) => s.id === id);
  if (!sprint) notFound();

  const cards = mockCards.filter((c) => c.sprintId === id);

  return (
    <WorkflowBoardTemplate
      sprint={sprint}
      workflows={mockWorkflows}
      cards={cards}
    />
  );
}

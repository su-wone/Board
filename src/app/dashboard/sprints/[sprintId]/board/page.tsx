import { notFound } from "next/navigation";
import WorkflowBoardTemplate from "@/components/templates/WorkflowBoardTemplate";
import { mockSprints } from "@/mocks/sprints.mock";
import { mockWorkflows } from "@/mocks/workflows.mock";
import { mockCards } from "@/mocks/cards.mock";

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

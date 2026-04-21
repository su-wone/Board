import WorkflowBoardTemplate from "@/components/templates/WorkflowBoardTemplate";
import { getCards, getSprintById, getWorkflows } from "@/lib/api";

interface Props {
  params: Promise<{ sprintId: string }>;
}

export default async function SprintBoardPage({ params }: Props) {
  const { sprintId } = await params;
  const id = Number(sprintId);

  const [sprint, workflows, cards] = await Promise.all([
    getSprintById(id),
    getWorkflows(),
    getCards({ sprintId: id }),
  ]);

  return <WorkflowBoardTemplate sprint={sprint} workflows={workflows} cards={cards} />;
}

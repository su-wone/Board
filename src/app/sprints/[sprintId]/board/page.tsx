import WorkflowBoardTemplate from "@/components/templates/WorkflowBoardTemplate";

interface Props {
  params: Promise<{ sprintId: string }>;
}

export default async function SprintBoardPage({ params }: Props) {
  const { sprintId } = await params;
  return <WorkflowBoardTemplate sprintId={Number(sprintId)} />;
}
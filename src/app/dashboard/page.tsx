import SprintListTemplate from "@/features/dashboard/components/templates/SprintListTemplate";
import { mockSprints } from "@/features/dashboard/mocks/sprints.mock";

export default function DashboardPage() {
  return <SprintListTemplate sprints={mockSprints} />;
}
import SprintListTemplate from "@/components/templates/SprintListTemplate";
import { mockSprints } from "@/mocks/sprints.mock";

export default function DashboardPage() {
  return <SprintListTemplate sprints={mockSprints} />;
}
import BacklogTemplate from "@/features/dashboard/components/templates/BacklogTemplate";
import { mockSprints } from "@/features/dashboard/mocks/sprints.mock";
import { mockCards } from "@/features/dashboard/mocks/cards.mock";
import { Card } from "@/features/dashboard/types/card";
import { Sprint } from "@/features/dashboard/types/sprint";

function buildSprintSections(sprints: Sprint[], cards: Card[]) {
  return sprints.map((sprint) => ({
    sprint,
    cards: cards.filter((c) => c.sprintId === sprint.id),
  }));
}

function selectBacklogCards(cards: Card[]) {
  return cards.filter((c) => c.sprintId === null);
}

export default function DashboardPage() {
  const sprintSections = buildSprintSections(mockSprints, mockCards);
  const backlogCards = selectBacklogCards(mockCards);

  return (
    <BacklogTemplate
      sprintSections={sprintSections}
      backlogCards={backlogCards}
    />
  );
}
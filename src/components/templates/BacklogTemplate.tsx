import { Card } from "@/types/card";
import { Sprint } from "@/types/sprint";
import SprintSection from "@/components/organisms/SprintSection";
import BacklogSection from "@/components/organisms/BacklogSection";

interface Props {
  sprints: Sprint[];
  cards: Card[];
}

export default function BacklogTemplate({ sprints, cards }: Props) {
  const sprintSections = sprints.map((sprint) => ({
    sprint,
    cards: cards.filter((c) => c.sprintId === sprint.id),
  }));
  const backlogCards = cards.filter((c) => c.sprintId === null);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-8">
        {sprintSections.map(({ sprint, cards }) => (
          <SprintSection key={sprint.id} sprint={sprint} cards={cards} />
        ))}
        <BacklogSection cards={backlogCards} />
      </div>
    </div>
  );
}

import { Card } from "@/features/dashboard/types/card";
import { Sprint } from "@/features/dashboard/types/sprint";
import SprintSection from "@/features/dashboard/components/organisms/SprintSection";
import BacklogSection from "@/features/dashboard/components/organisms/BacklogSection";

interface SprintSectionData {
  sprint: Sprint;
  cards: Card[];
}

interface Props {
  sprintSections: SprintSectionData[];
  backlogCards: Card[];
}

export default function BacklogTemplate({ sprintSections, backlogCards }: Props) {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">백로그</h1>
      <div className="flex flex-col gap-8">
        {sprintSections.map(({ sprint, cards }) => (
          <SprintSection key={sprint.id} sprint={sprint} cards={cards} />
        ))}
        <BacklogSection cards={backlogCards} />
      </div>
    </main>
  );
}
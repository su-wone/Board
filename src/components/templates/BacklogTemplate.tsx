"use client";

import { Card } from "@/types/card";
import { Sprint } from "@/types/sprint";
import { mockSprints } from "@/mocks/sprints.mock";
import { useDashboardStore } from "@/store";
import SprintSection from "@/components/organisms/SprintSection";
import BacklogSection from "@/components/organisms/BacklogSection";

function buildSprintSections(sprints: Sprint[], cards: Card[]) {
  return sprints.map((sprint) => ({
    sprint,
    cards: cards.filter((c) => c.sprintId === sprint.id),
  }));
}

function selectBacklogCards(cards: Card[]) {
  return cards.filter((c) => c.sprintId === null);
}

export default function BacklogTemplate() {
  const cards = useDashboardStore((s) => s.cards);

  const sprintSections = buildSprintSections(mockSprints, cards);
  const backlogCards = selectBacklogCards(cards);

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
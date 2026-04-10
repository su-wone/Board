"use client";

import { Card } from "@/types/card";
import { Sprint } from "@/types/sprint";
import { useDashboardStore, sprintSectionId } from "@/store";
import SprintSectionHeader from "@/components/molecules/SprintSectionHeader";
import CardItem from "@/components/molecules/CardItem";
import CardCreateInput from "@/components/molecules/CardCreateInput";

interface Props {
  sprint: Sprint;
  cards: Card[];
}

export default function SprintSection({ sprint, cards }: Props) {
  const sectionId = sprintSectionId(sprint.id);
  const contentId = `${sectionId}-content`;
  const isCollapsed = useDashboardStore((s) => s.collapsedSectionIds.has(sectionId));
  const toggleSection = useDashboardStore((s) => s.toggleSection);

  const sorted = [...cards].sort((a, b) => a.order - b.order);

  return (
    <section className="flex flex-col gap-3">
      <SprintSectionHeader
        sprint={sprint}
        cardCount={cards.length}
        isCollapsed={isCollapsed}
        onToggle={() => toggleSection(sectionId)}
        contentId={contentId}
      />
      {!isCollapsed && (
        <div id={contentId} className="flex flex-col gap-2">
          {sorted.length === 0 ? (
            <p className="text-sm text-gray-400">카드가 없습니다.</p>
          ) : (
            sorted.map((card) => <CardItem key={card.id} card={card} />)
          )}
          <CardCreateInput sprintId={sprint.id} />
        </div>
      )}
    </section>
  );
}
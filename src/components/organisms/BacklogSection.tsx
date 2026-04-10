"use client";

import { Card } from "@/types/card";
import { useDashboardStore, backlogSectionId } from "@/store";
import BacklogSectionHeader from "@/components/molecules/BacklogSectionHeader";
import CardItem from "@/components/molecules/CardItem";
import CardCreateInput from "@/components/molecules/CardCreateInput";

interface Props {
  cards: Card[];
}

export default function BacklogSection({ cards }: Props) {
  const sectionId = backlogSectionId();
  const contentId = `${sectionId}-content`;
  const isCollapsed = useDashboardStore((s) => s.collapsedSectionIds.has(sectionId));
  const toggleSection = useDashboardStore((s) => s.toggleSection);

  const sorted = [...cards].sort((a, b) => a.order - b.order);

  return (
    <section className="flex flex-col gap-3">
      <BacklogSectionHeader
        cardCount={cards.length}
        isCollapsed={isCollapsed}
        onToggle={() => toggleSection(sectionId)}
        contentId={contentId}
      />
      {!isCollapsed && (
        <div id={contentId} className="flex flex-col gap-2">
          {sorted.length === 0 ? (
            <p className="text-sm text-gray-400">백로그가 비어 있습니다.</p>
          ) : (
            sorted.map((card) => <CardItem key={card.id} card={card} />)
          )}
          <CardCreateInput sprintId={null} />
        </div>
      )}
    </section>
  );
}
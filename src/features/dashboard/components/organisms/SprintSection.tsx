import { Card } from "@/features/dashboard/types/card";
import { Sprint } from "@/features/dashboard/types/sprint";
import SprintSectionHeader from "@/features/dashboard/components/molecules/SprintSectionHeader";
import CardItem from "@/features/dashboard/components/molecules/CardItem";

interface Props {
  sprint: Sprint;
  cards: Card[];
}

export default function SprintSection({ sprint, cards }: Props) {
  const sorted = [...cards].sort((a, b) => a.order - b.order);

  return (
    <section className="flex flex-col gap-3">
      <SprintSectionHeader sprint={sprint} cardCount={cards.length} />
      {sorted.length === 0 ? (
        <p className="text-sm text-gray-400">카드가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {sorted.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      )}
    </section>
  );
}
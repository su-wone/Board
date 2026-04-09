import { Card } from "@/features/dashboard/types/card";
import BacklogSectionHeader from "@/features/dashboard/components/molecules/BacklogSectionHeader";
import CardItem from "@/features/dashboard/components/molecules/CardItem";

interface Props {
  cards: Card[];
}

export default function BacklogSection({ cards }: Props) {
  const sorted = [...cards].sort((a, b) => a.order - b.order);

  return (
    <section className="flex flex-col gap-3">
      <BacklogSectionHeader cardCount={cards.length} />
      {sorted.length === 0 ? (
        <p className="text-sm text-gray-400">백로그가 비어 있습니다.</p>
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
import { Card } from "@/types/card";
import CardKey from "@/components/atoms/CardKey";
import PriorityBadge from "@/components/atoms/PriorityBadge";

interface Props {
  card: Card;
}

export default function CardItem({ card }: Props) {
  return (
    <div className="rounded-md bg-white p-3 shadow-sm">
      <CardKey cardKey={card.key} />
      <p className="mt-1 text-sm font-medium">{card.title}</p>
      <div className="mt-3">
        <PriorityBadge priority={card.priority} />
      </div>
    </div>
  );
}

import { Card as CardType } from "@/types/card";
import { Card, CardHeader } from "@/components/ui/card";
import CardKey from "@/components/atoms/CardKey";
import PriorityBadge from "@/components/atoms/PriorityBadge";

interface Props {
  card: CardType;
}

export default function CardItem({ card }: Props) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardKey cardKey={card.key} />
        <p className="text-sm font-medium">{card.title}</p>
        <PriorityBadge priority={card.priority} />
      </CardHeader>
    </Card>
  );
}

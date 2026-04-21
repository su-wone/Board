import { Card as CardType } from "@/types/card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardKey from "@/components/atoms/CardKey";
import CardTypeChip from "@/components/atoms/CardTypeChip";
import PriorityBadge from "@/components/atoms/PriorityBadge";

interface Props {
  card: CardType;
}

export default function CardItem({ card }: Props) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardKey cardId={card.id} />
        <CardTitle className="text-sm">{card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <CardTypeChip type={card.type} />
          <PriorityBadge priority={card.priority} />
        </div>
      </CardContent>
    </Card>
  );
}

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
import AssigneeAvatar from "@/components/atoms/AssigneeAvatar";

interface Props {
  card: CardType;
}

export default function CardItem({ card }: Props) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardKey cardKey={card.key} />
        <CardTitle className="text-sm">{card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <CardTypeChip type={card.type} />
          <PriorityBadge priority={card.priority} />
          {card.storyPoint !== null && (
            <span className="text-xs text-gray-500">{card.storyPoint} pt</span>
          )}
          <div className="flex-1" />
          <AssigneeAvatar assigneeId={card.assigneeId} />
        </div>
      </CardContent>
    </Card>
  );
}

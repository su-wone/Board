import { Card as CardType } from "@/types/card";
import { Card, CardHeader } from "@/components/ui/card";
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
        <p className="text-sm font-medium">{card.title}</p>
        <div className="mt-2 flex items-center gap-2">
          <CardTypeChip type={card.type} />
          <PriorityBadge priority={card.priority} />
          {card.storyPoint !== null && (
            <span className="text-xs text-gray-500">{card.storyPoint} pt</span>
          )}
          <div className="flex-1" />
          <AssigneeAvatar assigneeId={card.assigneeId} />
        </div>
      </CardHeader>
    </Card>
  );
}

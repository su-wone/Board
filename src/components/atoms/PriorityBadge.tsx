import { Badge } from "@/components/ui/badge";
import { CardPriority } from "@/types/card";

interface Props {
  priority: CardPriority;
}

const styles: Record<CardPriority, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-gray-200 text-gray-700",
};

const labels: Record<CardPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default function PriorityBadge({ priority }: Props) {
  return (
    <Badge variant="outline" className={styles[priority]}>
      {labels[priority]}
    </Badge>
  );
}

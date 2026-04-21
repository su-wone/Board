import { Badge } from "@/components/ui/badge";
import { CardPriority } from "@/types/card";

interface Props {
  priority: CardPriority;
}

const styles: Record<CardPriority, string> = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-gray-200 text-gray-700",
};

const labels: Record<CardPriority, string> = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

export default function PriorityBadge({ priority }: Props) {
  return (
    <Badge variant="outline" className={styles[priority]}>
      {labels[priority]}
    </Badge>
  );
}

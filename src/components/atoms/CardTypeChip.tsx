import { Badge } from "@/components/ui/badge";
import { CardType } from "@/types/card";

interface Props {
  type: CardType;
}

const styles: Record<CardType, string> = {
  EPIC: "bg-purple-100 text-purple-700",
  STORY: "bg-green-100 text-green-700",
  TASK: "bg-blue-100 text-blue-700",
  SUB_TASK: "bg-gray-100 text-gray-700",
  BUG: "bg-red-100 text-red-700",
};

const labels: Record<CardType, string> = {
  EPIC: "Epic",
  STORY: "Story",
  TASK: "Task",
  SUB_TASK: "Sub-task",
  BUG: "Bug",
};

export default function CardTypeChip({ type }: Props) {
  return (
    <Badge variant="outline" className={styles[type]}>
      {labels[type]}
    </Badge>
  );
}

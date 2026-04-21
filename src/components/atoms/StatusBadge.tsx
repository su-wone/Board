import { Badge } from "@/components/ui/badge";
import { SprintStatus } from "@/types/sprint";

interface Props {
  status: SprintStatus;
}

const styles: Record<SprintStatus, string> = {
  PLANNED: "bg-gray-200 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

const labels: Record<SprintStatus, string> = {
  PLANNED: "Planned",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

export default function StatusBadge({ status }: Props) {
  return (
    <Badge variant="outline" className={styles[status]}>
      {labels[status]}
    </Badge>
  );
}

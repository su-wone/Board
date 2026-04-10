import { SprintStatus } from "@/types/sprint";

interface Props {
  status: SprintStatus;
}

const styles: Record<SprintStatus, string> = {
  planned: "bg-gray-200 text-gray-700",
  active: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

const labels: Record<SprintStatus, string> = {
  planned: "Planned",
  active: "Active",
  completed: "Completed",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

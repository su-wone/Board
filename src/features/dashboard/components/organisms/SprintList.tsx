import { Sprint } from "@/features/dashboard/types/sprint";
import SprintListItem from "@/features/dashboard/components/molecules/SprintListItem";

interface Props {
  sprints: Sprint[];
}

export default function SprintList({ sprints }: Props) {
  if (sprints.length === 0) {
    return <p className="text-sm text-gray-500">스프린트가 없습니다.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {sprints.map((sprint) => (
        <li key={sprint.id}>
          <SprintListItem sprint={sprint} />
        </li>
      ))}
    </ul>
  );
}

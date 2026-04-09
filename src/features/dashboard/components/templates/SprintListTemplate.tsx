import { Sprint } from "@/features/dashboard/types/sprint";
import SprintList from "@/features/dashboard/components/organisms/SprintList";

interface Props {
  sprints: Sprint[];
}

export default function SprintListTemplate({ sprints }: Props) {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Sprint</h1>
      <SprintList sprints={sprints} />
    </main>
  );
}

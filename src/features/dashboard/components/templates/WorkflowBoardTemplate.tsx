"use client";

import Link from "next/link";
import { mockSprints } from "@/features/dashboard/mocks/sprints.mock";
import { mockWorkflows } from "@/features/dashboard/mocks/workflows.mock";
import { useDashboardStore } from "@/features/dashboard/store";
import SprintDateRange from "@/features/dashboard/components/atoms/SprintDateRange";
import StatusBadge from "@/features/dashboard/components/atoms/StatusBadge";
import WorkflowBoard from "@/features/dashboard/components/organisms/WorkflowBoard";

interface Props {
  sprintId: number;
}

export default function WorkflowBoardTemplate({ sprintId }: Props) {
  const sprint = mockSprints.find((s) => s.id === sprintId);
  const allCards = useDashboardStore((s) => s.cards);
  const cards = allCards.filter((c) => c.sprintId === sprintId);

  if (!sprint) {
    return (
      <main className="p-6">
        <p className="text-sm text-gray-500">스프린트를 찾을 수 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="mb-6 flex flex-col gap-1">
        <Link href="/dashboard" className="text-xs text-gray-500 hover:underline">
          ← Sprints
        </Link>
        <h1 className="text-2xl font-bold">{sprint.title}</h1>
        <div className="flex items-center gap-2">
          <SprintDateRange startDate={sprint.startDate} endDate={sprint.endDate} />
          <StatusBadge status={sprint.status} />
        </div>
      </div>
      <WorkflowBoard workflows={mockWorkflows} cards={cards} />
    </main>
  );
}
"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardPriority, CardType } from "@/types/card";
import { createCardAction } from "@/app/actions/cards";

const DEFAULT_WORKFLOW_ID = 1;

interface Props {
  children: React.ReactNode;
  defaultSprintId: number | null;
}

export default function IssueCreateModal({ children, defaultSprintId }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<CardType>("TASK");
  const [priority, setPriority] = useState<CardPriority>("MEDIUM");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isDirty = title.trim().length > 0;
  const canSubmit = title.trim().length > 0 && !isPending;

  const resetForm = () => {
    setTitle("");
    setType("TASK");
    setPriority("MEDIUM");
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    startTransition(async () => {
      try {
        await createCardAction({
          title: title.trim(),
          workflowId: DEFAULT_WORKFLOW_ID,
          sprintId: defaultSprintId,
          type,
          priority,
        });
        toast.success("이슈가 생성되었습니다");
        setOpen(false);
        resetForm();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "생성에 실패했습니다";
        setError(msg);
      }
    });
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && isDirty) {
      const confirmed = window.confirm("입력한 내용을 버리시겠습니까?");
      if (!confirmed) return;
    }
    setOpen(next);
    if (!next) resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>이슈 생성</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="issue-title" className="text-sm font-medium">
              제목
            </label>
            <Input
              id="issue-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="이슈 제목"
              disabled={isPending}
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="issue-type" className="text-sm font-medium">
                타입
              </label>
              <select
                id="issue-type"
                value={type}
                onChange={(e) => setType(e.target.value as CardType)}
                disabled={isPending}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="EPIC">Epic</option>
                <option value="STORY">Story</option>
                <option value="TASK">Task</option>
                <option value="SUB_TASK">Sub-task</option>
                <option value="BUG">Bug</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="issue-priority" className="text-sm font-medium">
                우선순위
              </label>
              <select
                id="issue-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as CardPriority)}
                disabled={isPending}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              취소
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {isPending ? "생성 중..." : "생성"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createCard } from '@/lib/api/cards';
import { cn } from '@/lib/utils';
import type { IssueType, Priority } from '@/types/board';
import { PriorityDot } from './PriorityDot';
import { TypeIcon } from './TypeIcon';
import type { ToastVariant } from './Toast';

interface CreateIssueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultWorkflowId?: number;
  defaultSprintId?: number | null;
  onToast?: (message: string, variant?: ToastVariant) => void;
}

interface FieldProps {
  label: ReactNode;
  children: ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-warm-400">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

const TYPE_OPTIONS: { value: IssueType; label: string }[] = [
  { value: 'task', label: '작업' },
  { value: 'story', label: '스토리' },
  { value: 'bug', label: '버그' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Med' },
  { value: 'low', label: 'Low' },
];

export function CreateIssueModal({
  open,
  onOpenChange,
  defaultWorkflowId,
  defaultSprintId,
  onToast,
}: CreateIssueModalProps) {
  const router = useRouter();
  const [type, setType] = useState<IssueType>('task');
  const [summary, setSummary] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    summary.trim().length > 0 && defaultWorkflowId !== undefined && !submitting;

  const handleCreate = async () => {
    if (!canSubmit || defaultWorkflowId === undefined) return;
    setSubmitting(true);
    try {
      await createCard({
        title: summary.trim(),
        type,
        priority,
        workflowId: defaultWorkflowId,
        sprintId: defaultSprintId ?? null,
      });
      onOpenChange(false);
      setSummary('');
      setType('task');
      setPriority('medium');
      onToast?.('업무를 생성했습니다');
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '업무 생성에 실패했습니다';
      onToast?.(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] gap-0 overflow-hidden p-0 sm:max-w-[560px]">
        <div className="border-b border-border px-5 py-4">
          <DialogTitle className="text-[22px] font-bold">
            업무 만들기
          </DialogTitle>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <Field label="프로젝트">
            <div className="flex w-fit items-center gap-2 rounded-md border border-border px-2.5 py-1.5">
              <div
                aria-hidden
                className="flex size-5 items-center justify-center rounded-sm bg-semantic-orange text-[11px] font-bold text-white"
              >
                V
              </div>
              <span className="text-sm font-medium">VEASLY Board</span>
              <ChevronDown className="size-3.5 text-warm-400" />
            </div>
          </Field>

          <Field label="유형">
            <div className="grid grid-cols-3 gap-2">
              {TYPE_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setType(option.value)}
                  className={cn(
                    'flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
                    type === option.value
                      ? 'border-newndy-blue bg-newndy-blue/10 text-newndy-blue-active'
                      : 'border-border hover:bg-warm-50',
                  )}
                >
                  <TypeIcon type={option.value} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </Field>

          <Field
            label={
              <>
                제목 <span className="text-destructive">*</span>
              </>
            }
          >
            <Input
              autoFocus
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              className="h-9"
            />
          </Field>

          <Field label="우선순위">
            <div className="grid w-fit grid-cols-3 gap-1">
              {PRIORITY_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setPriority(option.value)}
                  className={cn(
                    'flex items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-colors',
                    priority === option.value
                      ? 'border-newndy-blue bg-newndy-blue/10 text-newndy-blue-active'
                      : 'border-border hover:bg-warm-50',
                  )}
                >
                  <PriorityDot priority={option.value} />
                  {option.label}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="flex justify-end gap-2 border-t border-border bg-warm-50 px-5 py-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button disabled={!canSubmit} onClick={handleCreate}>
            {submitting ? '생성 중…' : '만들기'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

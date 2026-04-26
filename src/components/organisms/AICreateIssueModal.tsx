'use client';

import { Pencil, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { IssueType, Priority } from '@/types/board';
import { PriorityDot } from '../atoms/PriorityDot';
import { TypeIcon } from '../atoms/TypeIcon';

interface AICreateIssueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface GeneratedTicket {
  id: string;
  title: string;
  type: IssueType;
  priority: Priority;
  parentId?: string;
}

const TYPE_OPTIONS: { value: IssueType; label: string }[] = [
  { value: 'EPIC', label: '에픽' },
  { value: 'STORY', label: '스토리' },
  { value: 'TASK', label: '태스크' },
  { value: 'SUB_TASK', label: '서브태스크' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'HIGH', label: 'High' },
  { value: 'MEDIUM', label: 'Med' },
  { value: 'LOW', label: 'Low' },
];

function EditTicketModal({
  ticket,
  open,
  onOpenChange,
  onSave,
}: {
  ticket: GeneratedTicket;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updated: GeneratedTicket) => void;
}) {
  const [title, setTitle] = useState(ticket.title);
  const [type, setType] = useState<IssueType>(ticket.type);
  const [priority, setPriority] = useState<Priority>(ticket.priority);

  const canSave = title.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSave({ ...ticket, title: title.trim(), type, priority });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px] gap-0 overflow-hidden p-0 sm:max-w-[480px]">
        <div className="border-b border-border px-5 py-4">
          <DialogTitle className="text-lg font-bold">티켓 수정</DialogTitle>
          <DialogDescription className="sr-only">
            생성된 티켓의 제목, 유형, 우선순위를 수정합니다.
          </DialogDescription>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-warm-400">
              제목 <span className="text-destructive">*</span>
            </span>
            <Input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-9"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-warm-400">
              유형
            </span>
            <div className="grid grid-cols-4 gap-2">
              {TYPE_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setType(option.value)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-md border px-2.5 py-2 text-sm transition-colors',
                    type === option.value
                      ? 'border-newndy-blue bg-newndy-blue/10 text-newndy-blue-active'
                      : 'border-border hover:bg-warm-50',
                  )}
                >
                  <TypeIcon type={option.value} />
                  <span className="text-xs">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-warm-400">
              우선순위
            </span>
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
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border bg-warm-50 px-5 py-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button disabled={!canSave} onClick={handleSave}>
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const MOCK_TICKETS: GeneratedTicket[] = [
  {
    id: '1',
    title: '사용자 인증 시스템 구현',
    type: 'EPIC',
    priority: 'HIGH',
  },
  {
    id: '2',
    title: '로그인 페이지 UI 작성',
    type: 'STORY',
    priority: 'HIGH',
    parentId: '1',
  },
  {
    id: '3',
    title: '로그인 API 연동',
    type: 'TASK',
    priority: 'MEDIUM',
    parentId: '2',
  },
  {
    id: '4',
    title: '입력 유효성 검사 추가',
    type: 'SUB_TASK',
    priority: 'LOW',
    parentId: '3',
  },
];

function TicketRow({
  ticket,
  depth = 0,
  onEdit,
  onDelete,
}: {
  ticket: GeneratedTicket;
  depth?: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="group flex items-center gap-2 rounded-md border border-border px-3 py-2 hover:bg-warm-50"
      style={{ marginLeft: depth * 20 }}
    >
      <TypeIcon type={ticket.type} />
      <span className="flex-1 truncate text-sm">{ticket.title}</span>
      <PriorityDot priority={ticket.priority} />
      <span className="text-[11px] text-warm-400">{ticket.type}</span>
      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onEdit(ticket.id)}
          className="rounded p-1 hover:bg-warm-100"
          aria-label="수정"
        >
          <Pencil className="size-3 text-warm-500" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(ticket.id)}
          className="rounded p-1 hover:bg-red-50"
          aria-label="삭제"
        >
          <Trash2 className="size-3 text-destructive" />
        </button>
      </div>
    </div>
  );
}

export function AICreateIssueModal({
  open,
  onOpenChange,
}: AICreateIssueModalProps) {
  const [prompt, setPrompt] = useState('');
  const [tickets, setTickets] = useState<GeneratedTicket[]>([]);
  const [step, setStep] = useState<'input' | 'review'>('input');
  const [editingTicket, setEditingTicket] = useState<GeneratedTicket | null>(
    null,
  );

  const handleGenerate = () => {
    // TODO: LLM API 연동 — 현재는 목업 데이터 사용
    setTickets(MOCK_TICKETS);
    setStep('review');
  };

  const handleDelete = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (id: string) => {
    const target = tickets.find((t) => t.id === id);
    if (target) setEditingTicket(target);
  };

  const handleEditSave = (updated: GeneratedTicket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t)),
    );
  };

  const handleAddTicket = () => {
    // TODO: 빈 티켓 추가 UI 구현
  };

  const handleReset = () => {
    setStep('input');
    setTickets([]);
    setPrompt('');
  };

  const handleConfirm = () => {
    // TODO: 실제 티켓 생성 API 호출
    onOpenChange(false);
    handleReset();
  };

  const depthMap = new Map<string, number>();
  for (const ticket of tickets) {
    if (!ticket.parentId) {
      depthMap.set(ticket.id, 0);
    } else {
      depthMap.set(ticket.id, (depthMap.get(ticket.parentId) ?? 0) + 1);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        if (!value) handleReset();
      }}
    >
      <DialogContent className="max-w-[620px] gap-0 overflow-hidden p-0 sm:max-w-[620px]">
        <div className="border-b border-border px-5 py-4">
          <DialogTitle className="flex items-center gap-2 text-[22px] font-bold">
            <Sparkles className="size-5 text-newndy-blue" />
            AI 업무 만들기
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-warm-400">
            자연어로 업무를 설명하면 에픽, 스토리, 태스크, 서브태스크를
            자동으로 생성합니다.
          </DialogDescription>
        </div>

        {step === 'input' && (
          <div className="flex flex-col gap-4 px-5 py-4">
            <Textarea
              autoFocus
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예: 사용자 인증 시스템을 만들어줘. 로그인, 회원가입, 비밀번호 찾기 기능이 필요해."
              className="min-h-[120px] resize-none text-sm"
            />
          </div>
        )}

        {step === 'review' && (
          <div className="flex max-h-[400px] flex-col gap-2 overflow-y-auto px-5 py-4">
            {tickets.length === 0 ? (
              <p className="py-8 text-center text-sm text-warm-400">
                생성된 티켓이 없습니다.
              </p>
            ) : (
              tickets.map((ticket) => (
                <TicketRow
                  key={ticket.id}
                  ticket={ticket}
                  depth={depthMap.get(ticket.id) ?? 0}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
            <button
              type="button"
              onClick={handleAddTicket}
              className="flex items-center gap-2 rounded-md border border-dashed border-border px-3 py-2 text-sm text-warm-400 hover:border-warm-300 hover:text-warm-500"
            >
              <Plus className="size-3.5" />
              티켓 추가
            </button>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border bg-warm-50 px-5 py-3">
          <div>
            {step === 'review' && (
              <Button variant="ghost" size="sm" onClick={handleReset}>
                다시 입력
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            {step === 'input' && (
              <Button
                disabled={prompt.trim().length === 0}
                onClick={handleGenerate}
              >
                <Sparkles className="size-3.5" />
                생성하기
              </Button>
            )}
            {step === 'review' && (
              <Button
                disabled={tickets.length === 0}
                onClick={handleConfirm}
              >
                확인 및 만들기
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
      {editingTicket && (
        <EditTicketModal
          ticket={editingTicket}
          open={true}
          onOpenChange={(value) => {
            if (!value) setEditingTicket(null);
          }}
          onSave={handleEditSave}
        />
      )}
    </Dialog>
  );
}

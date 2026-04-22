'use client';

import { ChevronDown, MoreHorizontal } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { USERS, SPRINTS } from '@/lib/mock/board-mock';
import type { Ticket } from '@/types/board';
import { Avatar } from './Avatar';
import { EpicPill } from './EpicPill';
import { PriorityDot } from './PriorityDot';
import { StatusPill } from './StatusPill';
import { TypeIcon } from './TypeIcon';

interface TicketModalProps {
  ticket: Ticket | null;
  onOpenChange: (open: boolean) => void;
}

interface FieldProps {
  label: ReactNode;
  children: ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-warm-400">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

export function TicketModal({ ticket, onOpenChange }: TicketModalProps) {
  const open = ticket !== null;
  if (!ticket) {
    return <Dialog open={open} onOpenChange={onOpenChange} />;
  }

  const reporter = ticket.reporter ?? USERS.L;
  const sprint = SPRINTS.find((s) => s.id === ticket.sprintId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[980px] gap-0 overflow-hidden p-0 sm:max-w-[980px]">
        <div className="flex items-center gap-2 border-b border-border py-3 pl-4 pr-12">
          <TypeIcon type={ticket.type} />
          <span className="text-sm font-medium text-warm-600">{ticket.id}</span>
          <div className="flex-1" />
          <Button variant="ghost" size="sm">
            공유
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="더보기">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>

        <div className="flex min-h-[420px]">
          <div className="flex-1 border-r border-border p-6">
            <DialogTitle className="text-[26px] font-bold leading-tight tracking-[-0.375px]">
              {ticket.title}
            </DialogTitle>

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs"
              >
                첨부파일
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs"
              >
                하위 업무
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs"
              >
                연결된 업무
              </Button>
            </div>

            <section className="mt-6">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-warm-400">
                설명
              </h3>
              <p className="text-sm text-foreground">
                {ticket.description ?? '설명이 없습니다.'}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-warm-400">
                활동
              </h3>
              <div className="flex items-start gap-3">
                <Avatar user={USERS.L} size={26} />
                <Input className="flex-1" placeholder="댓글 추가..." />
              </div>
            </section>
          </div>

          <div className="flex w-[280px] flex-col gap-3.5 bg-warm-50 p-5">
            <Button
              variant="outline"
              className="h-9 w-full justify-between bg-background font-semibold"
            >
              <StatusPill status={ticket.status} />
              <ChevronDown className="size-3.5" />
            </Button>

            <Field label="담당자">
              {ticket.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar user={ticket.assignee} size={20} />
                  <span>{ticket.assignee.name}</span>
                </div>
              ) : (
                '미지정'
              )}
            </Field>

            <Field label="보고자">
              <div className="flex items-center gap-2">
                <Avatar user={reporter} size={20} />
                <span>{reporter.name}</span>
              </div>
            </Field>

            <Field label="Epic">
              {ticket.epic ? <EpicPill epic={ticket.epic} /> : '없음'}
            </Field>

            <Field label="스프린트">{sprint?.name ?? '—'}</Field>

            <Field label="우선순위">
              <div className="flex items-center gap-1.5">
                <PriorityDot priority={ticket.priority} />
                <span className="capitalize">{ticket.priority}</span>
              </div>
            </Field>

            <Field label="예상 시간">{ticket.estimate ?? '—'}</Field>

            <Field label="라벨">
              {ticket.labels?.length
                ? ticket.labels.map((label) => (
                    <span
                      key={label}
                      className="mr-1 rounded-sm bg-warm-200 px-2 py-0.5 text-xs"
                    >
                      {label}
                    </span>
                  ))
                : '없음'}
            </Field>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

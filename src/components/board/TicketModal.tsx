'use client';

import { ChevronDown, MoreHorizontal } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getCard } from '@/lib/api/cards';
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
  const [fresh, setFresh] = useState<Ticket | null>(null);

  useEffect(() => {
    if (!ticket) return;
    let active = true;
    getCard(ticket.id)
      .then((loaded) => {
        if (active) setFresh(loaded);
      })
      .catch(() => {
        // keep the summary ticket if detail fetch fails
      });
    return () => {
      active = false;
    };
  }, [ticket]);

  const detail: Ticket | null =
    ticket && fresh && fresh.id === ticket.id ? fresh : ticket;

  if (!detail) {
    return <Dialog open={open} onOpenChange={onOpenChange} />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[980px] gap-0 overflow-hidden p-0 sm:max-w-[980px]">
        <div className="flex items-center gap-2 border-b border-border py-3 pl-4 pr-12">
          <TypeIcon type={detail.type} />
          <span className="text-sm font-medium text-warm-600">{detail.key}</span>
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
              {detail.title}
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
              <p className="whitespace-pre-wrap text-sm text-foreground">
                {detail.description?.trim() ? detail.description : '설명이 없습니다.'}
              </p>
            </section>

            <section className="mt-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-warm-400">
                활동
              </h3>
              <div className="flex items-start gap-3">
                <Avatar size={26} />
                <Input className="flex-1" placeholder="댓글 추가..." />
              </div>
            </section>
          </div>

          <div className="flex w-[280px] flex-col gap-3.5 bg-warm-50 p-5">
            <Button
              variant="outline"
              className="h-9 w-full justify-between bg-background font-semibold"
            >
              <StatusPill status={detail.status} />
              <ChevronDown className="size-3.5" />
            </Button>

            <Field label="담당자">
              {detail.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar user={detail.assignee} size={20} />
                  <span>{detail.assignee.name}</span>
                </div>
              ) : (
                '미지정'
              )}
            </Field>

            <Field label="보고자">
              {detail.reporter ? (
                <div className="flex items-center gap-2">
                  <Avatar user={detail.reporter} size={20} />
                  <span>{detail.reporter.name}</span>
                </div>
              ) : (
                '—'
              )}
            </Field>

            <Field label="Epic">
              {detail.epic ? <EpicPill epic={detail.epic} /> : '없음'}
            </Field>

            <Field label="스프린트">
              {detail.sprintId !== undefined ? `#${detail.sprintId}` : '—'}
            </Field>

            <Field label="우선순위">
              <div className="flex items-center gap-1.5">
                <PriorityDot priority={detail.priority} />
                <span className="capitalize">{detail.priority}</span>
              </div>
            </Field>

            <Field label="스토리 포인트">
              {detail.storyPoint ?? '—'}
            </Field>

            <Field label="라벨">
              {detail.labels?.length
                ? detail.labels.map((label) => (
                    <span
                      key={label.id}
                      className="mr-1 rounded-sm bg-warm-200 px-2 py-0.5 text-xs"
                    >
                      {label.name}
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

'use client';

import { ChevronsLeft, ChevronsRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SideNavProps {
  activeSpace?: 'veasly' | 'biz';
  activeItemHref?: string;
}

export function SideNav({ activeItemHref = '/' }: SideNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  const isBoardActive =
    activeItemHref === '/' || activeItemHref.startsWith('/sprints/');

  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col overflow-y-auto border-r border-border bg-warm-50 transition-[width] duration-150 ease-out',
        collapsed ? 'w-10' : 'w-60',
      )}
    >
      <div
        className={cn(
          'flex h-10 items-center px-2',
          collapsed && 'justify-center',
        )}
      >
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
          className="size-7"
        >
          {collapsed ? (
            <ChevronsRight className="size-3.5" />
          ) : (
            <ChevronsLeft className="size-3.5" />
          )}
        </Button>
      </div>

      {collapsed ? (
        <div
          aria-hidden
          className="mx-auto mt-2 flex size-[18px] items-center justify-center rounded-sm bg-semantic-orange text-[11px] font-bold text-white"
        >
          V
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-1 px-2 pb-4">
          <div className="px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-warm-400">
            스페이스
          </div>

          <div className="flex items-center gap-2 rounded-md px-2 py-1">
            <div
              aria-hidden
              className="flex size-[18px] items-center justify-center rounded-sm bg-semantic-orange text-[11px] font-bold text-white"
            >
              V
            </div>
            <span className="text-sm font-medium">veasly</span>
          </div>

          <div className="px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-warm-400">
            최근
          </div>

          <Link
            href="/"
            className={cn(
              'block rounded-md px-2 py-1 pl-7 text-sm',
              isBoardActive
                ? 'bg-newndy-blue/12 font-semibold text-newndy-blue-active'
                : 'text-foreground hover:bg-warm-200/60',
            )}
          >
            VEASLY Board
          </Link>

          <div
            className={cn(
              'block rounded-md px-2 py-1 pl-7 text-sm',
              'text-foreground hover:bg-warm-200/60',
            )}
          >
            biz
          </div>

          <button
            type="button"
            className="mt-1 flex items-center gap-1 rounded-md px-2 py-1 text-sm text-warm-400 hover:bg-warm-200/60"
          >
            <Plus className="size-3" />
            추가 스페이스
          </button>
        </div>
      )}
    </aside>
  );
}

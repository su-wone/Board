'use client';

import { Bell, Grid3x3, HelpCircle, Plus, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface TopNavProps {
  onCreate?: () => void;
  onSearchChange?: (q: string) => void;
}

export function TopNav({ onCreate, onSearchChange }: TopNavProps) {
  return (
    <header className="flex h-12 items-center gap-3 border-b border-border bg-background px-4">
      <div className="flex items-center gap-3">
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="앱 전환"
          className="size-8"
        >
          <Grid3x3 className="size-[18px]" />
        </Button>
        <div
          aria-hidden
          className="flex size-[22px] items-center justify-center rounded-sm bg-lavender text-[10px] font-bold text-white"
        >
          N
        </div>
        <span className="text-sm font-semibold">Newndy-Board</span>
      </div>

      <div className="flex flex-1 justify-center">
        <div className="relative w-full max-w-[420px]">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-warm-400" />
          <Input
            type="search"
            placeholder="검색"
            onChange={(event) => onSearchChange?.(event.target.value)}
            className={cn(
              'h-8 border-transparent bg-warm-50 pl-8',
              'focus-visible:bg-background',
            )}
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button
          size="sm"
          onClick={onCreate}
          className={cn(
            'h-8 gap-1 text-sm font-semibold',
            'bg-primary text-primary-foreground hover:bg-newndy-blue-active',
          )}
        >
          <Plus className="size-4" />
          만들기
        </Button>
        <Separator orientation="vertical" className="mx-1 h-5" />
        <Button size="icon-sm" variant="ghost" aria-label="알림" className="size-8">
          <Bell className="size-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" aria-label="도움말" className="size-8">
          <HelpCircle className="size-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" aria-label="설정" className="size-8">
          <Settings className="size-4" />
        </Button>
        <div
          aria-label="내 계정"
          role="img"
          className="ml-1 flex size-7 items-center justify-center rounded-full bg-semantic-orange text-xs font-bold text-white"
        >
          N
        </div>
      </div>
    </header>
  );
}

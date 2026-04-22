'use client';

import { ChevronDown, MoreHorizontal, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { User } from '@/types/board';
import { Avatar } from './Avatar';

interface FilterRowProps {
  onCreate?: () => void;
  onSearchChange?: (q: string) => void;
  assignees?: User[];
}

export function FilterRow({
  onCreate,
  onSearchChange,
  assignees = [],
}: FilterRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border px-6 py-3">
      <div className="relative w-[200px]">
        <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-warm-400" />
        <Input
          placeholder="보드 검색"
          onChange={(event) => onSearchChange?.(event.target.value)}
          className="h-[30px] pl-7 text-sm"
        />
      </div>

      <div className="flex items-center -space-x-1.5">
        {assignees.slice(0, 6).map((user) => (
          <Avatar
            key={user.id}
            user={user}
            size={26}
            className="ring-2 ring-background"
          />
        ))}
        <Button
          size="icon-sm"
          variant="outline"
          aria-label="담당자 추가"
          className="ml-1 size-[26px] rounded-full"
        >
          <Plus className="size-3" />
        </Button>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="h-[30px] gap-1 text-xs font-medium"
      >
        Epic <ChevronDown className="size-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-[30px] gap-1 text-xs font-medium"
      >
        유형 <ChevronDown className="size-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-[30px] gap-1 text-xs font-medium"
      >
        빠른 필터 <ChevronDown className="size-3" />
      </Button>

      <div className="flex-1" />

      <Button size="sm" onClick={onCreate} className="h-[30px] gap-1">
        <Plus className="size-3.5" />
        업무 만들기
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="검색"
        className="size-[30px]"
      >
        <Search className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="더보기"
        className="size-[30px]"
      >
        <MoreHorizontal className="size-4" />
      </Button>

      <Button variant="outline" size="sm" className="h-[30px] gap-1">
        그룹 <ChevronDown className="size-3" />
      </Button>
    </div>
  );
}

import { Bookmark, Check, Circle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IssueType } from '@/types/board';

const TYPE_STYLE: Record<IssueType, string> = {
  TASK: 'bg-newndy-blue',
  SUB_TASK: 'bg-newndy-blue',
  BUG: 'bg-semantic-orange',
  STORY: 'bg-semantic-green',
  EPIC: 'bg-lavender-deep',
};

interface TypeIconProps {
  type: IssueType;
  className?: string;
}

export function TypeIcon({ type, className }: TypeIconProps) {
  const Icon =
    type === 'TASK' || type === 'SUB_TASK'
      ? Check
      : type === 'BUG'
        ? Circle
        : type === 'STORY'
          ? Bookmark
          : Zap;

  return (
    <span
      aria-label={`이슈 타입 ${type}`}
      className={cn(
        'inline-flex h-[14px] w-[14px] items-center justify-center rounded-sm text-white',
        TYPE_STYLE[type],
        className,
      )}
    >
      <Icon
        className={cn(
          'h-[9px] w-[9px]',
          type === 'BUG' && 'fill-white',
        )}
        strokeWidth={3}
      />
    </span>
  );
}

import { Bookmark, Check, Circle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IssueType } from '@/types/board';

const TYPE_STYLE: Record<IssueType, string> = {
  task: 'bg-newndy-blue',
  bug: 'bg-semantic-orange',
  story: 'bg-semantic-green',
  epic: 'bg-lavender-deep',
};

interface TypeIconProps {
  type: IssueType;
  className?: string;
}

export function TypeIcon({ type, className }: TypeIconProps) {
  const Icon =
    type === 'task'
      ? Check
      : type === 'bug'
        ? Circle
        : type === 'story'
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
          type === 'bug' && 'fill-white',
        )}
        strokeWidth={3}
      />
    </span>
  );
}

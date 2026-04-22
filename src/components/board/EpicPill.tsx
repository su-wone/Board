import { cn } from '@/lib/utils';
import type { Epic } from '@/types/board';

const COLOR_STYLE: Record<Epic['color'], string> = {
  lavender: 'bg-lavender-soft text-lavender-deep',
  teal: 'bg-semantic-teal/10 text-semantic-teal',
  orange: 'bg-semantic-orange/10 text-semantic-orange',
  purple: 'bg-epic-purple/10 text-epic-purple',
  brown: 'bg-epic-brown/10 text-epic-brown',
};

interface EpicPillProps {
  epic: Epic;
  className?: string;
}

export function EpicPill({ epic, className }: EpicPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-sm px-2 py-0.5',
        'text-[11px] font-semibold leading-none',
        COLOR_STYLE[epic.color],
        className,
      )}
    >
      {epic.name}
    </span>
  );
}

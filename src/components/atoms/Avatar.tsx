import { cn } from '@/lib/utils';
import type { User } from '@/types/board';

interface AvatarProps {
  user?: User | null;
  size?: 20 | 26 | 28;
  className?: string;
}

const SIZE_CLASS: Record<NonNullable<AvatarProps['size']>, string> = {
  20: 'h-5 w-5',
  26: 'h-[26px] w-[26px]',
  28: 'h-7 w-7',
};

const DEFAULT_AVATAR_COLOR = '#615d59';

export function Avatar({ user, size = 20, className }: AvatarProps) {
  const base = cn(
    'inline-flex items-center justify-center rounded-full font-bold text-white select-none',
    'text-[10px] leading-none',
    SIZE_CLASS[size],
    className,
  );

  if (!user) {
    return (
      <span
        aria-label="담당자 없음"
        className={cn(base, 'bg-warm-200 text-warm-600')}
      >
        —
      </span>
    );
  }

  const initial = user.name.slice(0, 1).toUpperCase();

  return (
    <span
      aria-label={user.name}
      className={base}
      style={{ backgroundColor: DEFAULT_AVATAR_COLOR }}
    >
      {initial}
    </span>
  );
}

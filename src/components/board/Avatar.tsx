import { cn } from '@/lib/utils';
import type { User } from '@/types/board';

interface AvatarProps {
  user?: User;
  size?: 20 | 26 | 28;
  className?: string;
}

const SIZE_CLASS: Record<NonNullable<AvatarProps['size']>, string> = {
  20: 'h-5 w-5',
  26: 'h-[26px] w-[26px]',
  28: 'h-7 w-7',
};

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

  // User.avatarColor stores a hex literal (see src/lib/mock/board-mock.ts).
  // Tailwind cannot generate dynamic arbitrary hex classes at build time, so
  // inline style is the one sanctioned exception for per-user color.
  return (
    <span
      aria-label={user.name}
      className={base}
      style={{ backgroundColor: user.avatarColor }}
    >
      {user.initial}
    </span>
  );
}

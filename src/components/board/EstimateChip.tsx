import { cn } from '@/lib/utils';

type EstimateVariant = 'onWhite' | 'onGray';

const VARIANT_STYLE: Record<EstimateVariant, string> = {
  onWhite: 'bg-white',
  onGray: 'bg-warm-50',
};

interface EstimateChipProps {
  value: number;
  variant?: EstimateVariant;
  className?: string;
}

export function EstimateChip({
  value,
  variant = 'onWhite',
  className,
}: EstimateChipProps) {
  return (
    <span
      className={cn(
        'inline-flex min-w-6 items-center justify-center rounded-sm border border-black/10 px-1.5 py-px',
        'text-[11px] font-medium leading-none text-warm-600',
        VARIANT_STYLE[variant],
        className,
      )}
    >
      {value}
    </span>
  );
}

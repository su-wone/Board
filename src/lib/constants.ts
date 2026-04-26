import type { Priority } from '@/types/board';

export const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'HIGH', label: 'High' },
  { value: 'MEDIUM', label: 'Med' },
  { value: 'LOW', label: 'Low' },
];

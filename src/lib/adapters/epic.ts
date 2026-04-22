import type { Epic } from '@/types/board';
import type { ServerEpic } from '@/types/server';

export function toEpic(e: ServerEpic): Epic {
  return { id: e.id, name: e.name, color: e.color };
}

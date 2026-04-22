import { toEpic } from '@/lib/adapters';
import type { Epic } from '@/types/board';
import type { ServerEpic } from '@/types/server';
import { api } from './client';

export async function getEpics(): Promise<Epic[]> {
  const epics = await api<ServerEpic[]>('/epics');
  return epics.map(toEpic);
}

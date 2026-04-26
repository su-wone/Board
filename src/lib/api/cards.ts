import type { Ticket } from '@/types/board';
import { api } from './client';

export interface CreateCardInput {
  title: string;
  workflowId: number;
  sprintId: number | null;
  type?: string;
  priority?: string;
  epicId?: number;
}

export async function getCards(sprintId?: number | 'null'): Promise<Ticket[]> {
  const params = new URLSearchParams();
  if (sprintId === 'null') params.set('sprintId', 'null');
  else if (sprintId !== undefined) params.set('sprintId', String(sprintId));
  const qs = params.toString();
  return api<Ticket[]>(`/cards${qs ? `?${qs}` : ''}`);
}

export async function getCard(id: number): Promise<Ticket> {
  return api<Ticket>(`/cards/${id}`);
}

export async function createCard(input: CreateCardInput): Promise<void> {
  await api<unknown>('/cards', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

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

export async function getCards(sprintId?: number | null): Promise<Ticket[]> {
  if (sprintId === undefined) return api<Ticket[]>('/cards');
  return api<Ticket[]>(`/cards?sprintId=${sprintId}`);
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

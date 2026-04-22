import {
  fromCreateTicket,
  toTicket,
  type UICreateInput,
} from '@/lib/adapters';
import type { Ticket } from '@/types/board';
import type { ServerCard } from '@/types/server';
import { api } from './client';

export async function getCards(sprintId?: number | 'null'): Promise<Ticket[]> {
  const params = new URLSearchParams();
  if (sprintId === 'null') params.set('sprintId', 'null');
  else if (sprintId !== undefined) params.set('sprintId', String(sprintId));
  const qs = params.toString();
  const cards = await api<ServerCard[]>(`/cards${qs ? `?${qs}` : ''}`);
  return cards.map(toTicket);
}

export async function getCard(id: number): Promise<Ticket> {
  const card = await api<ServerCard>(`/cards/${id}`);
  return toTicket(card);
}

export async function createCard(input: UICreateInput): Promise<Ticket> {
  const dto = fromCreateTicket(input);
  const created = await api<ServerCard>('/cards', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return toTicket(created);
}

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

export async function createCard(input: UICreateInput): Promise<void> {
  const dto = fromCreateTicket(input);
  // POST 응답이 GET 과 shape 이 달라서 (관계 객체 없음) 어댑터를 태우지 않음.
  // 호출 측에서 router.refresh() 로 서버 컴포넌트를 재페치해 정상 shape 의
  // 카드를 받아오는 것이 안전함.
  await api<unknown>('/cards', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

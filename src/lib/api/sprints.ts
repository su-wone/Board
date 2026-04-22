import { toSprint } from '@/lib/adapters';
import type { Sprint } from '@/types/board';
import type { ServerSprint } from '@/types/server';
import { api } from './client';

export async function getSprints(): Promise<Sprint[]> {
  const sprints = await api<ServerSprint[]>('/sprints');
  return sprints.map(toSprint);
}

export async function getSprint(id: number): Promise<Sprint> {
  const sprint = await api<ServerSprint>(`/sprints/${id}`);
  return toSprint(sprint);
}

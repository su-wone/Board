import type { Sprint } from '@/types/board';
import { api } from './client';

export async function getSprints(): Promise<Sprint[]> {
  return api<Sprint[]>('/sprints');
}

export async function getSprint(id: number): Promise<Sprint> {
  return api<Sprint>(`/sprints/${id}`);
}

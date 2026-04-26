import type { Workflow } from '@/types/board';
import { api } from './client';

export async function getWorkflows(): Promise<Workflow[]> {
  return api<Workflow[]>('/workflows');
}

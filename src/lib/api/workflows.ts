import type { ServerWorkflow } from '@/types/server';
import { api } from './client';

export async function getWorkflows(): Promise<ServerWorkflow[]> {
  return api<ServerWorkflow[]>('/workflows');
}

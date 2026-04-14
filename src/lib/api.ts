import { Card } from "@/types/card";
import { Sprint } from "@/types/sprint";
import { Workflow } from "@/types/workflow";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export interface CardsQuery {
  sprintId?: number | null;
}

export function getCards(query: CardsQuery = {}) {
  const params = new URLSearchParams();
  if (query.sprintId === null) params.set("sprintId", "null");
  else if (query.sprintId !== undefined) params.set("sprintId", String(query.sprintId));
  const qs = params.toString();
  return request<Card[]>(`/cards${qs ? `?${qs}` : ""}`);
}

export const getSprints = () => request<Sprint[]>("/sprints");
export const getSprintById = (id: number) => request<Sprint>(`/sprints/${id}`);
export const getWorkflows = () => request<Workflow[]>("/workflows");

"use server";

import { revalidatePath } from "next/cache";
import { createCard, CreateCardInput } from "@/lib/api";

export async function createCardAction(input: CreateCardInput) {
  await createCard(input);
  revalidatePath("/");
  revalidatePath("/sprints/[sprintId]/board", "page");
}

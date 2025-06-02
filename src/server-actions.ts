"use server";

import { revalidateTag } from "next/cache";
import { supabase } from "@/lib/supabaseClient";

const BLACKLIST = [
  "dumb",
  "idiot",
  "stupid",
  "fool",
  "hate",
  "kill",
  "die",
  "sex",
];
const MAX_LENGTH = 80;

export async function addTodo(prevState: any, formData: FormData) {
  const task = formData.get("task")?.toString().trim();
  const image = formData.get("image")?.toString().trim() || null;

  if (!task) return { error: "field cannot be empty" };
  if (BLACKLIST.some((bad) => task.toLowerCase().includes(bad)))
    return { error: "dirty words are not permitted" };
  if (task.length > MAX_LENGTH)
    return {
      error: `please use a maximum of ${MAX_LENGTH} characters. you used (${task.length})`,
    };

  const { error } = await supabase.from("todos").insert({ task, image });

  if (error) return { error: error.message };

  revalidateTag("todos");
  return {};
}

export async function toggleTodo(formData: FormData) {
  const id = Number(formData.get("id"));

  const { data, error } = await supabase
    .from("todos")
    .select("checked")
    .eq("id", id)
    .single();

  if (error || !data) return;

  await supabase.from("todos").update({ checked: !data.checked }).eq("id", id);

  revalidateTag("todos");
}

export async function deleteTodo(formData: FormData) {
  const id = Number(formData.get("id"));

  await supabase.from("todos").delete().eq("id", id);

  revalidateTag("todos");
}

import { supabase } from "./lib/supabaseClient";

export async function getTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: false });
  if (error) throw error;
  return data;
}

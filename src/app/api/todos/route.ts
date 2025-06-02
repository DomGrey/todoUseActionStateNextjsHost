import { NextResponse } from "next/server";
import { getTodos } from "@/queries";

export async function GET() {
  const todos = await getTodos();
  return NextResponse.json(todos);
}

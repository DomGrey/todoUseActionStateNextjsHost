"use client";

import { useActionState } from "react";
import { addTodo } from "@/server-actions";
import { Input } from "./ui/input";
import { SubmitButton } from "./ui/submit-button";

const initialState: { error?: string } = {};

export function AddTodoForm() {
  const [state, formAction] = useActionState(addTodo, initialState);
  const error = state?.error;

  return (
    <form
      action={formAction}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-gray-200"
    >
      <div className="space-y-1">
        <Input
          name="task"
          placeholder="What needs to be done?"
          className={error ? "border-red-500 bg-red-50" : ""}
          //   required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <Input name="image" placeholder="Image URL (optional)" />
      <SubmitButton>Add Todo</SubmitButton>
    </form>
  );
}

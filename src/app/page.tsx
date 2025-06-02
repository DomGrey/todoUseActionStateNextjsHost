import { getTodos } from "@/queries";
import { AddTodoForm } from "@/components/addTodoForm";
import { TodoListItem } from "@/components/todoListItem";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="max-w-2xl mx-auto py-10 px-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800">
        My Todo List
      </h1>

      <AddTodoForm />

      <ul className="space-y-4">
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-400 italic">No tasks yet</p>
      )}
    </main>
  );
}

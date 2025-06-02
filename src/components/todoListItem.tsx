import { Todo } from "@/types";
import { toggleTodo, deleteTodo } from "@/server-actions";
import { Button } from "./ui/button";

export function TodoListItem({ todo }: { todo: Todo }) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-xl shadow border hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <form action={toggleTodo}>
          <input type="hidden" name="id" value={todo.id} />
          <Button type="submit" variant="outline" className="w-8 h-8">
            {todo.checked ? "✅" : "⬜"}
          </Button>
        </form>

        <div>
          <p
            className={`text-lg ${
              todo.checked ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.task}
          </p>
          {todo.image && (
            <img
              src={todo.image}
              alt="Todo"
              className="mt-2 max-w-xs rounded-md shadow"
            />
          )}
        </div>
      </div>

      <form action={deleteTodo}>
        <input type="hidden" name="id" value={todo.id} />
        <Button type="submit" variant="destructive">
          🗑
        </Button>
      </form>
    </li>
  );
}

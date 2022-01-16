import Link from "next/link";
import React from "react";
import { getDatabaseClient } from "supabase-sdk";
import { useTodos } from "../../hooks/useTodos";
import { Todo } from "../../ts/Todo";

const { deleteTodo } = getDatabaseClient({
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
});

export const Todos = () => {
  const { data, mutate, error } = useTodos();

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>loading...</p>;
  }

  const { data: todos } = data;

  const onDeleteHandler = async ({ todo }: { todo: Todo }) => {
    if (window.confirm("Sure you want to delete this todo?")) {
      await deleteTodo({ id: todo?.id });
      mutate();
    }
  };

  return (
    <section>
      <h2>Todos</h2>
      <ul>
        {todos?.map((todo) => {
          return (
            <li
              key={todo.id}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TodoItem
                todo={todo}
                onDeleteHandler={() => onDeleteHandler({ todo })}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const TodoItem = ({
  todo,
  onDeleteHandler,
}: {
  todo: Todo;
  onDeleteHandler: () => Promise<void>;
}) => {
  return (
    <article>
      <header>
        <h3>{todo.description}</h3>
      </header>

      <label htmlFor="done">
        Is it done?{" "}
        <input
          type="checkbox"
          name="done"
          id="done"
          disabled={true}
          checked={todo.done}
        />
      </label>

      <footer>
        <Link href={`/todos/edit/${todo?.id}`}>Edit</Link>
        <button onClick={onDeleteHandler}>Delete</button>
      </footer>
    </article>
  );
};

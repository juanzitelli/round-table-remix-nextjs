import { Link, useLoaderData } from "remix";
import { TodoItem } from "../../components/TodoItem";
import { getTodos } from "../../server/db";
import { Todo } from "../../ts/Todo";

export const loader = async () => {
  const todos = await getTodos();

  return todos;
};

export default function TodosPage() {
  const { data: todos } = useLoaderData<{ data: Todo[] }>();

  return (
    <section>
      <h2>Todos list</h2>
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
              <TodoItem todo={todo} />
            </li>
          );
        })}
      </ul>
      <Link to="/todos/new">Add a new todo</Link>
    </section>
  );
}

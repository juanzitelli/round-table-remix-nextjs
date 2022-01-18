import { Link } from "remix";
import { Todo } from "../ts/Todo";

export const TodoItem = ({ todo }: { todo: Todo }) => {
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
        <Link to={`/todos/edit/${todo?.id}`}>Edit</Link>
      </footer>
    </article>
  );
};

import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { deleteTodo, getTodoById, updateTodo } from "../../../server/db";
import { Todo } from "../../../ts/Todo";

type LoaderData = { data: [Todo] };

type FormErrors = {
  description?: boolean;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  if (formData.get("_method") === "delete") {
    await deleteTodo({ id: params.id });

    return redirect("/todos");
  }

  await new Promise((res) => setTimeout(res, 1000)); // Form delayed on purpose for demo reasons

  const description = formData.get("description");
  const done = formData.get("done") ?? false;

  const errors: FormErrors = {};

  if (!description) errors.description = true;

  if (Object.keys(errors).length) {
    // Errors obj has at least one key
    return errors;
  }

  const todo = { id: params.id, description, done };

  await updateTodo({ todo });

  return redirect("/todos");
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  return await getTodoById({ id });
};

export default function NewTodoPage() {
  const { data } = useLoaderData<LoaderData>();

  if (!data.length) {
    return <p>We didn't find any todo with that id :(</p>;
  }

  const [todo] = data;

  const errors = useActionData<FormErrors | undefined>();

  const transition = useTransition();

  return (
    <>
      <Form method="post">
        <header>
          <h2>Edit todo: {todo.description}</h2>
        </header>

        <label htmlFor="description">
          Description
          <input
            name="description"
            id="description"
            type="text"
            defaultValue={todo.description}
          />
        </label>

        <p
          style={{
            color: "red",
          }}
        >
          {errors?.description}
        </p>

        <label htmlFor="done">
          Done:
          <input
            name="done"
            id="done"
            type="checkbox"
            defaultChecked={todo.done}
          />
        </label>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div>
            <button disabled={!!transition.submission} type="submit">
              {transition.state === "submitting" ? "Submitting...." : "Submit"}
            </button>
          </div>

          <div>
            <Link to="/todos">Cancel</Link>
          </div>

          <div>
            <form method="post">
              <input type="hidden" name="_method" value="delete" />
              <button
                style={{
                  color: "red",
                }}
                type="submit"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </Form>
    </>
  );
}

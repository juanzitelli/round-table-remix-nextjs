import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
  useTransition,
} from "remix";

import { createTodo } from "../../server/db";

type FormErrors = {
  description?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000)); // Form delayed on purpose for demo reasons
  const formData = await request.formData();

  const description = formData.get("description");
  const done = formData.get("done") ?? false;

  const errors: FormErrors = {};

  if (!description) errors.description = true;

  if (Object.keys(errors).length) {
    // Errors obj has at least one key
    return errors;
  }

  const todo = { description, done };

  await createTodo({ todo });

  return redirect("/todos");
};

export default function NewTodoPage() {
  const errors = useActionData<FormErrors | undefined>();

  const transition = useTransition();
  return (
    <>
      <Form method="post">
        <header>
          <h2>Add a new todo</h2>
        </header>

        <label htmlFor="description">
          Description
          <input name="description" id="description" type="text" />
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
          <input name="done" id="done" type="checkbox" />
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

import { useRouter } from "next/router";
import React from "react";
import { BaseTodoForm, Inputs } from "../../components/forms/BaseTodoForm";
import { useTodos } from "../../hooks/useTodos";
import { createTodo } from "../../server/db";

interface Props {}

const NewTodoPage = (props: Props) => {
  const { push } = useRouter();

  const { mutate } = useTodos();

  const onSubmit = async (todoData: Inputs) => {
    await createTodo({ todo: todoData });

    mutate();
    push("/todos");
  };

  const defaultValues = {
    description: "",
    done: false,
  };

  const header = "Create a new todo";
  return (
    <div>
      <BaseTodoForm
        onSubmit={onSubmit}
        header={header}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default NewTodoPage;

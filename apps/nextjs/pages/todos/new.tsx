import { useRouter } from "next/router";
import React from "react";
import { getDatabaseClient } from "supabase-sdk";
import { BaseTodoForm, Inputs } from "../../components/forms/BaseTodoForm";
import { useTodos } from "../../hooks/useTodos";

interface Props {}

const NewTodoPage = (props: Props) => {
  const { push } = useRouter();

  const { mutate } = useTodos();

  const onSubmit = async (todoData: Inputs) => {
    const { createTodo } = getDatabaseClient({
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    });

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

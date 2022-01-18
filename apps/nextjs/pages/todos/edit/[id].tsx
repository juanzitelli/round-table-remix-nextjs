import { useRouter } from "next/router";
import React from "react";
import { getDatabaseClient } from "supabase-sdk";
import { BaseTodoForm } from "../../../components/forms/BaseTodoForm";
import { useTodo } from "../../../hooks/useTodo";
import { Todo } from "../../../ts/Todo";

interface Props {}

const EditSingleTodoPage = (props: Props) => {
  const { updateTodo } = getDatabaseClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  });

  const {
    query: { id },
    push,
  } = useRouter();

  const { data, error, mutate } = useTodo({ id: id as string });

  if (!id) {
    return <p>{`Something went wrong. The param id couldn't be obtained`}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>loading...</p>;
  }

  const {
    data: { 0: todo },
  } = data;

  const onSubmit = async (data: Todo) => {
    await updateTodo({ todo: data });
    mutate();
    push("/todos");
  };

  return (
    <>
      <h1>Update single todo</h1>
      <BaseTodoForm
        onSubmit={onSubmit}
        defaultValues={todo}
        header={`Edit todo: ${todo.description}`}
      />
    </>
  );
};

export default EditSingleTodoPage;

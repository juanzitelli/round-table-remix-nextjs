import { GetServerSideProps } from "next";
import React from "react";
import { getDatabaseClient } from "supabase-sdk";
import { Todo } from "../../../ts/Todo";

interface Props {
  todos: Todo[];
}

const SSRFetchingTodosPage = ({ todos }: Props) => {
  return (
    <div>
      <h1>Server Side Rendering</h1>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
};

export default SSRFetchingTodosPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const { getTodos } = getDatabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  const { data: todos } = await getTodos();

  return {
    props: {
      todos,
    },
  };
};

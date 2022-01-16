import { GetStaticProps } from "next";
import React from "react";
import { getDatabaseClient } from "supabase-sdk";
import { SWRConfig } from "swr";
import { Todos } from "../../modules/Todos";
import { Todo } from "../../ts/Todo";

interface Props {
  todos: Todo[];
}

const TodosPage = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <div>
        <Todos />
      </div>
    </SWRConfig>
  );
};

export default TodosPage;

export const getStaticProps: GetStaticProps = async () => {
  const { getTodos } = getDatabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  const { data: todos } = await getTodos();

  return {
    props: {
      fallback: {
        todos,
      },
    },
  };
};

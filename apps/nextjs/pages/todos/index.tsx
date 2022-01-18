import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { SWRConfig } from "swr";
import { Todos } from "../../modules/todos/Todos";
import { getTodos } from "../../server/db";

const TodosPage = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <main>
        <h1>Static Generation</h1>
        <Todos />
        <Link href="/todos/new">
          <a>Add a new todo</a>
        </Link>
      </main>
    </SWRConfig>
  );
};

export default TodosPage;

export const getStaticProps: GetStaticProps = async () => {
  const { data: todos } = await getTodos();

  return {
    props: {
      fallback: {
        todos,
      },
    },
  };
};

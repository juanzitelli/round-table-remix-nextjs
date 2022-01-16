import React from "react";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../ts/Todo";

export const Todos = () => {
  const {
    data: { data: todos },
  } = useTodos();
  return <pre>{JSON.stringify(todos, null, 2)}</pre>;
};

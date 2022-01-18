import useSWR from "swr";
import { getTodos } from "../server/db";
import { Todo } from "../ts/Todo";

type TodosHookReturnType = { data: Todo[] };

export const useTodos = () => {
  return useSWR<TodosHookReturnType>("todos", getTodos);
};

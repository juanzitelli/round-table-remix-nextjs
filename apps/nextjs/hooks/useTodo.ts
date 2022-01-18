import useSWR from "swr";
import { getTodoById } from "../server/db";
import { Todo } from "../ts/Todo";

export const useTodo = ({ id }: { id: string }) => {
  type SingleTodoHookReturnType = { data: [Todo] };

  return useSWR<SingleTodoHookReturnType>(`todo-${id}`, () =>
    getTodoById({ id })
  );
};

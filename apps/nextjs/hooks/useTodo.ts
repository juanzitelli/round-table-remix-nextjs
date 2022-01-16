import { getDatabaseClient } from "supabase-sdk";
import useSWR from "swr";
import { Todo } from "../ts/Todo";

export const useTodo = ({ id }: { id: string }) => {
  type SingleTodoHookReturnType = { data: [Todo] };

  const { getTodoById } = getDatabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  return useSWR<SingleTodoHookReturnType>(`todo-${id}`, () =>
    getTodoById({ id })
  );
};

import { getDatabaseClient } from "supabase-sdk";
import useSWR from "swr";
import { Todo } from "../ts/Todo";

type TodosHookReturnType = { data: Todo[] };

export const useTodos = () => {
  const { getTodos } = getDatabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  return useSWR<TodosHookReturnType>("todos", getTodos);
};

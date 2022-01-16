import { getDatabaseClient } from "supabase-sdk";
import useSWR from "swr";

export const useTodos = () => {
  const { getTodos } = getDatabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  const test = useSWR("todos", getTodos);

  console.log(test);

  return test;
};

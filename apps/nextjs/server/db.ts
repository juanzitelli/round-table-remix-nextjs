import { getDatabaseClient } from "supabase-sdk";

const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } =
  getDatabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };

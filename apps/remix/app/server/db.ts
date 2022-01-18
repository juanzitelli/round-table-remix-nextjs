import { getDatabaseClient } from "supabase-sdk";

const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } =
  getDatabaseClient({
    supabaseKey: process.env.SUPABASE_KEY || "",
    supabaseUrl: process.env.SUPABASE_URL || "",
  });

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };

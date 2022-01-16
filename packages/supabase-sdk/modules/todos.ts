import { createClient, SupabaseClientOptions } from "@supabase/supabase-js";

export const getDatabaseClient = (params: {
  supabaseUrl: string;
  supabaseKey: string;
  options?: SupabaseClientOptions | undefined;
}) => {
  if (!params.supabaseKey || !params.supabaseUrl) {
    throw new Error(
      "Both a supabase key and url are required for the supabase-sdk package to work"
    );
  }

  const options = params.options ?? {};

  const client = createClient(params.supabaseKey, params.supabaseUrl, options);

  if (!client) {
    throw new Error(
      "Something went wrong trying to create the supabase client, revise the supabase values provided to ``getDatabaseClient"
    );
  }

  const createTodo = () => {};
  const updateTodo = () => {};
  const deleteTodo = () => {};
  const getTodos = async () => {
    return await client.from("todos").select("*");
  };
  const getTodoById = () => {};

  return {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    getTodoById,
  };
};

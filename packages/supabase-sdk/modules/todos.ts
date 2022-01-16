import { createClient, SupabaseClientOptions } from "@supabase/supabase-js";

type GetDatabaseClient = (params: {
  supabaseUrl: string;
  supabaseKey: string;
  options?: SupabaseClientOptions | undefined;
}) => Record<string, Function>;

export const getDatabaseClient: GetDatabaseClient = ({
  supabaseKey,
  supabaseUrl,
  options: supabaseOptions,
}) => {
  if (!supabaseKey || !supabaseUrl) {
    throw new Error(
      "Both a supabase key and url are required for the supabase-sdk package to work"
    );
  }

  const options = supabaseOptions ?? {};

  const client = createClient(supabaseUrl, supabaseKey, options);

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

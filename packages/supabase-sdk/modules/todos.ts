import { createClient, SupabaseClientOptions } from "@supabase/supabase-js";

const TODOS_TABLE_NAME = "todos";

type Todo = {
  id?: string;
  description: string;
  is_completed: boolean;
};

type GetDatabaseClient = (params: {
  supabaseUrl: string;
  supabaseKey: string;
  options?: SupabaseClientOptions | undefined;
}) => any;

export const getDatabaseClient: GetDatabaseClient = ({
  supabaseKey,
  supabaseUrl,
  options,
}) => {
  if (!supabaseKey || !supabaseUrl) {
    throw new Error(
      "Both a supabase key and url are required for the supabase-sdk package to work"
    );
  }

  const supabaseOptions = options ?? {};

  const client = createClient(supabaseUrl, supabaseKey, supabaseOptions);

  if (!client) {
    throw new Error(
      "Something went wrong trying to create the supabase client, revise the supabase values provided to ``getDatabaseClient"
    );
  }

  const createTodo = async ({ todo }: { todo: Todo }) => {
    return await client.from(TODOS_TABLE_NAME).insert(todo);
  };

  const updateTodo = async ({ todo }: { todo: Todo }) => {
    const { id, ...data } = todo;

    if (!id) {
      throw new Error("The todo item ID is required.");
    }

    return await client.from(TODOS_TABLE_NAME).update(data).eq("id", id);
  };

  const deleteTodo = async ({ id }: { id: string }) => {
    if (!id) {
      throw new Error("The todo item ID is required.");
    }

    return await client.from(TODOS_TABLE_NAME).delete().eq("id", id);
  };

  const getTodoById = async ({ id }: { id: string }) => {
    if (!id) {
      throw new Error("The todo item ID is required.");
    }

    return await client.from(TODOS_TABLE_NAME).select("*").eq("id", id);
  };

  const getTodos = async () => {
    return await client.from(TODOS_TABLE_NAME).select("*");
  };

  return {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    getTodoById,
  };
};

import { useLoaderData } from "remix";
import { getDatabaseClient } from "supabase-sdk";

export const loader = async () => {
  const supabaseKey = process.env.SUPABASE_KEY || "";
  const supabaseUrl = process.env.SUPABASE_URL || "";

  const client = getDatabaseClient({
    supabaseKey,
    supabaseUrl,
  });

  const { data: todos } = await client.getTodos();

  return todos;
};

export default function Index() {
  const data = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

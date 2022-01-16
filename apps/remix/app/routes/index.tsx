import { useLoaderData } from "remix";
import { getDatabaseClient } from "supabase-sdk";

console.log(process.env.SUPABASE_KEY, process.env.SUPABASE_URL);

export const loader = async () => {
  const client = getDatabaseClient({
    supabaseKey: process.env.SUPABASE_KEY || "",
    supabaseUrl: process.env.SUPABASE_URL || "",
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

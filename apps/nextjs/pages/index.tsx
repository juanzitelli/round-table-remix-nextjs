import { Button } from "ui";
import { getDatabaseClient } from "supabase-sdk";
export default function Web() {
  const client = getDatabaseClient({
    supabaseKey: process.env.SUPABASE_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
  });

  const data = client.getTodos();
  return (
    <div>
      <h1>Web</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button />
    </div>
  );
}

import { Button } from "ui";
import { getDatabaseClient } from "supabase-sdk";
import React from "react";
export default function Web() {
  const [todos, setTodos] = React.useState(null);

  React.useEffect(() => {
    client.getTodos().then(({ data }) => setTodos(data));
  });

  const client = getDatabaseClient({
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  return (
    <div>
      <h1>Web</h1>

      <pre>{JSON.stringify(todos, null, 2)}</pre>
      <Button />
    </div>
  );
}

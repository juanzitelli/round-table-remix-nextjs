import React from "react";
import { getTodos } from "../server/db";
export default function Web() {
  const [todos, setTodos] = React.useState(null);

  React.useEffect(() => {
    getTodos().then(({ data }) => setTodos(data));
  });

  return (
    <div>
      <h1>Client Side Fetching</h1>

      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
}

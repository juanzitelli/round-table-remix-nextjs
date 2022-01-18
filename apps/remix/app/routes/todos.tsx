import { Link, Outlet } from "remix";

export default function TodosLayout() {
  return (
    <>
      <h1>Todos page</h1>
      <Outlet />
    </>
  );
}

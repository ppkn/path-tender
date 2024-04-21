import { Link, useLoaderData } from "@remix-run/react";
import { pb } from "~/pocketbase";

export const clientLoader = async () => {
  return { entries: await pb.collection("entries").getFullList() };
};
export default function AppIndex() {
  const { entries } = useLoaderData<typeof clientLoader>();
  return entries.length ? (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          <Link to={`/entry/${entry.id}`}>{entry.created}</Link>
        </li>
      ))}
    </ul>
  ) : (
    <Link to={"/entry/new"}>Create your first entry</Link>
  );
}

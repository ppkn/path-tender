import { Link, useLoaderData } from "@remix-run/react";
import { pb } from "~/pocketbase";

export const clientLoader = async () => {
  return {
    entries: await pb.collection("entries").getFullList({
      sort: "-created",
    }),
  };
};

export default function AppIndex() {
  const { entries } = useLoaderData<typeof clientLoader>();
  return entries.length ? (
    entries.map((entry) => {
      const photoUrl = pb.files.getUrl(entry, entry.photo, {
        thumb: "100x100",
      });
      return (
        <Link to={`/entry/${entry.id}`} key={entry.id}>
          <article className="flex items-center gap-x-2">
            <img className="rounded-lg" src={photoUrl} alt="" />
            <div className="max-h-28 overflow-hidden text-ellipsis whitespace-nowrap">
              {entry.notes}
            </div>
          </article>
        </Link>
      );
    })
  ) : (
    <Link to={"/entry/new"}>Create your first entry</Link>
  );
}

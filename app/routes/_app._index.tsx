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
          <article
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "0.5em",
            }}
          >
            <img
              src={photoUrl}
              alt=""
              style={{
                borderRadius: "0.5em",
              }}
            />
            <div
              style={{
                maxHeight: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
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

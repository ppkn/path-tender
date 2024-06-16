import { Link, useLoaderData } from "@remix-run/react";
import { buttonVariants } from "~/components/ui/button";
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
  return (
    <div className="p-6 flex flex-col gap-5">
      {entries.length ? (
        entries.map((entry) => {
          const photoUrl = pb.files.getUrl(entry, entry.photo, {
            thumb: "100x100",
          });
          return (
            <div key={entry.id} className="p-6 shadow-md rounded-md">
              <Link to={`/entry/${entry.id}`}>
                <article className="flex items-center gap-x-2">
                  <img className="rounded-lg" src={photoUrl} alt="" />
                  <div className="max-h-28 overflow-hidden text-ellipsis whitespace-nowrap">
                    {entry.notes}
                  </div>
                </article>
              </Link>
            </div>
          );
        })
      ) : (
        <Link to={"/entry/new"} className={buttonVariants()}>
          Create your first entry
        </Link>
      )}
    </div>
  );
}

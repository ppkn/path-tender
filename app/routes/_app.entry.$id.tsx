import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  Form,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { pb } from "~/pocketbase";

import Map from "~/components/map.client";
import { Button } from "~/components/ui/button";

export const clientAction = async ({ params }: ClientActionFunctionArgs) => {
  const { id } = params;
  invariant(id, "id missing");
  await pb.collection("entries").delete(id);
  return redirect("/");
};

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const { id } = params;
  invariant(id, "no id in route");
  const entry = await pb.collection("entries").getOne(id);
  return { entry };
};

export default function ShowEntry() {
  const { entry } = useLoaderData<typeof clientLoader>();
  const photoUrl = pb.files.getUrl(entry, entry.photo);

  return (
    <section className="p-6 flex flex-col gap-y-4">
      <figure>
        <img src={photoUrl} alt="" className="rounded-lg" />
        {entry.notes && <figcaption>Notes {entry.notes}</figcaption>}
      </figure>

      <Map entry={entry} />
      <Form method="post">
        <Button variant="destructive-outline" type="submit">
          🗑️ Delete
        </Button>
      </Form>
    </section>
  );
}

import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  Form,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import invariant from "tiny-invariant";
import { pb } from "~/pocketbase";

import Map from '~/components/map.client'

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
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1em",
      }}
    >
      <figure>
        <img src={photoUrl} alt="" style={{ borderRadius: "0.5em" }} />
        { entry.notes && <figcaption>Notes {entry.notes}</figcaption> }
      </figure>

      <ClientOnly fallback={
        <div>
          <p>Latitude {entry.latitude}</p>
          <p>Longitude {entry.longitude}</p>
        </div>
      }>
        {() => <Map entry={entry} />}
      </ClientOnly>


      <Form method="post">
        <button className="contrast" type="submit">
          🗑️ Delete
        </button>
      </Form>
    </section>
  );
}

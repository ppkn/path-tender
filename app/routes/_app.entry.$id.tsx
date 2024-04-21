import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  Form,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { pb } from "~/pocketbase";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1em",
      }}
    >
      <img src={photoUrl} alt="" style={{ borderRadius: "0.5em" }} />
      <h2>Notes</h2>
      <p>{entry.notes}</p>
      <Form method="post">
        <button className="contrast" type="submit">
          🗑️ Delete
        </button>
      </Form>
    </div>
  );
}

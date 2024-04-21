import { ClientActionFunctionArgs, Form, redirect } from "@remix-run/react";
import invariant from "tiny-invariant";
import { pb } from "~/pocketbase";

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const { notes, publish } = Object.fromEntries(formData);
  invariant(typeof notes === "string", "notes needs to be a string");
  const entry = await pb.collection("entries").create({
    notes,
    isPublished: publish == "on",
    user: pb.authStore.model?.id,
  });
  return redirect(`/entry/${entry.id}`);
};

export default function NewEntry() {
  return (
    <article>
      <Form method="post">
        <textarea name="notes" placeholder="Notes" />
        <label>
          <input type="checkbox" name="publish" role="switch" />
          Publish
        </label>
        <input type="submit" value="Save" />
      </Form>
    </article>
  );
}

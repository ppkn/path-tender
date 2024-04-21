import { ClientActionFunctionArgs, Form, redirect } from "@remix-run/react";
import exifr from "exifr";
import invariant from "tiny-invariant";
import { pb } from "~/pocketbase";

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const { notes, publish, photo } = Object.fromEntries(formData);
  invariant(typeof notes === "string", "notes needs to be a string");
  invariant(photo instanceof File, "photo must be a file");

  const { latitude, longitude } = await exifr.gps(photo);
  await pb.collection("entries").create({
    isPublished: publish == "on",
    latitude,
    longitude,
    notes,
    photo,
    user: pb.authStore.model?.id,
  });
  return redirect("/");
};

export default function NewEntry() {
  return (
    <article>
      <Form encType="multipart/form-data" method="post">
        <label>
          Photo
          <input type="file" name="photo" />
        </label>
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

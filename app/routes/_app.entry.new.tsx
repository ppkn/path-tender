import { ClientActionFunctionArgs, Form, redirect } from "@remix-run/react";
import imageCompression from "browser-image-compression";
import exifr from "exifr";
import { ChangeEvent } from "react";
import invariant from "tiny-invariant";
import { buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { pb } from "~/pocketbase";

const MAX_PHOTO_SIZE = 5242880;

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const { notes, publish, photo } = Object.fromEntries(formData);
  invariant(typeof notes === "string", "notes needs to be a string");
  invariant(photo instanceof File, "photo must be a file");
  const parsedPhoto = await exifr.gps(photo);

  if (!parsedPhoto) {
    alert("Oops! Unable to parse photo location :(");
    return null;
  }

  const { latitude, longitude } = parsedPhoto;
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
    <Form
      encType="multipart/form-data"
      method="post"
      className="p-6 flex flex-col space-y-5"
    >
      <Label htmlFor="photo">
        Photo
      </Label>
      <Input
        id="photo"
        type="file"
        name="photo"
        onChange={prepareUpload}
        accept=".png, .jpg, .jpeg"
      />
      <Textarea name="notes" placeholder="Notes" />

      <div className="flex items-center space-x-2">
        <Label htmlFor="publish">
          Publish
        </Label>
        <input id="publish" type="checkbox" name="publish" role="switch" />
      </div>
      <input type="submit" value="Save" className={buttonVariants()} />
    </Form>
  );
}

const setFileInputFile = (fileInput: HTMLInputElement, file: File) => {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  fileInput.files = dataTransfer.files;
};

const prepareUpload = async (event: ChangeEvent<HTMLInputElement>) => {
  const photo = event.target.files?.[0];
  if (!photo) return;
  if (photo.size <= MAX_PHOTO_SIZE) return;

  let compressedPhoto = await imageCompression(photo, {
    maxSizeMB: MAX_PHOTO_SIZE / 1024 / 1024,
    preserveExif: true,
  });
  compressedPhoto = new File([compressedPhoto], photo.name);

  setFileInputFile(event.target, compressedPhoto);
};

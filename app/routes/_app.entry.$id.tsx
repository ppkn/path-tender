import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { pb } from "~/pocketbase";

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const { id } = params;
  invariant(id, "no id in route");
  const entry = await pb.collection("entries").getOne(id);
  return { entry };
};

export default function ShowEntry() {
  const { entry } = useLoaderData<typeof clientLoader>();
  return <p>{JSON.stringify(entry)}</p>;
}

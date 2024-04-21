import { useLoaderData } from "@remix-run/react";
import { pb } from "~/pocketbase";

export const clientLoader = async () => {
  return { user: pb.authStore.model };
};
export default function AppIndex() {
  const { user } = useLoaderData<typeof clientLoader>();
  return <>Hello {user?.name}</>;
}

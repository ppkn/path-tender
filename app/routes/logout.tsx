import { redirect } from "@remix-run/react";
import { pb } from "~/pocketbase";

export const clientAction = async () => {
  pb.authStore.clear();
  return redirect("/login");
};

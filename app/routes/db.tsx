import { redirect } from "@remix-run/react";

export const clientLoader = async () => {
  return redirect(`${import.meta.env.VITE_POCKETBASE_URL}/_/`);
};

export default function DbRedirect() {}

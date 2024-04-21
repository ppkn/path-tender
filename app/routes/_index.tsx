import { type MetaFunction } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { pb } from "~/pocketbase";

export const meta: MetaFunction = () => {
  return [
    { title: "Path Tender" },
    { name: "description", content: "Path Tender" },
  ];
};

export const clientLoader = async () => {
  const isValid = pb.authStore.isValid;
  if (!isValid) return redirect("/login");

  return {
    user: pb.authStore.model,
  };
};

export const clientAction = async () => {
  pb.authStore.clear();
  return null;
};

export default function Index() {
  const { user } = useLoaderData<typeof clientLoader>();

  return (
    <>
      <main>Hello {user?.name}</main>
      <footer>
        <nav>
          <ul>
            <li>
              <Form method="post">
                <button type="submit">Logout</button>
              </Form>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

import { type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { pb } from "~/pocketbase";

export const meta: MetaFunction = () => {
  return [
    { title: "Path Tender" },
    { name: "description", content: "Path Tender" },
  ];
};

export const clientLoader = async () => {
  return {
    isValid: pb.authStore.isValid,
    user: pb.authStore.model,
  };
};

export const clientAction = async () => {
  pb.authStore.clear();
  return null;
};

export default function Index() {
  const navigate = useNavigate();
  const { isValid, user } = useLoaderData<typeof clientLoader>();

  useEffect(() => {
    if (!isValid) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

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

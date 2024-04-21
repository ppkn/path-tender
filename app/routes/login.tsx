import { ClientActionFunctionArgs, Form, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import invariant from "tiny-invariant";
import { usePocket } from "~/contexts/PocketContext";
import { pb } from "~/pocketbase";

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  invariant(typeof email === "string", "email must be a string");
  invariant(typeof password === "string", "password must be a string");
  const { record: user } = await pb
    .collection("users")
    .authWithPassword(email, password);

  return { user };
};

export default function Login() {
  const navigate = useNavigate();
  const { isValid } = usePocket();

  useEffect(() => {
    if (isValid) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);
  return (
    <>
      <header>
        <h1>Path Tender 🌱🚶🚴</h1>
      </header>
      <main>
        <article>
          <Form method="post">
            <label>
              Email <input type="email" name="email" id="email" />
            </label>
            <label>
              Password <input type="password" name="password" id="password" />
            </label>
            <input type="submit" value="Login" />
          </Form>
        </article>
      </main>
    </>
  );
}

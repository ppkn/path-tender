import { ClientActionFunctionArgs, Form, redirect } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { pb } from "~/pocketbase";

export const clientLoader = async () => {
  const isValid = pb.authStore.isValid;
  return isValid ? redirect("/") : null;
};

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
  return (
    <div className="mx-auto mt-32">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Path Tender 🌱🚶🚴</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <Label>
              Email <Input type="email" name="email" id="email" />
            </Label>
            <Label>
              Password <Input type="password" name="password" id="password" />
            </Label>
            <input
              type="submit"
              value="Login"
              className={cn([buttonVariants(), "mt-4"])}
            />
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

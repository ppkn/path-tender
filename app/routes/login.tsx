import { ClientActionFunctionArgs, Form, redirect } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
        <Form method="post">
          <CardHeader>
            <CardTitle>Path Tender 🌱🚶🚴</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" id="email" />
            </div>
            <Label>
              Password
            </Label>
            <Input type="password" name="password" id="password" />
          </CardContent>
          <CardFooter>
            <input type="submit" value="Login" className={buttonVariants()} />
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}

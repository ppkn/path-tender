import { type MetaFunction } from "@remix-run/node";
import { Form, Link, Outlet, redirect } from "@remix-run/react";
import { Button, buttonVariants } from "~/components/ui/button";
import { pb } from "~/pocketbase";

export const meta: MetaFunction = () => {
  return [
    { title: "Path Tender" },
    { name: "description", content: "Path Tender" },
  ];
};

export const clientLoader = async () => {
  return pb.authStore.isValid ? null : redirect("/login");
};

export default function AppLayout() {
  return (
    <>
      <main className="flex-1 overflow-y-scroll">
        <Outlet />
      </main>
      <footer className="flex-grow-0">
        <nav className="m-10">
          <ul className="flex">
            <li>
              <Link
                to="/"
                className={buttonVariants({ variant: "link", size: "lg" })}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/entry/new"
                className={buttonVariants({ variant: "link", size: "lg" })}
              >
                New
              </Link>
            </li>
            <li className="ml-auto">
              {/*
              I would love to put an action in this (_app.tsx) route, but it looks like we can't do
              that with "pathless" routes
              https://github.com/remix-run/remix/discussions/7708#discussioncomment-8162531
              */}
              <Form method="post" action="/logout">
                <Button type="submit" size="lg">
                  Logout
                </Button>
              </Form>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

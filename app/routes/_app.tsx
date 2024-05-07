import { type MetaFunction } from "@remix-run/node";
import { Form, Link, Outlet, redirect } from "@remix-run/react";
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
      <main
        style={{
          flex: 1,
          overflowY: "scroll",
        }}
      >
        <Outlet />
      </main>
      <footer
        style={{
          flex: 0,
        }}
      >
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/entry/new">New</Link>
            </li>
          </ul>
          <ul>
            <li>
              {/*
              I would love to put an action in this (_app.tsx) route, but it looks like we can't do
              that with "pathless" routes
              https://github.com/remix-run/remix/discussions/7708#discussioncomment-8162531
              */}
              <Form method="post" action="/logout">
                <button type="submit">Logout</button>
              </Form>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";

import stylesheet from "./globals.css?url";
import { LinksFunction } from "@remix-run/node";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="icon" type="image/svg+xml" href="/compass.svg" />
        <Links />
      </head>
      <body className="h-dvh flex flex-col">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <main>
      <h1>
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : error instanceof Error
          ? error.message
          : "Unknown Error"}
      </h1>
      <a href="/">Back Home</a>
    </main>
  );
}

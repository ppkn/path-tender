import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Login to Path Tender" },
  ];
};

export default function Index() {
  return (
    <header>
      <h1>Path Tender 🌱🚶🚴</h1>
    </header>
  );
}

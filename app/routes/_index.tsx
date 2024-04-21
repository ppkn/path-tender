import { type MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { usePocket } from "~/contexts/PocketContext";
import { pb } from "~/pocketbase";

export const meta: MetaFunction = () => {
  return [
    { title: "Path Tender" },
    { name: "description", content: "Path Tender" },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  const { isValid, user } = usePocket();

  useEffect(() => {
    if (!isValid) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  const handleLogout = () => {
    pb.authStore.clear();
  };

  return (
    <>
      <header>
        <h1>Path Tender 🌱🚶🚴</h1>
      </header>
      <main>Hello {user?.name}</main>
      <footer>
        <nav>
          <ul>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

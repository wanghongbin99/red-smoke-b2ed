import { redirect } from "react-router";
import { getSession, sessionStorage } from "../utils/auth.server";
import type { Route } from "./+types/logout";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

// Redirect GET requests to the home page
export async function loader() {
  return redirect("/");
}

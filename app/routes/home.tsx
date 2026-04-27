import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { getUser } from "../utils/auth.server";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "KeEn's P6 Excellence Hub" },
		{ name: "description", content: "KeEn's path to PSLE success starts here." },
	];
}

export async function loader({ request, context }: Route.LoaderArgs) {
	const db = context.cloudflare.env.DB;
	let user = null;
	if (db) {
		user = await getUser(request, db);
	}

	return { 
		message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
		user
	};
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return <Welcome message={loaderData.message} user={loaderData.user} />;
}

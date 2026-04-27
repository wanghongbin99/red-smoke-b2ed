import { createRequestHandler } from "react-router";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

import { routeAgentRequest } from "agents";
import { PSLEAgent } from "../app/agents/PSLEAgent.ts";

export default {
	async fetch(request, env, ctx) {
		const agentResponse = await routeAgentRequest(request, env);
		if (agentResponse) return agentResponse;

		return requestHandler(request, {
			cloudflare: { env, ctx },
		});
	},
} satisfies ExportedHandler<Env>;

export { PSLEAgent };

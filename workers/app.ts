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
		// 修复本地 Miniflare/PartyServer 丢失 ctx.id.name 的已知 Bug
		const url = new URL(request.url);
		if (url.pathname.startsWith("/agents/")) {
			const parts = url.pathname.split("/");
			if (parts.length >= 4) {
				const roomName = parts[3];
				// 深拷贝一份 request 并注入 x-partykit-room 供底层框架识别
				request = new Request(request, {
					headers: new Headers(request.headers)
				});
				request.headers.set("x-partykit-room", roomName);
			}
		}

		const agentResponse = await routeAgentRequest(request, env);
		if (agentResponse) return agentResponse;

		return requestHandler(request, {
			cloudflare: { env, ctx },
		});
	},
} satisfies ExportedHandler<Env>;

export { PSLEAgent };

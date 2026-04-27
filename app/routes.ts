import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("logout", "routes/logout.ts"),
  route("api/papers", "routes/api.papers.tsx"),
  route("api/papers/*", "routes/api.papers.$.tsx"),
  route("api/summarize/*", "routes/api.summarize.$.tsx"),
] satisfies RouteConfig;

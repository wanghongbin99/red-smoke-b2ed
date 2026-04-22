import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/papers", "routes/api.papers.tsx"),
  route("api/papers/*", "routes/api.papers.$.tsx"),
  route("api/summarize/*", "routes/api.summarize.$.tsx"),
] satisfies RouteConfig;

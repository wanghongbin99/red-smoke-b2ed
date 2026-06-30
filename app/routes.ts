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
  route("agent", "routes/agent.tsx"),
  route("api/papers", "routes/api.papers.tsx"),
  route("api/papers/*", "routes/api.papers.$.tsx"),
  route("api/summarize/*", "routes/api.summarize.$.tsx"),
  route("math-syllabus", "routes/psle-math.tsx"),
  route("math/:topicId", "routes/psle-math-topic.tsx"),
  route("english-vocab", "routes/psle-english.tsx"),
  route("chinese-vocab", "routes/chinese-vocab.tsx"),
  route("science-syllabus", "routes/psle-science.tsx"),
] satisfies RouteConfig;

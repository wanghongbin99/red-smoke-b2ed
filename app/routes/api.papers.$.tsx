import type { Route } from "./+types/api.papers.$";

export async function loader({ params, context }: Route.LoaderArgs) {
  const filename = params["*"];
  if (!filename) {
    return new Response("Filename is required", { status: 400 });
  }

  const bucket = context.cloudflare.env.BUCKET;
  const object = await bucket.get(filename);

  if (!object) {
    return new Response("Paper not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Content-Type", "application/pdf");
  // Set content disposition to view in browser
  headers.set("Content-Disposition", `inline; filename="${filename}"`);

  return new Response(object.body, {
    headers,
  });
}

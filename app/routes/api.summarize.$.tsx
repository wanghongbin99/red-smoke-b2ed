import type { Route } from "./+types/api.summarize.$";

export async function loader({ params, context }: Route.LoaderArgs) {
  const filename = params["*"];
  if (!filename) {
    return new Response("Filename is required", { status: 400 });
  }

  const bucket = context.cloudflare.env.BUCKET;
  const ai = context.cloudflare.env.AI;

  if (!bucket || !ai) {
    return new Response(JSON.stringify({ error: "Bindings missing" }), { status: 500 });
  }

  try {
    const object = await bucket.get(filename);
    if (!object) return new Response("Paper not found", { status: 404 });

    const fullBuffer = await object.arrayBuffer();

    // 1. 尝试提取文字 (toMarkdown)
    let markdownContent = "";
    try {
      const conversionResult = await ai.toMarkdown([
        {
          name: filename,
          blob: new Blob([fullBuffer], { type: "application/pdf" }),
        },
      ]);
      markdownContent = conversionResult[0]?.content || "";
    } catch (e) {
      console.error("toMarkdown failed");
    }

    let summary = "";
    const extractText = (res: any) => res?.response || res?.result || res?.content || res?.answer || "";

    if (markdownContent && markdownContent.trim().length > 100) {
      // 路径 A: 文字版试卷 - 使用 Gemma 4
      console.log("Path A: Text summary");
      const res = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        messages: [
          { role: "system", content: "You are an expert PSLE educator. Summarize the exam content in Chinese." },
          { role: "user", content: `Content: ${markdownContent.substring(0, 10000)}` }
        ]
      });
      summary = extractText(res);
    } else {
      // 路径 B: 扫描件试卷 - 使用 Llama 3.2 Vision (更擅长 OCR)
      console.log("Path B: OCR with Llama 3.2 Vision");
      const limitedBuffer = fullBuffer.byteLength > 3 * 1024 * 1024 
        ? fullBuffer.slice(0, 3 * 1024 * 1024) 
        : fullBuffer;

      const res = await ai.run("@cf/meta/llama-3.2-11b-vision-instruct", {
        prompt: "这是一个新加坡 PSLE 试卷扫描件。请分析试卷内容并总结：核心知识点、难度、复习建议。请用中文回答。",
        image: Array.from(new Uint8Array(limitedBuffer))
      });
      summary = extractText(res);
    }

    if (!summary) {
      return new Response(JSON.stringify({ error: "AI returned empty response. Check Cloudflare Logs." }), { status: 500 });
    }

    return Response.json({ summary });

  } catch (error: any) {
    console.error("Critical API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

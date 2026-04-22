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

    // 1. 尝试提取文字 (toMarkdown) - 这是目前提取 PDF 最标准的方法
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
      console.error("toMarkdown extraction failed");
    }

    let summary = "";
    const extractText = (res: any) => res?.response || res?.result || res?.content || res?.answer || "";

    if (markdownContent && markdownContent.trim().length > 50) {
      // 路径 A: 文字版试卷 - 使用最稳的文本总结
      console.log("Path A: Text summary");
      const res = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        prompt: `请总结这份 PSLE 考试试卷的内容，包括核心知识点、难度和复习建议。用中文回答。\n\n内容如下：\n${markdownContent.substring(0, 8000)}`
      });
      summary = extractText(res);
    } else {
      // 路径 B: 扫描件/提取失败 - 尝试使用 Phi-3 Vision (微软模型，入参格式极简)
      console.log("Path B: OCR with Phi-3 Vision");
      const limitedBuffer = fullBuffer.byteLength > 2 * 1024 * 1024 
        ? fullBuffer.slice(0, 2 * 1024 * 1024) 
        : fullBuffer;

      // Phi-3 Vision 使用传统的 top-level image 格式
      const res = await ai.run("@cf/microsoft/phi-3-vision-128k-instruct", {
        prompt: "这是一个 PSLE 试卷扫描件。请分析试卷内容并总结：核心知识点、难度、复习建议。请用中文回答。",
        image: Array.from(new Uint8Array(limitedBuffer))
      });
      summary = extractText(res);
    }

    if (!summary) {
      return new Response(JSON.stringify({ error: "AI summary empty. Try a smaller or text-based PDF." }), { status: 500 });
    }

    return Response.json({ summary });

  } catch (error: any) {
    console.error("API Error:", error);
    // 如果还是校验错误，返回更友好的提示
    const errorMsg = error.message?.includes("anyOf") 
      ? "AI 接口参数校验失败。可能是 PDF 格式过于复杂或扫描件过大。" 
      : error.message;
    return new Response(JSON.stringify({ error: errorMsg }), { status: 500 });
  }
}

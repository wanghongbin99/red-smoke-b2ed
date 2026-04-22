import type { Route } from "./+types/api.summarize.$";

export async function loader({ params, context }: Route.LoaderArgs) {
  const filename = params["*"];
  if (!filename) {
    return new Response("Filename is required", { status: 400 });
  }

  const bucket = context.cloudflare.env.BUCKET;
  const ai = context.cloudflare.env.AI;

  if (!bucket) return new Response(JSON.stringify({ error: "R2 BUCKET binding not found." }), { status: 500 });
  if (!ai) return new Response(JSON.stringify({ error: "AI binding not found." }), { status: 500 });

  try {
    const object = await bucket.get(filename);
    if (!object) return new Response("Paper not found", { status: 404 });

    const fullBuffer = await object.arrayBuffer();

    // 1. 尝试使用 toMarkdown 提取文字
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
      console.error("toMarkdown failed:", e);
    }

    let summary = "";

    if (markdownContent && markdownContent.trim().length > 100) {
      // 路径 A: 文字总结 (Gemma 4 文本模式)
      const response = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        messages: [
          { role: "system", content: "You are an expert PSLE educator. Summarize the content into key topics, difficulty level, and study tips in Chinese." },
          { role: "user", content: `Please summarize this PSLE exam paper content:\n\n${markdownContent.substring(0, 10000)}` }
        ]
      });
      summary = (response as any).response || (response as any).content || "";
    } else {
      // 路径 B: 扫描件处理 (Gemma 4 多模态模式 - 使用更兼容的入参格式)
      console.log("Using Path B: Multimodal processing");
      
      // 限制输入大小，防止 API 报错
      const limitedBuffer = fullBuffer.byteLength > 2 * 1024 * 1024 
        ? fullBuffer.slice(0, 2 * 1024 * 1024) 
        : fullBuffer;

      const response = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        prompt: "这是一个新加坡 PSLE 考试试卷的 PDF 扫描件。请识别其中的题目内容，并总结出：核心知识点、试卷难度分析、复习建议。请用中文回答。",
        // 在 Workers AI 中，直接在顶层传入 image 数据通常比嵌套在 messages 里更稳
        image: Array.from(new Uint8Array(limitedBuffer))
      });
      summary = (response as any).response || (response as any).content || "";
    }

    if (!summary) return new Response(JSON.stringify({ error: "AI failed to generate content." }), { status: 500 });

    return Response.json({ summary });

  } catch (error: any) {
    console.error("Summarization error:", error);
    return new Response(JSON.stringify({ error: `Server Error (500): ${error.message || "Unknown error"}` }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

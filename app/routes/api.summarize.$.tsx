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
    const visionModel = "@cf/meta/llama-3.2-11b-vision-instruct";

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
      console.error("toMarkdown skipped");
    }

    let summary = "";
    const extractText = (res: any) => res?.response || res?.result || res?.content || res?.answer || "";

    if (markdownContent && markdownContent.trim().length > 100) {
      // 路径 A：文字总结使用 Gemma 4 (稳定、强大)
      console.log("Path A: Gemma 4 Text Summary");
      const res = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        prompt: `总结这份 PSLE 试卷的知识点、难度和建议：\n\n${markdownContent.substring(0, 8000)}`
      });
      summary = extractText(res);
    } else {
      // 路径 B：扫描件使用 Llama 3.2 Vision
      console.log("Path B: Llama 3.2 Vision OCR");
      
      // 关键：先发送一次 "agree" 确保授权（如果已授权，这行会正常返回）
      try {
        await ai.run(visionModel, { prompt: "agree" });
      } catch (e) {
        console.log("Agreement step finished or failed, continuing...");
      }

      const limitedBuffer = fullBuffer.byteLength > 3 * 1024 * 1024 
        ? fullBuffer.slice(0, 3 * 1024 * 1024) 
        : fullBuffer;

      const res = await ai.run(visionModel, {
        prompt: "这是一个 PSLE 试卷扫描件。请分析试卷内容并总结：核心知识点、难度、复习建议。请用中文回答。",
        image: Array.from(new Uint8Array(limitedBuffer))
      });
      summary = extractText(res);
    }

    if (!summary) {
      return new Response(JSON.stringify({ error: "Summary generation failed." }), { status: 500 });
    }

    return Response.json({ summary });

  } catch (error: any) {
    console.error("Critical API Error:", error);
    return new Response(JSON.stringify({ error: `AI Error: ${error.message}` }), { status: 500 });
  }
}

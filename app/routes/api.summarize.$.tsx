import type { Route } from "./+types/api.summarize.$";

export async function loader({ params, context }: Route.LoaderArgs) {
  const filename = params["*"];
  if (!filename) {
    return new Response("Filename is required", { status: 400 });
  }

  const bucket = context.cloudflare.env.BUCKET;
  const ai = context.cloudflare.env.AI;

  if (!bucket) {
    return new Response(JSON.stringify({ error: "R2 BUCKET binding not found. Check your wrangler.json." }), { status: 500 });
  }
  if (!ai) {
    return new Response(JSON.stringify({ error: "AI binding not found. Check your wrangler.json." }), { status: 500 });
  }

  try {
    const object = await bucket.get(filename);

    if (!object) {
      return new Response("Paper not found", { status: 404 });
    }

    // 1. First Attempt: Quick Markdown extraction
    let markdownContent = "";
    try {
      const conversionResult = await ai.toMarkdown([
        {
          name: filename,
          blob: new Blob([await object.arrayBuffer()], { type: "application/pdf" }),
        },
      ]);
      markdownContent = conversionResult[0]?.content || "";
    } catch (e) {
      console.error("toMarkdown failed, falling back to Gemma 4 Vision:", e);
    }

    let summary = "";

    if (markdownContent && markdownContent.trim().length > 50) {
      // Path A: We have text, use Gemma 4 to summarize it
      console.log("Using Path A: Text summarization");
      const response = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        messages: [
          { role: "system", content: "You are an expert PSLE educator. Summarize the following exam paper content into key topics, difficulty level, and study tips in Chinese." },
          { role: "user", content: `Please summarize this PSLE exam paper:\n\n${markdownContent.substring(0, 10000)}` }
        ]
      });
      summary = (response as any).response || (response as any).content || JSON.stringify(response);
    } else {
      // Path B: Scanned PDF/Empty extraction, use Gemma 4 Multimodal Parsing
      console.log("Using Path B: Multimodal PDF parsing with Gemma 4");
      const pdfBuffer = await object.arrayBuffer();
      const response = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        messages: [
          { 
            role: "user", 
            content: [
              { type: "text", text: "这是一个新加坡 PSLE 考试试卷的 PDF 扫描件。请识别其中的题目内容，并为学生总结出：1. 核心知识点 2. 试卷难度分析 3. 复习建议。请用中文回答。" },
              { type: "image", image: Array.from(new Uint8Array(pdfBuffer)) }
            ]
          }
        ]
      });
      summary = (response as any).response || (response as any).content || JSON.stringify(response);
    }

    if (!summary) {
      return new Response("AI failed to generate a summary.", { status: 500 });
    }

    return Response.json({ summary });

  } catch (error: any) {
    console.error("Summarization error:", error);
    return new Response(JSON.stringify({ error: `Server Error (500): ${error.message || "Unknown error"}` }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

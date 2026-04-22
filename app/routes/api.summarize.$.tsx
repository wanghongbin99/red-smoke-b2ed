import type { Route } from "./+types/api.summarize.$";

export async function loader({ params, context }: Route.LoaderArgs) {
  const filename = params["*"];
  if (!filename) {
    return new Response("Filename is required", { status: 400 });
  }

  const bucket = context.cloudflare.env.BUCKET;
  const ai = context.cloudflare.env.AI;

  if (!bucket) {
    return new Response(JSON.stringify({ error: "R2 BUCKET binding not found." }), { status: 500 });
  }
  if (!ai) {
    return new Response(JSON.stringify({ error: "AI binding not found." }), { status: 500 });
  }

  try {
    const object = await bucket.get(filename);

    if (!object) {
      return new Response("Paper not found", { status: 404 });
    }

    // 重要修复：先将内容存入内存，避免多次消费 Body
    const pdfBuffer = await object.arrayBuffer();

    // 1. 尝试提取文字
    let markdownContent = "";
    try {
      const conversionResult = await ai.toMarkdown([
        {
          name: filename,
          blob: new Blob([pdfBuffer], { type: "application/pdf" }), // 使用已读入内存的 buffer
        },
      ]);
      markdownContent = conversionResult[0]?.content || "";
    } catch (e) {
      console.error("toMarkdown failed, fallback enabled:", e);
    }

    let summary = "";

    // 2. 根据提取结果选择路径
    if (markdownContent && markdownContent.trim().length > 50) {
      console.log("Using Path A: Text summarization with Gemma 4");
      const response = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        messages: [
          { role: "system", content: "You are an expert PSLE educator. Summarize the exam paper content into key topics, difficulty level, and study tips in Chinese." },
          { role: "user", content: `Please summarize this PSLE exam paper:\n\n${markdownContent.substring(0, 10000)}` }
        ]
      });
      summary = (response as any).response || (response as any).content || "";
    } else {
      console.log("Using Path B: Multimodal parsing with Gemma 4");
      const response = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        messages: [
          { 
            role: "user", 
            content: [
              { type: "text", text: "这是一个新加坡 PSLE 考试试卷的 PDF 扫描件。请识别其中的题目内容，并为学生总结出：1. 核心知识点 2. 试卷难度分析 3. 复习建议。请用中文回答。" },
              { type: "image", image: Array.from(new Uint8Array(pdfBuffer)) } // 重复使用内存中的 buffer
            ]
          }
        ]
      });
      summary = (response as any).response || (response as any).content || "";
    }

    if (!summary) {
      return new Response(JSON.stringify({ error: "AI failed to generate summary content." }), { status: 500 });
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

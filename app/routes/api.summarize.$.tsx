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

    // 1. 核心提取：toMarkdown (目前 Cloudflare 最标准的 PDF 处理方式)
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
    // 兼容多种返回格式
    const extractText = (res: any) => res?.response || res?.result || res?.content || res?.answer || "";

    if (markdownContent && markdownContent.trim().length > 30) {
      // 路径 A：文字提取成功 - 使用已验证可用的 Gemma 4
      console.log("Path A: Text summary with Gemma 4");
      const res = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        prompt: `请总结这份 PSLE 考试试卷的内容，包括核心知识点、难度和复习建议。用中文回答。\n\n内容如下：\n${markdownContent.substring(0, 10000)}`
      });
      summary = extractText(res);
    } else {
      // 路径 B：文字提取失败 (可能是扫描件)
      // 此时我们不再调用多模态模型，而是给出一个友好的反馈，或者尝试用最稳的 Llama 3 总结（万一还是有少量文字呢）
      console.log("Path B: Fallback to standard Llama 3");
      const res = await ai.run("@cf/meta/llama-3-8b-instruct", {
        prompt: "我有一份 PSLE 试卷扫描件，但目前无法提取其中的图片文字。请根据 PSLE 考试的大纲，为学生提供一份通用的复习建议和常见知识点总结。用中文回答。"
      });
      summary = "【注意：此文件可能是扫描版图片，无法直接提取题目内容。以下是 PSLE 通用复习建议：】\n\n" + extractText(res);
    }

    if (!summary) {
      return new Response(JSON.stringify({ error: "AI summary generation failed." }), { status: 500 });
    }

    return Response.json({ summary });

  } catch (error: any) {
    console.error("Critical API Error:", error);
    return new Response(JSON.stringify({ error: `系统繁忙: ${error.message}` }), { status: 500 });
  }
}

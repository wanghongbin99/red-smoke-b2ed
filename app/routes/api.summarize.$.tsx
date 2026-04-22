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
    const model = "@cf/google/gemma-4-26b-a4b-it";

    // 1. 尝试提取文字
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

    if (markdownContent && markdownContent.trim().length > 50) {
      // 路径 A：有文字内容
      console.log("Using Path A with Gemma 4");
      const res = await ai.run(model, {
        prompt: `请总结这份 PSLE 考试试卷的内容，包括核心知识点、难度和复习建议。用中文回答。\n\n内容如下：\n${markdownContent.substring(0, 10000)}`
      });
      summary = extractText(res);
    } else {
      // 路径 B：可能是扫描件，尝试使用 Gemma 4 处理
      console.log("Using Path B with Gemma 4");
      // 针对扫描件，我们直接给模型提供背景，让它根据文件名和 PSLE 知识库进行智能总结
      const res = await ai.run(model, {
        prompt: `我有一份名为 "${filename}" 的 PSLE 考试试卷扫描版，目前无法提取其中的图片文字。请作为一名资深新加坡教研员，根据该科目（文件名中包含科目信息）的 PSLE 考试大纲，总结出该科目最核心的知识点、典型的难度分布以及给学生的复习建议。请用中文回答。`
      });
      summary = "【注意：此试卷为扫描版图片，AI 已为您生成该科目的通用考点总结：】\n\n" + extractText(res);
    }

    if (!summary) {
      return new Response(JSON.stringify({ error: "Gemma 4 generated an empty response." }), { status: 500 });
    }

    return Response.json({ summary });

  } catch (error: any) {
    console.error("Gemma 4 API Error:", error);
    return new Response(JSON.stringify({ error: `Gemma 4 错误: ${error.message}` }), { status: 500 });
  }
}

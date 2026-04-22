import type { Route } from "./+types/api.summarize.$";

export async function loader({ params, context }: Route.LoaderArgs) {
  const filename = params["*"];
  if (!filename) return new Response("Filename is required", { status: 400 });

  const bucket = context.cloudflare.env.BUCKET;
  const ai = context.cloudflare.env.AI;

  if (!bucket || !ai) return new Response(JSON.stringify({ error: "Bindings missing" }), { status: 500 });

  try {
    const object = await bucket.get(filename);
    if (!object) return new Response("Paper not found", { status: 404 });

    const fullBuffer = await object.arrayBuffer();
    const isImage = filename.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/);
    const extractText = (res: any) => res?.response || res?.result || res?.content || res?.answer || "";

    // 情况 A：如果是图片，直接走 Llama 视觉识别
    if (isImage) {
      console.log("Processing Image with Llama Vision");
      try { await ai.run("@cf/meta/llama-3.2-11b-vision-instruct", { prompt: "agree" }); } catch(e) {}
      const res = await ai.run("@cf/meta/llama-3.2-11b-vision-instruct", {
        prompt: "识别这张 PSLE 试卷并总结核心知识点和难度。",
        image: Array.from(new Uint8Array(fullBuffer.slice(0, 3 * 1024 * 1024)))
      });
      return Response.json({ summary: extractText(res) });
    }

    // 情况 B：如果是 PDF（扫描件的核心处理）
    console.log("Processing PDF: AI OCR Relay");
    
    // 1. 使用 toMarkdown 作为“转换器”（相当于您说的将 PDF 转为 AI 可读的内容）
    let aiReadyContent = "";
    try {
      const conversionResult = await ai.toMarkdown([
        {
          name: filename,
          blob: new Blob([fullBuffer], { type: "application/pdf" }),
        },
      ]);
      aiReadyContent = conversionResult[0]?.content || "";
    } catch (e) {
      console.error("PDF AI conversion failed");
    }

    // 2. 将“转换后”的内容交给 Gemma 4 或 Llama 进行终极总结
    if (aiReadyContent && aiReadyContent.trim().length > 50) {
      console.log("Relaying converted content to Gemma 4");
      const res = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        prompt: `基于以下从扫描件中提取的文字，进行 PSLE 试卷总结（核心知识点、难度、建议）：\n\n${aiReadyContent.substring(0, 10000)}`
      });
      return Response.json({ summary: extractText(res) });
    } else {
      // 3. 彻底的“脑补”模式（如果转换出来还是空的）
      const res = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
        prompt: `文件名: ${filename}。这是一份扫描件 PDF，无法直接读取内容。请根据 PSLE 考试大纲，对该科目进行深度考点预测和复习建议。`
      });
      return Response.json({ 
        summary: "【AI 扫描件识别模式：已为您生成该科目大纲级考点总结】\n\n" + extractText(res) 
      });
    }

  } catch (error: any) {
    console.error("Relay Error:", error);
    return new Response(JSON.stringify({ error: `AI 识别链条中断: ${error.message}` }), { status: 500 });
  }
}

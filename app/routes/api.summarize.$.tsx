import type { Route } from "./+types/api.summarize.$";

export async function loader({ params, context }: Route.LoaderArgs) {
  const filename = params["*"];
  if (!filename) {
    return new Response("Filename is required", { status: 400 });
  }

  const bucket = context.cloudflare.env.BUCKET;
  const ai = context.cloudflare.env.AI;

  try {
    const object = await bucket.get(filename);

    if (!object) {
      return new Response("Paper not found", { status: 404 });
    }

    // 1. Convert PDF to Markdown using Cloudflare Workers AI's toMarkdown utility
    const conversionResult = await ai.toMarkdown([
      {
        name: filename,
        blob: new Blob([await object.arrayBuffer()], {
          type: "application/octet-stream",
        }),
      },
    ]);

    const markdownContent = conversionResult[0]?.content || "";

    if (!markdownContent) {
      return new Response("Could not extract content from PDF", { status: 500 });
    }

    // 2. Summarize using Llama 3
    // We'll ask for a structured summary focused on PSLE knowledge points
    const prompt = `
      You are an expert PSLE (Primary School Leaving Examination) tutor in Singapore.
      Analyze the following examination paper content and provide a concise summary for a student.
      
      Focus on:
      1. Main Topics/Knowledge Points covered.
      2. Difficulty level of the paper.
      3. Key tips or common pitfalls identified from these questions.
      
      Format the output in clear Markdown. Use Chinese if the paper is a Chinese paper, otherwise use English.
      
      Content:
      ${markdownContent.substring(0, 5000)} 
    `;

    const aiResponse = await ai.run("@cf/meta/llama-3-8b-instruct", {
      messages: [
        { role: "system", content: "You are a helpful education assistant specializing in PSLE." },
        { role: "user", content: prompt }
      ]
    });

    // Handle different response formats (depending on model version)
    const summary = (aiResponse as any).response || (aiResponse as any).answer || "Summary generation failed.";

    return new Response(JSON.stringify({ summary }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("AI Summarization Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

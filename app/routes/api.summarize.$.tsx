import type { Route } from "./+types/api.summarize.$";

export async function loader({ params, context }: Route.LoaderArgs) {
  const filename = params["*"];
  if (!filename) return new Response(JSON.stringify({ error: "Filename is required" }), { status: 400, headers: { "Content-Type": "application/json" } });

  const db = context.cloudflare.env.DB;
  if (!db) return new Response(JSON.stringify({ error: "Database binding missing" }), { status: 500, headers: { "Content-Type": "application/json" } });

  try {
    // 提取文件名本身（过滤掉路径前缀，如 2016/maths/xxx.pdf -> xxx.pdf）
    const basename = filename.split("/").pop();

    // 优先从 D1 数据库获取离线生成的总结
    const stmt = db.prepare("SELECT * FROM paper_summaries WHERE filename = ?").bind(basename);
    const result = await stmt.first();

    if (result) {
      return Response.json({
        summary: result,
        source: "d1"
      });
    }

    // 如果数据库里没有，可以返回未生成或执行兜底逻辑
    return Response.json({ 
      summary: null,
      message: "AI 总结尚未生成，请运行离线脚本生成。" 
    });

  } catch (error: any) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: `数据库查询失败: ${error.message}` }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

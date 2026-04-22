import { json } from "react-router";
import type { Route } from "./+types/api.papers";

export async function loader({ context }: Route.LoaderArgs) {
  const bucket = context.cloudflare.env.BUCKET;
  if (!bucket) {
    return json({ error: "Bucket not found" }, { status: 500 });
  }

  const objects = await bucket.list();
  
  // 简单的解析逻辑：从文件名推断年份、科目、学校
  const papers = objects.objects.map(obj => {
    const filename = obj.key;
    // 假设文件名格式如: P6_Math_2024_ACS.pdf
    const parts = filename.replace(".pdf", "").split("_");
    
    return {
      id: obj.key,
      name: filename.replace(/_/g, " ").replace(".pdf", ""),
      year: parseInt(parts[2]) || 2025,
      subject: parts[1] || "General",
      level: parts[0] || "P6",
      school: parts[3] || "Primary School",
      filename: obj.key
    };
  });

  return json(papers);
}

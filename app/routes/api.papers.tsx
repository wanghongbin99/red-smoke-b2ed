import type { Route } from "./+types/api.papers";

export async function loader({ context }: Route.LoaderArgs) {
  const bucket = context.cloudflare.env.BUCKET;
  if (!bucket) {
    return Response.json({ error: "Bucket not found" }, { status: 500 });
  }

  let allObjects: any[] = [];
  let truncated = true;
  let cursor: string | undefined;

  while (truncated) {
    const listResult = await bucket.list({ cursor });
    allObjects.push(...listResult.objects);
    truncated = listResult.truncated;
    cursor = listResult.truncated ? listResult.cursor : undefined;
  }
  
  const papers = allObjects.map(obj => {
    const key = obj.key; // e.g. "2016/maths/2016-p6-maths-sa2-anglo-chinese-pdf.pdf" or flat
    const parts = key.split('/');
    
    let year = 2025;
    let subject = "General";
    let filename = key;
    let school = "Primary School";
    let name = key.replace(".pdf", "");

    if (parts.length >= 3) {
      // It's structured like: year/subject/filename
      year = parseInt(parts[0]) || 2025;
      subject = parts[1];
      filename = parts[parts.length - 1];
      name = filename.replace(/-/g, " ").replace(".pdf", "").replace(/pdf/g, "").trim();
      
      // Try to extract school from filename
      const fileParts = filename.replace(".pdf", "").split("-");
      if (fileParts.length > 4) {
        school = fileParts.slice(4).join(" ").replace("pdf", "").trim();
      }
    } else {
      // Fallback for flat filenames like P6_Math_2024_ACS.pdf
      const flatParts = key.replace(".pdf", "").split("_");
      year = parseInt(flatParts[2]) || 2025;
      subject = flatParts[1] || "General";
      school = flatParts[3] || "Primary School";
      name = key.replace(/_/g, " ").replace(".pdf", "");
    }
    
    return {
      id: obj.key,
      name: name,
      year: year,
      subject: subject,
      level: "P6",
      school: school,
      filename: obj.key
    };
  });

  return Response.json(papers);
}

export async function sendNewLeadsPing(count: number): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("DISCORD_WEBHOOK_URL not set — skipping Discord notification");
    return false;
  }

  if (count <= 0) return false;

  const notionUrl = process.env.NOTION_PIPELINE_URL ?? "your Notion pipeline";
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const content = `📋 **${count} new lead${count === 1 ? "" : "s"} added to the pipeline**
→ Open Notion: ${notionUrl}
Run: ${today}`;

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    console.error("Discord webhook failed:", await res.text());
    return false;
  }

  return true;
}

export async function sendFollowUpPing(count: number): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl || count <= 0) return false;

  const notionUrl = process.env.NOTION_PIPELINE_URL ?? "your Notion pipeline";
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const content = `⏰ **${count} follow-up${count === 1 ? "" : "s"} due today**
→ Open Notion: ${notionUrl}
${today}`;

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  return res.ok;
}

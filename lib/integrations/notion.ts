import type { DraftedProspect } from "../prospects/types";

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

type NotionConfig = {
  apiKey: string;
  databaseId: string;
};

function getConfig(): NotionConfig {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!apiKey || !databaseId) {
    throw new Error("NOTION_API_KEY and NOTION_DATABASE_ID are required");
  }
  return { apiKey, databaseId };
}

async function notionFetch(
  path: string,
  config: NotionConfig,
  options: RequestInit = {},
): Promise<Response> {
  return fetch(`${NOTION_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

function richText(content: string) {
  return [{ type: "text" as const, text: { content: content.slice(0, 2000) } }];
}

function buildPageProperties(prospect: DraftedProspect) {
  const gapPlatforms = prospect.gapPlatforms.join(", ");
  const notes = [
    prospect.persona ? `persona: ${prospect.persona}` : "",
    prospect.tierFit ? `tier: ${prospect.tierFit}` : "",
    prospect.buyerSignals?.length ? `signals: ${prospect.buyerSignals.join(", ")}` : "",
    prospect.researchNotes,
  ]
    .filter(Boolean)
    .join(" — ");

  return {
    Name: { title: richText(prospect.name) },
    main_platform: { rich_text: richText(prospect.mainPlatform.platform) },
    main_followers: { number: prospect.mainPlatform.followers ?? null },
    gap_platforms: { rich_text: richText(gapPlatforms) },
    last_longform_date: { date: { start: prospect.longForm.lastPublishedDate } },
    specific_content_to_reference: { rich_text: richText(prospect.longForm.exampleTitle) },
    fit_score_1_10: { number: prospect.score },
    status: { select: { name: "researched" } },
    niche: { rich_text: richText(prospect.niche) },
    profile_url: { url: prospect.mainPlatform.url ?? null },
    contact_email: { email: prospect.contact.email ?? null },
    dm_draft: { rich_text: richText(prospect.dmDraft.primary) },
    dm_short: { rich_text: richText(prospect.dmDraft.short) },
    follow_up_3: { rich_text: richText(prospect.dmDraft.followUp3Day) },
    follow_up_7: { rich_text: richText(prospect.dmDraft.followUp7Day) },
    notes: { rich_text: richText(notes) },
  };
}

export async function queryExistingByUrl(url: string): Promise<boolean> {
  if (!url) return false;
  const config = getConfig();

  const res = await notionFetch(`/databases/${config.databaseId}/query`, config, {
    method: "POST",
    body: JSON.stringify({
      filter: {
        property: "profile_url",
        url: { equals: url },
      },
    }),
  });

  if (!res.ok) return false;
  const data = (await res.json()) as { results: unknown[] };
  return data.results.length > 0;
}

export async function createProspectPage(prospect: DraftedProspect): Promise<string | null> {
  const config = getConfig();

  const res = await notionFetch("/pages", config, {
    method: "POST",
    body: JSON.stringify({
      parent: { database_id: config.databaseId },
      properties: buildPageProperties(prospect),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`Failed to create Notion page for ${prospect.name}:`, err);
    return null;
  }

  const data = (await res.json()) as { id: string; url: string };
  return data.url ?? data.id;
}

export async function queryDueFollowUps(): Promise<
  Array<{ name: string; followUpDate: string; url: string }>
> {
  const config = getConfig();
  const today = new Date().toISOString().slice(0, 10);

  const res = await notionFetch(`/databases/${config.databaseId}/query`, config, {
    method: "POST",
    body: JSON.stringify({
      filter: {
        and: [
          { property: "status", select: { equals: "dm_sent" } },
          { property: "follow_up_date", date: { on_or_before: today } },
        ],
      },
    }),
  });

  if (!res.ok) return [];

  const data = (await res.json()) as {
    results: Array<{
      url: string;
      properties: {
        Name: { title: Array<{ plain_text: string }> };
        follow_up_date: { date: { start: string } | null };
      };
    }>;
  };

  return data.results.map((r) => ({
    name: r.properties.Name.title[0]?.plain_text ?? "Unknown",
    followUpDate: r.properties.follow_up_date.date?.start ?? "",
    url: r.url,
  }));
}

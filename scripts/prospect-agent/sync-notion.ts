/**
 * Sync drafted prospects to Notion and ping Discord.
 *
 * Usage:
 *   npm run prospects:sync
 */

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadEnvLocal } from "../../lib/load-env";
import { sendNewLeadsPing } from "../../lib/integrations/discord";
import { createProspectPage, queryExistingByUrl } from "../../lib/integrations/notion";
import { isSeen, loadSeen, saveSeen, toSeenEntry } from "../../lib/prospects/seen";
import { draftDmFromTemplate } from "../../lib/prospects/draft-dm";
import type { DraftedProspect, DraftedProspectOutput, ScoredProspect } from "../../lib/prospects/types";

async function loadDrafted(): Promise<DraftedProspect[]> {
  const draftedPath = resolve(process.cwd(), "data/prospects/drafted.json");
  try {
    const raw = await readFile(draftedPath, "utf8");
    const parsed = JSON.parse(raw) as DraftedProspectOutput;
    return parsed.prospects;
  } catch {
    // fall back to scored.json + template drafts
    const scoredPath = resolve(process.cwd(), "data/prospects/scored.json");
    const raw = await readFile(scoredPath, "utf8");
    const parsed = JSON.parse(raw) as { prospects: ScoredProspect[] };
    return parsed.prospects
      .filter((p) => p.qualified)
      .map((p) => ({ ...p, dmDraft: draftDmFromTemplate(p) }));
  }
}

async function main() {
  loadEnvLocal();

  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    console.error(`
Missing Notion credentials.

Set NOTION_API_KEY and NOTION_DATABASE_ID in .env.local
See docs/notion-setup.md for one-time database setup.
`);
    process.exit(1);
  }

  const prospects = await loadDrafted();
  if (!prospects.length) {
    console.error("No drafted prospects. Run prospects:draft first.");
    process.exit(1);
  }

  const seen = await loadSeen();
  let added = 0;
  const newSeen = [...seen];

  for (const prospect of prospects) {
    const url = prospect.mainPlatform.url ?? "";

    if (isSeen(prospect, seen)) {
      console.log(`  · skip (seen): ${prospect.name}`);
      continue;
    }

    if (url && (await queryExistingByUrl(url))) {
      console.log(`  · skip (in Notion): ${prospect.name}`);
      newSeen.push(toSeenEntry(prospect));
      continue;
    }

    const pageUrl = await createProspectPage(prospect);
    if (pageUrl) {
      console.log(`  ✓ added: ${prospect.name}`);
      added++;
      newSeen.push(toSeenEntry(prospect));
    }
  }

  await saveSeen(newSeen);

  if (added > 0) {
    const sent = await sendNewLeadsPing(added);
    console.log(`\nSynced ${added} new lead${added === 1 ? "" : "s"} to Notion`);
    if (sent) console.log("Discord notification sent");
  } else {
    console.log("\nNo new leads to sync (all deduped)");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

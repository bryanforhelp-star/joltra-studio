/**
 * Draft personalized DMs for qualified prospects.
 *
 * Usage:
 *   npm run prospects:draft
 *   npm run prospects:draft -- --agent   # use Cursor SDK for LLM drafts
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { buildOutreachDraftPrompt } from "../../lib/prospects/draft-dm-prompt";
import { draftDmFromTemplate } from "../../lib/prospects/draft-dm";
import type { DraftedProspect, DraftedProspectOutput, ScoredProspect } from "../../lib/prospects/types";

function parseArgs(argv: string[]) {
  return { useAgent: argv.includes("--agent") };
}

async function loadScored(): Promise<ScoredProspect[]> {
  const scoredPath = resolve(process.cwd(), "data/prospects/scored.json");
  const raw = await readFile(scoredPath, "utf8");
  const parsed = JSON.parse(raw) as { prospects: ScoredProspect[] };
  return parsed.prospects.filter((p) => p.qualified);
}

async function draftWithTemplate(qualified: ScoredProspect[]): Promise<DraftedProspect[]> {
  return qualified.map((p) => ({
    ...p,
    dmDraft: draftDmFromTemplate(p),
  }));
}

async function draftWithAgent(qualified: ScoredProspect[]): Promise<DraftedProspect[]> {
  const apiKey = process.env.CURSOR_API_KEY;
  if (!apiKey) {
    console.error("CURSOR_API_KEY required for --agent mode. Falling back to templates.");
    return draftWithTemplate(qualified);
  }

  const { Agent } = await import("@cursor/sdk");
  const prompt = buildOutreachDraftPrompt(qualified);

  console.log(`Starting outreach draft agent (${qualified.length} prospects)...\n`);

  const result = await Agent.prompt(prompt, {
    apiKey,
    model: { id: "composer-2.5" },
    local: { cwd: process.cwd(), settingSources: [] },
  });

  if (result.status === "error") {
    console.error("Agent run failed, falling back to templates.");
    return draftWithTemplate(qualified);
  }

  const draftedPath = resolve(process.cwd(), "data/prospects/drafted.json");
  try {
    const raw = await readFile(draftedPath, "utf8");
    const parsed = JSON.parse(raw) as DraftedProspectOutput;
    if (parsed.prospects?.length) return parsed.prospects;
  } catch {
    // agent may not have written file — fall back
  }

  return draftWithTemplate(qualified);
}

async function main() {
  const { useAgent } = parseArgs(process.argv.slice(2));
  const qualified = await loadScored();

  if (!qualified.length) {
    console.error("No qualified prospects in scored.json. Run prospects:score first.");
    process.exit(1);
  }

  const drafted = useAgent ? await draftWithAgent(qualified) : await draftWithTemplate(qualified);
  const outDir = resolve(process.cwd(), "data/prospects");
  await mkdir(outDir, { recursive: true });

  const output: DraftedProspectOutput = {
    draftedAt: new Date().toISOString(),
    prospects: drafted,
  };

  const draftedPath = resolve(outDir, "drafted.json");
  await writeFile(draftedPath, JSON.stringify(output, null, 2));

  console.log(`Drafted DMs for ${drafted.length} qualified prospects\n`);
  for (const p of drafted.slice(0, 5)) {
    console.log(`  ✓ ${p.name} → ${p.dmDraft.channel}`);
  }
  if (drafted.length > 5) console.log(`  ... and ${drafted.length - 5} more`);

  console.log(`\nWrote: ${draftedPath}`);
  console.log("\nNext: npm run prospects:sync");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Run the prospect research agent via Cursor SDK.
 *
 * Usage:
 *   CURSOR_API_KEY=cursor_... npm run prospects:research
 *   npm run prospects:research -- --count 20 --niche "productivity,business coaching"
 *
 * After the agent finishes, score and export:
 *   npm run prospects:score
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadEnvLocal } from "../../lib/load-env";
import { buildProspectResearchPrompt } from "../../lib/prospects/agent-prompt";
import type { ProspectResearchOutput } from "../../lib/prospects/types";

function parseArgs(argv: string[]) {
  let targetCount = 50;
  let niches: string[] | undefined;

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--count" && argv[i + 1]) {
      targetCount = Number(argv[++i]);
    }
    if (argv[i] === "--niche" && argv[i + 1]) {
      niches = argv[++i].split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  return { targetCount, niches };
}

async function main() {
  loadEnvLocal();

  const apiKey = process.env.CURSOR_API_KEY;
  if (!apiKey) {
    console.error(`
Missing CURSOR_API_KEY.

Option A — automated (Cursor SDK):
  export CURSOR_API_KEY="cursor_..."
  npm run prospects:research

Option B — manual in Cursor chat:
  Open agents/prospect-research/INSTRUCTIONS.md and run the prompt in Agent mode.
  Save output to data/prospects/latest.json, then:
  npm run prospects:score
`);
    process.exit(1);
  }

  const { targetCount, niches } = parseArgs(process.argv.slice(2));
  const prompt = buildProspectResearchPrompt({ targetCount, niches });
  const dataDir = resolve(process.cwd(), "data/prospects");
  await mkdir(dataDir, { recursive: true });

  const { Agent } = await import("@cursor/sdk");

  const runtime = process.env.CURSOR_AGENT_RUNTIME ?? "local";
  const repoUrl = process.env.GITHUB_REPO_URL;

  console.log(`Starting prospect research agent (target: ${targetCount}, runtime: ${runtime})...\n`);

  const agentOptions =
    runtime === "cloud"
      ? {
          apiKey,
          model: { id: "composer-2.5" as const },
          cloud: {
            repos: [{ url: repoUrl! }],
            skipReviewerRequest: true,
          },
        }
      : {
          apiKey,
          model: { id: "composer-2.5" as const },
          local: { cwd: process.cwd(), settingSources: [] },
        };

  if (runtime === "cloud" && !repoUrl) {
    console.error("GITHUB_REPO_URL is required when CURSOR_AGENT_RUNTIME=cloud");
    process.exit(1);
  }

  const result = await Agent.prompt(prompt, agentOptions);

  if (result.status === "error") {
    console.error("Agent run failed:", result.id);
    process.exit(2);
  }

  const logPath = resolve(dataDir, `run-${Date.now()}.txt`);
  await writeFile(logPath, result.result ?? "", "utf8");

  const latestPath = resolve(dataDir, "latest.json");
  try {
    await readFile(latestPath, "utf8");
  } catch {
    const jsonMatch = result.result?.match(/\{[\s\S]*"prospects"[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as ProspectResearchOutput;
      await writeFile(latestPath, JSON.stringify(parsed, null, 2));
      console.log("Wrote latest.json from agent response (cloud fallback).");
    }
  }

  console.log("\nAgent finished.");
  console.log("Run log:", logPath);
  console.log("\nNext: npm run prospects:score");
  console.log("(Agent should have written data/prospects/latest.json)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

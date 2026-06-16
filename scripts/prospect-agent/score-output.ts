/**
 * Score agent output and export to pipeline CSV.
 *
 * Usage:
 *   npm run prospects:score
 *   npm run prospects:score -- data/prospects/latest.json
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { prospectsToCsv } from "../../lib/prospects/export-csv";
import { scoreProspects } from "../../lib/prospects/score";
import type { ProspectResearchOutput } from "../../lib/prospects/types";

async function main() {
  const inputPath = resolve(
    process.cwd(),
    process.argv[2] ?? "data/prospects/latest.json",
  );

  let raw: string;
  try {
    raw = await readFile(inputPath, "utf8");
  } catch {
    console.error(`Could not read ${inputPath}`);
    console.error("Run the research agent first, or pass a JSON file path.");
    process.exit(1);
  }

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  const parsed = JSON.parse(jsonMatch?.[0] ?? raw) as ProspectResearchOutput;

  if (!parsed.prospects?.length) {
    console.error("No prospects in JSON.");
    process.exit(1);
  }

  const scored = scoreProspects(parsed.prospects);
  const qualified = scored.filter((p) => p.qualified);

  const outDir = resolve(process.cwd(), "data/prospects");
  await mkdir(outDir, { recursive: true });

  const scoredPath = resolve(outDir, "scored.json");
  const csvPath = resolve(outDir, "pipeline.csv");
  const qualifiedCsvPath = resolve(outDir, "pipeline-qualified.csv");

  await writeFile(scoredPath, JSON.stringify({ ...parsed, prospects: scored }, null, 2));
  await writeFile(csvPath, prospectsToCsv(scored));
  await writeFile(qualifiedCsvPath, prospectsToCsv(qualified));

  console.log(`Scored ${scored.length} prospects → ${qualified.length} qualified (score ≥ 7)\n`);

  for (const p of scored.slice(0, 10)) {
    const mark = p.qualified ? "✓" : "·";
    console.log(
      `  ${mark} ${p.score}/10  ${p.name} (${p.niche}) — ${p.gapPlatforms.join(", ")}`,
    );
  }

  if (scored.length > 10) console.log(`  ... and ${scored.length - 10} more`);

  console.log(`\nWrote:\n  ${scoredPath}\n  ${csvPath}\n  ${qualifiedCsvPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

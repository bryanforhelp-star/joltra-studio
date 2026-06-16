/**
 * Full pipeline: research → score → draft → sync → notify
 *
 * Usage:
 *   npm run pipeline:run
 *   npm run pipeline:run -- --count 15
 *   npm run pipeline:run -- --skip-research
 */

import { spawn } from "node:child_process";
import { resolve } from "node:path";

function parseArgs(argv: string[]) {
  let targetCount = 50;
  let skipResearch = false;
  const passthrough: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--count" && argv[i + 1]) {
      targetCount = Number(argv[++i]);
      passthrough.push("--count", String(targetCount));
    } else if (argv[i] === "--skip-research") {
      skipResearch = true;
    } else if (argv[i] === "--niche" && argv[i + 1]) {
      passthrough.push("--niche", argv[++i]);
    }
  }

  return { targetCount, skipResearch, passthrough };
}

function run(script: string, args: string[] = []): Promise<void> {
  return new Promise((resolvePromise, reject) => {
    const child = spawn("npx", ["tsx", script, ...args], {
      cwd: process.cwd(),
      stdio: "inherit",
      env: process.env,
    });
    child.on("close", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${script} exited with code ${code}`));
    });
  });
}

async function main() {
  const { skipResearch, passthrough } = parseArgs(process.argv.slice(2));
  const scriptsDir = resolve(process.cwd(), "scripts/prospect-agent");

  console.log("=== Joltra Pipeline Run ===\n");

  if (!skipResearch) {
    console.log("Step 1/4: Research\n");
    await run(resolve(scriptsDir, "run.ts"), passthrough);
  } else {
    console.log("Step 1/4: Research (skipped)\n");
  }

  console.log("\nStep 2/4: Score\n");
  await run(resolve(scriptsDir, "score-output.ts"));

  console.log("\nStep 3/4: Draft DMs\n");
  await run(resolve(scriptsDir, "draft-output.ts"));

  console.log("\nStep 4/4: Sync to Notion + Discord\n");
  await run(resolve(scriptsDir, "sync-notion.ts"));

  console.log("\n=== Pipeline complete ===");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

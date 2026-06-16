/**
 * Query Notion for due follow-ups and ping Discord.
 *
 * Usage:
 *   npm run pipeline:follow-ups
 */

import { loadEnvLocal } from "../../lib/load-env";
import { sendFollowUpPing } from "../../lib/integrations/discord";
import { queryDueFollowUps } from "../../lib/integrations/notion";

async function main() {
  loadEnvLocal();

  const due = await queryDueFollowUps();

  if (!due.length) {
    console.log("No follow-ups due today.");
    return;
  }

  console.log(`${due.length} follow-up${due.length === 1 ? "" : "s"} due:\n`);
  for (const item of due) {
    console.log(`  · ${item.name} (due ${item.followUpDate})`);
  }

  const sent = await sendFollowUpPing(due.length);
  if (sent) console.log("\nDiscord notification sent");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

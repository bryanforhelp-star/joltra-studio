import type { ScoredProspect } from "./types";

const PIPELINE_HEADER =
  "creator_name,main_platform,main_followers,gap_platforms,last_longform_date,specific_content_to_reference,fit_score_1_10,status,dm_sent_date,follow_up_date,notes";

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function prospectToPipelineRow(prospect: ScoredProspect): string {
  const gapPlatforms = prospect.gapPlatforms.join("; ");
  const notes = [
    prospect.contentSpecificPraise ? `praise: ${prospect.contentSpecificPraise}` : "",
    prospect.persona ? `persona: ${prospect.persona}` : "",
    prospect.tierFit ? `tier: ${prospect.tierFit}` : "",
    prospect.buyerSignals?.length ? `signals: ${prospect.buyerSignals.join(", ")}` : "",
    `niche: ${prospect.niche}`,
    `score: ${prospect.score}`,
    prospect.qualified ? "qualified" : "not qualified",
    prospect.contact.email ? `email: ${prospect.contact.email}` : "",
    prospect.longForm.exampleUrl,
    prospect.disqualifyReasons.length ? `flags: ${prospect.disqualifyReasons.join(" | ")}` : "",
    prospect.researchNotes,
  ]
    .filter(Boolean)
    .join(" — ");

  return [
    escapeCsv(prospect.name),
    escapeCsv(prospect.mainPlatform.platform),
    prospect.mainPlatform.followers ?? "",
    escapeCsv(gapPlatforms),
    prospect.longForm.lastPublishedDate,
    escapeCsv(prospect.longForm.exampleTitle),
    prospect.score,
    prospect.qualified ? "researched" : "skip",
    "",
    "",
    escapeCsv(notes),
  ].join(",");
}

export function prospectsToCsv(prospects: ScoredProspect[]): string {
  const rows = prospects.map(prospectToPipelineRow);
  return [PIPELINE_HEADER, ...rows].join("\n");
}

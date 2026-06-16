import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { DmDraft, ScoredProspect } from "./types";

function firstName(fullName: string): string {
  return fullName.split(/\s+/)[0] ?? fullName;
}

function formatPlatform(platform: string): string {
  const labels: Record<string, string> = {
    youtube: "YouTube",
    instagram: "Instagram",
    podcast: "podcast",
    tiktok: "TikTok",
    linkedin: "LinkedIn",
    threads: "Threads",
    substack: "Substack",
    reels: "Reels",
    shorts: "Shorts",
    x: "X",
  };
  return labels[platform.toLowerCase()] ?? platform;
}

function pickChannel(prospect: ScoredProspect): DmDraft["channel"] {
  const gaps = prospect.gapPlatforms.map((p) => p.toLowerCase());
  if (gaps.includes("linkedin") || prospect.persona === "founder_creator") return "linkedin";
  if (prospect.mainPlatform.platform.toLowerCase() === "instagram") return "instagram";
  return "x";
}

function longFormLabel(prospect: ScoredProspect): string {
  const type = prospect.longForm.type;
  if (type === "podcast") return "episode";
  if (type === "youtube") return "video";
  return "piece";
}

function buildObservation(prospect: ScoredProspect): string {
  if (prospect.contentSpecificPraise?.trim()) {
    return prospect.contentSpecificPraise.trim();
  }

  const niche = prospect.niche;
  if (prospect.longForm.avgLengthMinutes && prospect.longForm.avgLengthMinutes >= 8) {
    return `Clear ${niche} breakdown — the kind of long-form that clips into smaller posts easily.`;
  }
  return `Solid ${niche} content — reads like you're teaching, not just posting for the algorithm.`;
}

function formatGapList(prospect: ScoredProspect): string {
  const gaps = prospect.gapPlatforms.slice(0, 2).map(formatPlatform);
  if (gaps.length === 1) return gaps[0];
  return `${gaps[0]} and ${gaps[1]}`;
}

export function draftDmFromTemplate(prospect: ScoredProspect): DmDraft {
  const name = firstName(prospect.name);
  const mainPlatform = formatPlatform(prospect.mainPlatform.platform);
  const gapList = formatGapList(prospect);
  const gap1 = formatPlatform(prospect.gapPlatforms[0] ?? "TikTok");
  const exampleTitle = prospect.longForm.exampleTitle;
  const observation = buildObservation(prospect);
  const channel = pickChannel(prospect);
  const contentWord = longFormLabel(prospect);

  const primary = `Hey ${name} — was looking at your ${mainPlatform} and came across "${exampleTitle}." ${observation}

You're posting on ${mainPlatform} but ${gapList} ${prospect.gapPlatforms.length > 1 ? "are" : "is"} basically empty — feels like reach you're leaving on the table.

We take long-form you're already making and turn it into clips + posts for the channels you're not on. You keep filming on ${mainPlatform}. Flat monthly retainer, no extra shoots.

Worth a quick rundown of what week one could look like?`;

  const short = `Hey ${name} — saw "${exampleTitle}" on your ${mainPlatform}. ${gap1} is empty though. We run dormant platforms from existing long-form (flat retainer). Open to a quick sketch of week one?`;

  const followUp3Day = `Hey ${name} — bumping this. Happy to put together a free sample batch from your latest ${contentWord} ("${exampleTitle}") so you can see what week one would actually look like. No commitment.`;

  const followUp7Day = `Last note — if timing's off, no worries. If you ever want ${gap1} run from content you're already making, I'm around.`;

  return { primary, short, followUp3Day, followUp7Day, channel };
}

export function getPitchTemplateReference(): string {
  const path = resolve(process.cwd(), "docs/templates/pitch-dm.txt");
  return readFileSync(path, "utf8");
}

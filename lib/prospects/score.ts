import { ICP } from "./criteria";
import type { RawProspect, ScoreBreakdown, ScoredProspect } from "./types";

function daysSince(isoDate: string): number | null {
  const parsed = Date.parse(isoDate);
  if (Number.isNaN(parsed)) return null;
  return Math.floor((Date.now() - parsed) / (1000 * 60 * 60 * 24));
}

function isDormant(snapshot: {
  lastPostDate?: string;
  postsPerMonth?: number;
  notes?: string;
}): boolean {
  if (snapshot.notes?.toLowerCase().includes("active")) return false;
  if (snapshot.postsPerMonth !== undefined && snapshot.postsPerMonth <= ICP.dormant.maxPostsPerMonth) {
    return true;
  }
  if (!snapshot.lastPostDate) return true;
  const days = daysSince(snapshot.lastPostDate);
  return days === null || days >= ICP.dormant.inactiveDays;
}

function isOriginalCreator(prospect: RawProspect): { ok: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (prospect.isOriginalCreator === false) {
    reasons.push("not an original creator (fan page / aggregator)");
    return { ok: false, reasons };
  }

  const combined = [
    ...prospect.redFlags,
    prospect.researchNotes,
    prospect.name,
    prospect.niche,
    prospect.mainPlatform.notes ?? "",
  ]
    .join(" ")
    .toLowerCase();

  const verifiedOriginal =
    prospect.isOriginalCreator === true ||
    combined.includes("original creator verified");

  // "[Celebrity Name] Unlocked" style aggregator channels
  const aggregatorNamePattern = /^(.+?)\s+(Unlocked|Daily|Clips|Moments|Central|Archive)$/i;
  const nameMatch = prospect.name.match(aggregatorNamePattern);
  if (nameMatch && !verifiedOriginal) {
    const subject = nameMatch[1].trim();
    if (subject.split(/\s+/).length >= 2) {
      reasons.push(`possible celebrity/aggregator channel: "${prospect.name}"`);
      return { ok: false, reasons };
    }
  }

  const aggregatorPatterns = [
    /fan page/,
    /repost channel/,
    /curated clips/,
    /celebrity clips/,
    /unofficial/,
    /aggregator/,
    /clips of /,
    /not original content/,
    /re-upload/,
  ];

  for (const pattern of aggregatorPatterns) {
    if (pattern.test(combined) && !prospect.researchNotes.toLowerCase().includes("original creator verified")) {
      reasons.push(`possible aggregator/fan page: matched ${pattern}`);
      return { ok: false, reasons };
    }
  }

  return { ok: true, reasons };
}

function countBuyerSignals(prospect: RawProspect): number {
  const signals = prospect.buyerSignals ?? [];
  if (signals.length > 0) return signals.length;

  const combined = [
    prospect.researchNotes,
    prospect.contact.contactUrl ?? "",
    prospect.contact.email ?? "",
    prospect.niche,
  ]
    .join(" ")
    .toLowerCase();

  let count = 0;
  if (prospect.contact.email) count++;
  if (prospect.contact.contactUrl?.match(/calendly|book|coaching|course|skool|teachable|kajabi/i)) count++;
  if (combined.match(/coach|course|consult|community|newsletter|book a call|work with me|founder|saas/i)) count++;
  return count;
}

function scoreProvenCreator(prospect: RawProspect): { points: number; reasons: string[] } {
  const followers = prospect.mainPlatform.followers ?? 0;
  const platform = prospect.mainPlatform.platform.toLowerCase();
  const reasons: string[] = [];
  const { longForm } = prospect;

  if (longForm.frequency !== "weekly" && longForm.frequency !== "biweekly") {
    reasons.push(`long-form frequency is ${longForm.frequency}`);
    return { points: 0, reasons };
  }

  if (longForm.type === "youtube" && longForm.avgLengthMinutes !== undefined) {
    if (longForm.avgLengthMinutes < ICP.longForm.minVideoMinutes) {
      reasons.push("youtube content mostly short-form");
      return { points: 0, reasons };
    }
  }

  if (platform === "podcast") {
    if (followers < ICP.mainPlatform.podcastDownloadSoftMin) {
      reasons.push(`podcast audience ${followers} below ${ICP.mainPlatform.podcastDownloadSoftMin}`);
      return { points: 0, reasons };
    }
    if (followers >= ICP.mainPlatform.podcastDownloadMin && followers <= ICP.mainPlatform.followerIdealMax) {
      return { points: 2, reasons };
    }
    return { points: 1, reasons };
  }

  if (followers < ICP.mainPlatform.followerHardMin) {
    reasons.push(`main platform ${followers} below ${ICP.mainPlatform.followerHardMin} minimum`);
    return { points: 0, reasons };
  }
  if (followers > ICP.mainPlatform.followerHardMax) {
    reasons.push(`main platform ${followers} followers — likely has a team`);
    return { points: 0, reasons };
  }
  // Growing tier 8K–200K = full points (prioritize smaller creators)
  if (followers >= ICP.mainPlatform.followerSoftMin && followers <= ICP.mainPlatform.followerIdealMax) {
    return { points: 2, reasons };
  }
  if (followers >= ICP.mainPlatform.followerHardMin) {
    return { points: 1, reasons };
  }
  reasons.push(`main platform ${followers} below soft floor`);
  return { points: 0, reasons };
}

function scoreDistributionGap(prospect: RawProspect): number {
  const dormantCount = prospect.secondaryPlatforms.filter(isDormant).length;
  if (dormantCount >= 2) return 2;
  if (dormantCount === 1) return 1;
  return 0;
}

function scoreBuyerFit(prospect: RawProspect): { points: number; reasons: string[] } {
  const reasons: string[] = [];
  const signalCount = countBuyerSignals(prospect);
  if (signalCount >= 1) return { points: 2, reasons };
  reasons.push("no buyer/revenue signals found");
  return { points: 0, reasons };
}

function scoreContentRepurposability(prospect: RawProspect): number {
  if (prospect.contentRepurposability === "high") return 1;
  if (prospect.contentRepurposability === "medium") return 1;
  if (prospect.contentRepurposability === "low") return 0;

  const combined = [prospect.niche, prospect.researchNotes, prospect.longForm.type].join(" ").toLowerCase();
  if (combined.match(/entertainment|gaming|reaction|vlog|music|lifestyle|homemaking|faith/)) return 0;
  if (combined.match(/coach|educ|tutorial|business|podcast|founder|marketing|finance|productivity/)) return 1;
  return 0;
}

function scoreRecentActivity(prospect: RawProspect): { points: number; reasons: string[] } {
  const reasons: string[] = [];
  const days = daysSince(prospect.longForm.lastPublishedDate);
  if (days === null) {
    reasons.push("could not parse last publish date");
    return { points: 0, reasons };
  }
  if (days <= ICP.recency.maxDaysSincePublish) return { points: 1, reasons };
  reasons.push(`last long-form ${days} days ago`);
  return { points: 0, reasons };
}

function scoreContactable(prospect: RawProspect): number {
  if (prospect.contact.email) return 1;
  if (prospect.contact.dmOpen) return 1;
  if (prospect.contact.contactUrl) return 1;
  return 0;
}

function scoreRedFlags(prospect: RawProspect): { points: number; reasons: string[] } {
  const reasons: string[] = [];
  const combined = [
    ...prospect.redFlags,
    prospect.researchNotes,
    prospect.mainPlatform.notes ?? "",
  ]
    .join(" ")
    .toLowerCase();

  for (const phrase of ICP.redFlagPhrases) {
    if (combined.includes(phrase)) {
      reasons.push(`red flag: ${phrase}`);
    }
  }

  if (prospect.redFlags.length > 0) {
    reasons.push(...prospect.redFlags.map((f) => `red flag: ${f}`));
  }

  return { points: reasons.length === 0 ? 1 : 0, reasons };
}

function scoreContentReference(prospect: RawProspect): number {
  const hasReference = prospect.longForm.exampleTitle && prospect.longForm.exampleUrl;
  const hasPraise = Boolean(prospect.contentSpecificPraise?.trim());
  if (hasReference && hasPraise) return 1;
  if (hasReference) return 1;
  return 0;
}

function scorePersonaMatch(prospect: RawProspect): number {
  if (prospect.persona && ICP.personas.includes(prospect.persona)) return 1;
  return 0;
}

export function scoreProspect(prospect: RawProspect): ScoredProspect {
  const disqualifyReasons: string[] = [];

  const original = isOriginalCreator(prospect);
  const proven = scoreProvenCreator(prospect);
  const buyer = scoreBuyerFit(prospect);
  const recent = scoreRecentActivity(prospect);
  const redFlags = scoreRedFlags(prospect);

  disqualifyReasons.push(
    ...original.reasons,
    ...proven.reasons,
    ...buyer.reasons,
    ...recent.reasons,
    ...redFlags.reasons,
  );

  const scoreBreakdown: ScoreBreakdown = {
    provenCreator: proven.points,
    distributionGap: scoreDistributionGap(prospect),
    buyerFit: buyer.points,
    contentRepurposability: scoreContentRepurposability(prospect),
    recentActivity: recent.points,
    contactable: scoreContactable(prospect),
    noRedFlags: redFlags.points,
    hasContentReference: scoreContentReference(prospect),
    personaMatch: scorePersonaMatch(prospect),
  };

  const score = Object.values(scoreBreakdown).reduce((sum, n) => sum + n, 0);

  if (!original.ok) {
    disqualifyReasons.push("not an original creator");
  }
  if (scoreBreakdown.distributionGap === 0) {
    disqualifyReasons.push("no dormant secondary platforms found");
  }
  if (scoreBreakdown.contactable === 0) {
    disqualifyReasons.push("no email or open DM found");
  }
  if (scoreBreakdown.buyerFit === 0) {
    disqualifyReasons.push("no buyer/revenue signals");
  }
  if (scoreBreakdown.provenCreator === 0) {
    disqualifyReasons.push("does not meet proven creator threshold");
  }

  const qualified =
    original.ok &&
    score >= ICP.outreach.minScore &&
    scoreBreakdown.distributionGap > 0 &&
    scoreBreakdown.contactable > 0 &&
    scoreBreakdown.buyerFit > 0 &&
    scoreBreakdown.provenCreator > 0 &&
    scoreBreakdown.noRedFlags > 0 &&
    prospect.gapPlatforms.length > 0;

  return {
    ...prospect,
    score,
    scoreBreakdown,
    qualified,
    disqualifyReasons: [...new Set(disqualifyReasons.filter(Boolean))],
  };
}

export function scoreProspects(prospects: RawProspect[]): ScoredProspect[] {
  return prospects.map(scoreProspect).sort((a, b) => b.score - a.score);
}

import type { BuyerSignal, Persona } from "./criteria";

export const SECONDARY_PLATFORMS = [
  "tiktok",
  "linkedin",
  "threads",
  "substack",
  "reels",
  "shorts",
] as const;

export const MAIN_PLATFORMS = ["youtube", "instagram", "podcast"] as const;

export type SecondaryPlatform = (typeof SECONDARY_PLATFORMS)[number];
export type MainPlatform = (typeof MAIN_PLATFORMS)[number];

export type LongFormType = "youtube" | "podcast" | "instagram_long" | "newsletter";
export type PublishFrequency = "weekly" | "biweekly" | "monthly" | "irregular";

export type ContentRepurposability = "high" | "medium" | "low";
export type TierFit = "starter" | "growth" | "partner";

export type PlatformSnapshot = {
  platform: string;
  handle?: string;
  url?: string;
  followers?: number;
  /** ISO date string YYYY-MM-DD */
  lastPostDate?: string;
  postsPerMonth?: number;
  notes?: string;
};

export type LongFormEvidence = {
  type: LongFormType;
  frequency: PublishFrequency;
  avgLengthMinutes?: number;
  exampleTitle: string;
  exampleUrl: string;
  /** ISO date string YYYY-MM-DD */
  lastPublishedDate: string;
};

export type ProspectContact = {
  dmOpen?: boolean;
  email?: string;
  contactUrl?: string;
};

/** Raw prospect as returned by the research agent */
export type RawProspect = {
  name: string;
  niche: string;
  persona?: Persona;
  buyerSignals?: BuyerSignal[];
  contentRepurposability?: ContentRepurposability;
  tierFit?: TierFit;
  /** Must be true — skip fan pages, aggregators, celebrity repost channels */
  isOriginalCreator?: boolean;
  /** One specific true observation for the DM opener — not generic praise */
  contentSpecificPraise?: string;
  mainPlatform: PlatformSnapshot;
  secondaryPlatforms: PlatformSnapshot[];
  longForm: LongFormEvidence;
  contact: ProspectContact;
  gapPlatforms: string[];
  redFlags: string[];
  source: string;
  researchNotes: string;
};

export type ScoreBreakdown = {
  provenCreator: number;
  distributionGap: number;
  buyerFit: number;
  contentRepurposability: number;
  recentActivity: number;
  contactable: number;
  noRedFlags: number;
  hasContentReference: number;
  personaMatch: number;
};

export type ScoredProspect = RawProspect & {
  score: number;
  scoreBreakdown: ScoreBreakdown;
  qualified: boolean;
  disqualifyReasons: string[];
};

export type ProspectResearchOutput = {
  researchedAt: string;
  queryNotes?: string;
  prospects: RawProspect[];
};

export type DmDraft = {
  primary: string;
  short: string;
  followUp3Day: string;
  followUp7Day: string;
  channel: "instagram" | "x" | "linkedin";
};

export type DraftedProspect = ScoredProspect & {
  dmDraft: DmDraft;
};

export type DraftedProspectOutput = {
  draftedAt: string;
  prospects: DraftedProspect[];
};

export type SeenProspect = {
  name: string;
  mainPlatformUrl: string;
  addedAt: string;
};

export type SeenProspectsFile = {
  prospects: SeenProspect[];
};

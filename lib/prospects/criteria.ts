/** Shared ICP — used by the agent, scorer, and docs/icp.md */

export const PERSONAS = [
  "expert_coach",
  "educator",
  "podcast_first",
  "founder_creator",
] as const;

export type Persona = (typeof PERSONAS)[number];

export const PERSONA_LABELS: Record<Persona, string> = {
  expert_coach: "Expert/coach",
  educator: "Educator",
  podcast_first: "Podcast-first",
  founder_creator: "Founder-creator",
};

export const BUYER_SIGNALS = [
  "course",
  "coaching",
  "consulting",
  "community",
  "newsletter",
  "booking_link",
  "business_email",
  "founder_product",
  "work_with_me",
] as const;

export type BuyerSignal = (typeof BUYER_SIGNALS)[number];

export const ANTI_PERSONAS = [
  "entertainment_only",
  "has_social_team",
  "short_form_only",
  "one_off_buyer",
  "active_everywhere",
  "too_small",
  "fan_page_aggregator",
  "celebrity_repost",
] as const;

export const REPURPOSABLE_CONTENT_TYPES = [
  "educational",
  "talk_heavy",
  "tutorial",
  "coaching",
  "interview",
  "thought_leadership",
] as const;

export const NON_REPURPOSABLE_CONTENT_TYPES = [
  "entertainment",
  "gaming",
  "reaction",
  "vlog",
  "music",
] as const;

/** Platforms audited for every candidate — see docs/platform-audit.md */
export const AUDITED_PLATFORMS = {
  main: ["youtube", "instagram", "podcast"] as const,
  distribution: ["tiktok", "instagram_reels", "youtube_shorts", "linkedin", "x", "threads", "substack"] as const,
} as const;

export const ICP = {
  mainPlatform: {
    types: ["youtube", "instagram", "podcast"] as const,
    /** Hard skip below this */
    followerHardMin: 3_000,
    /** Micro tier */
    followerSoftMin: 8_000,
    /** Growing tier starts */
    followerIdealMin: 15_000,
    followerMin: 50_000,
    followerIdealMax: 200_000,
    followerHardMax: 500_000,
    podcastDownloadSoftMin: 2_000,
    podcastDownloadMin: 5_000,
  },
  secondaryPlatforms: ["tiktok", "linkedin", "threads", "substack", "reels", "shorts", "x"] as const,
  dormant: {
    inactiveDays: 60,
    maxPostsPerMonth: 1,
  },
  longForm: {
    minVideoMinutes: 8,
    acceptableFrequencies: ["weekly", "biweekly"] as const,
  },
  recency: {
    maxDaysSincePublish: 30,
  },
  outreach: {
    minScore: 7,
    maxScore: 12,
    targetBatchSize: 50,
    minBuyerSignals: 1,
    /** Target mix per research run */
    followerMix: {
      micro: { min: 5_000, max: 30_000, share: 0.4 },
      growing: { min: 30_000, max: 100_000, share: 0.4 },
      established: { min: 100_000, max: 200_000, share: 0.2 },
    },
  },
  redFlagPhrases: [
    "managed by",
    "talent manager",
    "booking agent",
    "social media manager",
    "media team",
    "only shorts",
    "shorts only",
    "fan page",
    "repost",
    "curated clips",
    "celebrity clips",
    "unofficial",
    "aggregator",
    "clips of",
  ],
  personas: PERSONAS,
  buyerSignals: BUYER_SIGNALS,
  antiPersonas: ANTI_PERSONAS,
} as const;

export const NICHE_SEEDS = [
  "business coaching",
  "personal finance",
  "productivity",
  "fitness coaching",
  "parenting",
  "design tutorials",
  "developer education",
  "marketing",
  "content creation tips",
  "real estate investing",
  "health and wellness",
  "career advice",
] as const;

export const PERSONA_SEARCH_STRATEGIES: Record<Persona, string[]> = {
  expert_coach: [
    '"[niche] coach" site:youtube.com 5000..100000 subscribers',
    "smaller YouTube coaches with Kajabi, Teachable, or Skool in bio",
    "micro coaches 10k-50k with Calendly links",
  ],
  educator: [
    '"how to [skill]" youtube channel small youtuber',
    "tutorial creators 5k-75k with course landing pages",
    "Skillshare teachers with own YouTube under 100k",
  ],
  podcast_first: [
    "indie podcast hosts business niche under 50k downloads",
    "weekly podcast no TikTok presence",
    "niche podcast hosts with empty LinkedIn",
  ],
  founder_creator: [
    '"building in public" youtube under 100k',
    "indie SaaS founders with YouTube but dead X/LinkedIn",
    "startup founders 5k-50k posting long-form",
  ],
};

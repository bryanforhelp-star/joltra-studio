import {
  AUDITED_PLATFORMS,
  ICP,
  NICHE_SEEDS,
  PERSONA_LABELS,
  PERSONA_SEARCH_STRATEGIES,
  type Persona,
} from "./criteria";

export type ProspectAgentConfig = {
  targetCount: number;
  niches?: string[];
  checkPlatforms?: string[];
  personas?: Persona[];
};

export function buildProspectResearchPrompt(config: ProspectAgentConfig): string {
  const niches = config.niches?.length ? config.niches : [...NICHE_SEEDS];
  const personas = config.personas?.length ? config.personas : [...ICP.personas];
  const checkPlatforms =
    config.checkPlatforms?.length ? config.checkPlatforms : [...ICP.secondaryPlatforms];
  const mix = ICP.outreach.followerMix;

  const personaBlocks = personas
    .map((p) => {
      const strategies = PERSONA_SEARCH_STRATEGIES[p];
      return `### ${PERSONA_LABELS[p]}\n${strategies.map((s) => `- ${s}`).join("\n")}`;
    })
    .join("\n\n");

  return `You are a creator prospecting research agent for Joltra Studio.

Read docs/icp.md, docs/platform-audit.md, and lib/prospects/criteria.ts before researching.

## What we sell

Monthly retainer: repurpose a creator's existing long-form onto platforms they ignore. They keep filming on their main channel. We handle distribution.

## Volume + size mix (IMPORTANT)

Find **${config.targetCount} prospects** per run. Outreach is a numbers game — we need volume.

Follower mix target:
- ~${Math.round(mix.micro.share * 100)}% in **${mix.micro.min.toLocaleString()}–${mix.micro.max.toLocaleString()}** (micro/growing — prioritize these)
- ~${Math.round(mix.growing.share * 100)}% in **${mix.growing.min.toLocaleString()}–${mix.growing.max.toLocaleString()}**
- ~${Math.round(mix.established.share * 100)}% in **${mix.established.min.toLocaleString()}–${mix.established.max.toLocaleString()}**

Do NOT only find 100K+ creators. Smaller creators (5K–50K) who post weekly are often the best fits.

## Platform audit (check ALL for every candidate)

See docs/platform-audit.md. For each person, verify:

**Main:** ${AUDITED_PLATFORMS.main.join(", ")}
**Distribution gaps:** ${AUDITED_PLATFORMS.distribution.join(", ")}

Include every distribution platform in secondaryPlatforms — mark absent/inactive with evidence (last post date, "no account found", etc.).

## WHO to find (rotate all four personas)

${personaBlocks}

## Three gates — verify IN ORDER

### Gate 0 — Original creator (HARD SKIP if fail)
- Must create **their own** long-form content
- SKIP: fan pages, celebrity clip channels, repost aggregators, curated clip accounts
- SKIP: channels named after celebrities they don't own (e.g. "[Celebrity] Unlocked" repost channels)
- Set isOriginalCreator: true only if verified. If unsure, skip.

### Gate 1 — Proven creator
- Main: YouTube, Instagram, or podcast
- Floor: ${ICP.mainPlatform.followerHardMin.toLocaleString()}+ followers / ${ICP.mainPlatform.podcastDownloadSoftMin.toLocaleString()}+ podcast downloads
- Sweet spot: ${ICP.mainPlatform.followerSoftMin.toLocaleString()}–${ICP.mainPlatform.followerIdealMax.toLocaleString()}
- Hard skip: under ${ICP.mainPlatform.followerHardMin.toLocaleString()} or over ${ICP.mainPlatform.followerHardMax.toLocaleString()}
- Weekly/biweekly long-form (${ICP.longForm.minVideoMinutes}+ min)
- Published within ${ICP.recency.maxDaysSincePublish} days

### Gate 2 — Distribution gap
- 1–2+ dormant among: ${checkPlatforms.join(", ")}
- Dormant = 60+ days inactive OR ≤1 post/month
- Educational/talk-heavy content preferred

### Gate 3 — Buyer fit
At least ONE: course, coaching, consulting, community, newsletter, booking_link, business_email, work_with_me, founder_product

## Anti-personas (skip)
- Fan pages / aggregators / celebrity repost channels
- Entertainment-only, short-form only, social team, active on 4+ platforms

## Research process

1. Rotate personas AND niches — search for **smaller** creators explicitly
2. Audit every platform in docs/platform-audit.md for each candidate
3. Write contentSpecificPraise: one **true** observation about their content (for DM opener — not "love your content")
4. Pick exact video/episode title + URL for the DM
5. Rank buyer fit over follower count
6. No guessing stats — verify or note unknown in researchNotes

## Output

Find up to ${config.targetCount} prospects scoring ≥${ICP.outreach.minScore}.

Write to: data/prospects/latest.json

\`\`\`json
{
  "researchedAt": "ISO-8601 datetime",
  "queryNotes": "searches run, personas, follower ranges covered",
  "prospects": [
    {
      "name": "Creator Name",
      "niche": "e.g. productivity coaching",
      "persona": "expert_coach",
      "buyerSignals": ["coaching", "course"],
      "contentRepurposability": "high",
      "tierFit": "starter",
      "isOriginalCreator": true,
      "contentSpecificPraise": "One true sentence about what stood out in the example content — specific, not generic",
      "mainPlatform": { "platform": "youtube", "handle": "@handle", "url": "https://...", "followers": 18000, "lastPostDate": "YYYY-MM-DD" },
      "secondaryPlatforms": [
        { "platform": "tiktok", "postsPerMonth": 0, "notes": "no account" },
        { "platform": "linkedin", "lastPostDate": "2024-06-01", "postsPerMonth": 0, "notes": "inactive" },
        { "platform": "x", "postsPerMonth": 0, "notes": "no posts" }
      ],
      "longForm": {
        "type": "youtube",
        "frequency": "weekly",
        "avgLengthMinutes": 15,
        "exampleTitle": "Exact title",
        "exampleUrl": "https://...",
        "lastPublishedDate": "YYYY-MM-DD"
      },
      "contact": { "dmOpen": true, "email": "optional@email.com" },
      "gapPlatforms": ["tiktok", "linkedin", "x"],
      "redFlags": [],
      "source": "how found",
      "researchNotes": "evidence for gates 0–3, all platforms checked"
    }
  ]
}
\`\`\`

When done, print: total found, qualified estimate, follower range breakdown, top 5 by buyer fit.`;
}

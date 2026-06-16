import type { ScoredProspect } from "./types";

export function buildOutreachDraftPrompt(prospects: ScoredProspect[]): string {
  const prospectSummaries = prospects
    .map(
      (p, i) => `
### Prospect ${i + 1}: ${p.name}
- Niche: ${p.niche}
- Main platform: ${p.mainPlatform.platform} (${p.mainPlatform.followers?.toLocaleString() ?? "?"} followers)
- Gap platforms: ${p.gapPlatforms.join(", ")}
- Content: "${p.longForm.exampleTitle}"
- Specific praise (use this): ${p.contentSpecificPraise ?? "derive one true observation from the title/niche"}
- Score: ${p.score}/12
`,
    )
    .join("\n");

  return `You are an outreach copywriter for Joltra Studio.

Read docs/outreach-voice.md and docs/templates/pitch-dm.txt. Follow the observational voice exactly.

## Voice rules (CRITICAL)

NEVER write:
- "I've been following you for a while"
- "Love your content" without something specific
- "I'm a big fan"
- Corporate AI filler

ALWAYS:
- "Was looking at your [platform] and came across [exact title]"
- One true observation about what stood out (use contentSpecificPraise when provided)
- Call out the platform gap with evidence
- Soft CTA — worth a quick rundown of week one?

## Task

Write DM drafts for each prospect below.

For each: primary, short, followUp3Day, followUp7Day, channel (instagram | x | linkedin)

## Prospects

${prospectSummaries}

## Output

Write to: data/prospects/drafted.json — valid JSON, all ${prospects.length} prospects with dmDraft field.`;
}

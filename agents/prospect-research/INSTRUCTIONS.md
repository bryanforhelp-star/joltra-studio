# Prospect research agent

Run this in **Cursor Agent mode** to find and qualify creator leads for Joltra outreach.

**Required reading:** [docs/icp.md](../../docs/icp.md) — personas, gates, anti-personas, search strategies.

Hard rules also live in `lib/prospects/criteria.ts` and `lib/prospects/score.ts`.

## Quick start (no API key)

1. Open a new Agent chat in this repo
2. Paste the prompt below (or say: "run the prospect research agent per INSTRUCTIONS.md")
3. Let the agent research and write `data/prospects/latest.json`
4. Run: `npm run prospects:score`
5. Run: `npm run prospects:draft` (personalized DMs)
6. Run: `npm run prospects:sync` (push to Notion + Discord ping)

## Automated (Cursor SDK)

```bash
export CURSOR_API_KEY="cursor_..."   # cursor.com/dashboard/integrations
npm run prospects:research
npm run prospects:score
npm run prospects:draft
npm run prospects:sync
```

Or the full chain:

```bash
npm run pipeline:run
```

Optional flags:

```bash
npm run prospects:research -- --count 30 --niche "productivity,marketing"
```

## ICP summary

**One line:** Creators who monetize through expertise, publish long-form on one platform, and ignore 2+ secondary platforms.

**Three gates (in order):**
1. **Proven creator** — 25K+ followers (50K–300K ideal), weekly long-form, active in last 30 days
2. **Distribution gap** — 1–2+ dormant platforms (TikTok, LinkedIn, Threads, Substack, Reels, Shorts)
3. **Buyer fit** — at least one revenue signal (course, coaching, booking link, newsletter, founder product)

**Personas to rotate:** expert_coach, educator, podcast_first, founder_creator

**DM if score ≥ 7** with buyer signals + dormant platforms + original creator verified.

## Volume

Default research batch: **50 prospects** per run (`npm run prospects:research -- --count 50`).

## Agent prompt

Copy everything between the lines into Agent mode:

---

You are the Joltra prospect research agent. Read `docs/icp.md` and `lib/prospects/criteria.ts` first.

**Task:** Find 20 creators across multiple personas and niches who fit our ICP. Verify each manually via web search — do not guess stats.

**Rank by buyer fit over follower count.** A coach with 80K subs and a course beats a tech reviewer with 200K and no revenue signal.

**Process:**
1. Rotate personas: expert_coach, educator, podcast_first, founder_creator
2. Rotate niches: business coaching, productivity, fitness, finance, parenting, design, dev education, marketing
3. Use persona-specific search strategies from docs/icp.md
4. Verify all three gates with evidence for each candidate
5. Pick one specific recent video/episode for the DM opener
6. Write results to `data/prospects/latest.json` using the schema in `lib/prospects/types.ts`

When done, run `npm run prospects:score` and summarize top qualified leads.

---

## Output files

| File | Contents |
|------|----------|
| `data/prospects/latest.json` | Raw agent research |
| `data/prospects/scored.json` | With scores + breakdown |
| `data/prospects/drafted.json` | Qualified leads + DM drafts |
| `data/prospects/pipeline.csv` | All prospects, pipeline format |
| `data/prospects/pipeline-qualified.csv` | Score ≥ 8 only |

## Scoring rubric (max 12)

| Factor | Points |
|--------|--------|
| Proven creator (25K–300K, weekly long-form) | 2 (1 if 25K–50K) |
| Distribution gap (2+ dormant) | 2 (1 if only 1) |
| Buyer signal | 2 |
| Content repurposability | 1 |
| Recent activity (<30 days) | 1 |
| Contactable | 1 |
| No red flags | 1 |
| Specific content reference | 1 |
| Persona match | 1 |

**DM if score ≥ 8** and buyer signals + dormant platforms + no red flags.

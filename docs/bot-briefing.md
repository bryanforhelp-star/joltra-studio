# Joltra Studio — Bot Briefing

**Purpose:** Single source of truth for any bot or agent working on Joltra's creator retainer business. Read this before researching prospects, drafting DMs, making mock content, or advising on strategy.

**Last updated:** 2026-06-12

---

## Company & offer

**Joltra Studio** sells creator retainers — not editing gigs, not AI tools.

**Offer in one line:** We run the platforms creators ignore (TikTok, Reels, Shorts, Threads, LinkedIn, Substack) on a flat monthly retainer. They keep posting long-form on their main channel. We repurpose everything.

**What we sell:**
1. **Reach** on platforms they ignore
2. **Time back** — zero extra filming or writing from the creator
3. **A system** that runs every week without them thinking about it

**What we do NOT sell:**
- "AI repurposing" or tool jargon
- One-off video edits
- Generic social media management for creators who are already everywhere

**Positioning:** Sell time back, not AI. Lead with the platform gap, not our stack.

---

## Pricing

| Tier | Platforms | Price | Best for |
|------|-----------|-------|----------|
| **Single** | 1 (e.g. TikTok only) | **$1,000/mo** | Testing one channel, POC clients |
| **Multi** | 3–4 | **$2,500/mo** | Default pitch for most creators |

**POC offer (current priority):** First client at **$1,000 for 30 days** in exchange for a case study and testimonial. Waive setup fee.

**Scope modifiers (future):**
- +$500/mo if they publish 8+ long-form pieces/month
- −$200/mo if they pre-approve batches (no review queue)

---

## Ideal customer profile (ICP)

### Pass criteria

| Check | Requirement |
|-------|-------------|
| **Strong on one platform** | 50K–300K on YouTube or Instagram (up to 500K if no team). Podcast: 10K+ downloads with weekly episodes. |
| **Quiet elsewhere** | TikTok, LinkedIn, Threads, Substack, Reels, or Shorts: inactive (60+ days since last post) or ≤1 post/month |
| **Good long-form** | Weekly or biweekly. YouTube videos 8+ min, or podcast episodes 30+ min. Posted on main platform within 30 days. |
| **Contactable** | Email in bio, contact page, or DMs open |
| **Original creator** | Not a fan page, aggregator, or repost channel |

### Hard skip (anti-personas)

- Managed by / talent manager / booking agent / social media team in bio
- Only posts shorts — nothing to repurpose
- 1M+ followers or established course business with full team
- Already active on 4+ platforms — no gap to sell
- No long-form published in 6+ months
- Entertainment-only with no business reason to expand

### Scoring

Prospects score **1–10**. **DM if score ≥ 7** AND:
- At least one dormant secondary platform
- At least one gap platform identified
- No red flags
- Contactable (email or open DM)
- Main platform strength + long-form quality both pass

Scoring logic: `lib/prospects/score.ts`  
ICP constants: `lib/prospects/criteria.ts`

---

## Outreach playbook

### Daily targets (until first client)

- **5 new DMs/day** (start conservative; scale to 10 after mock-content workflow is proven)
- **5 follow-ups/day** on prior DMs
- **1 discovery call booked per week**

### Workflow

1. Research prospect (5 min) — fill pipeline row
2. Score 1–10; only DM 7+
3. Personalize DM with specific video title + platform gap
4. Log status: `researched` → `dm_sent` → `replied` → `call_booked` → `proposal_sent` → `closed` → `onboarding`

### Mock content before mass DM

For the **#1 prospect**, create **3 clips + 3 posts** from their latest long-form video **before** sending the DM. Attach or reference in follow-up. This is the highest-conversion hook.

### Discovery call (20 min)

1. What they create today and where they're strongest (2 min)
2. Walk secondary platforms together — point out the gap (5 min)
3. Show week-one example from a recent video (5 min)
4. Scope + price (5 min)
5. Next steps: proposal same day, onboarding on payment (3 min)

**Questions to ask:**
- How often do you publish long-form?
- Which platforms do you wish you were on but never have time for?
- Do you have transcripts or can we generate them?
- Who approves posts before they go live?

**Walk away if:**
- Only short clips, no long-form library
- Already has full social team
- Wants one-off project, not retainer
- Can't give platform access within 48 hours

---

## Outreach voice

**Core principle:** Observational, not performative. We did research. We say what we saw.

### Never say
- "I've been following you for a while"
- "Love your content" (with nothing specific)
- "I'm a big fan"
- "AI system" or tool jargon upfront

### Always do
- Reference **one specific piece** by title
- Say **what you noticed** (topic, format, who it's for)
- Call out the **platform gap** with evidence
- Offer **what we'd do** in plain language

### DM structure

1. **Hook** — "Hey [name] — was looking at your [platform] and came across [specific title]."
2. **Observation** — One true sentence about what stood out
3. **Gap** — "You're active on [main] but [gap platforms] are basically empty"
4. **Offer** — Repurpose existing long-form. No new filming. Flat retainer.
5. **CTA** — "Worth a quick rundown of what week one could look like?"

### Follow-ups
- **3 days:** Offer free sample batch from the specific video you named
- **7 days:** Last note. Door open. No guilt trip.

Full templates: `docs/templates/pitch-dm.txt`  
Voice guide: `docs/outreach-voice.md`

---

## Weekly delivery (per client)

**Target:** ≤3 hours/client/week

| Day | Task |
|-----|------|
| Monday | Ingest newest long-form → transcript → Claude Project |
| Monday | Generate: 5 Threads/X posts, 1 LinkedIn post, 1 Substack intro, 5 clip timestamps |
| Monday | Cut 5–7 clips (OpusClip or CapCut), caption, 9:16 |
| Monday | Queue full week in scheduler |
| Tue–Fri | Monitor comments, note top performer for next week |

**Per-platform cadence:**

| Platform | Deliverable | Cadence |
|----------|-------------|---------|
| TikTok | 1–2 clips/day | Mon–Fri |
| Reels / Shorts | Same clips, staggered | Mon–Fri |
| Threads / X | 1 post/day | Mon–Fri |
| LinkedIn | 2–3 posts/week | Tue, Thu, Sat |
| Substack | 1 edition/week | Thu or Fri |

Full SOP: `docs/outreach-playbook.md`  
Onboarding: `docs/templates/client-onboarding-checklist.md`

---

## Current qualified prospects (DM these)

Researched 2026-06-12. Scored and qualified via `npm run prospects:score`.  
Raw data: `data/prospects/latest.json`  
Pipeline CSV: `data/prospects/pipeline-qualified.csv`

### 1. Christopher Lawley — 10/10 ⭐ POC #1

| Field | Value |
|-------|-------|
| Niche | Tech / Apple productivity |
| YouTube | https://www.youtube.com/@christopherlawley (202K subs) |
| Latest video | https://www.youtube.com/watch?v=Jvin7UJLDIg — "WWDC Prep, Packing, Wishlist, Note Taking... and an Announcement" (Jun 6, 2026) |
| Gap platforms | TikTok, LinkedIn |
| Email | chris@theuntitled.site |
| Website | https://chrislawley.me/ |
| Notes | Weekly long-form Apple/iPad content. Comfort Zone podcast co-host. No TikTok. Strong POC target. **Make mock content from WWDC video before DMing.** |

### 2. Justin DiRose — 10/10

| Field | Value |
|-------|-------|
| Niche | Productivity / PKM / remote work |
| YouTube | https://www.youtube.com/@effectiveco (~120K subs) |
| Main long-form | Podcast: https://podcast.effectiveremotework.com/ — Process Podcast Ep 89 (May 15, 2026) |
| Gap platforms | TikTok, Threads |
| Email | hi@justindirose.com |
| Website | https://justindirose.carrd.co/ |
| Notes | 89 podcast episodes. Obsidian/productivity focus. Threads account exists but zero posts. |

### 3. Peter Akkies — 9/10

| Field | Value |
|-------|-------|
| Niche | Productivity / task management |
| YouTube | https://www.youtube.com/peterakkies (100K+ subs) |
| Latest video | "Organize Your Life with Todoist" (May 1, 2026) |
| Gap platforms | TikTok, LinkedIn, Threads |
| Email | peter@peterakkies.net |
| Website | https://www.peterakkies.net/contact |
| Podcast | https://podcast.peterakkies.net/ |
| Notes | Coaches executives. Clear multi-platform gap. |

### 4. Megan Fox Unlocked — 9/10

| Field | Value |
|-------|-------|
| Niche | Lifestyle / homemaking / faith |
| YouTube | https://www.youtube.com/c/MeganFoxUnlocked (174K subs) |
| Latest video | https://www.youtube.com/watch?v=h51ZTUy3lWA — "You've missed a chapter . . . time to fill you in!" (Mar 5, 2026) |
| Gap platforms | TikTok, LinkedIn |
| Email | meganfoxunlocked@gmail.com |
| Website | https://meganfoxunlocked.com/ |
| Notes | New video every Thursday. Said on camera she doesn't want TikTok — pitch LinkedIn/Threads instead or skip TikTok in scope. Active on IG (not a gap). |

### 5. Carl Pullein — 9/10

| Field | Value |
|-------|-------|
| Niche | Time management / productivity |
| YouTube | https://www.youtube.com/@Carl_Pullein (157K subs) |
| Podcast | https://carlpullein.podbean.com/ — Ep 418 (Jun 1, 2026) |
| Gap platforms | **TikTok only** |
| Website | https://www.carlpullein.com/ |
| Notes | LinkedIn is very active — do NOT pitch LinkedIn. Pitch TikTok/Reels/Shorts clip workflow only. Active Substack newsletter. |

---

## Researched but skip

| Creator | YouTube | Score | Why skip |
|---------|---------|-------|----------|
| Thomas Frank Explains | https://www.youtube.com/thomasfrankexplains | 8 | Active LinkedIn. Main Thomas Frank channel has 3M+ subs — likely has team. Only TikTok is a gap. |
| Nick Milo | https://www.youtube.com/@linkingyourthinking | 6 | 340K subs but reduced YT output. Last verified upload ~Jun 2025. Stale. |
| Red Gregory | https://www.youtube.com/@RedGregory | 6 | Last YT upload May 2023. Not actively creating. |
| julia fei | https://www.youtube.com/@juliafei | 6 | Managed by Division Media. Already active on TikTok and Instagram. |
| Graham Cochrane | https://www.youtube.com/@GrahamCochrane | 7 | 500K+ subs. Established course business. Likely has team. Revisit at $2.5K tier later. |

---

## Viability assessment

**Is this a viable offering?** Yes.

**Will people pay?** Yes — a narrow slice of mid-tier creators with a clear platform gap, no team, and active long-form output.

### Why it works
- Pain is real: creators know they should be multi-platform but don't have time
- ICP (50K–300K, dormant secondaries) is the sweet spot — budget without a full social team
- $1K/$2.5K pricing matches freelancer/agency rates for similar done-for-you work
- Creator retainer model is proven (see Mariah Brunner's creator retainer guide)

### Where it gets hard
- No case study yet = trust gap. POC at $1K/30 days is mandatory, not optional
- Some creators will DIY with Opus Clip / Descript — our buyer is the one who doesn't want to think about it
- Results must be tangible: hours saved, first viral clip, email signups — not just "12 clips posted"
- Churn risk if work feels templated or engagement flatlines
- Not every qualified prospect will convert (e.g. Megan doesn't want TikTok; Carl already owns LinkedIn)

### Who will pay vs. won't

| Segment | Will they pay? |
|---------|----------------|
| Solo creator, 80K YT, monetizes via courses/affiliates, zero TikTok | **Likely yes** at $1K with mock content first |
| Creator with agency/manager in bio | **No** |
| Creator posting daily everywhere | **No** |
| 500K+ with established team | **Maybe** at $2.5K+, not yet |
| Creator not posting long-form in 6+ months | **No** |

### Success signals to watch
- 1 POC signed in 30 days who renews or refers
- Mock-before-DM converts better than cold pitch
- Case study articulates "hours saved per week"
- After 20 DMs: replies and calls booked (not just curiosity)

### Current priority
**Get one creator to say "I don't want to think about this anymore" and prove it in 30 days.** Everything else scales from that.

---

## Immediate next steps

1. **Mock content for Christopher Lawley** — 3 clips + 3 posts from WWDC video
2. **DM Christopher Lawley** — personalized, gap-first, observational tone
3. **DM 4 more** from qualified list (Justin, Peter, Megan, Carl) — 5/day max
4. **Log everything** in pipeline tracker (`docs/templates/creator-pipeline.csv`)
5. **Book first discovery call** — use 20-min agenda above
6. **Close POC** — $1K/30 days for case study

---

## Repo commands

```bash
# Score research output → pipeline CSV
npm run prospects:score

# Run automated research agent (needs CURSOR_API_KEY)
npm run prospects:research

# Full pipeline (if configured)
npm run pipeline:run
```

## Key files

| File | Purpose |
|------|---------|
| `docs/bot-briefing.md` | This file — start here |
| `docs/outreach-playbook.md` | Full operational SOP |
| `docs/outreach-voice.md` | DM tone and examples |
| `docs/icp.md` | ICP details (note: may diverge on follower tiers — this briefing is source of truth for current POC) |
| `docs/templates/pitch-dm.txt` | DM copy templates |
| `docs/templates/creator-pipeline.csv` | Outreach tracker format |
| `docs/templates/client-onboarding-checklist.md` | Per-client setup |
| `data/prospects/latest.json` | Latest research output |
| `data/prospects/pipeline-qualified.csv` | Scored, DM-ready list |
| `lib/prospects/criteria.ts` | ICP constants for agents |
| `lib/prospects/score.ts` | Scoring logic |
| `agents/prospect-research/INSTRUCTIONS.md` | Prospect research agent workflow |

---

## Bot instructions

When acting on behalf of Joltra:

1. **Always lead with the gap**, not tools or AI
2. **Never invent stats** — verify follower counts, last post dates, emails via research
3. **Personalize every DM** with a specific video title and true observation
4. **Respect skip rules** — don't DM red-flagged creators even if score is high
5. **Prioritize Christopher Lawley** for mock content and first DM
6. **Pitch Carl Pullein TikTok only** — not LinkedIn
7. **Consider Megan Fox Unlocked's TikTok objection** — pitch LinkedIn/Threads, not TikTok
8. **POC framing:** $1K for 30 days in exchange for case study — not a discount, a partnership
9. **Target ≤3 hours/client/week** in delivery planning
10. **Update pipeline status** after every outreach action

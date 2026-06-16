# Joltra creator retainer playbook

Operational guide to start outreach today and deliver the first client in 7 days.

**Offer in one line:** We run the platforms creators ignore (TikTok, Reels, Shorts, Threads, LinkedIn, Substack) on a flat monthly retainer. They keep posting long-form on their main channel. We repurpose everything.

---

## Today: outreach launch (2–3 hours)

### 1. Open the pipeline tracker

Copy `docs/templates/creator-pipeline.csv` into Google Sheets or Notion. You need 20 rows minimum before you start sending DMs.

### 2. Find 20 creators (45 min)

Search YouTube, Instagram, and podcast charts in niches you understand (business, fitness, dev, finance, parenting, etc.).

**Qualify each creator on three checks:**

| Check | Pass criteria |
|-------|----------------|
| Strong on one platform | 50K–500K on YouTube or Instagram (or 10K+ on podcast with weekly episodes) |
| Quiet elsewhere | TikTok, Reels, Shorts, Threads, LinkedIn, or Substack: ≤1 post/week or inactive |
| Good long-form | Weekly+ YouTube, podcast, or long IG video. Not just 30-sec clips |

**Score 1–10.** Only DM creators scoring 7+.

### 3. Research each creator (5 min each)

For every row, fill in:

- Main platform + follower count
- Last upload date on main channel
- Which secondary platforms are dead (list them)
- One specific video/post you can reference in the DM
- Gap platforms you would run (pick 1–4)

### 4. Send 10 DMs today

Use templates in `docs/templates/pitch-dm.txt`. Personalize line 1 and the platform gap. Send 10, not 50 — quality beats volume on day one.

### 5. Log everything

Update status: `researched` → `dm_sent` → `replied` → `call_booked` → `proposal_sent` → `closed` → `onboarding`.

**Daily target until you have 1 client:** 10 new DMs, 5 follow-ups, 1 discovery call booked per week.

---

## Pitch (what you are actually selling)

You are **not** selling editing. You are selling:

1. **Reach** on platforms they ignore
2. **Time back** (zero extra filming or writing)
3. **A system** that runs every week without them thinking about it

Lead with the gap, not your tools.

---

## Discovery call (20 min)

**Goal:** Confirm fit, scope platforms, quote retainer, book onboarding.

### Agenda

1. **2 min** — What they create today and where they are strongest
2. **5 min** — Walk their secondary platforms together (screen share). Point out the gap out loud.
3. **5 min** — Show 1 example: "If we took [recent video], here is what week one would look like" (3 clips + 2 Threads posts, etc.)
4. **5 min** — Scope + price (see pricing matrix below)
5. **3 min** — Next steps: send proposal same day, start onboarding on payment

### Questions to ask

- How often do you publish long-form? (need weekly minimum)
- Which platforms do you wish you were on but never have time for?
- Do you have transcripts or can we generate them?
- Who approves posts before they go live — you or no review?
- Any topics off limits?

### Red flags (walk away)

- Only posts short clips, no long-form library
- Already has a full social team
- Wants one-off project, not retainer
- Cannot give platform access or content within 48 hours

---

## Pricing matrix

| Tier | Platforms | Price | Best for |
|------|-----------|-------|----------|
| Single | 1 (e.g. TikTok only) | $1,000–$1,500/mo | Testing one channel |
| Multi | 3–4 | $2,500–$3,000/mo | Most creators (default pitch) |
| Full | 5–6 + newsletter | $5,000+/mo | High-output creators |

**Scope modifiers:**

- +$500/mo if they publish 8+ long-form pieces/month
- −$200/mo if they pre-approve batches (no review queue)
- Setup fee optional: $500 one-time (waive for first 3 clients)

Send a one-page proposal: platforms included, weekly deliverables, price, start date.

---

## Onboarding (7 days per client)

Duplicate `docs/templates/client-onboarding-checklist.md` for each new client.

| Day | Task |
|-----|------|
| 1 | Signed agreement + first invoice. Collect platform logins or invite links. |
| 1 | Content audit: list last 10 long-form pieces + URLs |
| 2 | Build voice profile (see below) |
| 2 | Brand brief: tone, off-limits, CTA style, handle naming |
| 3 | Connect scheduler (Buffer / Later / Metricool) |
| 3 | Set up clip workflow (OpusClip or manual + CapCut) |
| 4 | Process 1 back-catalog piece as a **free sample batch** (3 clips + 2 posts) |
| 5 | Client approves sample batch OR confirms auto-publish rules |
| 6 | Queue first full week from their latest long-form |
| 7 | Go live. Send "week one is scheduled" recap email |

---

## Tool stack (per client)

| Job | Tool | Cost |
|-----|------|------|
| Voice-matched copy | Claude Project (one per creator) | ~$20/mo |
| Clip extraction | OpusClip | $15–29/mo |
| Scheduling | Buffer, Later, or Metricool | $15–30/mo |
| Transcripts | YouTube auto / Whisper / Descript | Free–$24/mo |
| Tracking | Google Sheet pipeline + client tab | Free |

**One-time per client:** Claude Project with 5–10 best posts uploaded + custom instructions (voice doc below).

---

## Voice profile setup (Claude Project)

Create a Project named `[Creator Name] — Joltra`.

**Upload:** 5–10 of their best posts, video descriptions, or transcripts.

**Custom instructions (paste and fill in):**

```
You write as [CREATOR NAME] for [NICHE] audience.

Voice: [casual / expert / funny / direct — pick 2]
Never: [politics, medical claims, competitor bashing — client specific]
Always: [first person, short sentences, one idea per post]
Platforms you write for: [Threads, LinkedIn, X, Substack captions]

When given a transcript:
1. Pull 5 standalone posts for Threads/X (under 280 chars where needed)
2. Write 1 LinkedIn post (150–250 words, line breaks)
3. Draft 1 Substack intro paragraph from the main thesis
4. Suggest 5 clip moments with timestamps and hook text for each

Match their vocabulary. No corporate filler. No "In today's fast-paced world."
```

---

## Weekly workflow (2–3 hours per client)

Run this every **Monday** (or the day after they publish new long-form).

### Step 1 — Ingest (15 min)

- [ ] Get URL of newest long-form (YouTube, podcast, IG long video)
- [ ] Pull transcript (YouTube captions export, or Whisper)
- [ ] Drop transcript in their Claude Project

### Step 2 — Written outputs (30 min)

Prompt Claude:

> Here is this week's transcript. Generate: 5 Threads/X posts, 1 LinkedIn post, 1 Substack intro. Use the voice rules. Flag the 5 best clip timestamps with hook lines.

- [ ] Edit outputs lightly (5 min human pass)
- [ ] Save to `[Client]/Week of [date]/copy.md`

### Step 3 — Clips (45 min)

- [ ] Upload long-form to OpusClip (or manual cut in CapCut)
- [ ] Pick top 5–7 clips by energy + hook strength
- [ ] Add captions, crop 9:16, export
- [ ] Name files: `[client]-[platform]-[hook-slug].mp4`

### Step 4 — Review (15 min)

- [ ] Watch first 3 sec of each clip (hook check)
- [ ] Read all copy out loud in their voice
- [ ] If client requires approval: send batch link. If auto-publish: skip.

### Step 5 — Schedule (30 min)

| Platform | What | Cadence |
|----------|------|---------|
| TikTok | 1–2 clips/day | Mon–Fri |
| Reels | Same clips, staggered | Mon–Fri |
| Shorts | Same clips, staggered | Mon–Fri |
| Threads/X | 1 post/day | Mon–Fri |
| LinkedIn | 2–3 posts/week | Tue, Thu, Sat |
| Substack | 1 edition/week | Thu or Fri |

- [ ] Queue full week in scheduler
- [ ] Screenshot calendar → send client "Week of [date] scheduled" message

### Step 6 — Monitor (15 min, Tue–Fri)

- [ ] Reply to comments on their behalf (if in scope) OR flag top comments for them
- [ ] Note which clip/post performed best → feed into next week's hooks

---

## Client communication templates

### After they say yes

> Great — I'll send over the agreement and onboarding form today. Once that's signed, we go live within 7 days. First step: I'll need access to [platforms] and links to your last 10 long-form pieces.

### Week one scheduled

> Week of [date] is queued: [X] clips across TikTok/Reels/Shorts, [Y] Threads posts, [Z] LinkedIn. Everything goes live on schedule. Send me anything new you publish and I'll fold it into next Monday's batch.

### Monthly check-in

> Quick [month] recap: [top clip views], [best platform], [posts shipped]. For next month I recommend we [double down on X / test hooks on Y]. 15-min call this week?

---

## Metrics to track (per client)

| Metric | Where |
|--------|-------|
| Clips published / week | Scheduler export |
| Posts published / week | Scheduler export |
| Top clip views (7d) | Native analytics |
| Follower delta per platform | Manual weekly |
| Hours spent / client | Your time log (target: ≤3 hrs) |

---

## Your first 30 days

| Week | Goal |
|------|------|
| 1 | 50 DMs sent, 5 replies, 2 calls booked |
| 2 | 1 client signed, onboarding started |
| 3 | Client 1 live, 30 more DMs, 1 more call |
| 4 | Client 1 retained, client 2 in pipeline |

**Rule:** Do not onboard more than 2 clients until your Monday workflow runs under 3 hours per client twice in a row.

---

## Files in this repo

- `docs/templates/creator-pipeline.csv` — outreach tracker
- `docs/templates/pitch-dm.txt` — DM copy
- `docs/templates/client-onboarding-checklist.md` — per-client setup

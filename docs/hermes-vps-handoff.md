# Hermes VPS handoff — Joltra lead pipeline

**Goal:** Run the Joltra creator outreach pipeline on a schedule from the Hermes VPS. No laptop required.

Hermes triggers shell jobs. All pipeline logic lives in the **joltra-studio** repo.

---

## What this pipeline does

Every scheduled run:

1. **Research** — Cursor agent finds ~50 qualified creators (5K–200K followers, distribution gaps, buyer fit)
2. **Score** — filters junk (aggregators, no revenue signal, etc.)
3. **Draft** — writes observational DMs (no fake “I’ve been following you” language)
4. **Sync** — pushes new leads to **Notion** (deduped)
5. **Notify** — Discord webhook ping: “N new leads added → [Notion link]”

---

## Repo

```bash
git clone <JOLTRA_STUDIO_REPO_URL> /opt/joltra-studio
cd /opt/joltra-studio
npm install
```

Use a stable path Hermes can reference every run (e.g. `/opt/joltra-studio`).

Before each run, pull latest scripts:

```bash
cd /opt/joltra-studio && git pull --ff-only
```

---

## Environment variables

Create `/opt/joltra-studio/.env.local` (never commit this file):

```bash
# Cursor — research agent (required for full pipeline)
CURSOR_API_KEY=cursor_...

# VPS: use cloud agents (headless server — do NOT use local mode)
CURSOR_AGENT_RUNTIME=cloud
GITHUB_REPO_URL=https://github.com/YOUR_ORG/joltra-studio

# Notion — pipeline CRM
NOTION_API_KEY=ntn_...
NOTION_DATABASE_ID=38169ec3-1502-80ce-9c2d-d2edfcd7c0da
NOTION_PIPELINE_URL=https://app.notion.com/p/38169ec3150280ce9c2dd2edfcd7c0da

# Discord — notification only (one line + Notion link, no lead content)
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

| Variable | Required | Notes |
|----------|----------|-------|
| `CURSOR_API_KEY` | Yes (full run) | [cursor.com/dashboard/integrations](https://cursor.com/dashboard/integrations) |
| `CURSOR_AGENT_RUNTIME` | Yes on VPS | Must be `cloud` on headless servers |
| `GITHUB_REPO_URL` | Yes on VPS | Repo Cursor cloud agent clones |
| `NOTION_API_KEY` | Yes | Integration must have access to the leads database |
| `NOTION_DATABASE_ID` | Yes | From Notion database URL |
| `NOTION_PIPELINE_URL` | Yes | Link shown in Discord ping |
| `DISCORD_WEBHOOK_URL` | Recommended | `#pipeline` or `#outreach` channel webhook |

Cursor cloud agent needs **read access** to the GitHub repo (public repo, or connect private repo in Cursor settings).

---

## Hermes jobs to create

### Job 1 — Full pipeline (weekdays)

**When:** Mon–Fri, 9:00 AM (adjust timezone as needed)

**Command:**

```bash
cd /opt/joltra-studio && git pull --ff-only && npm run pipeline:run
```

**What success looks like:**
- Exit code `0`
- Log ends with `=== Pipeline complete ===`
- Discord message: `📋 N new leads added to the pipeline`
- New rows in Notion `leads` database with `status = researched`

**If zero new leads:** sync skips Discord (all deduped) — still success.

**On failure:** Hermes should alert (Discord DM or ops channel). Common causes:
- Missing/expired `CURSOR_API_KEY`
- Notion API error (integration lost database access)
- `git pull` conflict
- Cloud agent timeout (research step is slow — allow 30–60 min timeout)

---

### Job 2 — Follow-up reminder (weekdays, optional)

**When:** Mon–Fri, 8:00 AM (before outreach job)

**Command:**

```bash
cd /opt/joltra-studio && git pull --ff-only && npm run pipeline:follow-ups
```

**What it does:** Queries Notion for leads where `status = dm_sent` and `follow_up_date` is today or past. Sends Discord ping: `⏰ N follow-ups due today → [Notion link]`

No Cursor API key needed for this job.

---

## npm scripts reference

| Script | Purpose |
|--------|---------|
| `npm run pipeline:run` | Full chain: research → score → draft → Notion → Discord |
| `npm run pipeline:run -- --count 30` | Smaller research batch |
| `npm run pipeline:run -- --skip-research` | Re-score + draft + sync existing `latest.json` |
| `npm run pipeline:follow-ups` | Morning follow-up Discord ping |
| `npm run prospects:research` | Research only |
| `npm run prospects:score` | Score only |
| `npm run prospects:draft` | DM drafts only |
| `npm run prospects:sync` | Notion + Discord only |

---

## Suggested cron expressions

| Job | Cron (UTC) | Local example (ET = UTC-5) |
|-----|------------|----------------------------|
| Follow-ups | `0 13 * * 1-5` | 8:00 AM ET weekdays |
| Full pipeline | `0 14 * * 1-5` | 9:00 AM ET weekdays |

Adjust for your VPS timezone.

---

## Human workflow after Hermes runs

1. See Discord ping → open Notion leads database
2. Filter `status = researched`
3. Copy `dm_draft` from each row → send on LinkedIn / X / IG
4. Mark `dm_sent`, set `follow_up_date` = +3 days
5. On follow-up days, copy `follow_up_3` or `follow_up_7` from Notion

Discord is **notification only** — all lead data and DMs live in Notion.

---

## Dedup

The pipeline will not create duplicate Notion rows for the same creator URL. Re-runs are safe.

Local state: `/opt/joltra-studio/data/prospects/seen.json` (optional backup dedup list).

---

## Docs in repo (for debugging)

| File | Contents |
|------|----------|
| `docs/icp.md` | Who we target, scoring rules |
| `docs/outreach-voice.md` | DM tone (observational, no lies) |
| `docs/platform-audit.md` | Platforms checked per creator |
| `docs/notion-setup.md` | Notion database schema |
| `agents/prospect-research/INSTRUCTIONS.md` | Manual research runbook |

---

## Manual test (first time on VPS)

```bash
cd /opt/joltra-studio
git pull --ff-only
npm install

# Test back-half only (no Cursor key needed) — only works if latest.json exists:
npm run prospects:score
npm run prospects:draft
npm run prospects:sync

# Full test (needs all env vars):
npm run pipeline:run -- --count 10
```

---

## Security

- `.env.local` is gitignored — never commit secrets
- Rotate keys if exposed in chat or logs
- Notion integration should only have access to the leads database
- Discord webhook URL is a secret (anyone with it can post to the channel)

---

## Summary for Hermes

**Set up once:** clone repo, `npm install`, write `.env.local`

**Run daily (weekdays):**
```bash
cd /opt/joltra-studio && git pull --ff-only && npm run pipeline:run
```

**Optional mornings:**
```bash
cd /opt/joltra-studio && git pull --ff-only && npm run pipeline:follow-ups
```

**Alert on:** non-zero exit code from either command.

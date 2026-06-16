# Notion pipeline setup

One-time setup (~15 min) for the creator outreach pipeline.

## 1. Create the database

Duplicate [docs/templates/creator-pipeline.csv](../docs/templates/creator-pipeline.csv) into a new Notion database, or create manually with these properties:

| Property | Type | Notes |
|----------|------|-------|
| `Name` | Title | Creator name (Notion default title column) |
| `main_platform` | Text | youtube, instagram, podcast |
| `main_followers` | Number | |
| `gap_platforms` | Text | e.g. TikTok, LinkedIn |
| `last_longform_date` | Date | |
| `specific_content_to_reference` | Text | Video/episode title for DM opener |
| `fit_score_1_10` | Number | Score out of 12 |
| `status` | Select | researched, dm_sent, replied, call_booked, proposal_sent, closed, onboarding, skip |
| `dm_sent_date` | Date | Set when DM is sent |
| `follow_up_date` | Date | +3 days after dm_sent |
| `niche` | Text | |
| `profile_url` | URL | Main platform link (used for dedup) |
| `contact_email` | Email | |
| `dm_draft` | Text | Primary DM copy |
| `dm_short` | Text | Short version |
| `follow_up_3` | Text | 3-day follow-up |
| `follow_up_7` | Text | 7-day follow-up |
| `notes` | Text | Research notes, persona, tier |

## 2. Create views

- **Kanban** — group by `status`
- **Outreach queue** — filter `status = researched`, sort by score descending
- **Follow-ups** — filter `status = dm_sent` AND `follow_up_date` is today or earlier

## 3. Connect the integration

1. Create an integration at [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Share the database with the integration (⋯ → Connections)
3. Copy the database ID from the URL: `notion.so/workspace/DATABASE_ID?v=...`

## 4. Environment variables

```bash
cp .env.example .env.local
```

Fill in:
- `NOTION_API_KEY` — integration secret
- `NOTION_DATABASE_ID` — from database URL
- `NOTION_PIPELINE_URL` — link to your outreach queue view (used in Discord pings)
- `DISCORD_WEBHOOK_URL` — webhook for `#pipeline` or `#outreach` channel

## 5. Test sync

```bash
npm run prospects:score
npm run prospects:draft
npm run prospects:sync
```

You should see new rows in Notion and a Discord ping: "N new leads added to the pipeline".

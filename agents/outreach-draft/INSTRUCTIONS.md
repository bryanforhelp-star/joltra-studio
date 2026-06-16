# Outreach draft agent

Generates personalized DM copy for qualified prospects.

## Quick start

```bash
npm run prospects:score    # must run first
npm run prospects:draft    # template-based (fast, no API key)
npm run prospects:draft -- --agent   # Cursor SDK (higher quality)
```

## Template mode (default)

Uses `lib/prospects/draft-dm.ts` to fill `docs/templates/pitch-dm.txt` with prospect data. No API key needed.

## Agent mode

Uses Cursor SDK to write more natural, personalized DMs. Requires `CURSOR_API_KEY`.

## Output

`data/prospects/drafted.json` — qualified prospects with `dmDraft` field:

```json
{
  "dmDraft": {
    "primary": "...",
    "short": "...",
    "followUp3Day": "...",
    "followUp7Day": "...",
    "channel": "linkedin"
  }
}
```

## Next step

```bash
npm run prospects:sync   # push to Notion + Discord ping
```

# Platform audit — what we check per creator

When researching a lead, the agent audits **every platform below** for each candidate. Goal: find where they're strong, where they're absent, and whether the gap is real.

---

## Main platform (where they create)

One of these is their **home base** — must have weekly/biweekly long-form:

| Platform | What we verify |
|----------|----------------|
| **YouTube** | Sub count, last upload, avg video length (8+ min), recent titles |
| **Instagram** | Followers, long-form (IGTV/reels mix), posting cadence |
| **Podcast** | Show on Apple/Spotify, episode frequency, download estimates |

---

## Distribution platforms (where we look for gaps)

For **every** candidate, check all of these — even if empty:

| Platform | How we check today | What "dormant" means |
|----------|-------------------|----------------------|
| **TikTok** | Search handle / link-in-bio | No account, or no post in 60+ days, or ≤1/mo |
| **Instagram Reels** | IG profile (separate from feed if needed) | Not posting reels, or only cross-posts |
| **YouTube Shorts** | YouTube channel Shorts tab | No shorts or only auto-uploads |
| **LinkedIn** | Profile URL from bio / search | No posts, or personal profile only |
| **X (Twitter)** | Handle from bio | Inactive or no content posts |
| **Threads** | Meta Threads profile | No account or inactive |
| **Substack** | Bio links / search | No newsletter |

**Today:** the research agent uses **web search** to verify each platform manually. No API connected yet.

---

## Optional API integrations (future)

If you have a creator analytics tool (e.g. **Modash**, **Phyllo**, **Social Blade API**), we can wire it in for:

- Accurate follower counts and growth
- Cross-platform handle discovery
- Post frequency without manual checking

Add to `.env.local` when ready:

```bash
# MODASH_API_KEY=...   # example — not implemented yet
```

Tell us which tool you use and we can add a `lib/integrations/` connector.

---

## Original creator check (required)

Before adding anyone to the pipeline, verify they **create original content** — not:

- Fan pages / celebrity clip channels
- Repost aggregators ("Megan Fox Unlocked" style)
- Curated clip accounts with no original long-form
- Channels that only react to or repackage others' content

Set `isOriginalCreator: false` and skip if unsure.

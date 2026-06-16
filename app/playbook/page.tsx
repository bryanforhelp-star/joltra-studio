import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const metadata = {
  title: "Outreach playbook · Joltra Studio",
  robots: "noindex, nofollow",
};

export default function PlaybookPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              internal playbook
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.14em] text-zinc-500 hover:text-zinc-950"
          >
            ← site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
          creator retainer ops
        </p>
        <h1 className="mt-4 font-serif text-4xl font-normal tracking-[-0.03em]">
          Outreach + weekly workflow
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600">
          Start outreach today. Deliver the first client in 7 days.
        </p>

        <section className="mt-12 space-y-4 border-t border-zinc-200 pt-10">
          <h2 className="text-xl font-medium">Today (2–3 hours)</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-700">
            <li>
              Build a list of 20 creators (50K–500K on YouTube or Instagram, quiet
              on TikTok / Reels / Threads / LinkedIn / Substack).
            </li>
            <li>Score each 1–10. Only DM 7+.</li>
            <li>Send 10 personalized DMs (template below).</li>
            <li>Log status: researched → dm_sent → replied → call_booked → closed.</li>
          </ol>
          <p className="text-sm text-zinc-600">
            Daily target until first client: <strong>10 DMs</strong>,{" "}
            <strong>5 follow-ups</strong>, <strong>1 call booked / week</strong>.
          </p>
        </section>

        <section className="mt-12 space-y-4 border-t border-zinc-200 pt-10">
          <h2 className="text-xl font-medium">Pricing</h2>
          <ul className="space-y-2 text-sm text-zinc-700">
            <li>
              <strong>Single platform</strong> — $1,000–$1,500/mo
            </li>
            <li>
              <strong>Multi (3–4 platforms)</strong> — $2,500–$3,000/mo ← default
              pitch
            </li>
            <li>
              <strong>Full stack</strong> — $5,000+/mo
            </li>
          </ul>
        </section>

        <section className="mt-12 space-y-4 border-t border-zinc-200 pt-10">
          <h2 className="text-xl font-medium">Discovery call (20 min)</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-700">
            <li>What they create + where they are strongest (2 min)</li>
            <li>Walk dead platforms together — name the gap (5 min)</li>
            <li>
              Show sample week one from their latest video: 3 clips + 2 posts (5 min)
            </li>
            <li>Scope platforms + quote retainer (5 min)</li>
            <li>Send proposal same day (3 min)</li>
          </ol>
        </section>

        <section className="mt-12 space-y-4 border-t border-zinc-200 pt-10">
          <h2 className="text-xl font-medium">Onboarding (7 days)</h2>
          <ul className="space-y-2 text-sm text-zinc-700">
            <li>Day 1–2: Access, content audit, Claude voice project</li>
            <li>Day 3: OpusClip + scheduler connected</li>
            <li>Day 4–5: Free sample batch (3 clips + 2 posts)</li>
            <li>Day 6–7: Full week queued → go live</li>
          </ul>
        </section>

        <section className="mt-12 space-y-4 border-t border-zinc-200 pt-10">
          <h2 className="text-xl font-medium">Weekly loop (Monday, 2–3 hrs / client)</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-700">
            <li>Ingest — new long-form URL + transcript (15 min)</li>
            <li>Copy — Claude → 5 Threads posts, 1 LinkedIn, Substack intro (30 min)</li>
            <li>Clips — OpusClip → pick 5–7, caption, export (45 min)</li>
            <li>Review — hook check + voice pass (15 min)</li>
            <li>Schedule — queue full week (30 min)</li>
            <li>Monitor — comments + top performer notes (15 min)</li>
          </ol>
        </section>

        <section className="mt-12 space-y-4 border-t border-zinc-200 pt-10">
          <h2 className="text-xl font-medium">Pitch DM (copy + personalize)</h2>
          <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-xs leading-relaxed text-zinc-800 whitespace-pre-wrap">
{`Hey [first name], I've been following your [YouTube / podcast / Instagram] for a while — [specific video title] was really strong.

Quick observation: you're crushing it on [main platform] but I noticed you're barely on [TikTok / Threads / LinkedIn]. There's a real audience there for what you do.

I run a system that takes your existing content and turns it into platform-ready clips and posts for the channels you're not on. You don't film anything new. You don't write anything new. You just keep doing what you're doing on [main platform].

I'd run [gap platform 1] and [gap platform 2] for you on a flat monthly retainer. Want me to send a quick rundown of what that would look like?`}
          </pre>
        </section>

        <section className="mt-12 space-y-4 border-t border-zinc-200 pt-10">
          <h2 className="text-xl font-medium">Follow-up (3 days later)</h2>
          <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-xs leading-relaxed text-zinc-800 whitespace-pre-wrap">
{`Hey [first name] — bumping this in case it got buried. Happy to put together a free sample batch from your latest [video / episode] so you can see exactly what week one would look like. No commitment.`}
          </pre>
        </section>

        <p className="mt-12 border-t border-zinc-200 pt-8 text-xs text-zinc-500">
          Full SOP also in repo: docs/outreach-playbook.md
        </p>
      </main>
    </div>
  );
}

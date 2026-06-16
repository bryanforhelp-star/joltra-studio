const platforms = [
  {
    name: "TikTok",
    outcome: "Reach audiences who will never find you on your main channel.",
  },
  {
    name: "Instagram",
    outcome: "Reels and feed presence from the same content you already publish.",
  },
  {
    name: "YouTube Shorts",
    outcome: "Discovery inside YouTube without filming anything new.",
  },
  {
    name: "LinkedIn",
    outcome: "Professional reach for founders, experts, and B2B creators.",
  },
  {
    name: "X",
    outcome: "Daily visibility built from ideas you're already sharing elsewhere.",
  },
  {
    name: "Substack",
    outcome: "Newsletter editions pulled from your long-form and transcripts.",
  },
];

export function ServicesV3() {
  return (
    <section
      id="services"
      className="scroll-mt-28 border-b border-zinc-200 bg-white py-16 md:pb-24 md:pt-20"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
          the solution
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-zinc-950 sm:text-4xl md:text-[2.75rem]">
          We launch and grow the platforms you&apos;re not on
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
          One content stream becomes a complete distribution system. Pick one
          platform to start or launch across all of them.
        </p>

        <div className="mt-14 divide-y divide-zinc-200 border-y border-zinc-200">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-8 md:grid-cols-[12rem_1fr]"
            >
              <p className="text-base font-medium text-zinc-950 md:text-lg">
                {platform.name}
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 md:text-base">
                {platform.outcome}
              </p>
            </div>
          ))}
        </div>

        <p className="brand-surface mt-10 rounded-xl border px-5 py-4 text-sm leading-relaxed text-zinc-800 md:text-base">
          Same content you&apos;re already making. Platform-native assets on
          every channel. Live in 7 days.
        </p>
      </div>
    </section>
  );
}

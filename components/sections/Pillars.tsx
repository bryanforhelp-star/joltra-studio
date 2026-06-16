import { SectionLabel } from "@/components/ui/SectionLabel";
import { BRAND_BLUE, BRAND_STROKE } from "@/lib/brand";
import { sectionStyles } from "@/lib/section-theme";

const theme = "dark";
const s = sectionStyles(theme);

const pillars = [
  {
    num: "01",
    title: "use our service",
    tag: "studio",
    body: "We do it for you. Restructure your content, sharpen hooks, improve pacing, and make it more watchable and shareable. Clipping is one layer, not the whole job.",
  },
  {
    num: "02",
    title: "we build the system",
    tag: "systems",
    body: "We design custom AI-powered workflows and content operating models so your team can scale high-performing content internally, not as one-off deliverables.",
  },
  {
    num: "03",
    title: "use our software",
    tag: "platform",
    body: "Run it yourself. Turn existing long-form, libraries, and archives into better-performing short-form at scale, with hooks, cuts, formats, and variations built in.",
  },
  {
    num: "04",
    title: "ai content & UGC",
    tag: "next",
    body: "Expanding into AI-generated creators, synthetic UGC, and production for brands that want to test and ship faster, where it actually makes sense.",
  },
];

export function Pillars() {
  return (
    <section id="ways-to-work" className={`py-16 md:py-28 ${s.section} ${s.border}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionLabel theme={theme}>
          ways to <span className={s.star}>✦</span> work with us
        </SectionLabel>
        <p
          className={`mt-8 max-w-3xl text-balance text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-5xl ${s.heading}`}
        >
          service, systems, software, and what comes next.
        </p>
        <p className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${s.body}`}>
          Pick the layer you need. Work with us hands-on, let us build your
          system, or run it on our platform.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.num}
              className="pillars-card group flex flex-col justify-between rounded-xl border p-6 bg-black transition-colors duration-200"
            >
              <header className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-zinc-500">
                <span>{pillar.num}</span>
                <span className="text-zinc-500">
                  {pillar.tag}
                </span>
              </header>
              <div className="mt-8 space-y-3">
                <h3 className="text-lg font-medium text-zinc-50">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {pillar.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

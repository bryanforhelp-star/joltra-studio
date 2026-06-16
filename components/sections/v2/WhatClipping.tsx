import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionStyles } from "@/lib/section-theme";

const theme = "light";
const s = sectionStyles(theme);

const points = [
  {
    num: "01",
    title: "infrastructure, not a one-off edit",
    body: "Clipping runs every week. One long-form upload becomes dozens of short clips formatted per platform, not a single post on your main channel.",
  },
  {
    num: "02",
    title: "distribution is the product",
    body: "Editing is step one. Reach is the goal. We structure clips to travel: stronger hooks, tighter pacing, and formats built for how each feed actually works.",
  },
  {
    num: "03",
    title: "your archive starts working",
    body: "Podcasts, YouTube, webinars, interviews, livestreams. Footage you already paid for becomes weeks of short-form without filming again.",
  },
  {
    num: "04",
    title: "you do not run the machine",
    body: "No chasing editors, no review queues, no posting calendar chaos. You send content. We extract moments, build clips, and ship the system around it.",
  },
];

export function WhatClipping() {
  return (
    <section id="what-clipping" className={`py-16 md:py-28 ${s.section} ${s.border}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl">
          <SectionLabel theme={theme}>
            what clipping <span className={s.star}>✦</span> is
          </SectionLabel>
          <p
            className={`mt-8 text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-[2.75rem] ${s.heading}`}
          >
            not just short videos. a distribution engine for attention.
          </p>
          <p className={`mt-6 text-base leading-relaxed md:text-lg ${s.body}`}>
            At this level, clipping is content distribution infrastructure. We
            pull the strongest moments from your long-form, format them for each
            platform, and push volume without adding production hours. One
            hour of footage can become a month of feed-ready clips.
          </p>
        </div>

        <div className="mt-14 grid gap-0 md:grid-cols-2">
          {points.map((point) => (
            <article
              key={point.num}
              className={`border-t py-6 pr-0 md:py-8 md:pr-10 ${s.line}`}
            >
              <span className={`text-xs ${s.dim}`}>{point.num}</span>
              <h3 className={`mt-3 text-lg font-medium ${s.heading}`}>
                {point.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${s.body}`}>
                {point.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionStyles } from "@/lib/section-theme";

const theme = "light";
const s = sectionStyles(theme);

const services = [
  {
    num: "01",
    tag: "studio",
    title: "done-for-you clipping",
    body: "We extract moments, sharpen hooks, add captions, and deliver platform-ready clips from your long-form every week. You upload. We clip.",
  },
  {
    num: "02",
    tag: "distribution",
    title: "multi-platform output",
    body: "Vertical 9:16 for TikTok and Reels. Shorts-native cuts. Landscape for X. Same source, formatted for how each feed actually consumes.",
  },
  {
    num: "03",
    tag: "systems",
    title: "clipping operations",
    body: "We design the workflows, briefs, and review layers so your team can run a clipping program internally without reinventing the process.",
  },
  {
    num: "04",
    tag: "software",
    title: "run it on our platform",
    body: "Turn libraries and archives into clip batches at scale. Hooks, variations, and exports built for teams that want speed without losing standards.",
  },
];

export function ServicesV2() {
  return (
    <section id="services" className={`py-16 md:py-28 ${s.section} ${s.border}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionLabel theme={theme}>
          what we <span className={s.star}>✦</span> deliver
        </SectionLabel>
        <p
          className={`mt-8 max-w-3xl text-balance text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-4xl ${s.heading}`}
        >
          clipping services from first cut to full distribution stack.
        </p>
        <p className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${s.body}`}>
          Pick the layer you need: hands-on clipping, operational systems, or
          software your team runs. Same standards across all of it.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.num}
              className={`rounded-xl border p-6 ${s.card}`}
            >
              <header
                className={`flex items-center justify-between text-xs uppercase tracking-[0.16em] ${s.label}`}
              >
                <span>{service.num}</span>
                <span>{service.tag}</span>
              </header>
              <h3 className={`mt-8 text-lg font-medium ${s.heading}`}>
                {service.title}
              </h3>
              <p className={`mt-3 text-sm leading-relaxed ${s.body}`}>
                {service.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

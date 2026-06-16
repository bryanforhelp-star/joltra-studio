import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionStyles } from "@/lib/section-theme";

const theme = "light";
const s = sectionStyles(theme);

const audiences = [
  {
    title: "podcasters with a back catalogue",
    body: "Every episode is raw material. We work through your archive and turn old conversations into fresh short-form posted this week.",
  },
  {
    title: "youtubers who want more per upload",
    body: "Your long-form is already produced. We clip the best moments and push them across TikTok, Reels, and Shorts to pull new viewers back.",
  },
  {
    title: "brands with video sitting unused",
    body: "Webinars, interviews, event footage, founder talks. We turn dormant archives into a live clipping program without new shoots.",
  },
  {
    title: "founders building in public",
    body: "One interview or talk a month is enough. We clip it into dozens of pieces so you show up everywhere without living online all day.",
  },
];

export function WhoItsFor() {
  return (
    <section id="who-its-for" className={`py-16 md:py-28 ${s.section} ${s.border}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionLabel theme={theme}>
          who this is <span className={s.star}>✦</span> for
        </SectionLabel>
        <p
          className={`mt-8 max-w-2xl text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-4xl ${s.heading}`}
        >
          you already create content. this multiplies the reach.
        </p>
        <p className={`mt-4 max-w-xl text-base leading-relaxed md:text-lg ${s.body}`}>
          If you publish long-form on any platform, clipping turns what you
          already make into consistent short-form distribution. No extra filming.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {audiences.map((item) => (
            <article key={item.title} className={`border-t pt-6 ${s.line}`}>
              <h3 className={`text-lg font-medium ${s.heading}`}>{item.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${s.body}`}>
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

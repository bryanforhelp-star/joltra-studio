import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionStyles } from "@/lib/section-theme";

const theme = "dark";
const s = sectionStyles(theme);

const parts = [
  {
    part: "part 1",
    label: "the hook",
    timing: "0 – 3 sec",
    body: "The first three seconds decide everything. No slow intros. No context dumps. Give people a reason to stay before they swipe.",
  },
  {
    part: "part 2",
    label: "the value window",
    timing: "3 sec – end",
    body: "One clear idea per clip. No filler. The viewer should feel something useful, funny, or surprising by the time it ends.",
  },
  {
    part: "part 3",
    label: "the close",
    timing: "final 3 sec",
    body: "A hard stop that drives comments and follows: a question, a punchline, or a clean cut that makes people rewatch.",
  },
];

export function ClipStructure() {
  return (
    <section className={`py-16 md:py-28 ${s.section} ${s.border}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionLabel theme={theme}>
          editorial <span className={s.star}>✦</span> standards
        </SectionLabel>
        <p
          className={`mt-8 max-w-2xl font-serif text-3xl font-normal leading-[1.08] tracking-[-0.02em] sm:text-4xl ${s.heading}`}
        >
          what makes a clip actually work.
        </p>
        <p className={`mt-4 max-w-xl text-base leading-relaxed md:text-lg ${s.body}`}>
          A bad clip gets skipped. A good clip gets shared. Every clip we ship
          follows the same three-part build, no matter the platform.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {parts.map((item) => (
            <article
              key={item.label}
              className="pillars-card rounded-xl border bg-black p-6"
            >
              <p className={`text-[10px] uppercase tracking-[0.18em] ${s.label}`}>
                {item.part}
              </p>
              <h3 className={`mt-4 text-xl font-medium ${s.heading}`}>
                {item.label}
              </h3>
              <p className={`mt-1 text-xs uppercase tracking-[0.14em] ${s.faint}`}>
                {item.timing}
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${s.body}`}>
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionStyles } from "@/lib/section-theme";

const theme = "dark";
const s = sectionStyles(theme);

const loop = [
  {
    label: "service",
    body: "Hands-on work teaches us what actually retains, spreads, and dies on each platform.",
  },
  {
    label: "software",
    body: "We productize that knowledge into workflows, tooling, and systems brands can run themselves.",
  },
  {
    label: "scale",
    body: "Over time, that becomes larger AI-powered content creation. More output, same standards.",
  },
];

export function Flywheel() {
  return (
    <section className={`py-16 md:py-28 ${s.section} ${s.border}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionLabel theme={theme}>
          how it <span className={s.star}>✦</span> connects
        </SectionLabel>
        <p
          className={`mt-8 max-w-2xl text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-4xl ${s.heading}`}
        >
          the studio and the platform feed each other.
        </p>
        <p className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${s.body}`}>
          Service work sharpens our read on attention. Software turns that into
          infrastructure. Both push toward the same goal: content that performs
          better on the internet.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {loop.map((item, i) => (
            <div key={item.label} className={`relative border-t pt-6 ${s.line}`}>
              <span className={`text-xs ${s.dim}`}>0{i + 1}</span>
              <h3 className={`mt-3 text-base font-medium ${s.heading}`}>
                {item.label}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${s.body}`}>
                {item.body}
              </p>
              {i < loop.length - 1 && (
                <span
                  className={`absolute -right-3 top-1/2 hidden md:inline ${s.dim}`}
                  aria-hidden
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

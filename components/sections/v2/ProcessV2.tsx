import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionStyles } from "@/lib/section-theme";

const theme = "dark";
const s = sectionStyles(theme);

const steps = [
  {
    label: "moment extraction",
    body: "We scan your long-form for strong opinions, clear lessons, emotional peaks, and high-energy exchanges. Not every minute clips. We find what does.",
  },
  {
    label: "format and hook build",
    body: "Each moment gets cropped, captioned, and opened with a hard hook. Platform-specific aspect ratios and pacing before anything goes live.",
  },
  {
    label: "quality review",
    body: "Audio, captions, brand tone, and hook strength get checked before publish. Clips that miss the bar go back. Only approved clips ship.",
  },
  {
    label: "distribution",
    body: "Approved clips go out across your channels and clipping network. Performance feeds the next round so output improves over time.",
  },
];

export function ProcessV2() {
  return (
    <section id="how-it-works" className={`py-16 md:py-28 ${s.section} ${s.border}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionLabel theme={theme}>
          how it <span className={s.star}>✦</span> works
        </SectionLabel>
        <p
          className={`mt-8 max-w-2xl text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-4xl ${s.heading}`}
        >
          from raw footage to feed-ready clips.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {steps.map((step, i) => (
            <div key={step.label} className={`border-t pt-6 ${s.line}`}>
              <span className={`text-xs ${s.dim}`}>0{i + 1}</span>
              <h3 className={`mt-3 text-base font-medium ${s.heading}`}>
                {step.label}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${s.body}`}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

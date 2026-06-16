import { CheckCircle2, Radio, Scissors, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { IconBox } from "@/components/ui/IconBox";
import { SectionHeading } from "@/components/sections/v3/SectionHeading";

const steps: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Radio,
    title: "Moment extraction",
    body: "We scan long-form for strong opinions, lessons, emotional peaks, and high-energy exchanges. We find what clips.",
  },
  {
    icon: Scissors,
    title: "Format and hook build",
    body: "Each moment gets cropped, captioned, and opened with a scroll-stopping hook for the target platform.",
  },
  {
    icon: CheckCircle2,
    title: "Quality review",
    body: "Audio, captions, brand tone, and hook strength are checked before anything goes live.",
  },
  {
    icon: Send,
    title: "Distribution",
    body: "Approved clips ship across your channels. Performance feeds the next round so output improves over time.",
  },
];

export function HowItWorksV3() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 border-b border-zinc-200 bg-black py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow="how it works"
          title="From concept to feed-ready clips"
          description="From raw footage to clips posted across the short-form ecosystem."
          dark
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.title}>
              <IconBox icon={step.icon} dark />
              <h3 className="mt-4 text-lg font-medium text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

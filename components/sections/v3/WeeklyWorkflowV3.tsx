import { SectionHeading } from "@/components/sections/v3/SectionHeading";

const steps = [
  "You send content",
  "We identify the strongest moments",
  "We create platform-specific assets",
  "We distribute and optimize",
  "We report what's working",
];

export function WeeklyWorkflowV3() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 border-b border-zinc-200 bg-black py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow="how it works"
          title="What happens every week"
          dark
        />
        <ol className="mt-12 max-w-2xl space-y-0">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex gap-6 border-t border-zinc-800 py-6 first:border-t-0 first:pt-0"
            >
              <span className="text-sm font-medium tabular-nums text-zinc-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-medium text-white md:text-xl">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-zinc-500">repeat.</p>
      </div>
    </section>
  );
}

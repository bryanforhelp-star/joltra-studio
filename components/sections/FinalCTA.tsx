import { OutlineButton } from "@/components/ui/OutlineButton";
import { sectionStyles } from "@/lib/section-theme";

const theme = "light";
const s = sectionStyles(theme);

export function FinalCTA() {
  return (
    <section id="work-with-us" className={`py-20 md:py-32 ${s.section}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p
            className={`text-[11px] font-medium uppercase tracking-[0.22em] sm:text-xs ${s.faint}`}
          >
            platform, studio, or a system built for your team
          </p>
          <h2
            className={`mt-8 font-serif text-3xl font-normal leading-[1.02] tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl md:leading-[1] lg:text-6xl lg:leading-[0.98] ${s.heading}`}
          >
            if you care about content that performs, we should talk.
          </h2>
          <OutlineButton href="mailto:hello@joltra.studio" className="mt-10">
            work with us
            <span aria-hidden>→</span>
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}

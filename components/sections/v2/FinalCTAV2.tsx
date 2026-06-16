import { OutlineButton } from "@/components/ui/OutlineButton";
import { sectionStyles } from "@/lib/section-theme";

const theme = "light";
const s = sectionStyles(theme);

export function FinalCTAV2() {
  return (
    <section id="work-with-us" className={`py-20 md:py-32 ${s.section}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p
            className={`text-[11px] font-medium uppercase tracking-[0.22em] sm:text-xs ${s.faint}`}
          >
            free content audit · setup in days · clips live in week one
          </p>
          <h2
            className={`mt-8 font-serif text-3xl font-normal leading-[1.02] tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl md:leading-[1] lg:text-6xl lg:leading-[0.98] ${s.heading}`}
          >
            if you have long-form, you have a clipping program waiting.
          </h2>
          <p className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${s.body}`}>
            Book a strategy call. We will review your library, estimate clip
            yield, and tell you what a distribution setup could look like.
          </p>
          <OutlineButton href="mailto:hello@joltra.studio" className="mt-10">
            book a strategy call
            <span aria-hidden>→</span>
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}

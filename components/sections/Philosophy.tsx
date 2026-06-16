import { SectionLabel } from "@/components/ui/SectionLabel";
import { sectionStyles } from "@/lib/section-theme";

const theme = "light";
const s = sectionStyles(theme);

const lines = [
  "most content dies in the first two seconds. not because the idea was bad.",
  "virality isn’t luck. it’s hooks, pacing, structure, and format.",
  "you already paid for the footage. leaving most of it unused is the waste.",
  "distribution is part of creation now. a good edit with nowhere to go still dies.",
  "better storytelling beats better cameras. every time.",
];

export function Philosophy() {
  return (
    <section id="thesis" className={`py-16 md:py-28 ${s.section} ${s.border}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 md:flex-row md:px-10 lg:px-16">
        <div className="md:w-[40%]">
          <SectionLabel theme={theme}>
            the <span className={s.star}>✦</span> thesis
          </SectionLabel>
          <p
            className={`mt-8 text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-4xl ${s.heading}`}
          >
            we study internet attention, and build around it.
          </p>
          <p className={`mt-6 text-base leading-relaxed md:pr-10 md:text-lg ${s.body}`}>
            This isn’t really about editing videos. It’s about understanding what
            makes people stop, watch, and share. We do more of that, faster,
            with the content you already have.
          </p>
        </div>

        <div className="md:w-[60%] space-y-0">
          {lines.map((line, i) => (
            <p
              key={line}
              className={`border-t py-5 text-base sm:text-lg ${s.line} ${s.subheading}`}
            >
              <span className={`mr-3 ${s.dim}`}>0{i + 1}</span>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

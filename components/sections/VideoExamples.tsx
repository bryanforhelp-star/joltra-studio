import { unstable_noStore as noStore } from "next/cache";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VideoFanShowcase } from "@/components/ui/VideoFanShowcase";
import { getRandomVideoExamples } from "@/lib/get-random-videos";
import { sectionStyles } from "@/lib/section-theme";

const theme = "light";
const s = sectionStyles(theme);

export async function VideoExamples({
  variant = "v1",
}: {
  variant?: "v1" | "v2";
}) {
  noStore();
  const examples = await getRandomVideoExamples(4);
  const isV2 = variant === "v2";

  return (
    <section id="examples" className={`py-16 md:py-28 ${s.section} ${s.border}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionLabel theme={theme}>
          clip <span className={s.star}>✦</span> examples
        </SectionLabel>
        <p
          className={`mt-8 max-w-2xl font-serif text-3xl font-normal leading-[1.08] tracking-[-0.02em] sm:text-4xl ${s.heading}`}
        >
          {isV2
            ? "clips built to stop the scroll and survive the algorithm."
            : "clips built for how people actually watch."}
        </p>
        <p className={`mt-4 max-w-lg text-base leading-relaxed md:text-lg ${s.body}`}>
          {isV2
            ? "Long-form in. Hook-first short-form out. Formatted for TikTok, Reels, Shorts, and X."
            : "Short-form restructured from long-form. Hooks, pacing, and format tuned for the feed."}
        </p>

        <VideoFanShowcase examples={examples} />
      </div>
    </section>
  );
}

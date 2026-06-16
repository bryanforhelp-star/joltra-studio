import { Quote, Star, UserRound } from "lucide-react";
import { IconBox } from "@/components/ui/IconBox";
import { SectionHeading } from "@/components/sections/v3/SectionHeading";

const reviews = [
  {
    quote:
      "I was putting everything into YouTube and ignoring everything else. Within two months I had a real presence on TikTok and LinkedIn from the same uploads. Same work, way more reach.",
    name: "Maya R.",
    role: "YouTube creator, 210K subs",
    highlight: "3 new platforms from existing content",
  },
  {
    quote:
      "I didn't need more content. I needed a distribution system. They took what I was already recording and turned it into a weekly presence across channels I'd been neglecting for years.",
    name: "Jordan K.",
    role: "Podcast host + founder",
    highlight: "Full platform expansion in 7 days",
  },
  {
    quote:
      "The shift was realizing I wasn't paying for editing. I was paying to stop leaving distribution on the table. That framing made the retainer an obvious yes.",
    name: "Alex T.",
    role: "Instagram creator, 85K followers",
    highlight: "Distribution partner retainer",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-zinc-950 text-zinc-950"
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ReviewsV3() {
  return (
    <section
      id="reviews"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow="client feedback"
          title="Creators who expanded their distribution"
          description="What changes when you stop relying on one platform and start showing up everywhere your audience already is."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="brand-surface flex flex-col rounded-xl border p-8 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <IconBox icon={Quote} accent className="rounded-full" />
                <StarRow />
              </div>
              <blockquote className="mt-6 flex-1 text-sm leading-relaxed text-zinc-800">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-zinc-950/10 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-950/15 bg-white/50 text-zinc-600">
                  <UserRound className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600">
                    {review.highlight}
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-950">
                    {review.name}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-600">{review.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

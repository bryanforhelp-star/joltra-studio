import { CircleHelp } from "lucide-react";
import { IconBox } from "@/components/ui/IconBox";
import { SectionHeading } from "@/components/sections/v3/SectionHeading";

const faqs = [
  {
    q: "Is this a clipping or editing service?",
    a: "No. We build and run your distribution system. You keep creating on your main platform. We expand that content across the platforms you're not on.",
  },
  {
    q: "Do I need to create more content?",
    a: "No. The whole model is built on content you already have. Podcasts, YouTube, webinars, interviews, founder updates — if it contains ideas, we distribute it.",
  },
  {
    q: "How much does it cost?",
    a: "Starter launches one platform from $1K/mo. Growth runs 3–4 platforms from $2.5K/mo. Distribution partner is full expansion from $5K/mo. Book a call and we'll scope it to your content volume.",
  },
  {
    q: "Which platforms can you launch?",
    a: "TikTok, Instagram Reels, YouTube Shorts, LinkedIn, and X. We build platform-native assets for each — not copy-paste reposts.",
  },
  {
    q: "How fast can we go live?",
    a: "About 7 days. We audit your content, build your distribution system, and ship your first week of assets across the platforms you choose.",
  },
];

export function FAQV3() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 border-b border-zinc-200 bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="faq" title="Questions answered" />
          <IconBox icon={CircleHelp} className="hidden sm:flex" />
        </div>
        <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="cursor-pointer list-none text-base font-medium text-zinc-950 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3">
                    <CircleHelp
                      className="h-4 w-4 shrink-0 text-zinc-400"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    {faq.q}
                  </span>
                  <span className="text-zinc-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl pl-7 text-sm leading-relaxed text-zinc-600">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { Marquee } from "@/components/ui/Marquee";
import { VideoExamples } from "@/components/sections/VideoExamples";
import { HeroV2 } from "@/components/sections/v2/HeroV2";
import { WhatClipping } from "@/components/sections/v2/WhatClipping";
import { ClipStructure } from "@/components/sections/v2/ClipStructure";
import { ServicesV2 } from "@/components/sections/v2/ServicesV2";
import { ProcessV2 } from "@/components/sections/v2/ProcessV2";
import { WhoItsFor } from "@/components/sections/v2/WhoItsFor";
import { FinalCTAV2 } from "@/components/sections/v2/FinalCTAV2";
import { sectionStyles } from "@/lib/section-theme";

const clippingMarquee = [
  "clipping",
  "distribution",
  "hooks",
  "captions",
  "tiktok",
  "reels",
  "shorts",
  "long-form",
  "podcast clips",
  "archive",
];

export default function HomeV2() {
  return (
    <div className="flex-1 bg-white">
      <header className="fixed top-0 z-30 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10 md:py-5 lg:px-16">
          <div className="flex items-center gap-8 md:gap-10">
            <Link href="/v2" className="block" aria-label="Joltra Studio home">
              <Logo className="h-12 w-12 md:h-14 md:w-14" priority />
            </Link>
            <nav className="hidden items-center gap-6 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-900 sm:flex">
              <Link
                href="#what-clipping"
                className="transition-colors hover:text-zinc-500"
              >
                what clipping is
              </Link>
              <Link
                href="#how-it-works"
                className="transition-colors hover:text-zinc-500"
              >
                how it works
              </Link>
              <Link
                href="#examples"
                className="transition-colors hover:text-zinc-500"
              >
                examples
              </Link>
              <Link
                href="#who-its-for"
                className="transition-colors hover:text-zinc-500"
              >
                who it&apos;s for
              </Link>
            </nav>
          </div>
          <OutlineButton href="#work-with-us">
            book a call
            <span aria-hidden>→</span>
          </OutlineButton>
        </div>
      </header>

      <main className="pt-[4.75rem] md:pt-20">
        <HeroV2 />
        <Marquee theme="dark" items={clippingMarquee} />
        <WhatClipping />
        <ClipStructure />
        <ServicesV2 />
        <VideoExamples variant="v2" />
        <ProcessV2 />
        <WhoItsFor />
        <FinalCTAV2 />

        <footer className={`${sectionStyles("dark").section} ${sectionStyles("dark").border}`}>
          <div
            className={`mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-xs md:px-10 lg:px-16 ${sectionStyles("dark").faint}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Logo className="h-8 w-8 opacity-60" />
              <p>Clipping services and distribution infrastructure</p>
              <span>© {new Date().getFullYear()} Joltra Studio</span>
            </div>
            <p className="flex flex-wrap gap-x-3 gap-y-1 text-zinc-600">
              <Link href="/" className="hover:text-zinc-400 hover:underline">
                agency home
              </Link>
              <span aria-hidden>·</span>
              <Link href="/v1" className="hover:text-zinc-400 hover:underline">
                v1
              </Link>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

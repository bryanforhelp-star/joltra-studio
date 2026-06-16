import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { Marquee } from "@/components/ui/Marquee";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Pillars } from "@/components/sections/Pillars";
import { VideoExamples } from "@/components/sections/VideoExamples";
import { Flywheel } from "@/components/sections/Flywheel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ReviewsV3 } from "@/components/sections/v3/ReviewsV3";
import { sectionStyles } from "@/lib/section-theme";

export default function HomeV1() {
  return (
    <div className="flex-1 bg-white">
      <header className="fixed top-0 z-30 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10 md:py-5 lg:px-16">
          <div className="flex items-center gap-8 md:gap-10">
            <Link href="/" className="block" aria-label="Joltra Studio home">
              <Logo className="h-12 w-12 md:h-14 md:w-14" priority />
            </Link>
            <nav className="hidden items-center gap-6 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-900 sm:flex">
              <Link href="#thesis" className="transition-colors hover:text-zinc-500">
                why it performs
              </Link>
              <Link href="#ways-to-work" className="transition-colors hover:text-zinc-500">
                how we help
              </Link>
              <Link href="#examples" className="transition-colors hover:text-zinc-500">
                examples
              </Link>
              <Link href="#reviews" className="transition-colors hover:text-zinc-500">
                reviews
              </Link>
            </nav>
          </div>
          <OutlineButton href="#work-with-us">
            work with us
            <span aria-hidden>→</span>
          </OutlineButton>
        </div>
      </header>

      <main className="pt-[4.75rem] md:pt-20">
        <Hero />
        <Marquee theme="dark" />
        <Philosophy />
        <Pillars />
        <VideoExamples />
        <ReviewsV3 />
        <Flywheel />
        <FinalCTA />

        <footer className={`${sectionStyles("dark").section} ${sectionStyles("dark").border}`}>
          <div
            className={`mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-xs sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-16 ${sectionStyles("dark").faint}`}
          >
            <Logo className="h-8 w-8 opacity-60" />
            <p>Internet attention, productized with AI</p>
            <span>© {new Date().getFullYear()} Joltra Studio</span>
          </div>
          <p className={`flex flex-wrap gap-x-3 gap-y-1 text-zinc-600 ${sectionStyles("dark").faint}`}>
            <Link href="/" className="underline-offset-4 hover:text-zinc-400 hover:underline">
              agency home
            </Link>
            <span aria-hidden>·</span>
            <Link href="/v2" className="underline-offset-4 hover:text-zinc-400 hover:underline">
              v2
            </Link>
            <span aria-hidden>·</span>
            <span className="text-zinc-500">v1 (legacy)</span>
          </p>
        </footer>
      </main>
    </div>
  );
}

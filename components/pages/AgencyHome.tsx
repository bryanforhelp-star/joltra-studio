import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { Marquee } from "@/components/ui/Marquee";
import { HeroV3 } from "@/components/sections/v3/HeroV3";
import { IdealCreatorV3 } from "@/components/sections/v3/IdealCreatorV3";
import { WeeklyWorkflowV3 } from "@/components/sections/v3/WeeklyWorkflowV3";
import { FormatsV3 } from "@/components/sections/v3/FormatsV3";
import { ServicesV3 } from "@/components/sections/v3/ServicesV3";
import { DeliverablesV3 } from "@/components/sections/v3/DeliverablesV3";
import { PricingV3 } from "@/components/sections/v3/PricingV3";
import { ReviewsV3 } from "@/components/sections/v3/ReviewsV3";
import { FAQV3 } from "@/components/sections/v3/FAQV3";
import { FinalCTAV3 } from "@/components/sections/v3/FinalCTAV3";
import { sectionStyles } from "@/lib/section-theme";

const marqueeItems = [
  "platform expansion",
  "distribution",
  "tiktok",
  "reels",
  "shorts",
  "linkedin",
  "x",
  "growth engine",
  "no new content",
  "more reach",
];

export function AgencyHome() {
  return (
    <div className="flex-1 bg-white">
      <header className="fixed top-0 z-30 w-full border-b border-white/15 bg-black/30 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10 md:py-5 lg:px-16">
          <Link href="/" className="block" aria-label="Joltra Studio home">
            <Logo className="h-11 w-11 md:h-12 md:w-12" priority />
          </Link>
          <nav className="hidden items-center gap-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white lg:flex">
            <Link href="#what-clipping" className="hover:text-white/70">
              about
            </Link>
            <Link href="#how-it-works" className="hover:text-white/70">
              how it works
            </Link>
            <Link href="#services" className="hover:text-white/70">
              services
            </Link>
            <Link href="#pricing" className="hover:text-white/70">
              pricing
            </Link>
            <Link href="#reviews" className="hover:text-white/70">
              reviews
            </Link>
            <Link href="#faq" className="hover:text-white/70">
              faq
            </Link>
          </nav>
          <OutlineButton href="#work-with-us" variant="onDark" className="text-xs">
            book a call
            <span aria-hidden>→</span>
          </OutlineButton>
        </div>
      </header>

      <main>
        <HeroV3 />
        <Marquee theme="dark" items={marqueeItems} />
        <IdealCreatorV3 />
        <ServicesV3 />
        <WeeklyWorkflowV3 />
        <FormatsV3 />
        <ReviewsV3 />
        <DeliverablesV3 />
        <PricingV3 />
        <FAQV3 />
        <FinalCTAV3 />

        <footer className={`${sectionStyles("dark").section} ${sectionStyles("dark").border}`}>
          <div className="mx-auto max-w-6xl px-6 py-8 text-xs md:px-10 lg:px-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Logo className="h-8 w-8 opacity-60" />
              <p>Platform expansion and content distribution for creators</p>
              <span>© {new Date().getFullYear()} Joltra Studio</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

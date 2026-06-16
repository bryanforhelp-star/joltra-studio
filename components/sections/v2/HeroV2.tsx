"use client";

import { motion } from "framer-motion";
import { OutlineButton } from "@/components/ui/OutlineButton";

export function HeroV2() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden border-b border-zinc-800 bg-black pb-16 pt-12 md:min-h-[88vh] md:pb-20 md:pt-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hero-video absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src="/0.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 pb-4 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-5xl"
        >
          <p className="max-w-lg text-[11px] font-medium uppercase tracking-[0.22em] text-white sm:text-xs">
            clipping services for brands and creators who already have the footage
          </p>

          <h1 className="mt-8 font-serif text-[2.75rem] font-normal leading-[1] tracking-[-0.03em] text-white sm:mt-10 sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5.25rem] lg:leading-[0.98]">
            <span className="block">we turn long-form</span>
            <span className="block">into clips that</span>
            <span className="hero-emphasis-stroke block italic">
              spread everywhere
            </span>
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-[1.65] text-zinc-300 md:mt-12 md:max-w-2xl md:text-xl md:leading-[1.6]">
            Most teams edit a clip and post it once. We build the clipping
            infrastructure: moment extraction, hook-first edits, and distribution
            across TikTok, Reels, Shorts, and X from content you already filmed.
          </p>

          <OutlineButton
            href="#work-with-us"
            variant="onDark"
            className="mt-10"
          >
            book a strategy call
            <span aria-hidden>→</span>
          </OutlineButton>
        </motion.div>
      </div>
    </section>
  );
}

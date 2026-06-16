"use client";

import { motion } from "framer-motion";
import { ScrollHint } from "@/components/ui/ScrollHint";

export function Hero() {
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

      {/* Dark scrim so type stays readable while the video shows through */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/15"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-between px-6 md:px-10 lg:min-h-[calc(88vh-8rem)] lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-5xl"
        >
          <p className="max-w-md text-[11px] font-medium uppercase tracking-[0.22em] text-white sm:text-xs">
            you already have the content. most of it never performs the way it
            could.
          </p>

          <h1 className="mt-8 font-serif text-[3rem] font-normal leading-[1] tracking-[-0.03em] text-white sm:mt-10 sm:text-[3.75rem] md:text-[4.75rem] lg:text-[5.75rem] lg:leading-[0.96]">
            <span className="block">we help you make</span>
            <span className="block">content that</span>
            <span className="hero-emphasis-stroke block italic">
              actually works
            </span>
            <span className="block">on the internet.</span>
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-[1.65] text-zinc-300 md:mt-12 md:max-w-2xl md:text-xl md:leading-[1.6]">
            Hooks, pacing, storytelling, retention, format. Why some posts spread
            and others get ignored. We use that understanding to turn
            what you already have into content that performs better at scale.
          </p>
        </motion.div>

        <ScrollHint />
      </div>
    </section>
  );
}

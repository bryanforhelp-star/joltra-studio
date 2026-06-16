"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { OutlineButton } from "@/components/ui/OutlineButton";

export function HeroV3() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => undefined);
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, []);

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden border-b border-zinc-800 bg-black pb-20 pt-12 md:min-h-[92vh] md:pb-24 md:pt-16">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hero-video absolute inset-0 z-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src="/0.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/45 to-black/20"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto flex max-w-6xl min-h-[calc(88vh-5rem)] flex-col items-start justify-end px-6 text-left md:min-h-[calc(92vh-6rem)] md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-2xl md:max-w-3xl"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/90 sm:text-xs">
            platform expansion for creators
          </p>
          <h1 className="mt-6 font-serif text-[2.5rem] font-normal leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.06]">
            you&apos;re already creating content. we turn it into a growth
            engine.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            we help creators and founders launch and grow on every platform
            without creating more content.
          </p>
          <OutlineButton href="#work-with-us" variant="onDark" className="mt-10">
            book a call
            <span aria-hidden>→</span>
          </OutlineButton>
        </motion.div>
      </div>
    </section>
  );
}

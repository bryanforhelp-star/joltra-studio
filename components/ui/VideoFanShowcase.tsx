"use client";

import { useEffect, useRef } from "react";
import type { VideoExample } from "@/content/video-examples";

const fanStyles = [
  {
    rotate: "-rotate-[9deg]",
    z: "z-10",
    scale: "scale-[0.94]",
  },
  {
    rotate: "-rotate-[4deg]",
    z: "z-[15]",
    scale: "scale-[0.98]",
  },
  {
    rotate: "rotate-[4deg]",
    z: "z-[15]",
    scale: "scale-[0.98]",
  },
  {
    rotate: "rotate-[9deg]",
    z: "z-10",
    scale: "scale-[0.94]",
  },
] as const;

function FanCard({ example }: { example: VideoExample }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => {
        /* autoplay blocked until interaction */
      });
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, [example.src]);

  return (
    <div className="relative aspect-[9/16] w-[min(52vw,220px)] overflow-hidden rounded-[1.35rem] bg-zinc-900 shadow-[0_22px_50px_-18px_rgba(0,0,0,0.35)] ring-1 ring-black/5 sm:w-[240px] md:w-[270px] md:rounded-[1.5rem] lg:w-[300px]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={example.src}
        poster={example.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onError={(event) => {
          const el = event.currentTarget;
          if (el.dataset.fallbackApplied) return;
          el.dataset.fallbackApplied = "true";
          el.src = "/0.mp4";
          void el.play().catch(() => undefined);
        }}
      />
      {example.caption && (
        <p
          className={`pointer-events-none absolute inset-x-0 bottom-[38%] px-2 text-center ${
            example.captionStyle === "outline"
              ? "text-base font-semibold text-white drop-shadow-[0_1px_0_#000,0_-1px_0_#000,1px_0_0_#000,-1px_0_0_#000] md:text-lg"
              : "text-xl font-bold text-yellow-300 md:text-2xl"
          }`}
        >
          {example.caption}
        </p>
      )}
    </div>
  );
}

export function VideoFanShowcase({ examples }: { examples: VideoExample[] }) {
  const featured = examples.slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <div className="mt-14 flex w-full justify-center overflow-visible px-2 sm:mt-16 md:mt-20">
      <ul className="flex items-center justify-center">
        {featured.map((example, index) => {
          const style = fanStyles[index] ?? fanStyles[1];
          return (
            <li
              key={example.id}
              className={[
                "relative shrink-0 transition-transform duration-300 ease-out",
                index > 0
                  ? "-ml-10 sm:-ml-12 md:-ml-14 lg:-ml-16"
                  : "",
                style.rotate,
                style.z,
                style.scale,
                "hover:z-30 hover:scale-[1.02]",
              ].join(" ")}
            >
              <FanCard example={example} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

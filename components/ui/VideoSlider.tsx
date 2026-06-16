"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type VideoSliderProps = {
  children: ReactNode;
  className?: string;
  autoScroll?: boolean;
  autoScrollIntervalMs?: number;
};

export function VideoSlider({
  children,
  className = "",
  autoScroll = true,
  autoScrollIntervalMs = 4500,
}: VideoSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    );
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const slideWidth = el.querySelector<HTMLElement>("[data-slide]")?.offsetWidth;
    const gap = 20;
    const amount = slideWidth ? slideWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  const scrollNext = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const slideWidth = el.querySelector<HTMLElement>("[data-slide]")?.offsetWidth;
    const gap = 20;
    const amount = slideWidth ? slideWidth + gap : el.clientWidth * 0.8;

    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    el.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();

    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    return () => {
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, [updateScrollState, children]);

  useEffect(() => {
    if (!autoScroll || reduceMotion) return;

    const interval = window.setInterval(() => {
      if (!pausedRef.current) scrollNext();
    }, autoScrollIntervalMs);

    return () => window.clearInterval(interval);
  }, [autoScroll, autoScrollIntervalMs, reduceMotion, scrollNext]);

  return (
    <div className={`relative mt-12 ${className}`}>
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous clips"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-950 transition-colors hover:border-zinc-950 disabled:pointer-events-none disabled:opacity-25"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Next clips"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-950 transition-colors hover:border-zinc-950 disabled:pointer-events-none disabled:opacity-25"
        >
          →
        </button>
      </div>

      <div
        ref={trackRef}
        className="video-slider-track -mx-6 flex gap-5 overflow-x-auto px-6 pb-2 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16"
      >
        {children}
      </div>
    </div>
  );
}

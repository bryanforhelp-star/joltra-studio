"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

import { BRAND_BLUE, BRAND_STROKE } from "@/lib/brand";
import cursorImage from "@/public/cursor_01.png";

const spring = { stiffness: 520, damping: 36, mass: 0.4 };
const CURSOR_SIZE = 48;

const cursorMaskStyle = {
  WebkitMaskImage: `url(${cursorImage.src})`,
  maskImage: `url(${cursorImage.src})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const;

function CursorStar() {
  return (
    <div
      className="relative select-none"
      style={{ width: CURSOR_SIZE, height: CURSOR_SIZE }}
    >
      <div
        aria-hidden
        className="absolute inset-0 origin-center scale-[1.14]"
        style={{
          ...cursorMaskStyle,
          backgroundColor: BRAND_STROKE,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          ...cursorMaskStyle,
          backgroundColor: BRAND_BLUE,
        }}
      />
    </div>
  );
}

function subscribeMedia(query: string, callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getMedia(query: string) {
  return () => window.matchMedia(query).matches;
}

function useMedia(query: string, fallback = false) {
  return useSyncExternalStore(
    (callback) => subscribeMedia(query, callback),
    getMedia(query),
    () => fallback,
  );
}

export function CustomCursor() {
  const finePointer = useMedia("(pointer: fine)");
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor");

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(
        !!target?.closest(
          "a, button, [role='button'], input, textarea, select, label",
        ),
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, [enabled, x, y]);

  if (!enabled || !visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      aria-hidden
    >
      <motion.div
        animate={{
          scale: hovering ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <CursorStar />
      </motion.div>
    </motion.div>
  );
}

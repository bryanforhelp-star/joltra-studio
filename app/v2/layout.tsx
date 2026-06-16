import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joltra Studio 2.0 | Clipping services and distribution",
  description:
    "Professional clipping services that turn long-form into short-form distribution across TikTok, Reels, Shorts, and X.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return children;
}

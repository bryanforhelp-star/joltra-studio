import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joltra Studio 3.0 | Professional clipping services",
  description:
    "Clipping services and distribution infrastructure for brands and creators. Turn long-form into feed-ready clips at scale.",
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return children;
}

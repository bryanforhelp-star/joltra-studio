import type { ReactNode } from "react";
import { sectionStyles, type SectionTheme } from "@/lib/section-theme";

export function SectionLabel({
  theme = "dark",
  children,
}: {
  theme?: SectionTheme;
  children: ReactNode;
}) {
  const s = sectionStyles(theme);
  return (
    <p className={`text-xs uppercase tracking-[0.18em] ${s.label}`}>
      {children}
    </p>
  );
}

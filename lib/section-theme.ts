export type SectionTheme = "dark" | "light";

export function sectionStyles(theme: SectionTheme) {
  const shared = {
    border: "border-b",
  };

  if (theme === "dark") {
    return {
      ...shared,
      section: "bg-black text-zinc-50",
      border: `${shared.border} border-zinc-800`,
      label: "text-zinc-500",
      star: "text-zinc-400",
      heading: "text-zinc-50",
      subheading: "text-zinc-200",
      body: "text-zinc-400",
      faint: "text-zinc-500",
      dim: "text-zinc-600",
      line: "border-zinc-800",
      card: "border-zinc-800 bg-black hover:border-zinc-500",
      cardTag: "text-zinc-600 group-hover:text-zinc-400",
      marquee: "border-zinc-800 bg-black text-white",
    };
  }

  return {
    ...shared,
    section: "bg-white text-zinc-950",
    border: `${shared.border} border-zinc-200`,
    label: "text-zinc-500",
    star: "text-zinc-400",
    heading: "text-zinc-950",
    subheading: "text-zinc-800",
    body: "text-zinc-600",
    faint: "text-zinc-500",
    dim: "text-zinc-400",
    line: "border-zinc-200",
    card: "border-zinc-200 bg-white hover:border-zinc-400",
    cardTag: "text-zinc-400 group-hover:text-zinc-600",
    marquee: "border-zinc-200 bg-white text-zinc-500",
  };
}

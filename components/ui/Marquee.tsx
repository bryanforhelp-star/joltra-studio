import { sectionStyles, type SectionTheme } from "@/lib/section-theme";

const defaultItems = [
  "hooks",
  "pacing",
  "storytelling",
  "retention",
  "virality",
  "format",
  "attention",
  "content you already have",
  "ai at scale",
];

function MarqueeItems({ copyId, items }: { copyId: string; items: string[] }) {
  return (
    <div className="flex items-center gap-10 px-10 md:gap-14 md:px-14">
      {items.map((item) => (
        <span
          key={`${copyId}-${item}`}
          className="flex shrink-0 items-center gap-10 md:gap-14"
        >
          <span className="text-white/50" aria-hidden>
            ✦
          </span>
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee({
  theme = "dark",
  items = defaultItems,
}: {
  theme?: SectionTheme;
  items?: string[];
}) {
  const s = sectionStyles(theme);

  return (
    <div className={`overflow-hidden border-y py-5 ${s.marquee}`}>
      <div className="marquee-track flex w-max items-center whitespace-nowrap text-sm uppercase tracking-[0.18em]">
        <MarqueeItems copyId="a" items={items} />
        <div aria-hidden>
          <MarqueeItems copyId="b" items={items} />
        </div>
      </div>
    </div>
  );
}

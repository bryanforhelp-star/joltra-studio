import { BarChart3, Layers, Radio, Send, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { IconBox } from "@/components/ui/IconBox";
import { SectionHeading } from "@/components/sections/v3/SectionHeading";

const items: { icon: LucideIcon; label: string }[] = [
  { icon: Sparkles, label: "Platform-native assets from your existing content" },
  { icon: Layers, label: "Hook variations tested across channels" },
  { icon: Send, label: "Consistent publishing on every platform we manage" },
  { icon: Radio, label: "Weekly distribution cycle, not one-off deliverables" },
  { icon: ShieldCheck, label: "Human review before anything goes live" },
  { icon: BarChart3, label: "Performance reporting on what's working" },
];

export function DeliverablesV3() {
  return (
    <section className="border-b border-zinc-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="what you get"
              title="A distribution system, not a clip package"
              description="Every week we turn what you already created into platform-specific assets and get them in front of new audiences."
            />
          </div>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.label}
                className="flex gap-3 border-t border-zinc-200 pt-4"
              >
                <IconBox icon={item.icon} className="h-9 w-9 shrink-0" />
                <span className="pt-1.5 text-sm leading-relaxed text-zinc-700">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

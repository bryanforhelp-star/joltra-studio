import {
  FileText,
  Mic,
  Phone,
  Presentation,
  Radio,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { IconBox } from "@/components/ui/IconBox";
import { SectionHeading } from "@/components/sections/v3/SectionHeading";

const sources: { icon: LucideIcon; name: string }[] = [
  { icon: Mic, name: "Podcasts" },
  { icon: Users, name: "Interviews" },
  { icon: Presentation, name: "Webinars" },
  { icon: Radio, name: "Livestreams" },
  { icon: Phone, name: "Sales calls" },
  { icon: Sparkles, name: "Keynote talks" },
  { icon: Video, name: "YouTube videos" },
  { icon: FileText, name: "Founder updates" },
];

export function FormatsV3() {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow="source material"
          title="What we turn into distribution"
          description="If it contains ideas, we can distribute it."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sources.map((source) => (
            <li
              key={source.name}
              className="group flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:shadow-sm"
            >
              <IconBox
                icon={source.icon}
                className="transition-colors group-hover:border-zinc-950 group-hover:bg-zinc-950 group-hover:text-white"
              />
              <span className="text-sm font-medium text-zinc-900">{source.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

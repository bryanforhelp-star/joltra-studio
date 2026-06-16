import type { LucideIcon } from "lucide-react";

type IconBoxProps = {
  icon: LucideIcon;
  dark?: boolean;
  accent?: boolean;
  className?: string;
};

export function IconBox({
  icon: Icon,
  dark = false,
  accent = false,
  className = "",
}: IconBoxProps) {
  const variant = accent
    ? "border-zinc-950 bg-white/55 text-zinc-950"
    : dark
      ? "border-zinc-700 bg-zinc-900 text-zinc-200"
      : "border-zinc-200 bg-zinc-50 text-zinc-800";

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${variant} ${className}`}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
    </div>
  );
}

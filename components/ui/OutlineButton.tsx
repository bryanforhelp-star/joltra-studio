import type { ComponentProps } from "react";

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm tracking-[0.06em] transition-colors duration-200";

const variants = {
  default:
    "border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white",
  onDark:
    "hero-cta-button border-2 border-white bg-transparent text-white hover:border-white",
} as const;

export function OutlineButton({
  children,
  className = "",
  variant = "default",
  ...props
}: ComponentProps<"a"> & {
  variant?: keyof typeof variants;
}) {
  return (
    <a
      className={`${base} ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
}

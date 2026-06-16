export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-[11px] font-medium uppercase tracking-[0.22em] ${dark ? "text-zinc-500" : "text-zinc-500"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-medium leading-[1.08] tracking-[-0.02em] sm:text-4xl md:text-[2.75rem] ${dark ? "text-white" : "text-zinc-950"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${dark ? "text-zinc-400" : "text-zinc-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

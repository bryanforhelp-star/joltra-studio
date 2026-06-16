import { OutlineButton } from "@/components/ui/OutlineButton";

export function FinalCTAV3() {
  return (
    <section id="work-with-us" className="scroll-mt-28 bg-black py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
          get started
        </p>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl font-normal leading-[1.02] tracking-[-0.03em] sm:text-5xl">
          your next audience already exists
        </h2>
        <p className="mt-6 max-w-xl text-lg text-zinc-400">
          They just aren&apos;t seeing your content. Let us build the distribution
          system that gets you there.
        </p>
        <OutlineButton
          href="mailto:hello@joltra.studio"
          variant="onDark"
          className="mt-10"
        >
          book a call
          <span aria-hidden>→</span>
        </OutlineButton>
      </div>
    </section>
  );
}

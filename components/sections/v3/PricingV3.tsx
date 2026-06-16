import { Check, Crown, Rocket, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { IconBox } from "@/components/ui/IconBox";
import { SectionHeading } from "@/components/sections/v3/SectionHeading";

const tiers: {
  icon: LucideIcon;
  name: string;
  tag: string;
  body: string;
  price: string;
  features: string[];
  featured?: boolean;
}[] = [
  {
    icon: Sparkles,
    name: "Starter",
    tag: "Launch",
    body: "Launch one additional platform from the content you're already making.",
    price: "From $1K /mo",
    features: [
      "One new platform live in 7 days",
      "Weekly distribution from your content",
      "Platform-native assets, not reposts",
      "Performance reporting",
    ],
  },
  {
    icon: Rocket,
    name: "Growth",
    tag: "Most popular",
    featured: true,
    body: "Run multiple platforms at once and build a real distribution system.",
    price: "From $2.5K /mo",
    features: [
      "3–4 platforms managed",
      "Hook variations and content testing",
      "Weekly optimization cycle",
      "Monthly strategy review",
    ],
  },
  {
    icon: Crown,
    name: "Distribution partner",
    tag: "Scale",
    body: "We become your content distribution team across every channel.",
    price: "From $5K /mo",
    features: [
      "Full platform expansion",
      "Dedicated account lead",
      "Priority launch in 3 days",
      "Custom reporting dashboard",
    ],
  },
];

export function PricingV3() {
  return (
    <section
      id="pricing"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow="pricing"
          title="Expand by platform, not by volume"
          description="You don't pay for clips. You pay for distribution. Pick how many platforms you want to launch and grow."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`flex flex-col rounded-xl border p-6 md:p-8 ${
                tier.featured
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 bg-white"
              }`}
            >
              <IconBox icon={tier.icon} dark={tier.featured} />
              <span
                className={`mt-4 text-[10px] uppercase tracking-[0.16em] ${tier.featured ? "text-zinc-400" : "text-zinc-500"}`}
              >
                {tier.tag}
              </span>
              <h3
                className={`mt-3 text-xl font-medium ${tier.featured ? "text-white" : "text-zinc-950"}`}
              >
                {tier.name}
              </h3>
              <p
                className={`mt-2 text-sm ${tier.featured ? "text-zinc-400" : "text-zinc-600"}`}
              >
                {tier.body}
              </p>
              <p
                className={`mt-6 text-2xl font-medium ${tier.featured ? "text-white" : "text-zinc-950"}`}
              >
                {tier.price}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex gap-2 text-sm ${tier.featured ? "text-zinc-300" : "text-zinc-600"}`}
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${tier.featured ? "text-zinc-300" : "text-zinc-950"}`}
                      strokeWidth={2}
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <OutlineButton
                href="#work-with-us"
                variant={tier.featured ? "onDark" : "default"}
                className="mt-8 w-full justify-center"
              >
                book a call
                <span aria-hidden>→</span>
              </OutlineButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

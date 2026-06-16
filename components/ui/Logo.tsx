import Image from "next/image";
import { cn } from "@/lib/cn";
import logo from "@/public/re.png";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "h-12 w-12", priority }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="Joltra Studio"
      width={logo.width}
      height={logo.height}
      className={cn("object-contain", className)}
      priority={priority}
    />
  );
}

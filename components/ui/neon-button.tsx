import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type NeonButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export function NeonButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = ""
}: NeonButtonProps) {
  return (
    <a
      href={href}
      className={`neon-button neon-button-${variant} ${className}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
    </a>
  );
}

import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({
  children,
  className = ""
}: GlassCardProps) {
  return (
    <div className={`glass-card ${className}`}>
      <div className="glass-card-shine" aria-hidden="true" />
      {children}
    </div>
  );
}

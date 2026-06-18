import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  const styles = {
    primary:
      "bg-cyan-300 text-slate-950 hover:bg-cyan-200 border border-cyan-200 shadow-[0_16px_40px_rgba(103,232,249,0.18)]",
    secondary:
      "bg-white/8 text-slate-100 hover:bg-white/12 border border-white/15",
    ghost: "text-slate-300 hover:text-white hover:bg-white/8 border border-transparent"
  };

  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition",
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

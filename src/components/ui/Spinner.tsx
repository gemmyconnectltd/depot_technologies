"use client";

import { cn } from "@/lib/utils/cn";

const sizeStyles = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-[3px]",
} as const;

interface SpinnerProps {
  size?: keyof typeof sizeStyles;
  className?: string;
}

function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border-zinc-300 border-t-current text-electronics animate-spin",
        sizeStyles[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export { Spinner };
export type { SpinnerProps };

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id: string;
  children: ReactNode;
  variant?: "plain" | "band";
};

export function Section({ id, children, variant = "plain" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-[4.5rem] border-b border-line py-20 md:py-28",
        variant === "band" && "bg-surface",
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

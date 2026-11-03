import { Download } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { sitePath } from "@/lib/site";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  download?: string;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download,
  className,
}: ButtonLinkProps) {
  return (
    <a
      href={sitePath(href)}
      download={download}
      className={cn(
        "inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-90",
        variant === "primary"
          ? "bg-accent text-accent-foreground"
          : "border border-line bg-surface text-foreground hover:bg-chip",
        className,
      )}
    >
      {download ? <Download className="h-4 w-4" aria-hidden /> : null}
      {children}
    </a>
  );
}

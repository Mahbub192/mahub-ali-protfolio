import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

export function TextLink({ href, children, external = false }: TextLinkProps) {
  const className =
    "inline-flex items-center gap-1 text-sm font-semibold text-navy underline-offset-4 hover:underline";

  if (!external) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

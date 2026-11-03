import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is not part of Mahbub Ali's academic portfolio.",
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-5 py-24 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">404</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-foreground">
          This page is not available
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          The academic portfolio is on the home page.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">Back to the portfolio</ButtonLink>
        </div>
      </div>
    </main>
  );
}

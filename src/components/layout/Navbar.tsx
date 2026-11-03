"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navigation, profile, sectionIds } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { sitePath } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const id = visible[0]?.target.id;
        if (id) setActive(id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur-md">
      <div className="h-[3px] bg-accent" aria-hidden />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <a
          href={sitePath("/#top")}
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span
            className="flex h-9 w-9 items-center justify-center bg-accent font-serif text-sm text-accent-foreground"
            aria-hidden
          >
            {profile.initials}
          </span>
          <span className="font-serif text-lg tracking-tight text-foreground">
            {profile.name}
          </span>
        </a>

        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex xl:gap-5">
            {navigation.map((item) => {
              const isActive = item.match
                ? item.match.includes(active)
                : item.id === active;

              return (
                <a
                  key={item.href}
                  href={sitePath(item.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "whitespace-nowrap py-2 text-sm font-semibold transition-colors",
                    isActive ? "text-navy" : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="max-h-[calc(100vh-4.25rem)] overflow-y-auto border-t border-line bg-background lg:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-6">
            {navigation.map((item) => {
              const isActive = item.match
                ? item.match.includes(active)
                : item.id === active;

              return (
                <a
                  key={item.href}
                  href={sitePath(item.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "border-b border-line py-3 text-base font-semibold",
                    isActive ? "text-navy" : "text-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

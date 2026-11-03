import { navigation, profile } from "@/data/portfolio";
import { sitePath } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-serif text-2xl tracking-tight text-foreground">{profile.name}</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{profile.headline}</p>
          </div>
          <a href={sitePath("/#top")} className="text-sm font-semibold text-navy underline-offset-4 hover:underline">
            Back to top
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={sitePath(item.href)}
              className="text-sm font-semibold text-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="max-w-3xl border-t border-line pt-6 text-sm leading-6 text-muted">
          {profile.name}. This site presents professional software experience and a proposed
          research topic. It does not report publications or completed experiments.
        </p>
      </div>
    </footer>
  );
}

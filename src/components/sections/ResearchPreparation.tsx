import { CircleDashed } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Notice } from "@/components/ui/Notice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { preparation } from "@/data/portfolio";

export function ResearchPreparation() {
  return (
    <Section id="preparation">
      <SectionHeading
        id="preparation-heading"
        index="08"
        title="Research Preparation"
        description="What I am doing now to prepare for postgraduate research."
      />
      <FadeIn>
        <div className="mt-10">
          <Notice title="In preparation.">{preparation.disclaimer}</Notice>
        </div>
        <ol className="mt-8 divide-y divide-line rounded-lg border border-line bg-surface">
          {preparation.items.map((item, index) => (
            <li key={item.title} className="grid gap-4 p-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-start sm:p-6">
              <span className="font-serif text-lg text-navy">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
              </div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
                <CircleDashed className="h-4 w-4" aria-hidden />
                In progress
              </p>
            </li>
          ))}
        </ol>
      </FadeIn>
    </Section>
  );
}

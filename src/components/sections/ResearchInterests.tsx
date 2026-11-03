import {
  Brain,
  Eye,
  FolderHeart,
  HeartPulse,
  LineChart,
  Microscope,
  ScanSearch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { researchInterests, type ResearchInterest } from "@/data/portfolio";

const icons: Record<ResearchInterest["id"], LucideIcon> = {
  "healthcare-ai": HeartPulse,
  "machine-learning": Brain,
  "predictive-analytics": LineChart,
  "early-risk": ScanSearch,
  ehr: FolderHeart,
  xai: Eye,
  "medical-data": Microscope,
};

export function ResearchInterests() {
  return (
    <Section id="interests" variant="band">
      <SectionHeading
        id="interests-heading"
        index="05"
        title="Research Interests"
        description="Areas I am preparing to study in a Master's by Research. These are interests, not completed research outputs."
      />
      <FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {researchInterests.map((interest) => {
            const Icon = icons[interest.id];
            return (
              <article key={interest.id} className="rounded-lg border border-line bg-background p-6">
                <Icon className="h-5 w-5 text-navy" aria-hidden />
                <h3 className="mt-4 font-serif text-xl leading-snug text-foreground">
                  {interest.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{interest.summary}</p>
              </article>
            );
          })}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-6 text-muted">
          These interests shape the proposed study in{" "}
          <TextLink href="/#research">Proposed Research</TextLink>. MediScan Pro, described in its{" "}
          <TextLink href="/projects/mediscan-pro">case study</TextLink>, includes an on-device
          otoscopy classifier. A May 2025 field summary reports report time, ease of use, and
          cost. It does not report classifier accuracy.
        </p>
      </FadeIn>
    </Section>
  );
}

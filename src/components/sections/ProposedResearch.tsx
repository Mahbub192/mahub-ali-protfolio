import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FadeIn } from "@/components/ui/FadeIn";
import { Notice } from "@/components/ui/Notice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { documents, proposedResearch } from "@/data/portfolio";

function Block({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <h3 className="font-serif text-2xl tracking-tight text-foreground">{heading}</h3>
      <div className="mt-4 space-y-4 text-base leading-8 text-muted">{children}</div>
    </div>
  );
}

export function ProposedResearch() {
  return (
    <Section id="research">
      <SectionHeading
        id="research-heading"
        index="06"
        title="Proposed Research"
        description="A working proposal for master's research. Read this as a plan, not as a finished study."
      />
      <FadeIn>
        <div className="mt-10">
          <Notice title="Proposed research topic.">{proposedResearch.disclaimer}</Notice>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <aside className="h-fit rounded-lg border border-line bg-surface p-6">
            <h3 className="font-serif text-xl text-foreground">Proposal status</h3>
            <dl className="mt-5 space-y-4">
              {proposedResearch.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-navy uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <ButtonLink
                href={documents.proposal.href}
                download={documents.proposal.fileName}
                className="w-full"
              >
                Download Research Proposal PDF
              </ButtonLink>
              <p className="mt-3 text-sm leading-6 text-muted">{documents.notice}</p>
            </div>
          </aside>

          <article className="rounded-lg border border-line bg-surface p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">
              Working title
            </p>
            <h3 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground">
              {proposedResearch.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted">
              Proposed topic for a Master&apos;s by Research. This is not a completed study or a
              publication.
            </p>

            <div className="mt-10 space-y-8">
              <Block heading="Research background">
                {proposedResearch.background.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Block>
              <Block heading="Problem statement">
                {proposedResearch.problem.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Block>
              <Block heading="Research objectives">
                <ol className="list-decimal space-y-3 pl-5 marker:text-navy">
                  {proposedResearch.objectives.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </Block>
              <Block heading="Research questions">
                <ol className="list-decimal space-y-3 pl-5 marker:text-navy">
                  {proposedResearch.questions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </Block>
              <Block heading="Proposed methodology">
                <p>{proposedResearch.methodologyIntro}</p>
                <ol className="list-decimal space-y-4 pl-5 marker:font-semibold marker:text-navy">
                  {proposedResearch.methodology.map((step) => (
                    <li key={step.title}>
                      <span className="font-semibold text-foreground">{step.title}. </span>
                      {step.detail}
                    </li>
                  ))}
                </ol>
              </Block>
              <Block heading="Potential algorithms">
                <p>{proposedResearch.algorithmsIntro}</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {proposedResearch.algorithms.map((algorithm) => (
                    <li key={algorithm.name} className="rounded-lg border border-line p-4">
                      <p className="font-semibold text-foreground">{algorithm.name}</p>
                      <p className="mt-1 text-sm leading-6">{algorithm.detail}</p>
                    </li>
                  ))}
                </ul>
              </Block>
              <Block heading="Model evaluation">
                <p>{proposedResearch.evaluationIntro}</p>
                <ul className="flex flex-wrap gap-2">
                  {proposedResearch.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="rounded-md border border-line bg-chip px-3 py-1 text-sm text-foreground"
                    >
                      {metric}
                    </li>
                  ))}
                </ul>
              </Block>
              <Block heading="Explainable AI using SHAP">
                {proposedResearch.explainability.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Block>
              <Block heading="Expected research outcomes">
                <p>{proposedResearch.outcomesIntro}</p>
                <ul className="list-disc space-y-3 pl-5 marker:text-navy">
                  {proposedResearch.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <ButtonLink
                href={documents.proposal.href}
                download={documents.proposal.fileName}
              >
                Download Research Proposal PDF
              </ButtonLink>
            </div>
          </article>
        </div>
      </FadeIn>
    </Section>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { Notice } from "@/components/ui/Notice";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy } from "@/data/case-studies";

function Block({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line pt-8">
      <h2 id={`${id}-title`} className="font-serif text-2xl tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-muted">{children}</div>
    </section>
  );
}

export function CaseStudyArticle({ study }: { study: CaseStudy }) {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 md:py-24">
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Project case study</p>
      <h1 className="mt-3 text-balance font-serif text-4xl tracking-tight text-foreground md:text-5xl">
        {study.title}
      </h1>
      <p className="mt-4">
        <Link href="/#projects" className="text-sm font-semibold text-navy underline-offset-4 hover:underline">
          Back to SakuraEHealth
        </Link>
      </p>

      <div className="mt-8">
        <Notice title="Scope of this page.">{study.limits}</Notice>
      </div>

      <div className="mt-10 space-y-8">
        <Block id="overview" heading="Project overview">
          {study.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Block>
        <Block id="problem" heading="Problem statement">
          {study.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Block>
        <Block id="solved" heading="Real-world problems solved">
          <ul className="list-disc space-y-3 pl-5 marker:text-navy">
            {study.solved.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Block>
        <Block id="role" heading="My role and contributions">
          {study.role.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Block>
        <Block id="features" heading="Key features implemented">
          <ul className="list-disc space-y-3 pl-5 marker:text-navy">
            {study.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Block>
        <Block id="architecture" heading="Technical architecture">
          <p>
            The steps below are the main workflow of this system. Arrows mean the direction of
            that workflow, not a measured performance path.
          </p>
          <ol className="space-y-3">
            {study.architecture.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-line bg-surface p-4">
                <p className="text-xs font-semibold tracking-[0.14em] text-navy uppercase">
                  {String(index + 1).padStart(2, "0")}
                  {index < study.architecture.length - 1 ? "  →  next stage" : ""}
                </p>
                <p className="mt-2 font-semibold text-foreground">{step.title}</p>
                <p className="mt-1 text-sm leading-6">{step.detail}</p>
              </li>
            ))}
          </ol>
        </Block>
        <Block id="technologies" heading="Technologies used">
          <ul className="flex flex-wrap gap-2">
            {study.technologies.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </Block>
        <Block id="challenges" heading="Challenges and solutions">
          <ul className="space-y-4">
            {study.challenges.map((item) => (
              <li key={item.title}>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Block>
        <Block id="impact" heading="Practical applications and impact">
          {study.impact.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Block>
        <Block id="future" heading="Future improvements">
          <ul className="list-disc space-y-3 pl-5 marker:text-navy">
            {study.future.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Block>
        <Block id="research" heading="Potential research opportunities">
          {study.research.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Block>
      </div>
    </article>
  );
}

import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { academic } from "@/data/portfolio";

export function Academic() {
  return (
    <Section id="academic">
      <SectionHeading
        id="academic-heading"
        index="02"
        title="Academic Background"
        description="Undergraduate record, medium of instruction, and the postgraduate direction I am preparing for."
      />
      <FadeIn>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-surface p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">
              Completed degree
            </p>
            <h3 className="mt-4 text-balance font-serif text-2xl leading-snug text-foreground">
              {academic.degree}
            </h3>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-xs font-semibold tracking-[0.14em] text-navy uppercase">CGPA</dt>
                <dd className="mt-1 font-serif text-3xl text-foreground">{academic.cgpa}</dd>
              </div>
              {academic.institution ? (
                <div>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-navy uppercase">
                    Institution
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-foreground">{academic.institution}</dd>
                </div>
              ) : null}
            </dl>
            <div className="mt-6 border-t border-line pt-6">
              <h4 className="text-sm font-semibold text-foreground">Medium of Instruction</h4>
              <p className="mt-2 text-sm leading-6 text-muted">{academic.mediumOfInstruction}</p>
            </div>
          </article>

          <article className="rounded-lg border border-line bg-surface p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">
              {academic.intended.label}
            </p>
            <h3 className="mt-4 text-balance font-serif text-2xl leading-snug text-foreground">
              {academic.intended.degree}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">{academic.intended.note}</p>
            <dl className="mt-6">
              <dt className="text-xs font-semibold tracking-[0.14em] text-navy uppercase">
                {academic.intended.focusLabel}
              </dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {academic.intended.focus.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-chip px-2.5 py-1 text-sm text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </article>
        </div>
      </FadeIn>
    </Section>
  );
}

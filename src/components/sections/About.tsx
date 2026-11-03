import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, academic, profile } from "@/data/portfolio";

const summary = [
  { label: "Degree", value: academic.degree },
  { label: "University", value: academic.institution },
  { label: "CGPA", value: academic.cgpa },
  { label: "Experience", value: `${profile.experienceLabel} in software development` },
  { label: "Current position", value: profile.currentPosition },
  { label: "Career goal", value: profile.careerGoal },
];

export function About() {
  return (
    <Section id="about" variant="band">
      <SectionHeading id="about-heading" index="01" title="About Me" />
      <FadeIn>
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.7fr)] lg:gap-16">
          <div className="space-y-5 text-lg leading-8 text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
          <aside className="h-fit rounded-lg border border-line bg-background p-6">
            <h3 className="font-serif text-xl text-foreground">At a glance</h3>
            <dl className="mt-5 space-y-4">
              {summary.map((item) => (
                <div key={item.label} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                  <dt className="text-xs font-semibold tracking-[0.14em] text-navy uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </FadeIn>
    </Section>
  );
}

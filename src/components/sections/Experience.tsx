import { ProjectCard } from "@/components/projects/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <Section id="experience" variant="band">
      <SectionHeading
        id="experience-heading"
        index="03"
        title="Professional Experience"
        description="Three years of software development on HealthConnect, PrimeMIS, and Muallim App."
      />
      <FadeIn>
        <div className="mt-12 grid gap-6 border-b border-line pb-10 sm:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <p className="font-serif text-2xl text-foreground">{experience.role}</p>
            <p className="mt-1 text-sm font-semibold text-navy">{experience.duration}</p>
          </div>
          <div className="space-y-4 text-base leading-8 text-muted">
            {experience.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {experience.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              className="bg-background"
            />
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

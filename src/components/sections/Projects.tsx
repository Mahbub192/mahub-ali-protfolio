import { ProjectCard } from "@/components/projects/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/portfolio";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        id="projects-heading"
        index="04"
        title="SakuraEHealth"
        description="SakuraEHealth is the niche company I am establishing for health-related software. The products are MediScan Pro, Sakura ENT Center, prescription writing, hospital management, and the EHealth app."
      />
      <FadeIn>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              className="bg-surface"
            />
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

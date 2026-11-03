import { Tag } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
  index: number;
  className?: string;
};

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  return (
    <article
      id={project.id}
      className={cn(
        "flex scroll-mt-[4.5rem] flex-col rounded-lg border border-line p-6 md:p-8",
        className,
      )}
    >
      <p className="text-xs font-semibold tracking-[0.16em] text-navy">
        {String(index + 1).padStart(2, "0")}
        {project.brand ? ` · ${project.brand}` : ""}
      </p>
      <h3 className="mt-3 font-serif text-2xl text-foreground">{project.title}</h3>
      <p className="mt-3 text-pretty leading-7 text-muted">{project.summary}</p>
      {project.contributions.length > 0 ? (
        <ul className="mt-5 space-y-2">
          {project.contributions.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {project.technologies.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Tag>{technology}</Tag>
            </li>
          ))}
        </ul>
      ) : null}
      {project.slug || project.links.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
          {project.slug ? (
            <TextLink href={`/projects/${project.slug}`}>Case study</TextLink>
          ) : null}
          {project.links.map((link) => (
            <TextLink key={link.href} href={link.href} external>
              {link.label}
            </TextLink>
          ))}
        </div>
      ) : null}
    </article>
  );
}

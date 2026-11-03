import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { skillGroups } from "@/data/portfolio";
import { cn } from "@/lib/cn";

export function Skills() {
  return (
    <Section id="skills" variant="band">
      <SectionHeading
        id="skills-heading"
        index="07"
        title="Technical Skills"
        description="Software skills used in professional development, with research tools listed separately while I am still learning them."
      />
      <FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.id}
              className={cn(
                "rounded-lg border p-6",
                group.learning
                  ? "border-navy bg-chip md:col-span-2"
                  : group.wide
                    ? "border-line bg-background md:col-span-2"
                    : "border-line bg-background",
              )}
            >
              <h3 className="font-serif text-2xl text-foreground">{group.title}</h3>
              {group.note ? (
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{group.note}</p>
              ) : null}
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

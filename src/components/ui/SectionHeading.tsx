import { FadeIn } from "@/components/ui/FadeIn";

type SectionHeadingProps = {
  id: string;
  index: string;
  title: string;
  description?: string;
};

export function SectionHeading({ id, index, title, description }: SectionHeadingProps) {
  return (
    <FadeIn className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{index}</p>
      <h2
        id={id}
        className="mt-3 text-balance font-serif text-3xl tracking-tight text-foreground md:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-lg leading-8 text-muted">{description}</p>
      ) : null}
    </FadeIn>
  );
}

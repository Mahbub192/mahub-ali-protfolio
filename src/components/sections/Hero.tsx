import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FadeIn } from "@/components/ui/FadeIn";
import { academic, documents, profile } from "@/data/portfolio";

const facts = [
  {
    label: "CGPA",
    value: academic.cgpa,
    detail: academic.institution,
  },
  {
    label: "Experience",
    value: profile.experienceLabel,
    detail: profile.experienceDetail,
  },
  {
    label: "Current position",
    value: profile.currentPosition,
    detail: "Healthcare software",
  },
  {
    label: "Research goal",
    value: profile.researchGoal,
    detail: profile.researchAudience,
  },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="home-heading" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-6 md:pb-24 md:pt-24 lg:px-8">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-6">
            <div className="lg:col-start-1 lg:row-start-1">
              <p className="text-xs font-semibold tracking-[0.2em] text-navy uppercase">
                Academic & Research Portfolio
              </p>
              <h1
                id="home-heading"
                className="mt-5 text-balance font-serif text-5xl tracking-tight text-foreground sm:text-6xl md:text-7xl"
              >
                {profile.name}
              </h1>
              <p className="mt-5 max-w-3xl font-serif text-2xl leading-snug tracking-tight text-navy md:text-3xl">
                {profile.headline}
              </p>
            </div>
            <Image
              src="/images/MahbubImage.png"
              alt="Portrait of Mahbub Ali"
              width={960}
              height={960}
              priority
              className="mx-auto block aspect-square w-full max-w-72 rounded-lg border border-line object-cover object-top lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-none"
            />
            <div className="lg:col-start-1 lg:row-start-2">
              <p className="max-w-2xl text-pretty text-lg leading-8 text-muted">
                {profile.introduction}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/#research" className="w-full sm:w-auto">
                  View My Research
                </ButtonLink>
                <ButtonLink
                  href={documents.cv.href}
                  download={documents.cv.fileName}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Download CV
                </ButtonLink>
                <ButtonLink href="/#contact" variant="secondary" className="w-full sm:w-auto">
                  Contact Me
                </ButtonLink>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-surface px-5 py-5">
                <dt className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-serif text-2xl leading-tight tracking-tight text-foreground">
                  {fact.value}
                  <span className="mt-1 block font-sans text-sm font-normal leading-5 text-muted">
                    {fact.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}

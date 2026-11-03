import { Mail } from "lucide-react";
import type { ComponentType } from "react";
import { LinkedInIcon } from "@/components/icons/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, documents, profile } from "@/data/portfolio";

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external?: boolean;
};

const channels: readonly Channel[] = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mahbub-ali-fullstack",
    href: contact.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
];

export function Contact() {
  return (
    <Section id="contact" variant="band">
      <SectionHeading
        id="contact-heading"
        index="09"
        title="Contact"
        description="I welcome enquiries from prospective research supervisors and postgraduate admissions teams, particularly faculty working in healthcare AI."
      />
      <FadeIn>
        <p className="mt-8 max-w-3xl text-base leading-8 text-muted">
          {profile.name} is preparing for a {profile.researchGoalFull} and is presenting this portfolio to your university.
          Enquiries can be sent by email or through LinkedIn.
        </p>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const className = "block h-full rounded-lg border border-line bg-background p-6";
            const body = (
              <>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface">
                  <Icon className="h-4 w-4 text-navy" aria-hidden />
                </span>
                <span className="mt-5 block text-xs font-semibold tracking-[0.14em] text-navy uppercase">
                  {channel.label}
                </span>
                <span className="mt-2 block break-all text-base text-foreground">{channel.value}</span>
              </>
            );

            return (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  className={`${className} transition-colors hover:bg-chip`}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                >
                  {body}
                  {channel.external ? (
                    <span className="sr-only"> (opens in a new tab)</span>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={documents.cv.href} download={documents.cv.fileName}>
            Download CV
          </ButtonLink>
          <ButtonLink
            href={documents.proposal.href}
            download={documents.proposal.fileName}
            variant="secondary"
          >
            Download Research Proposal
          </ButtonLink>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">{documents.notice}</p>
      </FadeIn>
    </Section>
  );
}

import { About } from "@/components/sections/About";
import { Academic } from "@/components/sections/Academic";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { ProposedResearch } from "@/components/sections/ProposedResearch";
import { ResearchInterests } from "@/components/sections/ResearchInterests";
import { ResearchPreparation } from "@/components/sections/ResearchPreparation";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Hero />
      <About />
      <Academic />
      <Experience />
      <Projects />
      <ResearchInterests />
      <ProposedResearch />
      <Skills />
      <ResearchPreparation />
      <Contact />
    </main>
  );
}

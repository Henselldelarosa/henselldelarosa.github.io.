import Head from "next/head";
import { Element as Section } from "react-scroll";
import {
  AboutSection,
  ContactSection,
  FeaturedYMSSection,
  HeroSection,
  PortfoliosSection,
  ResumeSection,
  SkillsSection,
} from "../components/containers";
import { Layout } from "../components/layout";
import { SectionHeading } from "../components/utils";

const IndexPage = () => {
  return (
    <Layout blurred>
      <Head>
        <title>Hensell Portfolio</title>
      </Head>

      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#10204a_0%,_#081229_45%,_#050c1d_100%)] text-white">
        <main className="w-full pt-12">
          <Section name="section-home" className="mt-24 md:mt-28">
            <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
              <HeroSection />
            </div>
          </Section>

          <div className="mx-auto my-14 h-px max-w-6xl bg-white/10" />

          <Section name="section-yms">
            <FeaturedYMSSection />
          </Section>

          <div className="mx-auto my-14 h-px max-w-6xl bg-white/10" />

          <Section name="section-portfolios">
            <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
              <PortfoliosSection />
            </div>
          </Section>
        </main>

        <div className="h-px w-full bg-white/10" />

        <Section
          name="section-about"
          className="about-section pt-24 lg:pt-28 xl:pt-32"
        >
          <div className="container mx-auto">
            <SectionHeading animated={false} title="About Me" watermark="About" />
            <AboutSection />
          </div>
        </Section>

        <Section
          name="section-skills"
          className="skills-section pt-24 lg:pt-28 xl:pt-32"
        >
          <div className="container mx-auto">
            <SectionHeading animated={false} title="My Skills" watermark="Skills" />
            <SkillsSection />
          </div>
        </Section>

        <Section
          name="section-resume"
          className="resume-section pt-24 lg:pt-28 xl:pt-32"
        >
          <div className="container mx-auto">
            <SectionHeading animated={false} title="My Resume" watermark="Resume" />
            <ResumeSection />
          </div>
        </Section>

        <Section
          name="section-contact"
          className="contact-section pt-24 lg:pt-28 xl:pt-32"
        >
          <div className="container mx-auto">
            <SectionHeading animated={false} title="Contact Me" watermark="Contact" />
            <ContactSection />
          </div>
        </Section>

        <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
      </div>
    </Layout>
  );
};

export default IndexPage;

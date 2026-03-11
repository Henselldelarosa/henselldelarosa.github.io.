import Head from "next/head";
import { Element as Section } from "react-scroll";
import {
  AboutSection,
  BlogSection,
  ContactSection,
  FeaturedYMSSection,
  HeroSection,
  PortfoliosSection,
  ResumeSection,
  ReviewsSection,
  ServicesSection,
  SkillsSection,
  SystemDesignSection,
} from "../components/containers";
import { Layout } from "../components/layout";
import { SectionHeading } from "../components/utils";
// import { getPostsByPage } from "../lib/blogging";

const index = ({ pages }) => {
  // const router = useRouter()
  // useEffect(() => {
  //   router.push("/homepage2")
  // })
  return (
    <Layout blurred>
    <Head>
      <title>Hensell-Portfolio</title>
    </Head>

    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#10204a_0%,_#081229_45%,_#050c1d_100%)] text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-12 md:px-10 lg:px-12">
        <Section name="section-home" className="mt-24 md:mt-28">
          <HeroSection />
        </Section>

        <div className="h-px w-full bg-white/10" />

        <Section name="section-yms">
          <FeaturedYMSSection />
        </Section>

        <div className="h-px w-full bg-white/10" />

        <Section name="section-portfolios">
          <PortfoliosSection />
        </Section>

        <div className="h-px w-full bg-white/10" />

        <Section name="section-system-design">
          <SystemDesignSection />
        </Section>
      </main>

      <div className="h-px w-full bg-white/10" />

    {/* Start About Section */}
    <Section
      name="section-about"
      className="about-section pt-24 lg:pt-28 xl:pt-32"
    >
      <div className="container mx-auto">
        <SectionHeading animated={false} title="About Me" watermark="About" />
        <AboutSection />
      </div>
    </Section>
    {/* End About Section */}

    {/* Start Skills Section */}
    <Section
      name="section-skills"
      className="skills-section pt-24 lg:pt-28 xl:pt-32"
    >
      <div className="container mx-auto">
        <SectionHeading animated={false} title="My Skills" watermark="Skills" />
        <SkillsSection />
      </div>
    </Section>
    {/* End Skills Section */}

    {/* Start Resume Section */}
    <Section
      name="section-resume"
      className="resume-section pt-24 lg:pt-28 xl:pt-32"
    >
      <div className="container mx-auto">
        <SectionHeading animated={false} title="My Resume" watermark="Resume" />
        <ResumeSection />
      </div>
    </Section>
    {/* End Resume Section */}

    {/* Start Reviews Section */}
    <Section
      name="section-reviews"
      className="reviews-section pt-24 lg:pt-28 xl:pt-32"
    >
      <div className="container mx-auto">
        {/* <SectionHeading animated={false} title="Client Reviews" watermark="Reviews" />
        <ReviewsSection /> */}
      </div>
    </Section>
    {/* End Reviews Section */}

    {/* Start Blog Section */}
    <Section
      name="section-blog"
      className="news-section pt-24 lg:pt-28 xl:pt-32"
    >
      <div className="container mx-auto">
        {/* <SectionHeading animated={false} title="Latest Blogs" watermark="Blogs" />
        <BlogSection posts={posts} /> */}
      </div>
    </Section>
    {/* End Blog Section */}

    {/* Start Contact Section */}
    <Section
      name="section-contact"
      className="contact-section pt-24 lg:pt-28 xl:pt-32"
    >
      <div className="container mx-auto">
        <SectionHeading animated={false} title="Contact Me" watermark="Contact" />
        <ContactSection />
      </div>
    </Section>
    {/* End Contact Section */}

    <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
    </div>
  </Layout>
);
};

export async function getStaticProps() {
  return {
    props: {
      pages: [
        {
          id: 1,
          title: "Home Version 1",
          image: "/images/demo/homepage-1.jpg",
          path: "/homepage1",
        },
        {
          id: 2,
          title: "Home Version 2",
          image: "/images/demo/homepage-2.jpg",
          path: "/homepage2",
        },
        {
          id: 3,
          title: "Home Version 3",
          image: "/images/demo/homepage-3.jpg",
          path: "/homepage3",
        },
      ],
    },
  };
}

export default index;

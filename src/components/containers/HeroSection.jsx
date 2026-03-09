import { Link } from "react-scroll";

const HeroSection = () => {
  return (
    <section className="space-y-5">
      <div className="rounded-sm border border-white/10 bg-white/5 px-6 py-14 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Hensell De La Rosa
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-2xl">
            Full-Stack Software Engineer · React, Tailwind, Python & Flask
          </p>
          <div className="mx-auto mt-6 h-px w-32 bg-white/20" />
          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/85 md:text-2xl md:leading-10">
            I build workflow-heavy operational systems with clean interfaces and
            secure backend architecture.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="section-yms"
              spy={true}
              smooth={true}
              offset={-74}
              duration={1000}
              className="cursor-pointer rounded-md bg-blue-600 px-7 py-3 text-base font-semibold shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 md:px-9 md:py-4 md:text-xl"
            >
              View Projects
            </Link>
            <a
              href="/Hensells-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/50 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/10 md:px-9 md:py-4 md:text-xl"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

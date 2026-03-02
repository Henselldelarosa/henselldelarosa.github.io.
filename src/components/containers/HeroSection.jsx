import { RiArrowDownLine } from "react-icons/ri";
import { Link } from "react-scroll";
import { SocialIcons } from "../elements";
import { motion } from "framer-motion";
import { childrenAnimation } from "../../lib/motion";
import { useQuery } from "react-query";
import { getInformation } from "../../fetchers";

const HeroSection = ({ blurred, scroll = true, typed = true }) => {
  const { data } = useQuery("information", getInformation);

  if (!data) return null;

  return (
    <div className="herosection relative overflow-hidden">
      {!blurred && (
        <div className="herosection-bg absolute left-0 top-0 h-full w-full"></div>
      )}
      <div
        className={`herosection-content relative z-20 bg-grey-darken  ${blurred ? "bg-opacity-20" : "bg-opacity-90"
          }`}
      >
        <div className="container relative mx-auto">
          <div className="flex min-h-screen w-full items-center justify-center">
            <div className="herosection-content w-full py-20 text-center md:w-3/4">
              <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                variants={childrenAnimation}
                className="mb-2 text-heading"
              >
                <span className="text-primary">Hensell De La Rosa</span>
              </motion.h1>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                variants={childrenAnimation}
                className="mb-2 text-lg font-medium opacity-90"
              >
                Full-Stack Software Engineer — UI-Focused | React, Tailwind, Python &amp; Flask
              </motion.p>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                variants={childrenAnimation}
                className="lead mb-5 max-w-2xl mx-auto"
              >
                I build workflow-heavy web apps with clean UI and secure backend systems (RBAC, JWT, SQL).
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                variants={childrenAnimation}
                className="mb-5 flex flex-wrap items-center justify-center gap-3"
              >
                <Link
                  to="section-portfolios"
                  spy={true}
                  smooth={true}
                  offset={-74}
                  duration={1000}
                  className="btn"
                >
                  <span>View Projects</span>
                </Link>
                <a
                  href="/Hensells-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-transparent"
                >
                  <span> Resume (PDF)</span>
                </a>
              </motion.div>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                variants={childrenAnimation}
                className="mb-5 text-sm opacity-80 max-w-xl mx-auto"
              >
                Built a Yard Management System supporting role-based permissions and multi-user operational workflows.

              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                variants={childrenAnimation}
                className="herosection-imagewrapper relative mb-5 inline-block overflow-hidden rounded-full align-middle"
              >
                <span className="herosection-imageanimation absolute left-0 top-0 z-10 h-full w-full rounded-full bg-gradient-to-tr from-primary to-transparent"></span>
                <div className="herosection-image fiximage relative z-20 inline-block h-[150px] w-[150px] overflow-hidden rounded-full border-6 border-primary border-opacity-10 align-middle">
                  <img
                    src={data.thumbImage}
                    alt={data.fullName}
                    height={150}
                    width={150}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                variants={childrenAnimation}
                className="herosection-socialicons mt-7 text-center"
              >
                <SocialIcons data={data.socialAddress} />
              </motion.div>
            </div>
          </div>
          {scroll ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1 }}
              variants={childrenAnimation}
              className="herosection-bottom absolute left-0 top-auto bottom-10 w-full justify-between text-center"
            >
              <Link
                activeClass="active"
                to="section-about"
                spy={true}
                smooth={true}
                offset={-74}
                duration={1000}
                className="cursor-pointer text-xs font-medium uppercase tracking-widest transition-all hover:text-primary"
              >
                <RiArrowDownLine className="inline animate-bounce text-base" />
                <span className="pl-2">Scroll Down</span>
              </Link>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

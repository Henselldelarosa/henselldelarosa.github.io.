import { motion } from "framer-motion";
import { childrenAnimation } from "../../lib/motion";

const frontendSkills = [
  "React",
  "Next.js",
  "Redux",
  "Context API",
  "Tailwind CSS (utility-first design system)",
  "SCSS (modular component styling)",
  "CSS3 (custom refinements & precision styling)",
  "Responsive / Mobile-First Design",
  "Role-Based Conditional Rendering",
  "Component Architecture & Layout Systems for front end",
];

const backendSkills = [
  "Python",
  "Flask",
  "Node.js",
  "Express",
  "RESTful API Design",
  "JWT Authentication",
  "Role-Based Access Control (RBAC)",
  "Secure User Provisioning Architecture",
];

const databaseSkills = [
  "SQL (PostgreSQL / MySQL)",
  "Relational Schema Design",
  "Permission & Role Mapping Systems",
  "Multi-User Enterprise Architecture",
  "Workflow Modeling for Logistics Operations",
];

const deploymentSkills = [
  "Supabase",
  "Static export for portfolio",
  "Axios baseURL adjustments",
  "CORS debugging",
  "API JSON local file routing fixes",
];

const designSkills = [
  "Visual hierarchy & layout balance",
  "Clean enterprise SaaS UI systems",
  "Custom dashboard styling",
  "Pixel-level UI refinement",
  "Artistic background in painting (strong visual composition foundation)",
];

const categories = [
  { title: "🖥 Frontend Engineering (Core Strength)", items: frontendSkills },
  { title: "⚙️ Backend Engineering", items: backendSkills },
  { title: "🗄 System & Database Design", items: databaseSkills },
  { title: "Deployment & Hosting", items: deploymentSkills },
  { title: "🎨 Design & Interface Strength", items: designSkills },
];

const TechSkills = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7">
      {categories.map((category, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className="min-w-0 text-center"
          key={category.title}
        >
          <h3 className="mb-3 text-xl font-semibold">{category.title}</h3>
          <ul className="mx-auto list-inside space-y-1 text-base leading-relaxed text-center">
            {category.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default TechSkills;

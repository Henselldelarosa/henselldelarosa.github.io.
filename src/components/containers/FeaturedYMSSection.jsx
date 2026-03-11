import React from "react";
import { Link } from "react-scroll";

const ymsScreenshots = [
  { title: "Move Dashboard", image: "/images/portfolios/yms-dashboard.png" },
  { title: "Trailer Inventory", image: "/images/portfolios/yms-trailer-inventory.png" },
  { title: "Move Workflow", image: "/images/portfolios/yms-move-workflow.png" },
  { title: "Dock Selector", image: "/images/portfolios/yms-door-selector.png" },
  { title: "Role Management", image: "/images/portfolios/yms-role-management.png" },
  { title: "Permissions", image: "/images/portfolios/yms-permissions.png" },
  { title: "Driver Mobile", image: "/images/portfolios/yms-driver-mobile.png" },
  { title: "Move History", image: "/images/portfolios/yms-move-history.png" },
];

const techStack = [
  "React",
  "Tailwind CSS",
  "Python",
  "Flask",
  "PostgreSQL",
  "RBAC",
];

const features = [
  {
    title: "Trailer Inventory Tracking",
    description:
      "Monitor trailer location, load status, ownership, and yard placement across operational workflows.",
  },
  {
    title: "Move Workflow Engine",
    description:
      "Create and manage trailer movements between yard locations, dock doors, and facilities using a multi-step process.",
  },
  {
    title: "Role-Based Access Control",
    description:
      "Control operational actions with fine-grained permissions for administrators, drivers, managers, and warehouse staff.",
  },
  {
    title: "Mobile Driver Interface",
    description:
      "Allow yard drivers to check in, select moves, complete assignments, and update trailer activity from mobile devices.",
  },
];

const FeaturedYMSSection = () => {
  return (
    <section
      id="section-featured-yms"
      className="bg-[#0b1220] px-6 py-20 text-white md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Featured Project
            </p>

            <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Enterprise Yard Management System
            </h2>

            <p className="mb-6 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              A workflow-driven logistics platform built to manage trailer
              inventory, yard movements, dock workflows, and operational
              coordination across multiple user roles.
            </p>

            <p className="mb-6 text-sm text-white/60">
              Built using real logistics workflows observed in yard and
              warehouse operations.
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#yms-architecture"
                className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                View Architecture
              </a>

              <Link
                to="section-portfolios"
                smooth={true}
                offset={-74}
                duration={700}
                className="cursor-pointer rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Other Projects
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
            <img
              src="/images/portfolios/yms-dashboard.png"
              alt="Enterprise Yard Management System dashboard"
              className="w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Core Features
            </p>
            <h3 className="text-3xl font-bold md:text-4xl">
              Built for operational logistics workflows
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h4 className="mb-3 text-xl font-semibold">{feature.title}</h4>
                <p className="leading-7 text-white/75">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Screenshot Gallery */}
        <div className="mt-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Product Screens
            </p>
            <h3 className="text-3xl font-bold md:text-4xl">
              Real interfaces from the system
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {ymsScreenshots.map((shot) => (
              <div
                key={shot.title}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <img
                  src={shot.image}
                  alt={shot.title}
                  className="h-[220px] w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/portfolios/yms-dashboard.png";
                  }}
                />
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-white/90">
                    {shot.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Overview */}
        <div
          id="yms-architecture"
          className="mt-20 grid gap-8 lg:grid-cols-2"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Problem
            </p>
            <h3 className="mb-4 text-2xl font-bold">Why this system exists</h3>
            <p className="leading-7 text-white/75">
              Yard operations often depend on manual communication, whiteboards,
              spreadsheets, and outdated workflows to track trailers and manage
              moves. This system digitizes those processes to improve visibility,
              coordination, and operational control across multiple roles.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Architecture
            </p>
            <h3 className="mb-4 text-2xl font-bold">How the system works</h3>

            <div className="space-y-4 text-sm text-white/80">
              <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
                <strong className="block text-white">Frontend</strong>
                React dashboard + Tailwind CSS for operations staff
              </div>

              <div className="flex justify-center text-white/40">↓</div>

              <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
                <strong className="block text-white">Backend</strong>
                Flask REST API handling workflows, permissions, and system logic
              </div>

              <div className="flex justify-center text-white/40">↓</div>

              <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
                <strong className="block text-white">Database</strong>
                PostgreSQL relational models for trailers, moves, users, roles,
                permissions, and history
              </div>
            </div>
          </div>
        </div>

        {/* Key Engineering Notes */}
        <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Engineering Highlights
          </p>

          <h3 className="mb-6 text-3xl font-bold md:text-4xl">
            System design focus
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 text-lg font-semibold">Core Data Models</h4>
              <ul className="space-y-2 text-white/75">
                <li>• Users</li>
                <li>• Roles</li>
                <li>• Permissions</li>
                <li>• Trailers</li>
                <li>• Locations</li>
                <li>• Moves</li>
                <li>• Move History</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-lg font-semibold">Workflow Coverage</h4>
              <ul className="space-y-2 text-white/75">
                <li>• Trailer inventory monitoring</li>
                <li>• Multi-step move creation</li>
                <li>• Dock and destination selection</li>
                <li>• Driver assignment workflows</li>
                <li>• Move state tracking and history</li>
                <li>• Permission-based feature access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedYMSSection;

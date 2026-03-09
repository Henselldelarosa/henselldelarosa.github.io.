const DESIGN_BLOCKS = [
  {
    title: "Problem",
    body: [
      "Old yard operations relied on manual processes to track trailer locations and moves.",
    ],
  },
  {
    title: "System Architecture",
    body: [
      "React frontend, Flask backend,",
      "PostgreSQL database.",
      "RESTful APIs",
    ],
  },
  {
    title: "Key Features",
    body: [
      "Trailer Inventory Tracking",
      "Move Workflow Engine",
      "Role-Based Access Control",
      "Mobile Driver Interface",
    ],
  },
  {
    title: "Technologies",
    body: [
      "React & Tailwind",
      "Python & Flask",
      "PostgreSQL",
      "AWS",
    ],
  },
];

const SystemDesignSection = () => {
  return (
    <section className="space-y-5 pb-10">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
        System Design
      </h2>

      <div className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-4">
        {DESIGN_BLOCKS.map((block) => (
          <div
            key={block.title}
            className="bg-white/5 p-7 backdrop-blur-sm md:min-h-[300px]"
          >
            <h3 className="text-2xl font-semibold text-white md:text-3xl">
              {block.title}
            </h3>
            <div className="mt-4 h-px w-36 bg-white/15" />
            <ul className="mt-6 space-y-3 text-base leading-8 text-white/85 md:text-xl md:leading-10">
              {block.body.map((line) => (
                <li key={line} className="flex gap-3">
                  {block.body.length > 1 ? (
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                  ) : null}
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SystemDesignSection;

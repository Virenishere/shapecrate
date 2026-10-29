const ROADMAP_ITEMS = [
  {
    number: "01",
    title: "More CSS component categories",
    status: "In progress",
  },
  {
    number: "02",
    title: "Framework-specific examples",
    status: "Exploring",
  },
  {
    number: "03",
    title: "Optional motion recipes",
    status: "Exploring",
  },
  {
    number: "04",
    title: "Community component submissions",
    status: "Exploring",
  },
] as const;

export default function RoadMap() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="mx-4 my-12 max-w-6xl rounded-3xl border border-[#303531] bg-[#181b19] p-8 sm:mx-6 sm:p-12 lg:mx-auto lg:p-16 transition-colors"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Heading and description */}
        <div className="flex flex-col items-start">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-(--accent)">
            ROADMAP
          </p>

          <h2
            id="roadmap-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.12]"
          >
            What we&apos;re exploring
            <br />
            next
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#b6bcb8] sm:text-base">
            A transparent look at possible directions—not promises or shipped
            features.
          </p>
        </div>

        {/* Right Column: Roadmap Items List */}
        <div className="w-full">
          <ul className="divide-y divide-[#303531] border-b border-[#303531]">
            {ROADMAP_ITEMS.map((item) => (
              <li
                key={item.number}
                className="flex items-center justify-between gap-4 py-5 sm:py-6"
              >
                <div className="flex items-center gap-6 sm:gap-8">
                  <span className="font-mono text-xs font-semibold text-[#818982]">
                    {item.number}
                  </span>
                  <span className="text-sm font-medium text-white sm:text-base">
                    {item.title}
                  </span>
                </div>

                <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-[#b6bcb8]">
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

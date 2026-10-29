const steps = [
  {
    number: "01",
    title: "Choose an issue",
    description: "Browse open issues or propose a focused improvement.",
  },
  {
    number: "02",
    title: "Build thoughtfully",
    description: "Follow the existing patterns and test every state.",
  },
  {
    number: "03",
    title: "Open a pull request",
    description: "Explain the change clearly and include a preview.",
  },
];

export default function Contribute() {
  return (
    <section
      id="contribute"
      aria-labelledby="contribute-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 transition-colors"
    >
      {/* Header */}
      <header className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-(--accent)">
          Contribute
        </p>
        <h2
          id="contribute-heading"
          className="mt-3 text-3xl font-semibold tracking-tight text-(--ink) sm:text-4xl md:text-[2.65rem] leading-[1.15]"
        >
          There&apos;s room in the crate.
        </h2>
        <p className="mt-3 text-sm text-(--ink-2) sm:text-base">
          Good open source starts with clear, focused contributions.
        </p>
      </header>

      {/* 3 Step Cards Container */}
      <ol className="mt-12 sm:mt-14 grid overflow-hidden rounded-2xl border border-(--line) bg-(--surface) md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-(--line)">
        {steps.map(({ number, title, description }) => (
          <li key={number} className="flex">
            <article className="flex h-full w-full flex-col justify-between p-6 sm:p-8 lg:p-9 min-h-[200px] sm:min-h-[220px]">
              <span
                className="font-mono text-xs font-semibold text-(--ink-3)"
                aria-hidden="true"
              >
                {number}
              </span>
              <div className="mt-12 sm:mt-16 lg:mt-20">
                <h3 className="text-lg font-semibold tracking-tight text-(--ink) sm:text-xl">
                  {title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-(--ink-2)">
                  {description}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

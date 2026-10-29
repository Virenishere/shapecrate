import { Search, Copy, Code } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description:
      "Browse a growing collection of practical, polished UI components.",
  },
  {
    number: "02",
    icon: Copy,
    title: "Copy",
    description:
      "Grab clean HTML and CSS with one click. No package manager required.",
  },
  {
    number: "03",
    icon: Code,
    title: "Customize",
    description:
      "Adjust colors, spacing, and behavior to fit your project perfectly.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <header className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-(--accent)">
          How it works
        </p>
        <h2
          id="how-it-works-heading"
          className="mt-3 text-3xl font-semibold tracking-tight text-(--ink) sm:text-4xl md:text-[2.65rem] leading-[1.15]"
        >
          From idea to interface in minutes.
        </h2>
        <p className="mt-3 text-sm text-(--ink-2) sm:text-base">
          Skip the setup. Use only what you need, where you need it.
        </p>
      </header>

      <ol className="mt-12 sm:mt-14 grid overflow-hidden rounded-2xl border border-(--line) bg-(--surface) md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-(--line)">
        {steps.map(({ number, icon: Icon, title, description }) => (
          <li key={number} className="flex">
            <article className="flex h-full w-full flex-col p-6 sm:p-8 lg:p-9">
              <span
                className="font-mono text-xs font-semibold text-(--ink-3)"
                aria-hidden="true"
              >
                {number}
              </span>
              <div
                className="mt-8 sm:mt-10 flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--accent-2) text-(--accent)"
                aria-hidden="true"
              >
                <Icon className="size-[18px]" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 sm:mt-7 text-lg font-semibold tracking-tight text-(--ink) sm:text-xl">
                {title}
              </h3>
              <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-(--ink-2)">
                {description}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

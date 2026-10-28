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
      className="mx-auto max-w-6xl px-4 py-20"
    >
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm text-(--accent) font-semibold uppercase tracking-wide">
          How it works
        </p>
        <h2
          id="how-it-works-heading"
          className="mt-2 text-3xl font-bold sm:text-4xl"
        >
          From idea to interface in minutes.
        </h2>
        <p className="mt-4 text-base text-gray-600">
          Skip the setup. Use only what you need, where you need it.
        </p>
      </header>

      <ol className="mt-12 grid overflow-hidden rounded-xl border md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
        {steps.map(({ number, icon: Icon, title, description }) => (
          <li key={number}>
            <article className="h-full p-8">
              <span
                className="text-sm font-semibold text-gray-400"
                aria-hidden="true"
              >
                {number}
              </span>
              <div
                className="mt-4 flex h-8 w-8 items-center justify-center rounded-lg bg-[#DBDAFE] text-(--accent)"
                aria-hidden="true"
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-gray-600">{description}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

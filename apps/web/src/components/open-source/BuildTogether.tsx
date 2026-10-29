import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import ghicon from "../../../public/github.svg";

export default function BuildTogether() {
  return (
    <section
      id="build-together"
      aria-labelledby="build-together-heading"
      className="w-full border-b border-(--line) bg-(--bg) py-16 sm:py-20 lg:py-24 transition-colors"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-4 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        {/* Left Column: Heading, description, and repository link */}
        <div className="flex w-full flex-1 flex-col items-start text-left">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-(--accent)">
            Open Source
          </p>

          <h1
            id="build-together-heading"
            className="mt-4 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-(--ink)"
          >
            <span className="block">Built together.</span>
            <span className="block text-(--accent)">Shared freely.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-(--ink-2)">
            Shapecrate is a community resource for the web. The code is public,
            the components are free, and thoughtful contributions are always
            welcome.
          </p>

          <div className="mt-8">
            <Link
              href="https://github.com/Virenishere/shapecrate"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View shapecrate repository on GitHub (opens in a new tab)"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-(--ink) px-5 py-3 text-sm font-semibold text-(--surface) shadow-sm transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Image
                className="transition-colors dark:invert"
                src={ghicon}
                alt=""
                aria-hidden="true"
                width={18}
                height={18}
              />
              <span>View repository</span>
              <ExternalLink
                className="size-4 text-(--surface)/75 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Right Column: MIT License Feature Card */}
        <div className="w-full flex-1 max-w-md lg:max-w-[380px] lg:self-center">
          <div className="w-full overflow-hidden rounded-3xl border border-(--line) bg-(--surface) shadow-sm transition-all hover:shadow-md">
            {/* Upper Accent Banner with MIT branding */}
            <div className="flex h-44 sm:h-48 w-full items-center justify-center bg-(--accent-2)">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-(--accent)">
                MIT
              </span>
            </div>

            {/* Bottom Card Content */}
            <div className="p-6 sm:p-7 flex flex-col justify-center">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">
                License
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-(--ink)">
                Use it your way
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-(--ink-2)">
                Use, modify, and distribute Shapecrate in personal and
                commercial projects under the MIT license.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

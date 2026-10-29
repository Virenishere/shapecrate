import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ghicon from "../../../public/github.svg";

export default function OpenSourceSection() {
  return (
    <section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="mx-4 my-12 grid max-w-6xl grid-cols-1 items-center gap-10 rounded-3xl border border-[#303531] bg-[#181b19] p-8 sm:mx-6 sm:p-12 lg:mx-auto lg:grid-cols-2 lg:gap-14 lg:p-16"
    >
      {/* Left Column: Heading, description and CTA */}
      <div className="flex flex-col items-start">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-(--lime)">
          OPEN BY DEFAULT
        </p>

        <h2
          id="open-source-heading"
          className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]"
        >
          Made in the open,
          <br />
          for everyone.
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#b6bcb8] sm:text-base">
          Shapecrate is free and open source. Read the code, suggest an
          improvement, or contribute your own component.
        </p>

        <Link
          href="/open-source"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#171918] shadow-sm transition-all hover:bg-neutral-100 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Learn about the project
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Right Column: Repository and contribution cards */}
      <div className="flex w-full flex-col gap-4 lg:items-end">
        {/* card 1 */}
        <div className="flex w-full max-w-md items-center gap-3.5 rounded-2xl border border-[#303531] bg-[#2a2f2b] p-4 sm:p-5 shadow-sm transition-all hover:border-white/20 hover:bg-[#343b36]">
          <Image
            src={ghicon}
            alt="GitHub logo"
            width={24}
            height={24}
            className="shrink-0 brightness-0 invert"
            aria-hidden="true"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium text-white">
              shapecrate / components
            </span>
            <span className="text-xs text-[#818982]">
              Public repository
            </span>
          </div>
          <Link
            href="https://github.com/Virenishere/shapecrate"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View shapecrate components repository on GitHub (opens in a new tab)"
            className="ml-auto rounded-lg p-1.5 text-[#818982] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {/* card 2 */}
        <div className="grid w-full max-w-sm grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-0.5 rounded-2xl border border-[#303531] bg-[#202421] p-4 sm:max-w-md sm:p-5 lg:max-w-[380px] shadow-sm">
          <div
            className="size-2 self-center rounded-full bg-(--lime) shadow-[0_0_8px_rgba(199,243,107,0.7)]"
            aria-hidden="true"
          />
          <div className="col-start-2 row-start-1 font-mono text-xs font-medium text-neutral-200 sm:text-sm">
            feat: add new background patterns
          </div>
          <div className="col-start-2 row-start-2 text-xs text-[#818982]">
            Contributions welcome
          </div>
        </div>
      </div>
    </section>
  );
}

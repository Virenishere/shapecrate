import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ghicon from "../../../public/github.svg";

export default function HeroSection() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-12 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-12">
      {/* Left Column: Heading, description, and CTA actions */}
      <div className="flex w-full flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-(--line) bg-(--surface) py-1 pr-3.5 pl-1.5 text-xs sm:text-sm shadow-xs transition hover:border-(--ink-3)/40">
          <span className="rounded-full bg-(--lime) px-2.5 py-0.5 text-xs font-semibold text-[#171918]">
            New
          </span>
          <span className="truncate font-medium text-(--ink-2)">
            Built for copy, paste, and ship
          </span>
          <ArrowRight className="size-3.5 text-(--ink-3)" aria-hidden="true" />
        </div>

        <h1
          id="hero-heading"
          className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold tracking-tight leading-[1.08] text-(--ink)"
        >
          <span className="block">Beautiful UI,</span>
          <span className="block text-(--accent)">
            without the <br className="hidden sm:block" />
            busywork.
          </span>
        </h1>

        <p className="max-w-xl text-base text-balance text-(--ink-2) sm:text-lg md:text-xl leading-relaxed">
          Free, open-source CSS and HTML components you can preview, copy, and make
          your own. No installs. No lock-in.
        </p>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/components"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-(--ink) px-6 py-3.5 text-sm font-semibold text-(--surface) shadow-sm transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Explore components
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="https://github.com/Virenishere/shapecrate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-(--line) bg-(--surface) px-6 py-3.5 text-sm font-semibold text-(--ink) shadow-xs transition-all hover:bg-(--surface-2) active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Image
              className="transition-colors dark:invert"
              src={ghicon}
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
            />
            View on GitHub
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-(--ink-2) lg:justify-start">
          <span className="flex items-center gap-1.5 font-medium">
            <Check aria-hidden="true" className="size-4 text-(--accent)" /> Free
            forever
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Check aria-hidden="true" className="size-4 text-(--accent)" /> MIT
            licensed
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Check aria-hidden="true" className="size-4 text-(--accent)" /> Zero
            dependencies
          </span>
        </div>
      </div>

      {/* Right Column: Component preview with ambient radial glow */}
      <div className="relative isolate w-full flex-1 max-w-xl lg:max-w-none flex items-center justify-center">
        {/* Ambient radial gradients (strictly absolute so they never push the card down) */}
        <div
          aria-hidden="true"
          className="top-radial-gradient pointer-events-none absolute -top-12 -right-12 z-0 h-72 w-72 sm:h-80 sm:w-80 rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--lime) 85%, transparent) 0%, color-mix(in srgb, var(--lime) 30%, transparent) 45%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="down-radial-gradient pointer-events-none absolute -bottom-12 -left-12 z-0 h-72 w-72 sm:h-80 sm:w-80 rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 85%, transparent) 0%, color-mix(in srgb, var(--accent) 30%, transparent) 45%, transparent 70%)",
          }}
        />

        {/* IDE Code & Live Preview Window */}
        <div className="relative z-10 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#161817] shadow-2xl backdrop-blur-xl">
          {/* Header Bar */}
          <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4">
            <div className="h-2 w-2 rounded-full bg-(--ink-3)" />
            <div className="h-2 w-2 rounded-full bg-(--ink-3)" />
            <div className="h-2 w-2 rounded-full bg-(--ink-3)" />
            <span className="coding ml-1 text-xs font-semibold text-(--ink-3)">
              button.html
            </span>
          </div>

          {/* Code snippet & preview canvas */}
          <div className="coding p-4 text-xs">
            <div className="ml-2 text-white">
              <span className="select-none text-(--ink-3)">1</span> &nbsp; &lt;
              <span className="text-(--lime)">button</span>{" "}
              <span className="text-[#8584C2]">class=</span>
              <span className="text-[#D2AB7A]">&quot;shape-button&quot;</span>&gt;
            </div>
            <div className="ml-2 mt-3 text-white">
              <span className="select-none text-(--ink-3)">2</span> &nbsp; &nbsp;
              Start building
            </div>
            <div className="ml-2 mt-3 mb-4 text-white">
              <span className="select-none text-(--ink-3)">3</span> &nbsp; &lt;/
              <span className="text-(--lime)">button</span>&gt;
            </div>

            {/* Clean solid component preview container without dotted background */}
            <div className="flex h-28 sm:h-32 items-center justify-center rounded-2xl bg-(--surface-2) transition-colors">
              <button
                type="button"
                className="flex flex-row items-center gap-2 rounded-xl bg-(--accent) px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-(--accent)/25 transition hover:opacity-90 active:scale-[0.98]"
              >
                Start building <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

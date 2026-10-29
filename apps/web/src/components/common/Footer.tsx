"use client";

import Link from "next/link";
import Image from "next/image";
import icon from "../../../public/vercel.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-(--line) bg-(--bg) text-(--ink) transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section: Brand info + navigation columns */}
        <div className="flex flex-col justify-between gap-10 pb-10 md:flex-row md:items-start">
          {/* Brand Column */}
          <div className="flex max-w-sm flex-col gap-3">
            <Link
              className="group flex items-center gap-2.5 shrink-0"
              href="/"
              aria-label="shapecrate home"
            >
              <Image
                className="transition-transform group-hover:scale-105 dark:invert"
                src={icon}
                alt="shapecrate logomark"
                width={22}
                height={22}
              />
              <span className="font-bold text-lg tracking-tight text-(--ink)">
                shapecrate
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-(--ink-2)">
              Open-source building blocks for thoughtful interfaces. Copy,
              paste, and customize without package managers.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 sm:gap-x-16 text-sm">
            {/* Column 1: Explore */}
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-(--ink)">Explore</span>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    href="/components"
                    className="text-(--ink-2) transition-colors hover:text-(--ink)"
                  >
                    Components
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-(--ink-2) transition-colors hover:text-(--ink)"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Project / Community */}
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-(--ink)">Project</span>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    href="/open-source"
                    className="text-(--ink-2) transition-colors hover:text-(--ink)"
                  >
                    Open source
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/Virenishere/shapecrate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--ink-2) transition-colors hover:text-(--ink)"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & License */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-(--line) pt-6 text-xs text-(--ink-2) text-center sm:text-left">
          <p>Built for the web, shared with everyone.</p>
          <p>MIT licensed © {currentYear} shapecrate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-6 text-sm">
            {/* Column 1: Explore */}
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-(--ink)">Explore</span>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    href="/components"
                    className="text-(--ink-2) transition-colors hover:text-(--ink)"
                  >
                    All Components
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
                <li>
                  <Link
                    href="/open-source"
                    className="text-(--ink-2) transition-colors hover:text-(--ink)"
                  >
                    Open Source
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Popular Components */}
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-(--ink)">Components</span>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    href="/components/simple-button"
                    className="text-(--ink-2) transition-colors hover:text-(--ink)"
                  >
                    Simple Button
                  </Link>
                </li>
                <li>
                  <Link
                    href="/components/glow-button"
                    className="text-(--ink-2) transition-colors hover:text-(--ink)"
                  >
                    Glow Button
                  </Link>
                </li>
                <li>
                  <Link
                    href="/components/shimmer-button"
                    className="text-(--ink-2) transition-colors hover:text-(--ink)"
                  >
                    Shimmer Button
                  </Link>
                </li>
                <li>
                  <Link
                    href="/components/popover-button"
                    className="text-(--ink-2) transition-colors hover:text-(--ink)"
                  >
                    Popover Button
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Project / Community */}
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-(--ink)">Community</span>
              <ul className="flex flex-col gap-2.5">
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

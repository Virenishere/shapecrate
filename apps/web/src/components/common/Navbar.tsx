"use client";

import { useSyncExternalStore, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";

import icon from "../../../public/vercel.svg";
import ghicon from "../../../public/github.svg";
import { useTheme } from "@/hooks/useTheme";

const NAV_LINKS = [
  { href: "/components", label: "Components" },
  { href: "/docs", label: "Documentation" },
  { href: "/open-source", label: "Open Source" },
] as const;

const GITHUB_URL = "https://github.com/Virenishere/shapecrate";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Navbar() {
  const { mode, changeMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Close the mobile menu on Escape and when viewport grows to desktop
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const actionButtonClasses =
    "flex size-9 items-center justify-center rounded-xl border border-(--line) bg-(--surface) text-(--ink-2) shadow-2xs transition-colors hover:border-(--ink-3) hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-(--line) bg-(--bg)/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="shapecrate home"
        >
          <Image
            className="transition-transform group-hover:scale-105 dark:invert"
            src={icon}
            alt="shapecrate logomark"
            width={22}
            height={22}
          />
          <span className="font-bold text-base sm:text-lg tracking-tight text-(--ink)">
            shapecrate
          </span>
        </Link>

        {/* Desktop / Tablet Navigation Links */}
        <ul className="hidden md:flex items-center gap-1 text-sm font-medium text-(--ink-2)">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-3 py-1.5 transition-colors hover:bg-(--surface-2) hover:text-(--ink)"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Controls (Theme, GitHub, Mobile Menu Toggle) */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => changeMode(mode === "dark" ? "light" : "dark")}
            aria-label={
              mounted && mode === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className={actionButtonClasses}
          >
            {!mounted ? (
              <span className="size-4" aria-hidden="true" />
            ) : mode === "dark" ? (
              <Sun className="size-4 text-(--lime)" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </button>

          {/* GitHub Link */}
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="shapecrate on GitHub (opens in a new tab)"
            className="flex h-9 items-center justify-center gap-2 rounded-xl border border-(--line) bg-(--surface) px-3 text-sm font-medium text-(--ink-2) shadow-2xs transition-colors hover:border-(--ink-3) hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Image
              className="transition-colors dark:invert"
              src={ghicon}
              alt=""
              aria-hidden="true"
              width={18}
              height={18}
            />
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className={`${actionButtonClasses} md:hidden`}
          >
            {mobileMenuOpen ? (
              <X className="size-4.5" aria-hidden="true" />
            ) : (
              <Menu className="size-4.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`border-b border-(--line) bg-(--bg)/95 backdrop-blur-xl md:hidden transition-all duration-200 ease-out ${
          mobileMenuOpen
            ? "max-h-64 opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6 font-medium text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-(--ink-2) transition-colors hover:bg-(--surface-2) hover:text-(--ink)"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

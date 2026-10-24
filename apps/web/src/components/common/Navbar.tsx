'use client'

import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, Menu, X } from 'lucide-react';

import icon from "../../../public/vercel.svg";
import ghicon from "../../../public/github.svg";
import { useTheme } from "@/hooks/useTheme";
import { useState, useEffect } from "react";

const NAV_LINKS: { href: string;    label: string }[] = [
    { href: "/components", label: "Components" },
    { href: "/docs", label: "Documentation" },
    { href: "/open-source", label: "Open Source" },
];

const GITHUB_URL = "https://github.com/Virenishere/shapecrate";

export default function Navbar() {
    const { mode, changeMode } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering theme-dependent elements after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close the mobile menu on Escape, and when the screen grows to desktop/tablet size
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

    const iconButton =
        "border border-(--line) rounded-md hover:border-(--ink) transition-all cursor-pointer flex items-center justify-center w-9 h-9 shrink-0";

    return (
        <nav className="bg-(--bg) dark:bg-(--bg) sticky top-0 z-50 w-full border-b border-(--line)">
            <div className="relative mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-16 xl:px-32 2xl:px-44">

                {/* first part: Logo (icon only on mobile, icon + text from sm up) */}
                <Link className="flex items-center gap-2 shrink-0" href="/" aria-label="shapecrate home">
                    <Image className="dark:invert" src={icon} alt="shapecrate logomark" width={24} height={24} />
                    <span className="hidden sm:inline font-extrabold text-lg md:text-xl">shapecrate</span>
                </Link>

                {/* second part: Desktop / Tablet Navigation Links */}
                <ul className="hidden md:flex items-center gap-1 lg:gap-6 font-semibold text-sm text-(--ink-2)">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="block p-2 rounded-lg transition-colors hover:bg-(--surface-2) hover:border-(--line) hover:text-(--ink)"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* third part: Actions (Theme Toggle, GitHub, Mobile Menu Button) */}
                <div className="flex items-center gap-2 font-semibold text-sm">
                    {/* dark and light mode toggle */}
                    <button
                        type="button"
                        onClick={() => changeMode(mode === "dark" ? "light" : "dark")}
                        aria-label="Toggle theme"
                        className={iconButton}
                    >
                        {!mounted ? (
                            <div className="w-5 h-5" />
                        ) : mode === "dark" ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </button>

                    {/* GitHub: icon only on mobile/tablet, icon + text on large screens */}
                    <Link
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="shapecrate on GitHub"
                        className="flex items-center justify-center gap-2 h-9 w-9 lg:w-auto lg:px-3 border border-(--line) rounded-md hover:border-(--ink) transition-colors cursor-pointer"
                    >
                        <Image className="dark:invert" src={ghicon} alt="github icon" width={20} height={20} />
                        <span className="hidden lg:inline">GitHub</span>
                    </Link>

                    {/* Mobile Menu Trigger Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        className={`${iconButton} md:hidden`}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Dropdown Drawer */}
                <div
                    id="mobile-menu"
                    className={`absolute top-full left-0 w-full md:hidden border-b border-(--line) bg-(--bg) dark:bg-(--bg) shadow-lg transition-all duration-200 ease-out ${
                        mobileMenuOpen
                            ? "opacity-100 translate-y-0 visible"
                            : "opacity-0 -translate-y-2 invisible pointer-events-none"
                    }`}
                >
                    <div className="flex flex-col gap-1 px-4 py-4 sm:px-6 font-semibold text-sm">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-3 rounded-lg hover:bg-(--surface-2) text-(--ink-2) hover:text-(--ink) transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
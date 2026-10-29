"use client";

import Link from "next/link";
import Image from "next/image";
import icon from "../../../public/vercel.svg";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="border-t border-(--line)">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 md:py-12">
                
                {/* Top Section: Brand Info + Links Grid */}
                <div className="flex flex-col justify-between gap-8 pb-8 md:flex-row md:items-start">
                    
                    {/* Brand Column */}
                    <div className="flex flex-col gap-3">
                        <Link className="flex items-center gap-2 shrink-0" href="/" aria-label="shapecrate home">
                            <Image className="dark:invert" src={icon} alt="shapecrate logomark" width={24} height={24} />
                            <span className="font-extrabold text-lg md:text-xl">shapecrate</span>
                        </Link>
                        <p className="font-base text-sm text-(--ink-2) max-w-xs">
                            Open-source building blocks for thoughtful interfaces.
                        </p>
                    </div>

                    {/* Links Grid: 2 Columns & 3 Rows */}
                    <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-(--ink-3)">
                        <span  className="font-medium">Explore</span>
                        <span className="font-medium">Components</span>
                        <Link href="#" className="hover:underline font-base">Documentation</Link>
                        <Link href="#" className="hover:underline font-base">Project</Link>
                        <Link href="#" className="hover:underline font-base">Open source</Link>
                        <Link href="#" className="hover:underline font-base">GitHub</Link>
                    </div>

                </div>

                {/* Bottom Section: Starts on a new line */}
                <div className="flex justify-between border-t border-(--line) pt-6 font-base text-xs text-(--ink-2)">
                    <div> Built for the web, shared with everyone.</div>
                    
                    <div>MIT licensed © {currentYear} shapecrate. All rights reserved</div>
                </div>

            </div>
        </footer>
    );
}
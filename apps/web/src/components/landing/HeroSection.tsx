import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ghicon from "../../../public/github.svg";

export default function HeroSection() {
    return (
        <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 py-12 sm:px-6 md:py-20 lg:flex-row lg:gap-16 lg:px-12">
            <div className="flex w-full flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">

                <div className="inline-flex max-w-full items-center gap-2 rounded-2xl border border-(--line) py-1 pr-3 pl-1 text-sm">
                    <span className="rounded-2xl bg-(--lime) px-2 py-1 text-sm font-medium">New</span>
                    <span className="truncate">Built for copy, paste, and ship</span>
                    <span aria-hidden="true"><ArrowRight className="size-4" /></span>
                </div>

                <h1 id="hero-heading" className="text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.05] font-bold tracking-tight">
                    <span className="block">Beautiful UI,</span>
                    <span className="block text-(--accent)">
                        without the <br className="hidden sm:block" />
                        busywork.
                    </span>
                </h1>

                <p className="max-w-xl text-base text-balance sm:text-lg md:text-xl">
                    Free, open-source CSS and HTML components you can preview, copy, and make your own. No installs. No lock-in.
                </p>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Link
                        href="/components"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--ink) text-(--surface) px-5 py-3 font-medium transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        Explore components <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                    <Link
                        href="https://github.com/Virenishere/shapecrate"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-(--line) px-5 py-3 font-medium hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <Image className="dark:invert transition-colors" src={ghicon} alt="" aria-hidden="true" width={20} height={20} />
                        View on GitHub
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm lg:justify-start">
                    <span className="flex items-center gap-1.5"><Check aria-hidden="true" className="size-4" /> Free forever</span>
                    <span className="flex items-center gap-1.5"><Check aria-hidden="true" className="size-4" /> MIT licensed</span>
                    <span className="flex items-center gap-1.5"><Check aria-hidden="true" className="size-4" /> Zero dependencies</span>
                </div>
            </div>
            
            
            {/* Replace with your component preview / screenshot */}
                <div className="relative isolate w-full flex-1">
                <div aria-hidden="true" className="top-radial-gradient"></div>
                <div aria-hidden="true" className="down-radial-gradient"></div>
                <div className="relative z-10 aspect-video w-full rounded-2xl bg-(--ink)">
                    <div className="flex h-10 items-center gap-2 border-b-[0.1px] border-(--ink-2)">
                        <div className="ml-2.5 h-2 w-2 rounded-full bg-(--ink-3)"></div>
                        <div className="h-2 w-2 rounded-full bg-(--ink-3)"></div>
                        <div className="h-2 w-2 rounded-full bg-(--ink-3)"></div>
                        <span className="coding text-xs font-semibold text-(--ink-3)">button.html</span>
                    </div>
                    <div className="coding text-xs">
                        <div className="ml-6 mt-6 text-white">1 &lt;<span className="text-(--lime)">button</span> <span className="text-[#8584C2]">class=</span><span className="text-[#D2AB7A]">&quot;shape-button&quot;</span>&gt;</div>
                        <div className="ml-6 mt-4 text-white">2 Start Building</div>
                        <div className="ml-6 mt-4 text-white">3 &lt;/<span className="text-(--lime)">button</span>&gt;</div>
                        <div className="m-2 h-22 rounded-2xl bg-(--surface-2)"></div>
                    </div>
                </div>            
            </div>
        </section>
    );
}
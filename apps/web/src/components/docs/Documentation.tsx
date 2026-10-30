"use client";

import { useState, useEffect } from "react";
import { Check, Code, Smartphone, GitPullRequest } from "lucide-react";

interface Section {
  id: string;
  number: string;
  title: string;
  description: string;
  card: {
    icon: typeof Check;
    title: string;
    description: string;
  };
}

const SECTIONS: Section[] = [
  {
    id: "getting-started",
    number: "01",
    title: "Getting started",
    description:
      "Shapecrate components use plain HTML and CSS. Choose a component, copy its markup and styles, then paste them into your project. There is nothing to install.",
    card: {
      icon: Check,
      title: "Works anywhere",
      description:
        "Use components with a static site, React, Vue, or any framework that renders HTML.",
    },
  },
  {
    id: "using-css",
    number: "02",
    title: "Using CSS",
    description:
      "Add the component CSS to your global stylesheet, CSS module, or a page-level style block. Class names and Tailwind utility classes are scoped and predictable so they won't interfere with your existing styles.",
    card: {
      icon: Code,
      title: "Zero configuration",
      description:
        "No complex plugins, build steps, or external dependencies required. Pure web standards.",
    },
  },
  {
    id: "responsive-design",
    number: "03",
    title: "Responsive design",
    description:
      "Every component is crafted mobile-first. Layouts adapt fluidly from smartphones to high-resolution desktop displays without breaking.",
    card: {
      icon: Smartphone,
      title: "Fluid and adaptive",
      description:
        "Built with relative units, responsive grid containers, and modern CSS layout primitives.",
    },
  },
  {
    id: "contributing",
    number: "04",
    title: "Contributing",
    description:
      "Shapecrate is completely open source and community-driven. Suggest improvements, propose new patterns, or contribute your own components directly on GitHub.",
    card: {
      icon: GitPullRequest,
      title: "Built in the open",
      description:
        "Read our contribution guidelines and submit a pull request to share your work with everyone.",
    },
  },
];

export default function Documentation() {
  const [activeSection, setActiveSection] = useState<string>("getting-started");

  // ScrollSpy: highlight TOC link based on current viewport scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky navbar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 transition-colors">
      {/* 1. Header Section */}
      <header className="mb-14 text-left">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-(--accent)">
          DOCUMENTATION
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--ink)">
          Build with Shapecrate
        </h1>
        <p className="mt-3 text-base sm:text-lg text-(--ink-2)">
          Everything you need to start using components in your project.
        </p>
      </header>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-(--ink-3)">
            ON THIS PAGE
          </p>

          <nav className="mt-4 flex flex-col border-l border-(--line)">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  className={`relative -ml-[2px] flex items-center py-2.5 pl-4 pr-3 text-left text-sm transition-all cursor-pointer ${
                    isActive
                      ? "border-l-2 border-(--accent) font-semibold text-(--ink) bg-gradient-to-r from-(--accent-2)/40 to-transparent"
                      : "border-l-2 border-transparent text-(--ink-2) hover:border-(--ink-3)/40 hover:text-(--ink)"
                  }`}
                >
                  <span>{section.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Content Sections */}
        <div className="lg:col-span-9 flex flex-col">
          {SECTIONS.map((section, idx) => {
            const Icon = section.card.icon;
            const isLast = idx === SECTIONS.length - 1;

            return (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 flex flex-col"
              >
                {/* Section Number */}
                <span className="font-mono text-xs font-semibold text-(--accent)">
                  {section.number}
                </span>

                {/* Section Title */}
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-(--ink)">
                  {section.title}
                </h2>

                {/* Section Description */}
                <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-(--ink-2)">
                  {section.description}
                </p>

                {/* Feature Callout Card */}
                <div className="mt-6 flex items-start gap-4 rounded-2xl border border-(--line) bg-(--surface) p-6 sm:p-7 shadow-2xs">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-(--accent-2)/60 text-(--accent) mt-0.5">
                    <Icon className="size-4" strokeWidth={2.25} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-(--ink)">
                      {section.card.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-(--ink-2)">
                      {section.card.description}
                    </p>
                  </div>
                </div>

                {/* Divider between sections */}
                {!isLast && <hr className="my-14 border-(--line)" />}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}


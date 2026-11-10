"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";

interface FaqItem {
  question: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is Shapecrate?",
    answer:
      "Shapecrate is a free, open-source library of modern UI components crafted with pure HTML, modern CSS, and Tailwind CSS. It lets developers preview polished building blocks, customize them in an interactive live playground, and copy production-ready code with zero dependencies.",
    linkText: "Explore all components",
    linkHref: "/components",
  },
  {
    question: "Is Shapecrate free for commercial projects?",
    answer:
      "Yes, 100%. Shapecrate is released under the permissive MIT license. You are free to use any component in personal projects, commercial software, client work, or open-source repositories without royalty fees, attribution requirements, or lock-in.",
    linkText: "Read the MIT license",
    linkHref: "/open-source",
  },
  {
    question: "Do I need to install an npm package to use Shapecrate?",
    answer:
      "No. Shapecrate does not require any npm installs, CLI commands, or package dependencies. Each component provides clean, standalone HTML and CSS snippets that you can copy and paste directly into React, Next.js, Vue, Svelte, Astro, or vanilla HTML projects.",
    linkText: "Read the integration guide",
    linkHref: "/docs",
  },
  {
    question: "How is Shapecrate different from Shadcn UI or UIverse?",
    answer:
      "Unlike heavyweight component registries that require specific CLI configurations or complex Radix dependencies, Shapecrate focuses on zero-dependency, framework-agnostic building blocks. You get instant copy-paste HTML/CSS, full Tailwind CSS compatibility, and a live visual editor without build-step overhead.",
  },
  {
    question: "How do I customize colors, gradients, and radiuses?",
    answer:
      "Every component page features an interactive preview playground where you can tweak border radiuses, background accents, and theme modes. The live code updates in real-time so you copy exactly what you designed.",
    linkText: "Try the button playground",
    linkHref: "/components/simple-button",
  },
  {
    question: "Can I contribute my own components to Shapecrate?",
    answer:
      "Yes! Shapecrate is completely community-driven and open source. Developers are encouraged to submit new buttons, cards, animations, and gradients via GitHub pull requests.",
    linkText: "Contribute on GitHub",
    linkHref: "https://github.com/Virenishere/shapecrate",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <JsonLd data={faqJsonLd} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-(--line) bg-(--surface) px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">
          <HelpCircle className="size-3.5" aria-hidden="true" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2
          id="faq-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-(--ink) sm:text-4xl md:text-5xl"
        >
          Everything you need to know.
        </h2>
        <p className="mt-3.5 text-base text-(--ink-2) leading-relaxed">
          Quick answers about Shapecrate, licensing, framework compatibility, and zero-dependency components.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="flex flex-col gap-3.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          const contentId = `faq-content-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-(--line) bg-(--surface) transition-colors hover:border-(--ink-3)/30"
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors"
              >
                <span className="text-base sm:text-lg font-semibold tracking-tight text-(--ink)">
                  {faq.question}
                </span>
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-xl bg-(--surface-2) text-(--ink-2) transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-(--accent)" : ""
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown className="size-4.5" />
                </span>
              </button>

              {isOpen && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base leading-relaxed text-(--ink-2) border-t border-(--line)/50 pt-4"
                >
                  <p>{faq.answer}</p>
                  {faq.linkHref && faq.linkText && (
                    <div className="mt-3">
                      {faq.linkHref.startsWith("http") ? (
                        <a
                          href={faq.linkHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-(--accent) hover:underline text-sm"
                        >
                          {faq.linkText} →
                        </a>
                      ) : (
                        <Link
                          href={faq.linkHref}
                          className="inline-flex items-center gap-1 font-semibold text-(--accent) hover:underline text-sm"
                        >
                          {faq.linkText} →
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

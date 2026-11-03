import type { Metadata, Viewport } from "next";
import { Manrope, DM_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shapecrate.vercel.app";

const siteWideJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shapecrate",
      description:
        "Free, copy-paste building blocks made with plain HTML and CSS for modern web apps.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/components?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Shapecrate",
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
      sameAs: ["https://github.com/Virenishere/shapecrate"],
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#111312" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shapecrate — Free HTML, CSS & Tailwind UI Components",
    template: "%s | Shapecrate",
  },
  description:
    "Free, copy-paste building blocks made with plain HTML and CSS for modern web apps. Zero dependencies, no npm installs, 100% open source.",
  keywords: [
    "UI components",
    "Tailwind CSS",
    "HTML CSS",
    "copy paste UI",
    "web components",
    "open source UI",
    "CSS buttons",
    "CSS gradients",
    "modern web design",
    "Shapecrate",
  ],
  authors: [{ name: "Shapecrate", url: "https://github.com/Virenishere/shapecrate" }],
  creator: "Shapecrate",
  publisher: "Shapecrate",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Shapecrate",
    title: "Shapecrate — Free HTML, CSS & Tailwind UI Components",
    description:
      "Free, copy-paste building blocks made with plain HTML and CSS for modern web apps. Zero dependencies, no npm installs.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Shapecrate — Free HTML, CSS & Tailwind UI Components",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shapecrate — Free HTML, CSS & Tailwind UI Components",
    description:
      "Free, copy-paste building blocks made with plain HTML and CSS for modern web apps. Zero dependencies, no npm installs.",
    images: [`${siteUrl}/twitter-image`],
    creator: "@Virenishere",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "google118eab2a7749a346",
  },
};

const THEME_INIT_SCRIPT = `(function() {
  try {
    var stored = localStorage.getItem('theme') || localStorage.getItem('theme');
    var theme = 'system';
    if (stored) {
      try {
        var parsed = JSON.parse(stored);
        theme = parsed.state && parsed.state.theme ? parsed.state.theme : parsed;
      } catch (err) {
        theme = stored;
      }
    }
    var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${dmMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-(--bg) font-sans text-(--ink) overflow-x-clip">
        <JsonLd data={siteWideJsonLd} />
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

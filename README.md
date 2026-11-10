<div align="center">

# Shapecrate — Free HTML, CSS & Tailwind UI Components

<p align="center">
  <strong>Beautiful UI, without the busywork.</strong><br>
  Free, open-source UI building blocks crafted with plain HTML, modern CSS, and Tailwind CSS.<br>
  Zero dependencies • No npm installs • 100% copy & paste ready
</p>

<p align="center">
  <a href="https://shapecrate.vercel.app"><strong>🌐 Visit shapecrate.vercel.app »</strong></a>
  <br />
  <br />
  <a href="https://shapecrate.vercel.app/components">Explore Components</a>
  ·
  <a href="https://shapecrate.vercel.app/docs">Documentation</a>
  ·
  <a href="https://github.com/virenishere/shapecrate/issues">Report Bug</a>
  ·
  <a href="https://github.com/virenishere/shapecrate/issues">Request Component</a>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-v1.3-fbf0df?style=flat-square&logo=bun)](https://bun.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## 🎨 Featured Components

Preview and copy clean HTML and CSS directly on [shapecrate.vercel.app](https://shapecrate.vercel.app):

| Component | Category | Tech | Live Demo |
| :--- | :--- | :--- | :--- |
| **Simple Button** | Buttons | HTML • CSS • Tailwind | [Preview & Playground](https://shapecrate.vercel.app/components/simple-button) |
| **Glow Button** | Buttons | HTML • CSS • Tailwind | [Preview & Playground](https://shapecrate.vercel.app/components/glow-button) |
| **Shimmer Button** | Buttons | HTML • CSS • Tailwind | [Preview & Playground](https://shapecrate.vercel.app/components/shimmer-button) |
| **Popover Button** | Buttons | HTML • CSS • Tailwind | [Preview & Playground](https://shapecrate.vercel.app/components/popover-button) |

---

## ✨ Features

- **⚡ Zero Dependencies**: No bloated npm packages or lock-in. Just copy, paste, and ship.
- **🎨 Dual-Mode Compatibility**: Every component includes both **Tailwind CSS** classes and **Pure CSS** fallbacks. Paste into standard HTML or modern frameworks without breaking.
- **🌓 Glitch-Free Dark Mode**: Instant SSR anti-FOUC (Flash of Unstyled Content) detection, real-time cross-tab synchronization via `StorageEvent`, and system theme auto-adaptation.
- **🎛️ Live Interactive Playground**: Customize accent colors, corner radiuses, and view code changes dynamically before copying.
- **📱 Mobile-First & Responsive**: Handcrafted using modern CSS primitives, fluid clamp typography, and touch-friendly targets ($\ge 44\text{px}$).
- **🔍 SEO & Core Web Vitals Ready**: Dynamic OpenGraph & Twitter preview cards, Schema.org JSON-LD structured data, XML sitemaps, and optimized font loading.
- **♿ Accessible (WCAG 2.1 AA)**: Built with proper ARIA attributes, semantic markup, keyboard navigation, and screen reader announcements.

---

## 📦 Monorepo Structure

Shapecrate is organized as a high-performance monorepo powered by **Bun Workspaces**:

```text
shapecrate/
├── apps/
│   └── web/                   # Next.js 16 App Router web app, showcase & playground
├── packages/
│   └── components/            # Core @shapecrate/components library & UI registry
├── todos.md                   # Frontend engineering roadmap & interview prep guide
├── LICENSE                    # MIT License
└── package.json               # Root monorepo configuration
```

### Packages & Apps

- **`apps/web`**: Built with Next.js 16 (Turbopack), React 19, Tailwind CSS v4, Lucide icons, and Zustand v5 for state management.
- **`packages/components`**: Clean, modular UI building blocks with typed component items, zero-dependency SVG assets, and multi-format code templates (`html`, `react`, `css`).

---

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (v1.3+ recommended)

### 1. Clone the repository

```bash
git clone https://github.com/virenishere/shapecrate.git
cd shapecrate
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🛠️ Available Scripts

Run commands from the repository root:

| Command | Description |
| :--- | :--- |
| `bun dev` | Starts the Next.js local development server |
| `bun build` | Compiles an optimized production build for `apps/web` |
| `bun lint` | Runs ESLint checks across the codebase |

To run commands within a specific package:

```bash
# Typecheck apps/web
cd apps/web && npx tsc --noEmit

# Typecheck packages/components
cd packages/components && npx tsc --noEmit
```

---

## 🧩 Adding New Components

To contribute a new UI block to the library:

1. Create a component file under `packages/components/src/elements/<category>/<component-name>.tsx`.
2. Export a preview component and the `ComponentItem` metadata:
   ```tsx
   import type { ComponentItem } from "../../types";

   export function MyComponentPreview() {
     return <button className="...">Click me</button>;
   }

   export const myComponent: ComponentItem = {
     id: "my-component",
     title: "My Component",
     category: "buttons", // "buttons" | "backgrounds" | "cards" | "gradients" | "effects"
     description: "A sleek, responsive button.",
     tags: ["button", "action"],
     component: MyComponentPreview,
     code: {
       html: `<button class="...">Click me</button>`,
       react: `export function MyComponent() { return <button className="...">Click me</button>; }`,
     },
   };
   ```
3. Register your component in `packages/components/src/index.ts`.
4. Run `bun dev` to test the new component in the catalog and playground.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingComponent`)
3. Commit your Changes (`git commit -m 'Add AmazingComponent'`)
4. Push to the Branch (`git push origin feature/AmazingComponent`)
5. Open a Pull Request

---

## Star History

<a href="https://www.star-history.com/?repos=virenishere%2Fshapecrate&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=virenishere/shapecrate&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=virenishere/shapecrate&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=virenishere/shapecrate&type=date&legend=top-left" />
 </picture>
</a>

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

# 🚀 Frontend Engineering Master Roadmap & Interview Preparation Guide

A comprehensive, production-grade guide designed for mastering **React 19, Next.js 16 (App Router), TypeScript, and Web Performance**.

Use this document as your daily curriculum. Each day is structured with:
- **Core Concept & Theoretical Foundation**: What browser mechanics, data structures, and computer science concepts you are mastering.
- **Current Problem in Shapecrate**: The exact architectural smell or bug in the codebase.
- **Step-by-Step Implementation Guide**: Production-ready code architectures and patterns.
- **Deep-Dive Research Topics**: Key topics, specifications, and MDN/React docs to study during your research hours.
- **Senior/Staff Interview Questions & Model Answers**: Real questions asked at Google, Meta, Amazon, and top startups.
- **Verification & Testing Criteria**: How to test your work with DevTools, screen readers, and automated checks.

---

## 📅 Daily Study & Implementation Schedule

| Day | Focus Area | Key Deliverables | Interview Competency |
| :--- | :--- | :--- | :--- |
| **Day 1** | State Architecture | Centralized Zustand Store (`useThemeStore`) | State management, selectors, tearing |
| **Day 2** | Browser Rendering & FOUC | Anti-FOUC `<head>` IIFE & Cross-Tab Sync | Critical rendering path, storage events |
| **Day 3** | Clean Architecture (Part 1) | Deconstruct `ComponentDetail.tsx` (570+ LOC) | SRP, Component composition, Container/Presenter |
| **Day 4** | Clean Architecture (Part 2) | Extract `useComponentPlayground` & Catalog Filter | Custom hooks, URL query state sync |
| **Day 5** | Core Hooks (Part 1) | Build `useDebounce` & `useCopyToClipboard` | Event loop, closures, Async Clipboard API |
| **Day 6** | Core Hooks (Part 2) | Build `useMediaQuery` & `useKeyboardShortcut` | `useSyncExternalStore`, DOM Event propagation |
| **Day 7** | Performance & Windowing | List Virtualization & `next/dynamic` splitting | DOM recycling, TBT/INP, bundle chunking |
| **Day 8** | Accessibility (WCAG 2.1 AA) | Focus Trap, ARIA Live Regions, WAI-ARIA Tabs | A11y tree, roving tabindex, screen readers |

---

## Phase 1: State Management & Glitch-Free Theme Architecture

### Task 1: Centralized Zustand Store (`useThemeStore.ts`)
- **Status**: Ready to Implement
- **Files Involved**:
  - Create: `apps/web/src/store/useThemeStore.ts`
  - Refactor: `apps/web/src/hooks/useTheme.ts`
  - Update: `apps/web/src/components/common/Navbar.tsx`, `apps/web/src/components/preview/ComponentDetail.tsx`
- **The Problem in the Codebase**:
  `apps/web/src/hooks/useTheme.ts` currently manages theme state using standard `useState`:
  ```ts
  // PROBLEM: Each component that calls useTheme() gets its own isolated state instance!
  export function useTheme() {
    const [mode, setMode] = useState<ThemeMode>("light");
    ...
  }
  ```
  Because custom hooks encapsulate logic but **not state instances**, calling `useTheme()` in `Navbar.tsx` creates State Instance A, while calling it in `ComponentDetail.tsx` creates State Instance B. There is no shared truth. Additionally, re-renders are un-optimized.
- **Why Zustand Over Redux & Context API**:
  1. **Zero Provider Tree Pollution**: Next.js App Router works best when root layouts remain Server Components. React Context forces `<ThemeProvider>` wrapping around the whole tree, turning child trees into client boundaries.
  2. **Microscopic Bundle Size**: Zustand is ~1.1 KB gzipped, whereas Redux Toolkit + React-Redux is ~15+ KB.
  3. **Atomic Selectors & Render Optimization**: Context triggers re-renders on *all* consuming components when *any* part of the context value changes. Zustand uses `useSyncExternalStore` internally, only re-rendering components when the selected slice changes.
- **Step-by-Step Implementation Guide**:
  1. In `apps/web`, install Zustand:
     ```bash
     bun add zustand
     ```
  2. Create `apps/web/src/store/useThemeStore.ts`:
     ```ts
     import { create } from "zustand";
     import { persist, createJSONStorage } from "zustand/middleware";

     export type ThemeMode = "light" | "dark" | "system";

     interface ThemeState {
       theme: ThemeMode;
       setTheme: (theme: ThemeMode) => void;
       toggleTheme: () => void;
     }

     export const useThemeStore = create<ThemeState>()(
       persist(
         (set, get) => ({
           theme: "system",
           setTheme: (theme) => {
             set({ theme });
             applyThemeToDocument(theme);
           },
           toggleTheme: () => {
             const current = get().theme;
             const next: ThemeMode = current === "dark" ? "light" : "dark";
             set({ theme: next });
             applyThemeToDocument(next);
           },
         }),
         {
           name: "shapecrate-theme",
           storage: createJSONStorage(() => localStorage),
         }
       )
     );

     function applyThemeToDocument(theme: ThemeMode) {
       if (typeof window === "undefined") return;
       const root = document.documentElement;
       const isDark =
         theme === "dark" ||
         (theme === "system" &&
           window.matchMedia("(prefers-color-scheme: dark)").matches);

       if (isDark) {
         root.classList.add("dark");
       } else {
         root.classList.remove("dark");
       }
     }
     ```
  3. Consume with fine-grained selectors in components:
     ```tsx
     // Navbar.tsx
     const theme = useThemeStore((s) => s.theme);
     const toggleTheme = useThemeStore((s) => s.toggleTheme);
     ```
- **Deep-Dive Research Topics**:
  - React 18 `useSyncExternalStore`: What problem does it solve regarding concurrent rendering and store "tearing"?
  - Shallow vs strict equality checks in Zustand selectors.
  - The difference between Redux's monolithic single store with reducer dispatch vs Zustand's hook-based closures.
- **Interview Questions & Model Answers**:
  - **Q: Why does React Context cause performance issues in large-scale apps, and how does Zustand resolve this?**
    - *Answer*: React Context propagates updates down the React Fiber tree. When a context value changes by reference, every component consuming `useContext(MyContext)` is marked for re-render, bypassing `React.memo`. Zustand stores state *outside* the React Fiber tree and uses `useSyncExternalStore` to subscribe. Components only subscribe to a specific derived selector; if another property in the store changes, the selector's return value remains referentially equal, and React skips rendering that component entirely.
  - **Q: What is "state tearing" in React concurrent mode?**
    - *Answer*: In concurrent React, rendering can be paused, interrupted, or split across frames. If a component reads from an external mutable store at the start of a render, and an event mutates the store before the render finishes, another component later in the tree might read the updated value during the same pass. The resulting UI shows mismatched data (tearing). `useSyncExternalStore` detects this and forces a synchronous re-render to maintain consistency.
- **Verification**:
  - Toggle theme in `Navbar.tsx`; verify that any other component reading `theme` updates instantaneously.
  - Refresh the page; check `localStorage.getItem('shapecrate-theme')` to confirm persistence.

---

### Task 2: Fix Dark/Light Mode Hydration Flash (Anti-FOUC Pattern)
- **Status**: Ready to Implement
- **Files Involved**:
  - Update: `apps/web/src/app/layout.tsx`
- **The Problem in the Codebase**:
  When a user with Dark Mode reloads the website, the page flashes bright white for ~100–300ms before snapping to dark mode.
  - *Why this happens*: The server renders the initial HTML with `<html lang="en">` (no `.dark` class). The browser downloads the CSS, computes the styles, and paints the initial white background (First Contentful Paint). Only *after* the JavaScript bundle downloads, parses, and executes does React run `useEffect` to append the `.dark` class. This causes a Flash of Unstyled Content (FOUC).
- **Step-by-Step Implementation Guide**:
  1. The browser's Critical Rendering Path:
     ```
     HTML Parser -> Encounters synchronous <script> in <head> -> Pauses DOM construction -> Executes Script -> Resumes DOM construction -> Paints first frame with .dark applied
     ```
  2. In `apps/web/src/app/layout.tsx`, add an inline blocking script inside `<head>` before any visual elements render:
     ```tsx
     // apps/web/src/app/layout.tsx
     const THEME_SCRIPT = `
     (function() {
       try {
         var key = 'shapecrate-theme';
         var stored = localStorage.getItem(key);
         var theme = 'system';
         if (stored) {
           var parsed = JSON.parse(stored);
           theme = parsed.state ? parsed.state.theme : parsed;
         }
         var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
         if (isDark) {
           document.documentElement.classList.add('dark');
         } else {
           document.documentElement.classList.remove('dark');
         }
       } catch (e) {}
     })();
     `;

     export default function RootLayout({ children }: { children: React.ReactNode }) {
       return (
         <html lang="en" suppressHydrationWarning>
           <head>
             <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
           </head>
           <body className="...">
             {children}
           </body>
         </html>
       );
     }
     ```
  3. Add `suppressHydrationWarning` to `<html>`. This instructs React not to throw an error when the server HTML (`<html>`) differs from client DOM (`<html class="dark">`). Note: `suppressHydrationWarning` only suppresses warnings one level deep on the element it is placed on.
- **Deep-Dive Research Topics**:
  - Critical Rendering Path: Difference between `async`, `defer`, and synchronous `<script>` tags.
  - Why inline blocking scripts are usually an anti-pattern for performance, but the standard industry exception for theme initialization (NextThemes, Tailwind, TailwindUI).
  - Next.js hydration error mechanics (React error #418 / #423).
- **Interview Questions & Model Answers**:
  - **Q: How do you prevent theme flicker in Server-Side Rendered (SSR) / Static Site Generated (SSG) apps without using cookies?**
    - *Answer*: By injecting a tiny, synchronous inline JavaScript IIFE in the `<head>` of the root document. Because standard scripts without `async` or `defer` block HTML parsing, the script reads `localStorage` and appends the `.dark` class to `document.documentElement` *before* the browser builds the Render Tree and paints the initial frame. `suppressHydrationWarning` is added to `<html>` to acknowledge that the server doesn't know client-side localStorage during static build.
  - **Q: What is the alternative cookie-based approach, and what are its trade-offs?**
    - *Answer*: You can store the user's theme in an HTTP cookie and read it in a Next.js Server Component or middleware to render `<html class="dark">` directly on the server. Trade-off: It requires dynamic server rendering on every request (bypassing static edge caching/SSG) or middleware rewriting, increasing Time to First Byte (TTFB). The `<head>` script method allows 100% static edge caching.
- **Verification**:
  - Enable Dark mode.
  - In Chrome DevTools > Network tab, select "Slow 4G" and in Performance tab set "CPU 6x slowdown".
  - Hard refresh (`Cmd + Shift + R`). The page must load directly in dark mode with zero white flash.

---

### Task 3: Cross-Tab State Synchronization (`StorageEvent`)
- **Status**: Ready to Implement
- **Files Involved**: `apps/web/src/store/useThemeStore.ts`
- **The Problem in the Codebase**:
  If a user has two tabs of Shapecrate open side-by-side, changing the theme in Tab 1 leaves Tab 2 in the old theme until Tab 2 is reloaded.
- **Step-by-Step Implementation Guide**:
  1. Leverage the browser's native `StorageEvent`. The browser fires this event on `window` across all *other* tabs of the same origin whenever `localStorage` changes.
  2. Implement a listener in the store initialization:
     ```ts
     // In useThemeStore.ts
     if (typeof window !== "undefined") {
       window.addEventListener("storage", (event: StorageEvent) => {
         if (event.key === "shapecrate-theme" && event.newValue) {
           try {
             const data = JSON.parse(event.newValue);
             const newTheme: ThemeMode = data?.state?.theme;
             if (newTheme) {
               useThemeStore.setState({ theme: newTheme });
               applyThemeToDocument(newTheme);
             }
           } catch {}
         }
       });
     }
     ```
- **Deep-Dive Research Topics**:
  - `StorageEvent` specifications: Why does it NOT fire in the tab that made the modification?
  - `BroadcastChannel` API: Modern alternative for complex message passing between browsing contexts (tabs, iframes, Web Workers).
- **Interview Questions & Model Answers**:
  - **Q: How can two browser tabs belonging to the same origin communicate in real time without WebSockets?**
    - *Answer*: Two primary ways: 1) `window.addEventListener('storage')`, which triggers in all tabs except the sender whenever `localStorage.setItem()` is invoked. 2) The modern `BroadcastChannel` API (`new BroadcastChannel('channel-name')`), which provides a pub/sub channel for structured cloneable data across tabs, windows, and workers of the same origin.
- **Verification**:
  - Open two browser tabs of `http://localhost:3000`. Place them side by side.
  - Click the theme toggle in Tab 1. Tab 2 must toggle instantly without user interaction.

---

## Phase 2: Component Decomposition & Clean Architecture

### Task 4: Deconstruct `ComponentDetail.tsx` (570+ Lines Monolith)
- **Status**: Ready to Implement
- **Files Involved**:
  - Target: `apps/web/src/components/preview/ComponentDetail.tsx`
  - Create directory: `apps/web/src/components/preview/playground/`
  - Sub-components:
    - `PlaygroundCanvas.tsx`
    - `PlaygroundControls.tsx`
    - `CodeViewer.tsx`
    - `FeatureHighlights.tsx`
    - `RelatedComponents.tsx`
- **The Problem in the Codebase**:
  `ComponentDetail.tsx` currently contains 570+ lines of code doing multiple unrelated jobs:
  1. Managing playground slider and color state.
  2. String-formatting dynamic CSS and HTML strings.
  3. Rendering the live component canvas.
  4. Rendering sliders, color swatches, and reset buttons.
  5. Rendering code tabs (CSS vs HTML), copy button logic, and syntax formatting.
  6. Rendering feature callout cards.
  7. Rendering the related components grid.
  This is a classic violation of the **Single Responsibility Principle (SRP)**. Whenever a slider changes, the entire 570-line component tree re-evaluates.
- **Architecture & Directory Structure**:
  ```
  apps/web/src/components/preview/
  ├── ComponentDetail.tsx             # Clean coordinator (<80 LOC)
  └── playground/
      ├── PlaygroundCanvas.tsx        # Pure presentation: live component preview
      ├── PlaygroundControls.tsx      # Sliders, color pickers, reset button
      ├── CodeViewer.tsx              # Code preview tabs, syntax formatting, copy button
      ├── FeatureHighlights.tsx       # Accessibility and zero-dependency feature cards
      └── RelatedComponents.tsx       # Related component recommendations grid
  ```
- **Step-by-Step Implementation Guide**:
  1. Extract `PlaygroundControls.tsx`:
     ```tsx
     interface PlaygroundControlsProps {
       accentColor: string;
       onColorChange: (color: string) => void;
       cornerRadius: number;
       onRadiusChange: (radius: number) => void;
       onReset: () => void;
     }
     export function PlaygroundControls({
       accentColor,
       onColorChange,
       cornerRadius,
       onRadiusChange,
       onReset,
     }: PlaygroundControlsProps) {
       return (
         <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-(--line) bg-(--surface) p-4">
           {/* Color Swatches & Custom Input */}
           {/* Radius Slider */}
           {/* Reset Button */}
         </div>
       );
     }
     ```
  2. Extract `CodeViewer.tsx` with code tab switching and copy button.
  3. Extract `PlaygroundCanvas.tsx` with dynamic styles injected into the preview container.
  4. Keep the main `ComponentDetail.tsx` as a high-level container component orchestrating sub-components via clean composition.
- **Deep-Dive Research Topics**:
  - Container / Presentational (Smart vs Dumb) Pattern in modern React.
  - Component Composition vs Configuration: When to use `children` and slots.
  - SOLID Principles applied to frontend architecture:
    - **S**: Single Responsibility.
    - **O**: Open/Closed (extensible via props/slots without modifying internal code).
    - **L**: Liskov Substitution (interchangeable component interfaces).
    - **I**: Interface Segregation (keep prop interfaces lean; don't pass whole item objects if a component only needs an `id`).
    - **D**: Dependency Inversion (depend on abstractions/hooks rather than hardcoded global states).
- **Interview Questions & Model Answers**:
  - **Q: What criteria do you use to break down a 500+ line React component?**
    - *Answer*: I look for 4 main signals: 1) **State boundary**: If state `A` (e.g. slider value) only affects sub-tree `A`, keeping it at the top re-renders unrelated sub-tree `B` (e.g. related components). 2) **Responsibility**: A single file should not handle data orchestration, string interpolation, and complex presentation at once. 3) **Reusability & Testability**: Presentational sub-components should be testable without mocking unrelated page dependencies. 4) **Code readability**: High-level orchestrators should read declaratively in under 100 lines.
- **Verification**:
  - Run `npx tsc --noEmit` and verify zero TypeScript errors.
  - Dragging the corner radius slider updates the preview canvas without re-rendering the Related Components grid.

---

### Task 5: Extract the `useComponentPlayground` Custom Hook
- **Status**: Ready to Implement
- **Files Involved**:
  - Create: `apps/web/src/hooks/useComponentPlayground.ts`
  - Refactor: `apps/web/src/components/preview/ComponentDetail.tsx`
- **The Problem in the Codebase**:
  Complex string replacement and CSS interpolation calculations are performed directly inside the JSX rendering flow.
- **Step-by-Step Implementation Guide**:
  1. Create `apps/web/src/hooks/useComponentPlayground.ts`:
     ```ts
     import { useState, useMemo, useCallback } from "react";
     import type { ComponentItem } from "@shapecrate/components";

     export function useComponentPlayground(item: ComponentItem) {
       const [accentColor, setAccentColor] = useState("#6366f1");
       const [cornerRadius, setCornerRadius] = useState(8);
       const [activeTab, setActiveTab] = useState<"html" | "css">("html");

       // Memoize dynamic CSS generation to avoid recalculating on unrelated renders
       const customizedCss = useMemo(() => {
         let css = item.code.css;
         css = css.replace(/--primary-color:\s*[^;]+;/g, `--primary-color: ${accentColor};`);
         css = css.replace(/border-radius:\s*[^;]+;/g, `border-radius: ${cornerRadius}px;`);
         return css;
       }, [item.code.css, accentColor, cornerRadius]);

       const customizedHtml = useMemo(() => {
         return item.code.html;
       }, [item.code.html]);

       const resetDefaults = useCallback(() => {
         setAccentColor("#6366f1");
         setCornerRadius(8);
       }, []);

       return {
         accentColor,
         setAccentColor,
         cornerRadius,
         setCornerRadius,
         activeTab,
         setActiveTab,
         customizedCss,
         customizedHtml,
         resetDefaults,
       };
     }
     ```
  2. Consume in `ComponentDetail.tsx`:
     ```tsx
     const {
       accentColor,
       setAccentColor,
       cornerRadius,
       setCornerRadius,
       activeTab,
       setActiveTab,
       customizedCss,
       customizedHtml,
       resetDefaults,
     } = useComponentPlayground(item);
     ```
- **Deep-Dive Research Topics**:
  - Separation of Concerns: Decoupling business/computation logic from the React View layer.
  - Memory overhead vs CPU cost of `useMemo` in string operations.
- **Interview Questions & Model Answers**:
  - **Q: What is the difference between a custom hook and a regular utility function?**
    - *Answer*: A custom hook can invoke other React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) and participate in React's component lifecycle and state management. A regular utility function is pure JavaScript, completely decoupled from React's lifecycle and cannot hold component state.
- **Verification**:
  - Changing values in playground controls updates the dynamic code snippets accurately in the viewer.

---

### Task 6: Decompose the Catalog Explorer (`Component.tsx`) & URL State Sync
- **Status**: Ready to Implement
- **Files Involved**:
  - Target: `apps/web/src/components/preview/Component.tsx`
  - Create directory: `apps/web/src/components/preview/catalog/`
    - `ComponentSearch.tsx`
    - `ComponentFilters.tsx`
    - `ComponentGrid.tsx`
- **The Problem in the Codebase**:
  Filter and search state currently live only in transient component memory. If a user filters by "Buttons" or searches for "gradient", and shares the URL or refreshes the page, their search is lost.
- **Step-by-Step Implementation Guide**:
  1. Synchronize search and filter state with URL search params using Next.js `useSearchParams` and `useRouter`:
     ```tsx
     // apps/web/src/hooks/useCatalogParams.ts
     import { useRouter, useSearchParams, usePathname } from "next/navigation";
     import { useCallback } from "react";

     export function useCatalogParams() {
       const router = useRouter();
       const pathname = usePathname();
       const searchParams = useSearchParams();

       const category = searchParams.get("category") || "all";
       const search = searchParams.get("q") || "";

       const setParam = useCallback(
         (name: string, value: string) => {
           const params = new URLSearchParams(searchParams.toString());
           if (value && value !== "all") {
             params.set(name, value);
           } else {
             params.delete(name);
           }
           router.replace(`${pathname}?${params.toString()}`, { scroll: false });
         },
         [searchParams, pathname, router]
       );

       return { category, search, setParam };
     }
     ```
- **Deep-Dive Research Topics**:
  - "URL as Single Source of Truth" architectural pattern.
  - Next.js shallow routing / `router.replace({ scroll: false })`.
  - SEO benefits of linkable, shareable search filter URLs.
- **Interview Questions & Model Answers**:
  - **Q: Why should filter and pagination state be stored in URL query parameters rather than local component state?**
    - *Answer*: Three reasons: 1) **Shareability**: Users can bookmark or copy-paste the URL to a teammate and land on the exact filtered view. 2) **Browser History**: Users can use the browser's Back and Forward buttons naturally to undo a filter. 3) **SSR / Deep Linking**: The server can pre-render the exact filtered results for crawlers or fast first paints.
- **Verification**:
  - Filter by "Inputs" and search for "Modern". The URL updates to `/components?category=inputs&q=Modern`. Refresh the page; the filtered view persists.

---

## Phase 3: Interview-Grade Custom Hooks

### Task 7: Build a Custom `useDebounce` Hook
- **Status**: Ready to Implement
- **Files Involved**:
  - Create: `apps/web/src/hooks/useDebounce.ts`
  - Consume: `apps/web/src/components/preview/catalog/ComponentSearch.tsx`
- **The Problem in the Codebase**:
  Currently, searching filters the component array on every single keystroke. When typing fast, this causes unnecessary recalculations and UI jitter.
- **Step-by-Step Implementation Guide**:
  1. Create `apps/web/src/hooks/useDebounce.ts`:
     ```ts
     import { useState, useEffect } from "react";

     export function useDebounce<T>(value: T, delay: number): T {
       const [debouncedValue, setDebouncedValue] = useState<T>(value);

       useEffect(() => {
         const handler = setTimeout(() => {
           setDebouncedValue(value);
         }, delay);

         // Clean up timer on value or delay change (or component unmount)
         return () => {
           clearTimeout(handler);
         };
       }, [value, delay]);

       return debouncedValue;
     }
     ```
  2. Implement in Search:
     ```tsx
     const [searchTerm, setSearchTerm] = useState("");
     const debouncedSearch = useDebounce(searchTerm, 300);

     // The text input is 100% responsive (controlled by searchTerm)
     // The expensive array filter only runs when debouncedSearch updates!
     const filteredList = useMemo(() => {
       return items.filter(item => item.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
     }, [items, debouncedSearch]);
     ```
- **Deep-Dive Research Topics**:
  - The JavaScript Event Loop: Call Stack, Web APIs, Task Queue, Microtasks.
  - Stale closures in React: Why `clearTimeout` must run inside the effect cleanup function.
  - Difference between **Debounce** (wait until user stops for $X$ ms) vs **Throttle** (execute at most once every $X$ ms).
- **Interview Questions & Model Answers**:
  - **Q: Implement debounce from scratch in vanilla JavaScript (without React).**
    - *Answer*:
      ```javascript
      function debounce(fn, delay) {
        let timerId = null;
        return function(...args) {
          if (timerId) clearTimeout(timerId);
          timerId = setTimeout(() => {
            fn.apply(this, args);
          }, delay);
        };
      }
      ```
  - **Q: Why is an input controlled by debounced state directly considered bad UX?**
    - *Answer*: If you bind the `<input value={debouncedValue} />`, the user's keystrokes won't appear on screen until the delay expires, making the input feel laggy and broken. The correct pattern is to control the input immediately with standard state `value={searchTerm}` so typing is 60 FPS, while debouncing the *derived query* used for filtering or network requests.
- **Verification**:
  - Type rapidly in the search input; observe that the input text updates with zero latency, while the filtered grid updates 300ms after you stop typing.

---

### Task 8: Build a Production-Grade `useCopyToClipboard` Hook
- **Status**: Ready to Implement
- **Files Involved**:
  - Create: `apps/web/src/hooks/useCopyToClipboard.ts`
  - Update: `apps/web/src/components/preview/ComponentCard.tsx`, `CodeViewer.tsx`
- **The Problem in the Codebase**:
  Copy logic is copy-pasted across cards and detail pages, with no error fallback for older browsers or restricted iframe environments.
- **Step-by-Step Implementation Guide**:
  1. Create `apps/web/src/hooks/useCopyToClipboard.ts`:
     ```ts
     import { useState, useCallback, useEffect } from "react";

     interface CopyResult {
       copied: boolean;
       error: Error | null;
       copy: (text: string) => Promise<boolean>;
     }

     export function useCopyToClipboard(resetInterval = 2000): CopyResult {
       const [copied, setCopied] = useState(false);
       const [error, setError] = useState<Error | null>(null);

       const copy = useCallback(
         async (text: string): Promise<boolean> => {
           if (!text) return false;

           // Try Modern Async Clipboard API first
           if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
             try {
               await navigator.clipboard.writeText(text);
               setCopied(true);
               setError(null);
               return true;
             } catch (err) {
               console.warn("Async clipboard failed, attempting fallback...", err);
             }
           }

           // Fallback for non-HTTPS or restricted permissions
           try {
             const textArea = document.createElement("textarea");
             textArea.value = text;
             textArea.style.position = "fixed";
             textArea.style.left = "-999999px";
             textArea.style.top = "-999999px";
             document.body.appendChild(textArea);
             textArea.focus();
             textArea.select();
             const successful = document.execCommand("copy");
             document.body.removeChild(textArea);

             if (successful) {
               setCopied(true);
               setError(null);
               return true;
             }
             throw new Error("execCommand returned false");
           } catch (fallbackErr) {
             const err = fallbackErr instanceof Error ? fallbackErr : new Error("Failed to copy");
             setError(err);
             setCopied(false);
             return false;
           }
         },
         []
       );

       useEffect(() => {
         if (!copied) return;
         const timer = setTimeout(() => {
           setCopied(false);
         }, resetInterval);
         return () => clearTimeout(timer);
       }, [copied, resetInterval]);

       return { copied, error, copy };
     }
     ```
- **Deep-Dive Research Topics**:
  - Permissions Policy & Clipboard API security constraints (secure contexts / HTTPS requirement).
  - Memory cleanup with timers in custom hooks.
- **Interview Questions & Model Answers**:
  - **Q: Why does `navigator.clipboard.writeText` sometimes fail even on modern browsers?**
    - *Answer*: 1) It requires a Secure Context (HTTPS or localhost). 2) The browser tab must be active and focused. 3) The action must originate from a user gesture (like a click event); background triggers will be rejected by browser security policies. 4) Permissions Policy headers on embedded iframes can restrict clipboard write access.
- **Verification**:
  - Click any copy button; verify that the button displays a checkmark for exactly 2 seconds before reverting.

---

### Task 9: Implement `useMediaQuery` via `useSyncExternalStore`
- **Status**: Ready to Implement
- **Files Involved**:
  - Create: `apps/web/src/hooks/useMediaQuery.ts`
  - Update: `apps/web/src/components/common/Navbar.tsx`
- **The Problem in the Codebase**:
  `Navbar.tsx` currently has stubbed subscribe and snapshot functions, and handles resize listeners with manual `window.matchMedia` boilerplate.
- **Step-by-Step Implementation Guide**:
  1. Create `apps/web/src/hooks/useMediaQuery.ts`:
     ```ts
     import { useSyncExternalStore, useCallback } from "react";

     export function useMediaQuery(query: string): boolean {
       const subscribe = useCallback(
         (callback: () => void) => {
           if (typeof window === "undefined") return () => {};
           const matchMedia = window.matchMedia(query);
           matchMedia.addEventListener("change", callback);
           return () => {
             matchMedia.removeEventListener("change", callback);
           };
         },
         [query]
       );

       const getSnapshot = useCallback(() => {
         if (typeof window === "undefined") return false;
         return window.matchMedia(query).matches;
       }, [query]);

       const getServerSnapshot = useCallback(() => false, []);

       return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
     }
     ```
  2. Use cleanly anywhere:
     ```tsx
     const isMobile = useMediaQuery("(max-width: 768px)");
     ```
- **Deep-Dive Research Topics**:
  - Why React 18 introduced `useSyncExternalStore` as the official replacement for `useEffect` + `useState` when subscribing to external browser state.
  - Preventing hydration mismatch: Why `getServerSnapshot` must return a deterministic value matching the server render.
- **Interview Questions & Model Answers**:
  - **Q: What is wrong with doing `const [matches, setMatches] = useState(window.innerWidth > 768)` inside a `useEffect`?**
    - *Answer*: 1) On SSR, `window` does not exist, so reading `window` during render crashes the server. 2) If initialized to `false` and updated in `useEffect`, the component renders twice on every client mount (causing layout shifts). 3) In concurrent rendering, reading mutable window state inside `useEffect` can cause tearing. `useSyncExternalStore` provides a safe, idiomatic subscription model with distinct server and client snapshots.
- **Verification**:
  - Resize the browser window; verify responsive hooks fire accurately without React hydration warning logs.

---

### Task 10: Global `useKeyboardShortcut` Hook
- **Status**: Ready to Implement
- **Files Involved**:
  - Create: `apps/web/src/hooks/useKeyboardShortcut.ts`
  - Wire up: `Cmd/Ctrl + K` to focus search input; `Esc` to close mobile drawer.
- **Step-by-Step Implementation Guide**:
  1. Create `apps/web/src/hooks/useKeyboardShortcut.ts`:
     ```ts
     import { useEffect } from "react";

     type KeyCombo = {
       key: string;
       metaKey?: boolean;
       ctrlKey?: boolean;
       shiftKey?: boolean;
       altKey?: boolean;
     };

     export function useKeyboardShortcut(
       combo: KeyCombo,
       callback: (event: KeyboardEvent) => void,
       options: { preventDefault?: boolean } = { preventDefault: true }
     ) {
       useEffect(() => {
         const handleKeyDown = (event: KeyboardEvent) => {
           const matchesKey = event.key.toLowerCase() === combo.key.toLowerCase();
           const matchesMeta = combo.metaKey ? event.metaKey || event.ctrlKey : true;
           const matchesShift = combo.shiftKey ? event.shiftKey : true;
           const matchesAlt = combo.altKey ? event.altKey : true;

           if (matchesKey && matchesMeta && matchesShift && matchesAlt) {
             if (options.preventDefault) {
               event.preventDefault();
             }
             callback(event);
           }
         };

         window.addEventListener("keydown", handleKeyDown);
         return () => window.removeEventListener("keydown", handleKeyDown);
       }, [combo, callback, options.preventDefault]);
     }
     ```
- **Deep-Dive Research Topics**:
  - Keyboard accessibility standards (WCAG Criterion 2.1.1 Keyboard).
  - Mac `Cmd` (`event.metaKey`) vs Windows/Linux `Ctrl` (`event.ctrlKey`) normalization.
- **Interview Questions & Model Answers**:
  - **Q: What is the difference between `event.key` and `event.code` in JavaScript Keyboard Events?**
    - *Answer*: `event.code` represents the physical key pressed on the keyboard (e.g. `KeyQ`), independent of keyboard layout or language. `event.key` represents the printable character generated, taking into account modifiers, CapsLock, and international layouts (e.g. `q`, `Q`, or accented variations). For shortcuts, `event.key` is preferred for semantic keys, and `event.code` is preferred for location-specific game controls (WASD).
- **Verification**:
  - Press `Cmd + K` on Mac or `Ctrl + K` on Windows; the search bar focuses instantly.

---

## Phase 4: Performance, Virtualization & Code-Splitting

### Task 11: List Virtualization for the Component Catalog
- **Status**: Ready to Implement
- **Files Involved**: `apps/web/src/components/preview/ComponentGrid.tsx`
- **The Problem in the Codebase**:
  Rendering dozens or hundreds of component cards, each with live SVG graphics, nested DOM nodes, and buttons, causes high memory consumption and dropped frames during rapid mobile scrolling.
- **Step-by-Step Implementation Guide**:
  1. Learn the math of Windowing:
     ```
     Total Virtual Height = Item Count * Row Height
     Start Index = Math.max(0, Math.floor(ScrollTop / Row Height) - Overscan)
     End Index = Math.min(Item Count, Math.ceil((ScrollTop + Viewport Height) / Row Height) + Overscan)
     ```
  2. Implement windowing so that only the ~6 visible items in the viewport exist in the DOM at any given moment, recycled continuously as the user scrolls.
- **Deep-Dive Research Topics**:
  - DOM Recycling principles (used by react-window, @tanstack/react-virtual, iOS UITableView, Android RecyclerView).
  - Chrome DevTools Performance Profiling: How to detect Layout Thrashing and Forced Synchronous Layouts.
- **Interview Questions & Model Answers**:
  - **Q: Explain how list virtualization works and what trade-offs it introduces.**
    - *Answer*: Virtualization calculates which items fit in the visible scroll container and only mounts those elements (plus an overscan buffer) in the DOM, using absolute positioning or top/bottom spacer divs to preserve native scrollbar proportions. Trade-offs: 1) Native in-page browser search (`Cmd + F`) cannot find unmounted items. 2) Dynamic item heights require measurement observers (`ResizeObserver`). 3) Accessibility requires careful focus management.
- **Verification**:
  - Open Chrome DevTools > Elements tab. Scroll through the component catalog. Confirm that the total number of DOM elements remains constant rather than growing indefinitely.

---

### Task 12: Code-Split Heavy Components with `next/dynamic`
- **Status**: Ready to Implement
- **Files Involved**: `apps/web/src/components/preview/ComponentDetail.tsx`
- **The Problem in the Codebase**:
  Code viewer syntax rendering and playground controls increase the initial JavaScript bundle of the component page, delaying First Contentful Paint.
- **Step-by-Step Implementation Guide**:
  1. Dynamically import `CodeViewer`:
     ```tsx
     import dynamic from "next/dynamic";

     const CodeViewer = dynamic(
       () => import("./playground/CodeViewer"),
       {
         loading: () => (
           <div className="h-64 animate-pulse rounded-2xl bg-(--surface-2)" />
         ),
         ssr: false, // Prevents loading heavy syntax engines during initial SSR pass
       }
     );
     ```
- **Deep-Dive Research Topics**:
  - Webpack/Turbopack chunk splitting (`optimization.splitChunks`).
  - Core Web Vitals: Reducing **INP (Interaction to Next Paint)** and **TBT (Total Blocking Time)**.
- **Interview Questions & Model Answers**:
  - **Q: What happens when you pass `ssr: false` to Next.js `dynamic()`? When should you avoid it?**
    - *Answer*: When `ssr: false` is set, Next.js completely omits that component from the server-rendered HTML payload. The server sends the fallback placeholder, and the client browser downloads the chunk and renders it post-hydration. You should avoid `ssr: false` on SEO-critical content, primary headings, or above-the-fold content that impacts Largest Contentful Paint (LCP).
- **Verification**:
  - Build the application (`bun run build`). Inspect chunk sizes in the build report.

---

### Task 13: Profiling & Memoization Audit (`useMemo`, `useCallback`, `React.memo`)
- **Status**: Ready to Implement
- **Files Involved**: `apps/web/src/components/preview/ComponentCard.tsx`
- **Step-by-Step Implementation Guide**:
  1. Wrap `ComponentCard` in `React.memo` with a custom comparison or stable props:
     ```tsx
     export const ComponentCard = React.memo(
       function ComponentCard({ item, onCopy }: ComponentCardProps) {
         // ...
       },
       (prev, next) => prev.item.id === next.item.id
     );
     ```
  2. Stabilize all callback handlers passed as props using `useCallback`.
- **Deep-Dive Research Topics**:
  - JavaScript Referential Equality (`Object.is`) in React props reconciliation.
  - Why over-memoization can actually hurt performance (allocation of dependency arrays and closure overhead).
- **Interview Questions & Model Answers**:
  - **Q: Does wrapping a component in `React.memo` guarantee it will not re-render?**
    - *Answer*: No. `React.memo` only prevents re-renders when *props* remain shallowly equal. The component will still re-render if: 1) Its own internal state changes (`useState`), 2) A consumed context changes (`useContext`), or 3) A subscribed external store updates (`useSyncExternalStore`).
- **Verification**:
  - Open React DevTools > Profiler > Turn on "Highlight updates when components render". Typing into the search bar should only flash the input and filtered items, not unaffected cards.

---

## Phase 5: Accessibility (WCAG 2.1 AA) & Interactive UX

### Task 14: Focus Trapping in Mobile Navigation Drawer
- **Status**: Ready to Implement
- **Files Involved**: `apps/web/src/components/common/Navbar.tsx`
- **The Problem in the Codebase**:
  When the mobile hamburger drawer opens, pressing `Tab` on the keyboard escapes the drawer and focuses links hidden beneath the overlay.
- **Step-by-Step Implementation Guide**:
  1. Query focusable elements (`a[href], button:not([disabled])`).
  2. Trap `Tab` and `Shift + Tab` so navigation wraps inside the modal.
  3. Restore focus to the hamburger button when the drawer closes.
  4. Alternatively, use the modern HTML `inert` attribute on `#main-content` while the drawer is open.
- **Deep-Dive Research Topics**:
  - W3C Dialog (Modal) Pattern guidelines.
  - HTML `inert` attribute: Browser support, semantics, and how it automates focus trapping and accessibility hiding.
- **Interview Questions & Model Answers**:
  - **Q: What is the `inert` attribute in modern HTML, and how does it revolutionize modal dialog accessibility?**
    - *Answer*: When the boolean attribute `inert` is added to a DOM node (`element.toggleAttribute('inert', true)`), the browser automatically removes that element and its entire subtree from the accessibility tree, prevents all pointer/click events, and excludes all focusable children from the keyboard tab sequence. Rather than writing manual `keydown` focus traps, you simply mark the background content container as `inert` when a modal opens.
- **Verification**:
  - Open the mobile menu. Press `Tab` 10 times. Focus must cycle exclusively through the mobile navigation links without ever touching the page background.

---

### Task 15: ARIA Live Regions for Copy Notifications
- **Status**: Ready to Implement
- **Files Involved**: `apps/web/src/components/preview/ComponentCard.tsx`, `CodeViewer.tsx`
- **Step-by-Step Implementation Guide**:
  1. Implement an accessible live announcement:
     ```tsx
     <div
       role="status"
       aria-live="polite"
       aria-atomic="true"
       className="sr-only"
     >
       {copied ? `Copied ${item.title} code snippet to clipboard` : ""}
     </div>
     ```
  2. Understand Tailwind's `sr-only` class:
     ```css
     .sr-only {
       position: absolute;
       width: 1px;
       height: 1px;
       padding: 0;
       margin: -1px;
       overflow: hidden;
       clip: rect(0, 0, 0, 0);
       white-space: nowrap;
       border-width: 0;
     }
     ```
- **Interview Questions & Model Answers**:
  - **Q: What is the difference between `aria-live="polite"` and `aria-live="assertive"`?**
    - *Answer*: `aria-live="polite"` waits until the screen reader finishes speaking its current queue before announcing the dynamic message (used for non-urgent updates like copy confirmations or search count updates). `aria-live="assertive"` immediately interrupts whatever the screen reader is currently saying to deliver the message (reserved for critical errors, session expirations, or immediate warnings).
- **Verification**:
  - Enable VoiceOver (`Cmd + F5` on Mac) and click "Copy". VoiceOver will speak: *"Copied Simple Button code snippet to clipboard"*.

---

### Task 16: Complete Keyboard Navigation for Interactive Widgets (WAI-ARIA Tabs)
- **Status**: Ready to Implement
- **Files Involved**: `apps/web/src/components/preview/playground/CodeViewer.tsx`
- **Step-by-Step Implementation Guide**:
  1. Implement the WAI-ARIA Tabs Pattern:
     - Tab container: `role="tablist" aria-label="Code language"`
     - Each tab button:
       - `role="tab"`
       - `aria-selected={activeTab === 'html'}`
       - `tabIndex={activeTab === 'html' ? 0 : -1}` (Roving `tabIndex`)
       - `id="tab-html"`
       - `aria-controls="panel-html"`
     - Panel container:
       - `role="tabpanel"`
       - `id="panel-html"`
       - `aria-labelledby="tab-html"`
  2. Implement Arrow Left and Arrow Right listeners to move focus between tabs automatically.
- **Deep-Dive Research Topics**:
  - Roving `tabindex` vs `aria-activedescendant`.
  - W3C WAI-ARIA Authoring Practices Guide (APG).
- **Interview Questions & Model Answers**:
  - **Q: What is roving `tabindex`, and why is it used in accessible tabs and toolbars?**
    - *Answer*: Roving `tabindex` is a keyboard navigation pattern where only one item in a composite widget has `tabindex="0"` (the currently active item), while all other items have `tabindex="-1"`. When a keyboard user presses `Tab`, they jump directly into the widget once, and can then use Arrow keys to navigate between items (with JavaScript updating the `tabindex="0"` item dynamically). This prevents keyboard users from having to press `Tab` 20 times just to bypass a toolbar.
- **Verification**:
  - Navigate to the code tabs with `Tab`. Press `ArrowRight` and `ArrowLeft` to switch tabs. Verify that tabs switch without mouse interaction.

---

## 🎯 How to Tackle This Master Roadmap

1. **Pick one task per session**: Follow the exact files and implementation guide provided above.
2. **Read the Deep-Dive Research Topics**: Study the concepts on MDN, React documentation, and W3C APG before writing the code.
3. **Practice the Interview Questions**: Speak the answers out loud as if you were explaining them to a Senior Interviewer.
4. **Verify Your Work**: Use the verification checklist and Chrome DevTools to validate the results.

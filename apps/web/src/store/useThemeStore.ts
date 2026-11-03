import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeState {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = "shapecrate-theme";

/**
 * Safely reads the OS color scheme preference.
 */
export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Resolves the active visual theme ("light" | "dark") from a ThemeMode.
 */
export function resolveTheme(theme: ThemeMode): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

/**
 * Synchronously adds or removes the "dark" class from document.documentElement.
 * Returns the resolved active theme.
 */
export function applyThemeToDocument(theme: ThemeMode): ResolvedTheme {
  if (typeof window === "undefined") return "light";

  const resolved = resolveTheme(theme);
  const root = document.documentElement;

  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  return resolved;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: "light",

      setTheme: (theme: ThemeMode) => {
        const resolvedTheme = applyThemeToDocument(theme);
        set({ theme, resolvedTheme });
      },

      toggleTheme: () => {
        const { theme } = get();
        // Determine what the user is currently seeing visually
        const currentResolved = resolveTheme(theme);
        // Switch to the opposite visual theme
        const next: ThemeMode = currentResolved === "dark" ? "light" : "dark";
        const nextResolved = applyThemeToDocument(next);
        set({ theme: next, resolvedTheme: nextResolved });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolved = applyThemeToDocument(state.theme);
          state.resolvedTheme = resolved;
        } else if (typeof window !== "undefined") {
          // Check for legacy "theme" key migration
          const legacy = localStorage.getItem("theme") as ThemeMode | null;
          if (legacy === "light" || legacy === "dark" || legacy === "system") {
            const resolved = applyThemeToDocument(legacy);
            useThemeStore.setState({ theme: legacy, resolvedTheme: resolved });
          }
        }
      },
    }
  )
);

// Global browser listeners for OS theme changes and cross-tab synchronization
if (typeof window !== "undefined") {
  // 1. Listen for system color-scheme changes (e.g. automatic sunset/sunrise or OS toggle)
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMediaChange = () => {
    const { theme } = useThemeStore.getState();
    if (theme === "system") {
      const resolved = applyThemeToDocument("system");
      useThemeStore.setState({ resolvedTheme: resolved });
    }
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleMediaChange);
  } else {
    // Fallback for older Safari
    mediaQuery.addListener(handleMediaChange);
  }

  // 2. Cross-tab synchronization via StorageEvent
  window.addEventListener("storage", (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue);
        const newTheme: ThemeMode = parsed?.state?.theme;
        if (newTheme) {
          const resolved = applyThemeToDocument(newTheme);
          useThemeStore.setState({ theme: newTheme, resolvedTheme: resolved });
        }
      } catch {
        // Silently ignore corrupted storage events
      }
    }
  });
}

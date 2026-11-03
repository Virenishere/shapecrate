"use client";

import {
  useThemeStore,
  type ThemeMode,
  type ResolvedTheme,
} from "@/store/useThemeStore";

export type { ThemeMode, ResolvedTheme };

/**
 * Custom hook providing access to the centralized Zustand theme store.
 * Subscribes to fine-grained selectors to optimize re-renders.
 */
export const useTheme = () => {
  const mode = useThemeStore((state) => state.theme);
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme);
  const changeMode = useThemeStore((state) => state.setTheme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return {
    mode,
    resolvedTheme,
    changeMode,
    toggleTheme,
  };
};

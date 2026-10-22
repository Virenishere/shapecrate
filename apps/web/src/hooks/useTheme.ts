"use client";

import { useState, useEffect, useCallback } from "react";

type Mode = "light" | "dark" | "system";

export const useTheme = () => {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Mode) || "system";
  });

  const applyTheme = useCallback((isDark: boolean) => {
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const changeMode = useCallback((newMode: Mode) => {
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (mode === "system") {
        applyTheme(event.matches);
      }
    };

    const applyCurrentTheme = () => {
      if (mode === "system") {
        applyTheme(mediaQuery.matches);
      } else {
        applyTheme(mode === "dark");
      }
    };

    applyCurrentTheme();

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [mode, applyTheme]);

  return { mode, changeMode };
};

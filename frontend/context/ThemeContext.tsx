"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
} from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  useLayoutEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      setTheme("dark");
    }
  }, [setTheme]);

  useLayoutEffect(() => {
    document.querySelector("html")?.setAttribute("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext<ThemeContextType>(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
};


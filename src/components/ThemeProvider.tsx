"use client"

import type React from "react"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "dark" | "light"

type ThemeProviderContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined)

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme])

  return (
    <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
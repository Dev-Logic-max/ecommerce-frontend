"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  themes,
  defaultTheme,
  sidebarDesigns,
  defaultSidebarDesign,
  type Theme,
  type SidebarDesign,
} from "@/lib/theme-config"

interface ThemeContextType {
  theme: string
  themeConfig: Theme
  setTheme: (theme: string) => void
  availableThemes: Record<string, Theme>
  sidebarDesign: string
  sidebarDesignConfig: SidebarDesign
  setSidebarDesign: (design: string) => void
  availableSidebarDesigns: Record<string, SidebarDesign>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

interface AdminsThemeProviderProps {
  children: React.ReactNode
}

export function AdminsThemeProvider({ children }: AdminsThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(defaultTheme)
  const [mounted, setMounted] = useState(false)
  const [sidebarDesign, setSidebarDesignState] = useState<string>(defaultSidebarDesign)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme")
    const savedSidebarDesign = localStorage.getItem("admin-sidebar-design")
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme)
    }
    if (savedSidebarDesign && sidebarDesigns[savedSidebarDesign]) {
      setSidebarDesignState(savedSidebarDesign)
    }
    setMounted(true)
  }, [])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!mounted) return

    const themeConfig = themes[theme]
    if (!themeConfig) return

    // Apply CSS custom properties to document root
    const root = document.documentElement

    // Set theme data attribute
    root.setAttribute("data-theme", theme)

    // Apply all color variables
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    // Apply gradient
    root.style.setProperty("--theme-gradient", themeConfig.gradient)

    // Save to localStorage
    localStorage.setItem("admin-theme", theme)
  }, [theme, mounted])

  const setTheme = (newTheme: string) => {
    if (themes[newTheme]) {
      setThemeState(newTheme)
    }
  }

  // Save sidebar design to localStorage
  const setSidebarDesign = (newDesign: string) => {
    if (sidebarDesigns[newDesign]) {
      setSidebarDesignState(newDesign)
      localStorage.setItem("admin-sidebar-design", newDesign)
    }
  }

  const value: ThemeContextType = {
    theme,
    themeConfig: themes[theme],
    setTheme,
    availableThemes: themes,
    sidebarDesign,
    sidebarDesignConfig: sidebarDesigns[sidebarDesign],
    setSidebarDesign,
    availableSidebarDesigns: sidebarDesigns,
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-white">{children}</div>
  }

  return (
    <ThemeContext.Provider value={value}>
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: themes[theme].colors.background,
          color: themes[theme].colors.foreground,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  adminThemes,
  defaultAdminTheme,
  adminSidebarDesigns,
  defaultAdminSidebarDesign,
  type AdminTheme,
  type AdminSidebarDesign,
} from "@/lib/admin-theme-config"

interface AdminThemeContextType {
  theme: string
  themeConfig: AdminTheme
  setTheme: (theme: string) => void
  availableThemes: Record<string, AdminTheme>
  sidebarDesign: string
  sidebarDesignConfig: AdminSidebarDesign
  setSidebarDesign: (design: string) => void
  availableSidebarDesigns: Record<string, AdminSidebarDesign>
  isLoading: boolean
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined)

export function useAdminTheme() {
  const context = useContext(AdminThemeContext)
  if (context === undefined) {
    throw new Error("useAdminTheme must be used within an AdminsUsersThemeProvider")
  }
  return context
}

interface AdminsUsersThemeProviderProps {
  children: React.ReactNode
  storagePrefix?: string
}

export function AdminsUsersThemeProvider({ children, storagePrefix = "admin-user" }: AdminsUsersThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(defaultAdminTheme)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarDesign, setSidebarDesignState] = useState<string>(defaultAdminSidebarDesign)

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(`${storagePrefix}-theme`)
      const savedSidebarDesign = localStorage.getItem(`${storagePrefix}-sidebar-design`)

      if (savedTheme && adminThemes[savedTheme]) {
        setThemeState(savedTheme)
      }
      if (savedSidebarDesign && adminSidebarDesigns[savedSidebarDesign]) {
        setSidebarDesignState(savedSidebarDesign)
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error)
    } finally {
      setMounted(true)
      setIsLoading(false)
    }
  }, [storagePrefix])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!mounted) return

    const themeConfig = adminThemes[theme]
    if (!themeConfig) return

    try {
      // Apply CSS custom properties to document root
      const root = document.documentElement

      // Set theme data attribute
      root.setAttribute("data-admin-theme", theme)
      root.setAttribute("data-sidebar-design", sidebarDesign)

      // Apply all color variables with admin prefix
      Object.entries(themeConfig.colors).forEach(([key, value]) => {
        root.style.setProperty(`--admin-${key}`, value)
      })

      // Apply gradients and effects
      root.style.setProperty("--admin-theme-gradient", themeConfig.gradient)
      root.style.setProperty("--admin-secondary-gradient", themeConfig.secondaryGradient)
      root.style.setProperty("--admin-tertiary-gradient", themeConfig.tertiaryGradient)
      root.style.setProperty("--admin-text-shadow", themeConfig.textShadow)
      root.style.setProperty("--admin-box-shadow", themeConfig.boxShadow)

      // Save to localStorage
      localStorage.setItem(`${storagePrefix}-theme`, theme)
    } catch (error) {
      console.warn("Failed to apply theme:", error)
    }
  }, [theme, mounted, storagePrefix, sidebarDesign])

  const setTheme = (newTheme: string) => {
    if (adminThemes[newTheme]) {
      setThemeState(newTheme)
    }
  }

  // Save sidebar design to localStorage
  const setSidebarDesign = (newDesign: string) => {
    if (adminSidebarDesigns[newDesign]) {
      setSidebarDesignState(newDesign)
      try {
        localStorage.setItem(`${storagePrefix}-sidebar-design`, newDesign)
      } catch (error) {
        console.warn("Failed to save sidebar design:", error)
      }
    }
  }

  const value: AdminThemeContextType = {
    theme,
    themeConfig: adminThemes[theme],
    setTheme,
    availableThemes: adminThemes,
    sidebarDesign,
    sidebarDesignConfig: adminSidebarDesigns[sidebarDesign],
    setSidebarDesign,
    availableSidebarDesigns: adminSidebarDesigns,
    isLoading,
  }

  // Show loading state to prevent hydration mismatch
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <AdminThemeContext.Provider value={value}>
      <div
        className="min-h-screen transition-all duration-500 ease-in-out"
        style={{
          backgroundColor: adminThemes[theme].colors.background,
          color: adminThemes[theme].colors.foreground,
        }}
      >
        {children}
      </div>
    </AdminThemeContext.Provider>
  )
}

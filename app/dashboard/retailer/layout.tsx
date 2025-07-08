"use client"

import type React from "react"

import { useState } from "react"
import { AdminsUsersThemeProvider } from "@/components/theme/AdminsUsersThemeProvider"
import { RetailerSidebar } from "@/components/Sidebar/RetailerSidebar"
import RetailerNavbar from "@/components/Navbar/RetailerNavbar"

export default function RetailerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <AdminsUsersThemeProvider>
      <div className="min-h-screen flex flex-col">
        {/* Top navigation bar */}
        <RetailerNavbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
        {/* Sidebar + main content */}
        <div className="flex flex-1">
          <RetailerSidebar expanded={sidebarOpen} onToggle={() => setSidebarOpen((s) => !s)} />
          {/* Main content area with proper sidebar adjustment */}
          <main
            className={`flex-1 p-4 transition-all duration-500 ease-in-out ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}
            style={{
              marginLeft:
                typeof window !== "undefined" && window.innerWidth >= 1024 ? (sidebarOpen ? "256px" : "80px") : "0px",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </AdminsUsersThemeProvider>
  )
}

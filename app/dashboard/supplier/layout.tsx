"use client"

import type React from "react"
import { AdminsUsersThemeProvider } from "@/components/theme/AdminsUsersThemeProvider"

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminsUsersThemeProvider>
      {children}
    </AdminsUsersThemeProvider>
  )
}


"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme/AdminsThemeProvider"
import { AdminsThemeSelector } from "@/components/theme/AdminsThemeSelector"
import { SidebarDesignSelector } from "@/components/theme/SidebarDesignSelector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// React Icons
import { FiSearch, FiBell, FiMail, FiSettings, FiUser, FiLogOut, FiShield, FiHelpCircle } from "react-icons/fi"

export function DeveloperNavbar() {
  const { themeConfig } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <nav
      className="sticky top-0 z-40 w-full border-b backdrop-blur-lg transition-all duration-300"
      style={{
        backgroundColor: `${themeConfig.colors.background}95`,
        borderColor: themeConfig.colors.border,
      }}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section - Search */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50"
              style={{ color: themeConfig.colors.foreground }}
            />
            <Input
              type="search"
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 pr-4 py-2 w-full transition-all duration-200",
                "focus:ring-2 focus:ring-opacity-50 border-2",
              )}
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.foreground,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = themeConfig.colors.primary
                e.target.style.boxShadow = `0 0 0 3px ${themeConfig.colors.primary}20`
              }}
              onBlur={(e) => {
                e.target.style.borderColor = themeConfig.colors.border
                e.target.style.boxShadow = "none"
              }}
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="transition-all duration-200 hover:scale-105 btn-gradient"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.primary}15, ${themeConfig.colors.accent}10)`,
                color: themeConfig.colors.foreground,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.primary}25, ${themeConfig.colors.accent}15)`
                e.currentTarget.style.color = themeConfig.colors.primary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.primary}15, ${themeConfig.colors.accent}10)`
                e.currentTarget.style.color = themeConfig.colors.foreground
              }}
            >
              📊 Reports
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="transition-all duration-200 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.secondary}15, ${themeConfig.colors.accent}10)`,
                color: themeConfig.colors.foreground,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.secondary}25, ${themeConfig.colors.accent}15)`
                e.currentTarget.style.color = themeConfig.colors.secondary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.secondary}15, ${themeConfig.colors.accent}10)`
                e.currentTarget.style.color = themeConfig.colors.foreground
              }}
            >
              🔄 Sync
            </Button>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative transition-all duration-200 hover:scale-110"
                style={{
                  color: themeConfig.colors.foreground,
                }}
              >
                <FiBell className="h-5 w-5" />
                <div
                  className="absolute -top-1 -right-1 static-badge"
                  style={{
                    backgroundColor: themeConfig.colors.danger,
                  }}
                >
                  3
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 p-0"
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: themeConfig.colors.border }}>
                <h3
                  className="font-semibold text-lg text-shadow"
                  style={{ color: themeConfig.colors.foreground, textShadow: themeConfig.textShadow }}
                >
                  Notifications
                </h3>
                <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  You have 3 unread notifications
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {[
                  {
                    icon: "🚨",
                    title: "System Alert",
                    message: "High CPU usage detected",
                    time: "2 min ago",
                    urgent: true,
                  },
                  { icon: "👤", title: "New User", message: "John Doe registered", time: "5 min ago", urgent: false },
                  {
                    icon: "📦",
                    title: "Order Update",
                    message: "Order #1234 shipped",
                    time: "10 min ago",
                    urgent: false,
                  },
                ].map((notification, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={cn(
                      "p-4 cursor-pointer transition-all duration-200",
                      notification.urgent && "border-l-4",
                    )}
                    style={{
                      borderLeftColor: notification.urgent ? themeConfig.colors.danger : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.primary}10, ${themeConfig.colors.accent}05)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"
                    }}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <span className="text-2xl">{notification.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm" style={{ color: themeConfig.colors.foreground }}>
                          {notification.title}
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {notification.message}
                        </p>
                        <p className="text-xs opacity-50 mt-1" style={{ color: themeConfig.colors.foreground }}>
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-3 border-t" style={{ borderColor: themeConfig.colors.border }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full btn-gradient"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary}15, ${themeConfig.colors.accent}10)`,
                    color: themeConfig.colors.primary,
                  }}
                >
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Messages */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative transition-all duration-200 hover:scale-110"
                style={{
                  color: themeConfig.colors.foreground,
                }}
              >
                <FiMail className="h-5 w-5" />
                <div
                  className="absolute -top-1 -right-1 static-badge"
                  style={{
                    backgroundColor: themeConfig.colors.info,
                  }}
                >
                  7
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 p-0 custom-scrollbar"
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: themeConfig.colors.border }}>
                <h3
                  className="font-semibold text-lg text-shadow"
                  style={{ color: themeConfig.colors.foreground, textShadow: themeConfig.textShadow }}
                >
                  Messages
                </h3>
                <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  You have 7 unread messages
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {[
                  {
                    avatar: "👤",
                    name: "John Doe",
                    subject: "Project Update Required",
                    message: "The latest deployment needs your review...",
                    time: "2 min ago",
                    unread: true,
                  },
                  {
                    avatar: "👩",
                    name: "Sarah Wilson",
                    subject: "API Integration Issue",
                    message: "Having trouble with the new endpoint...",
                    time: "15 min ago",
                    unread: true,
                  },
                  {
                    avatar: "👨",
                    name: "Mike Johnson",
                    subject: "Database Optimization",
                    message: "Query performance has improved by 40%...",
                    time: "1 hour ago",
                    unread: false,
                  },
                ].map((mail, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={cn("p-4 cursor-pointer transition-all duration-200", mail.unread && "bg-opacity-50")}
                    style={{
                      backgroundColor: mail.unread ? `${themeConfig.colors.primary}10` : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.primary}15, ${themeConfig.colors.accent}10)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = mail.unread
                        ? `${themeConfig.colors.primary}10`
                        : "transparent"
                    }}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ background: themeConfig.gradient }}
                      >
                        {mail.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate" style={{ color: themeConfig.colors.foreground }}>
                            {mail.name}
                          </p>
                          <span className="text-xs opacity-50" style={{ color: themeConfig.colors.foreground }}>
                            {mail.time}
                          </span>
                        </div>
                        <p className="font-medium text-sm truncate" style={{ color: themeConfig.colors.foreground }}>
                          {mail.subject}
                        </p>
                        <p className="text-sm opacity-70 truncate" style={{ color: themeConfig.colors.foreground }}>
                          {mail.message}
                        </p>
                        {mail.unread && (
                          <div
                            className="w-2 h-2 rounded-full mt-1"
                            style={{ backgroundColor: themeConfig.colors.info }}
                          ></div>
                        )}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-3 border-t" style={{ borderColor: themeConfig.colors.border }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primary}15, ${themeConfig.colors.accent}10)`,
                    color: themeConfig.colors.primary,
                  }}
                >
                  View All Messages
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sidebar Design Selector */}
          <SidebarDesignSelector />

          {/* Theme Selector */}
          <AdminsThemeSelector />

          {/* Enhanced User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg profile-card"
              >
                <Avatar className="h-10 w-10 border-2" style={{ borderColor: themeConfig.colors.primary }}>
                  <AvatarImage src="/placeholder-user.jpg" alt="Developer" />
                  <AvatarFallback
                    className="font-bold"
                    style={{
                      background: themeConfig.gradient,
                      color: "white",
                    }}
                  >
                    DA
                  </AvatarFallback>
                </Avatar>
                <div
                  className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 flex items-center justify-center"
                  style={{
                    backgroundColor: themeConfig.colors.success,
                    borderColor: themeConfig.colors.background,
                  }}
                >
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 p-2 profile-card"
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
                background: `linear-gradient(135deg, ${themeConfig.colors.card}, ${themeConfig.colors.cardHover})`,
              }}
            >
              <div className="p-3 border-b" style={{ borderColor: themeConfig.colors.border }}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-user.jpg" alt="Developer" />
                    <AvatarFallback
                      style={{
                        background: themeConfig.gradient,
                        color: "white",
                      }}
                    >
                      DA
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p
                      className="font-semibold text-shadow"
                      style={{ color: themeConfig.colors.foreground, textShadow: themeConfig.textShadow }}
                    >
                      Dev Admin
                    </p>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      developer@ecommerce.com
                    </p>
                    <Badge
                      className="mt-1 text-xs"
                      style={{
                        background: `linear-gradient(135deg, ${themeConfig.colors.success}30, ${themeConfig.colors.success}20)`,
                        color: themeConfig.colors.success,
                      }}
                    >
                      🟢 Online
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="py-2">
                {[
                  { icon: FiUser, label: "Profile" },
                  { icon: FiSettings, label: "Settings" },
                  { icon: FiShield, label: "Security" },
                  { icon: FiHelpCircle, label: "Help & Support" },
                ].map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="cursor-pointer transition-all duration-300 profile-card"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.primary}20, ${themeConfig.colors.accent}10)`
                      e.currentTarget.style.transform = "translateX(4px)"
                      e.currentTarget.style.color = themeConfig.colors.primary
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"
                      e.currentTarget.style.transform = "translateX(0)"
                      e.currentTarget.style.color = themeConfig.colors.foreground
                    }}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    <span style={{ color: themeConfig.colors.foreground }}>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </div>

              <DropdownMenuSeparator style={{ backgroundColor: themeConfig.colors.border }} />

              <DropdownMenuItem
                className="cursor-pointer text-red-500 hover:text-red-600 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <FiLogOut className="mr-3 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

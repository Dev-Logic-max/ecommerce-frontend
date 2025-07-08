"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { IoPricetagsOutline } from "react-icons/io5";

// React Icons
import {
  FiHome,
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiBarChart2,
  FiDollarSign,
  FiTruck,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiMessageSquare,
  FiCreditCard,
  FiX,
} from "react-icons/fi"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  expanded: boolean
  active?: boolean
  badge?: string
  premium?: boolean
  isNew?: boolean
}

const SidebarItem = ({ icon, label, href, expanded, active = false, badge, premium, isNew }: SidebarItemProps) => {
  const { themeConfig, sidebarDesignConfig } = useAdminTheme()
  const [isHovered, setIsHovered] = useState(false)

  const getIconDisplay = () => {
    if (sidebarDesignConfig.name === "neon") {
      const iconMap: Record<string, string> = {
        Dashboard: "🏠",
        "Shop Management": "🏪",
        "Product Catalog": "📦",
        "Order Management": "📋",
        "Customer Management": "👥",
        "Analytics & Reports": "📊",
        "Financial Overview": "💰",
        "Shipping & Delivery": "🚚",
        "Marketing Tools": "📢",
        "Reviews & Ratings": "⭐",
        "Support Center": "💬",
        "Payment Settings": "💳",
        Promotions: "🏷️",
        Settings: "⚙️",
        "Help & Support": "❓",
      }
      return <span className="text-lg">{iconMap[label] || "📄"}</span>
    }
    return icon
  }

  const getItemStyles = () => {
    const baseStyles = cn(
      "flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 group relative overflow-hidden",
      expanded ? "gap-3" : "gap-0 w-12 h-12 justify-center",
      "hover:scale-[1.02] transform-gpu",
      !expanded && "mx-1",
    )

    if (sidebarDesignConfig.name === "glass") {
      return cn(
        baseStyles,
        active ? "glass-effect shadow-lg border border-opacity-30 text-white" : "hover:glass-effect hover:shadow-md",
      )
    }

    if (sidebarDesignConfig.name === "neon") {
      return cn(baseStyles, active ? "neon-glow shadow-2xl border-2" : "hover:neon-glow-soft hover:shadow-lg")
    }

    if (sidebarDesignConfig.name === "gradient") {
      return cn(baseStyles, active ? "gradient-bg shadow-xl border-2" : "hover:gradient-bg-soft hover:shadow-lg")
    }

    return cn(
      baseStyles,
      active
        ? cn(
            "shadow-lg border-2",
            "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-r-full before:shadow-lg",
          )
        : "hover:shadow-md",
    )
  }

  const getItemColors = () => {
    if (sidebarDesignConfig.name === "glass") {
      return {
        backgroundColor: active
          ? `linear-gradient(135deg, ${themeConfig.colors.primary}40, ${themeConfig.colors.accent}30)`
          : isHovered
            ? `rgba(255, 255, 255, 0.1)`
            : "transparent",
        color: active || isHovered ? "white" : themeConfig.colors.sidebarText,
        borderColor: active ? `${themeConfig.colors.primary}50` : "transparent",
      }
    }

    if (sidebarDesignConfig.name === "neon") {
      return {
        backgroundColor: active
          ? `linear-gradient(135deg, ${themeConfig.colors.primary}25, ${themeConfig.colors.secondary}20)`
          : isHovered
            ? `${themeConfig.colors.primary}15`
            : "transparent",
        color: active ? themeConfig.colors.primary : themeConfig.colors.sidebarText,
        borderColor: active ? themeConfig.colors.primary : "transparent",
        boxShadow: active ? `0 0 20px ${themeConfig.colors.primary}40` : "none",
      }
    }

    if (sidebarDesignConfig.name === "gradient") {
      return {
        background: active ? themeConfig.gradient : isHovered ? themeConfig.colors.primaryLight : "transparent",
        color: active ? "white" : themeConfig.colors.sidebarText,
        borderColor: active ? themeConfig.colors.primary : "transparent",
      }
    }

    return {
      backgroundColor: active ? `${themeConfig.colors.primary}20` : "transparent",
      color: active ? themeConfig.colors.primary : themeConfig.colors.sidebarText,
      borderColor: active ? `${themeConfig.colors.primary}30` : "transparent",
    }
  }

  const itemColors = getItemColors()

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={getItemStyles()}
            style={{
              background: itemColors.backgroundColor || itemColors.background,
              color: itemColors.color,
              borderColor: itemColors.borderColor,
              boxShadow: itemColors.boxShadow,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Enhanced gradient overlay for active state */}
            {active && sidebarDesignConfig.name !== "glass" && sidebarDesignConfig.name !== "neon" && (
              <>
                <div className="absolute inset-0 opacity-10 rounded-xl" style={{ background: themeConfig.gradient }} />
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full shadow-lg"
                  style={{ background: themeConfig.gradient }}
                />
              </>
            )}

            {/* Enhanced hover effect for active items */}
            {active && isHovered && sidebarDesignConfig.name !== "glass" && (
              <div
                className="absolute inset-0 opacity-20 rounded-xl transition-opacity duration-300"
                style={{ background: themeConfig.secondaryGradient }}
              />
            )}

            <div className={cn("transition-all duration-200 relative z-10", active && "scale-110")}>
              {getIconDisplay()}
            </div>

            <span
              className={cn(
                "transition-all duration-300 relative z-10",
                expanded ? "opacity-100 w-full" : "opacity-0 w-0 overflow-hidden",
              )}
            >
              {label}
            </span>

            {/* Premium badge */}
            {premium && expanded && (
              <Badge
                className="ml-auto text-xs px-2 py-0.5 font-bold"
                style={{
                  background: themeConfig.secondaryGradient,
                  color: "white",
                }}
              >
                PRO
              </Badge>
            )}

            {/* New feature badge */}
            {isNew && expanded && (
              <Badge
                className="ml-auto text-xs px-2 py-0.5 font-bold animate-pulse"
                style={{
                  background: themeConfig.tertiaryGradient,
                  color: "white",
                }}
              >
                NEW
              </Badge>
            )}

            {/* Static notification badge */}
            {badge && expanded && (
              <div
                className="ml-auto static-badge"
                style={{
                  backgroundColor: themeConfig.colors.danger,
                }}
              >
                {badge}
              </div>
            )}
          </Link>
        </TooltipTrigger>
        {!expanded && (
          <TooltipContent
            side="right"
            className="enhanced-tooltip font-medium px-3 py-2 text-sm"
            style={{
              background: themeConfig.gradient,
              color: "white",
              border: "none",
              boxShadow: themeConfig.boxShadow,
            }}
          >
            {label}
            {premium && <span className="ml-2 text-yellow-300">👑</span>}
            {isNew && <span className="ml-2 text-green-300">✨</span>}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

interface SidebarSectionProps {
  title: string
  expanded: boolean
  children: React.ReactNode
}

const SidebarSection = ({ title, expanded, children }: SidebarSectionProps) => {
  const { themeConfig } = useAdminTheme()

  return (
    <div className="space-y-2">
      {expanded && (
        <div className="px-3 py-2">
          <h3
            className="text-xs font-bold uppercase tracking-wider opacity-70"
            style={{
              color: themeConfig.colors.sidebarText,
              textShadow: themeConfig.textShadow,
            }}
          >
            {title}
          </h3>
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  )
}

interface RetailerSidebarProps {
  expanded: boolean
  onToggle: () => void
}

export function RetailerSidebar({ expanded, onToggle }: RetailerSidebarProps) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const pathname = usePathname()
  const { themeConfig, sidebarDesignConfig } = useAdminTheme()
  const [showUpgrade, setShowUpgrade] = useState(true)

  const handleLogout = () => {
    setLogoutDialogOpen(true)
  }

  const confirmLogout = () => {
    console.log("Logging out...")
    setLogoutDialogOpen(false)
  }

  const getSidebarStyles = () => {
    const baseStyles = cn(
      "fixed left-0 top-16 z-30 hidden lg:flex flex-col transition-all duration-500 ease-in-out shadow-2xl sidebar-scrollbar",
      expanded ? "w-64 h-[calc(100vh-64px)]" : "w-20 h-[calc(100vh-100px)] rounded-3xl mx-4 my-4",
      sidebarDesignConfig.className,
    )

    return baseStyles
  }

  const getSidebarBackground = () => {
    if (sidebarDesignConfig.name === "glass") {
      return {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        border: `1px solid rgba(255, 255, 255, 0.2)`,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }
    }

    if (sidebarDesignConfig.name === "neon") {
      return {
        backgroundColor: `${themeConfig.colors.background}95`,
        border: `2px solid ${themeConfig.colors.primary}30`,
        boxShadow: `0 0 30px ${themeConfig.colors.primary}20, inset 0 0 30px ${themeConfig.colors.primary}05`,
      }
    }

    if (sidebarDesignConfig.name === "gradient") {
      return {
        background: `linear-gradient(180deg, ${themeConfig.colors.sidebar}, ${themeConfig.colors.card})`,
        border: `1px solid ${themeConfig.colors.border}`,
        boxShadow: themeConfig.boxShadow,
      }
    }

    if (sidebarDesignConfig.name === "premium") {
      return {
        background: `linear-gradient(180deg, ${themeConfig.colors.sidebar}, ${themeConfig.colors.cardSecondary})`,
        border: `2px solid ${themeConfig.colors.primary}20`,
        boxShadow: `${themeConfig.boxShadow}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
      }
    }

    return {
      backgroundColor: `${themeConfig.colors.sidebar}95`,
      borderColor: themeConfig.colors.sidebarBorder,
      border: `1px solid ${themeConfig.colors.sidebarBorder}`,
    }
  }

  return (
    <>
      <div className={getSidebarStyles()} style={getSidebarBackground()}>
        {/* Header */}
        <div
          className={cn(
            "flex items-center border-b transition-all duration-300",
            expanded ? "px-6 py-5 justify-between" : "px-4 py-5 justify-center",
          )}
          style={{ borderColor: themeConfig.colors.sidebarBorder }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl shadow-lg"
              style={{ background: themeConfig.gradient }}
            >
              <FiShoppingBag className="h-5 w-5 text-white" />
            </div>
            {expanded && (
              <div>
                <h2
                  className="font-bold text-lg"
                  style={{
                    color: themeConfig.colors.sidebarText,
                    textShadow: themeConfig.textShadow,
                  }}
                >
                  RetailHub
                </h2>
                <p className="text-xs opacity-70" style={{ color: themeConfig.colors.sidebarText }}>
                  Retailer Dashboard
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "absolute h-8 w-8 rounded-full shadow-lg border-2 transition-all duration-300 hover:scale-110",
            expanded ? "-right-4 top-8" : "-right-4 top-12",
          )}
          style={{
            background: themeConfig.gradient,
            borderColor: themeConfig.colors.background,
            color: "white",
          }}
        >
          {expanded ? <FiChevronLeft className="h-4 w-4" /> : <FiChevronRight className="h-4 w-4" />}
        </Button>

        {/* Navigation */}
        <div className={cn("flex-1 overflow-y-auto py-4 space-y-6 sidebar-scrollbar", expanded ? "px-4" : "px-2")}>
          {/* Main Section */}
          <SidebarSection title="Main" expanded={expanded}>
            <SidebarItem
              icon={<FiHome className="h-5 w-5" />}
              label="Dashboard"
              href="/dashboard/retailer/dashboard"
              active={pathname === "/dashboard/retailer/dashboard"}
              expanded={expanded}
            />
            <SidebarItem
              icon={<FiShoppingBag className="h-5 w-5" />}
              label="Shop Management"
              href="/dashboard/retailer/shop"
              active={pathname.startsWith("/dashboard/retailer/shop")}
              expanded={expanded}
              badge="2"
            />
            <SidebarItem
              icon={<FiPackage className="h-5 w-5" />}
              label="Product Catalog"
              href="/dashboard/retailer/products"
              active={pathname.startsWith("/dashboard/retailer/products")}
              expanded={expanded}
            />
          </SidebarSection>

          <Separator style={{ backgroundColor: themeConfig.colors.sidebarBorder }} />

          {/* Sales & Orders */}
          <SidebarSection title="Sales & Orders" expanded={expanded}>
            <SidebarItem
              icon={<FiDollarSign className="h-5 w-5" />}
              label="Order Management"
              href="/dashboard/retailer/orders"
              active={pathname.startsWith("/dashboard/retailer/orders")}
              expanded={expanded}
              badge="15"
            />
            <SidebarItem
              icon={<FiUsers className="h-5 w-5" />}
              label="Customer Management"
              href="/dashboard/retailer/customers"
              active={pathname.startsWith("/dashboard/retailer/customers")}
              expanded={expanded}
            />
            <SidebarItem
              icon={<FiBarChart2 className="h-5 w-5" />}
              label="Analytics & Reports"
              href="/dashboard/retailer/analytics"
              active={pathname.startsWith("/dashboard/retailer/analytics")}
              expanded={expanded}
              premium
            />
            <SidebarItem
              icon={<FiDollarSign className="h-5 w-5" />}
              label="Financial Overview"
              href="/dashboard/retailer/finance"
              active={pathname.startsWith("/dashboard/retailer/finance")}
              expanded={expanded}
            />
          </SidebarSection>

          <Separator style={{ backgroundColor: themeConfig.colors.sidebarBorder }} />

          {/* Operations */}
          <SidebarSection title="Operations" expanded={expanded}>
            <SidebarItem
              icon={<FiTruck className="h-5 w-5" />}
              label="Shipping & Delivery"
              href="/dashboard/retailer/shipping"
              active={pathname.startsWith("/dashboard/retailer/shipping")}
              expanded={expanded}
            />
            <SidebarItem
              icon={<IoPricetagsOutline className="h-5 w-5" />}
              label="Promotions"
              href="/dashboard/retailer/promotions"
              active={pathname.startsWith("/dashboard/retailer/promotions")}
              expanded={expanded}
              isNew
            />
            <SidebarItem
              icon={<FiStar className="h-5 w-5" />}
              label="Reviews & Ratings"
              href="/dashboard/retailer/reviews"
              active={pathname.startsWith("/dashboard/retailer/reviews")}
              expanded={expanded}
            />
            <SidebarItem
              icon={<FiCreditCard className="h-5 w-5" />}
              label="Payment Settings"
              href="/dashboard/retailer/payments"
              active={pathname.startsWith("/dashboard/retailer/payments")}
              expanded={expanded}
            />
          </SidebarSection>

          <Separator style={{ backgroundColor: themeConfig.colors.sidebarBorder }} />

          {/* Support & Settings */}
          <SidebarSection title="Support & Settings" expanded={expanded}>
            <SidebarItem
              icon={<FiMessageSquare className="h-5 w-5" />}
              label="Support Center"
              href="/dashboard/retailer/support"
              active={pathname.startsWith("/dashboard/retailer/support")}
              expanded={expanded}
              badge="3"
            />
            <SidebarItem
              icon={<FiSettings className="h-5 w-5" />}
              label="Settings"
              href="/dashboard/retailer/settings"
              active={pathname.startsWith("/dashboard/retailer/settings")}
              expanded={expanded}
            />
            <SidebarItem
              icon={<FiHelpCircle className="h-5 w-5" />}
              label="Help & Support"
              href="/dashboard/retailer/help"
              active={pathname.startsWith("/dashboard/retailer/help")}
              expanded={expanded}
            />
          </SidebarSection>
        </div>

        {/* Footer */}
        <div
          className={cn("border-t p-4", !expanded && "px-2")}
          style={{ borderColor: themeConfig.colors.sidebarBorder }}
        >
          {expanded && showUpgrade && (
            <div
              className="mb-4 p-4 rounded-xl border relative"
              style={{
                background: `linear-gradient(135deg, ${themeConfig.colors.primaryLight}, ${themeConfig.colors.accentLight})`,
                borderColor: `${themeConfig.colors.primary}20`,
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUpgrade(false)}
                className="absolute top-2 right-2 h-6 w-6 rounded-full hover:bg-white/20"
              >
                <FiX className="h-3 w-3" />
              </Button>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🚀</span>
                <div>
                  <h4
                    className="font-semibold text-sm"
                    style={{
                      color: themeConfig.colors.sidebarText,
                      textShadow: themeConfig.textShadow,
                    }}
                  >
                    Upgrade to Pro
                  </h4>
                  <p className="text-xs opacity-70" style={{ color: themeConfig.colors.sidebarText }}>
                    Unlock advanced features
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full font-medium text-white"
                style={{
                  background: themeConfig.gradient,
                }}
              >
                Upgrade Now
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200",
              !expanded && "justify-center px-0",
            )}
          >
            <FiLogOut className="h-5 w-5" />
            {expanded && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout from the retailer dashboard?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout} className="bg-red-500 hover:bg-red-600 text-white">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

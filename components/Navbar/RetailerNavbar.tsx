"use client"

import { useState } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { AdminsUsersThemeSelector } from "@/components/theme/AdminsUsersThemeSelector"
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
import { NewShopModal } from "@/components/Modals/NewShopModal"
import { SalesDetailsModal } from "@/components/Modals/SalesDetailsModal"
import { OrdersDetailsModal } from "@/components/Modals/OrdersDetailsModal"

// React Icons
import {
  FiSearch,
  FiBell,
  FiMail,
  FiSettings,
  FiUser,
  FiLogOut,
  FiShield,
  FiHelpCircle,
  FiShoppingBag,
  FiTrendingUp,
  FiDollarSign,
  FiPackage,
} from "react-icons/fi"

export default function RetailerNavbar() {
  const { themeConfig } = useAdminTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [newShopModalOpen, setNewShopModalOpen] = useState(false)
  const [salesModalOpen, setSalesModalOpen] = useState(false)
  const [ordersModalOpen, setOrdersModalOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-40 w-full border-b backdrop-blur-lg transition-all duration-300"
      style={{
        backgroundColor: `${themeConfig.colors.background}95`,
        borderColor: themeConfig.colors.border,
        boxShadow: `0 4px 20px ${themeConfig.colors.primary}10`,
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
              placeholder="Search products, orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 pr-4 py-2 w-full transition-all duration-200",
                "focus:ring-2 focus:ring-opacity-50 border-2 bg-transparent",
              )}
              style={{
                backgroundColor: `${themeConfig.colors.card}80`,
                borderColor: themeConfig.colors.border,
                color: themeConfig.colors.foreground,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = themeConfig.colors.primary
                e.target.style.boxShadow = `0 0 0 3px ${themeConfig.colors.primaryLight}`
                e.target.style.backgroundColor = themeConfig.colors.card
              }}
              onBlur={(e) => {
                e.target.style.borderColor = themeConfig.colors.border
                e.target.style.boxShadow = "none"
                e.target.style.backgroundColor = `${themeConfig.colors.card}80`
              }}
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: `${themeConfig.colors.successLight}` }}
            >
              <FiTrendingUp className="h-4 w-4" style={{ color: themeConfig.colors.success }} />
              <span className="text-sm font-medium" style={{ color: themeConfig.colors.success }}>
                +12% Sales
              </span>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: `${themeConfig.colors.infoLight}` }}
            >
              <FiPackage className="h-4 w-4" style={{ color: themeConfig.colors.info }} />
              <span className="text-sm font-medium" style={{ color: themeConfig.colors.info }}>
                234 Orders
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            <SalesDetailsModal
              open={salesModalOpen}
              onOpenChange={setSalesModalOpen}
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="transition-all duration-200 hover:scale-105 bg-transparent"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.secondary}15, ${themeConfig.colors.accent}10)`,
                    color: themeConfig.colors.foreground,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.secondary}25, ${themeConfig.colors.accent}15)`
                    e.currentTarget.style.color = themeConfig.colors.secondary
                    e.currentTarget.style.transform = "scale(1.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.secondary}15, ${themeConfig.colors.accent}10)`
                    e.currentTarget.style.color = themeConfig.colors.foreground
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  💰 Sales Report
                </Button>
              }
            />
            <OrdersDetailsModal
              open={ordersModalOpen}
              onOpenChange={setOrdersModalOpen}
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="transition-all duration-200 hover:scale-105 bg-transparent"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.info}15, ${themeConfig.colors.accent}10)`,
                    color: themeConfig.colors.foreground,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.info}25, ${themeConfig.colors.accent}15)`
                    e.currentTarget.style.color = themeConfig.colors.info
                    e.currentTarget.style.transform = "scale(1.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.info}15, ${themeConfig.colors.accent}10)`
                    e.currentTarget.style.color = themeConfig.colors.foreground
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  📦 Orders
                </Button>
              }
            />
            <NewShopModal
              open={newShopModalOpen}
              onOpenChange={setNewShopModalOpen}
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="transition-all duration-200 hover:scale-105 bg-transparent"
                  style={{
                    background: `linear-gradient(135deg, ${themeConfig.colors.primaryLight}, ${themeConfig.colors.accentLight})`,
                    color: themeConfig.colors.foreground,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.primary}25, ${themeConfig.colors.accent}15)`
                    e.currentTarget.style.color = themeConfig.colors.primary
                    e.currentTarget.style.transform = "scale(1.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.primaryLight}, ${themeConfig.colors.accentLight})`
                    e.currentTarget.style.color = themeConfig.colors.foreground
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  <FiShoppingBag className="mr-2 h-4 w-4" />🏪 New Shop
                </Button>
              }
            />
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
                  className="absolute -top-1 -right-1 static-badge animate-pulse"
                  style={{
                    backgroundColor: themeConfig.colors.danger,
                  }}
                >
                  5
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 p-0 shadow-2xl border-2"
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div
                className="p-4 border-b"
                style={{
                  borderColor: themeConfig.colors.border,
                  background: `linear-gradient(135deg, ${themeConfig.colors.primaryLight}, ${themeConfig.colors.accentLight})`,
                }}
              >
                <h3
                  className="font-semibold text-lg"
                  style={{
                    color: themeConfig.colors.foreground,
                    textShadow: themeConfig.textShadow,
                  }}
                >
                  🔔 Notifications
                </h3>
                <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  You have 5 unread notifications
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {[
                  {
                    icon: "🛒",
                    title: "New Order Received",
                    message: "Order #ORD-2024-001 from John Doe",
                    time: "2 min ago",
                    urgent: true,
                  },
                  {
                    icon: "📦",
                    title: "Low Stock Alert",
                    message: "iPhone 15 Pro - Only 3 units left",
                    time: "5 min ago",
                    urgent: true,
                  },
                  {
                    icon: "⭐",
                    title: "New Review",
                    message: "5-star review for your shop",
                    time: "10 min ago",
                    urgent: false,
                  },
                  {
                    icon: "💰",
                    title: "Payment Received",
                    message: "$1,250 payment processed",
                    time: "15 min ago",
                    urgent: false,
                  },
                  {
                    icon: "🚚",
                    title: "Shipment Delivered",
                    message: "Order #ORD-2024-002 delivered",
                    time: "1 hour ago",
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
                  className="w-full text-white font-medium"
                  style={{
                    background: themeConfig.gradient,
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
                  3
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 p-0 custom-scrollbar shadow-2xl border-2"
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
              }}
            >
              <div
                className="p-4 border-b"
                style={{
                  borderColor: themeConfig.colors.border,
                  background: `linear-gradient(135deg, ${themeConfig.colors.infoLight}, ${themeConfig.colors.primaryLight})`,
                }}
              >
                <h3
                  className="font-semibold text-lg"
                  style={{
                    color: themeConfig.colors.foreground,
                    textShadow: themeConfig.textShadow,
                  }}
                >
                  💬 Messages
                </h3>
                <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  You have 3 unread messages
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {[
                  {
                    avatar: "👤",
                    name: "Customer Support",
                    subject: "Order Issue Resolution",
                    message: "We've resolved the shipping issue for order #ORD-001...",
                    time: "5 min ago",
                    unread: true,
                  },
                  {
                    avatar: "🏪",
                    name: "Marketplace Team",
                    subject: "Shop Verification Complete",
                    message: "Congratulations! Your shop has been verified...",
                    time: "1 hour ago",
                    unread: true,
                  },
                  {
                    avatar: "📊",
                    name: "Analytics Team",
                    subject: "Monthly Report Ready",
                    message: "Your monthly sales report is now available...",
                    time: "2 hours ago",
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
                  className="w-full text-white font-medium"
                  style={{
                    background: themeConfig.secondaryGradient,
                  }}
                >
                  View All Messages
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Selector */}
          <AdminsUsersThemeSelector />

          {/* Enhanced User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
              >
                <Avatar className="h-10 w-10 border-2" style={{ borderColor: themeConfig.colors.primary }}>
                  <AvatarImage src="/placeholder-user.jpg" alt="Retailer" />
                  <AvatarFallback
                    className="font-bold"
                    style={{
                      background: themeConfig.gradient,
                      color: "white",
                    }}
                  >
                    RT
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
              className="w-64 p-2 shadow-2xl border-2"
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
                background: `linear-gradient(135deg, ${themeConfig.colors.card}, ${themeConfig.colors.cardHover})`,
              }}
            >
              <div className="p-3 border-b" style={{ borderColor: themeConfig.colors.border }}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-user.jpg" alt="Retailer" />
                    <AvatarFallback
                      style={{
                        background: themeConfig.gradient,
                        color: "white",
                      }}
                    >
                      RT
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p
                      className="font-semibold"
                      style={{
                        color: themeConfig.colors.foreground,
                        textShadow: themeConfig.textShadow,
                      }}
                    >
                      Retailer Admin
                    </p>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      retailer@shop.com
                    </p>
                    <Badge
                      className="mt-1 text-xs"
                      style={{
                        background: `linear-gradient(135deg, ${themeConfig.colors.success}30, ${themeConfig.colors.success}20)`,
                        color: themeConfig.colors.success,
                      }}
                    >
                      🟢 Active Shop
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="py-2">
                {[
                  { icon: FiUser, label: "Profile" },
                  { icon: FiShoppingBag, label: "My Shops" },
                  { icon: FiSettings, label: "Settings" },
                  { icon: FiShield, label: "Security" },
                  { icon: FiHelpCircle, label: "Help & Support" },
                ].map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="cursor-pointer transition-all duration-300"
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

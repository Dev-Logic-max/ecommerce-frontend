"use client"

import type React from "react"
import { useState } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// React Icons
import { FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign, FiPackage } from "react-icons/fi"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
}

const StatCard = ({ title, value, change, changeType, icon }: StatCardProps) => {
  const { themeConfig } = useAdminTheme()

  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return themeConfig.colors.success
      case "negative":
        return themeConfig.colors.danger
      default:
        return themeConfig.colors.foreground
    }
  }

  return (
    <Card
      className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2 cursor-pointer group"
      style={{
        backgroundColor: themeConfig.colors.card,
        borderColor: themeConfig.colors.border,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${themeConfig.colors.primary}50`
        e.currentTarget.style.boxShadow = `0 20px 25px -5px ${themeConfig.colors.primary}20`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = themeConfig.colors.border
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
          {title}
        </CardTitle>
        <div
          className="p-2 rounded-lg transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
        >
          <div style={{ color: themeConfig.colors.primary }}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2" style={{ color: themeConfig.colors.foreground }}>
          {value}
        </div>
        <p className="text-xs flex items-center gap-1">
          <span style={{ color: getChangeColor() }}>
            {changeType === "positive" ? "↗️" : changeType === "negative" ? "↘️" : "➡️"}
            {change}
          </span>
          <span className="opacity-70" style={{ color: themeConfig.colors.foreground }}>
            from last month
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

interface ActivityItemProps {
  icon: string
  title: string
  description: string
  time: string
  type: "success" | "warning" | "info" | "error"
}

const ActivityItem = ({ icon, title, description, time, type }: ActivityItemProps) => {
  const { themeConfig } = useAdminTheme()

  const getTypeColor = () => {
    switch (type) {
      case "success":
        return themeConfig.colors.success
      case "warning":
        return themeConfig.colors.warning
      case "error":
        return themeConfig.colors.danger
      default:
        return themeConfig.colors.info
    }
  }

  return (
    <div
      className="flex items-start gap-4 p-4 rounded-lg transition-all duration-200 hover:scale-[1.01] cursor-pointer"
      style={{ backgroundColor: `${themeConfig.colors.muted}50` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${themeConfig.colors.primary}10`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = `${themeConfig.colors.muted}50`
      }}
    >
      <div className="p-2 rounded-full text-lg" style={{ backgroundColor: `${getTypeColor()}20` }}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm" style={{ color: themeConfig.colors.foreground }}>
          {title}
        </h4>
        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
          {description}
        </p>
      </div>
      <span className="text-xs opacity-50" style={{ color: themeConfig.colors.foreground }}>
        {time}
      </span>
    </div>
  )
}

export function RetailerDashboardTabs() {
  const { themeConfig } = useAdminTheme()
  const [activeTab, setActiveTab] = useState("overview")

  const shopMetrics = [
    { label: "Conversion Rate", value: 3.2, status: "healthy" },
    { label: "Customer Satisfaction", value: 94, status: "healthy" },
    { label: "Inventory Turnover", value: 67, status: "warning" },
    { label: "Return Rate", value: 12, status: "healthy" },
  ]

  const recentActivity = [
    {
      icon: "🛒",
      title: "New order received",
      description: "Order #ORD-2024-001 from Sarah Johnson",
      time: "2 min ago",
      type: "success" as const,
    },
    {
      icon: "📦",
      title: "Product restocked",
      description: "iPhone 15 Pro inventory updated (+50 units)",
      time: "5 min ago",
      type: "info" as const,
    },
    {
      icon: "⭐",
      title: "New 5-star review",
      description: "Customer loved the fast shipping",
      time: "8 min ago",
      type: "success" as const,
    },
    {
      icon: "⚠️",
      title: "Low stock alert",
      description: "Samsung Galaxy S24 - Only 5 units left",
      time: "12 min ago",
      type: "warning" as const,
    },
    {
      icon: "💰",
      title: "Payment received",
      description: "Order #ORD-2024-002 payment confirmed",
      time: "15 min ago",
      type: "success" as const,
    },
  ]

  const topProducts = [
    { name: "iPhone 15 Pro", sales: 234, revenue: "$234,000", trend: "+12%" },
    { name: "Samsung Galaxy S24", sales: 189, revenue: "$189,000", trend: "+8%" },
    { name: "MacBook Air M3", sales: 156, revenue: "$312,000", trend: "+15%" },
    { name: "AirPods Pro", sales: 298, revenue: "$89,400", trend: "+22%" },
    { name: "iPad Pro", sales: 134, revenue: "$134,000", trend: "+5%" },
  ]

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className="grid w-full grid-cols-4 p-1 rounded-xl"
          style={{
            backgroundColor: themeConfig.colors.muted,
          }}
        >
          {[
            { value: "overview", label: "📊 Overview", icon: "📊" },
            { value: "sales", label: "💰 Sales", icon: "💰" },
            { value: "products", label: "📦 Products", icon: "📦" },
            { value: "customers", label: "👥 Customers", icon: "👥" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "transition-all duration-300 rounded-lg font-medium",
                "data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]",
              )}
              style={{
                color: activeTab === tab.value ? "white" : themeConfig.colors.foreground,
                backgroundColor: activeTab === tab.value ? themeConfig.colors.primary : "transparent",
              }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label.split(" ")[1]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value="$12,847.89"
              change="+18.2%"
              changeType="positive"
              icon={<FiDollarSign className="h-5 w-5" />}
            />
            <StatCard
              title="Total Orders"
              value="1,234"
              change="+12.5%"
              changeType="positive"
              icon={<FiShoppingBag className="h-5 w-5" />}
            />
            <StatCard
              title="Active Customers"
              value="856"
              change="+8.1%"
              changeType="positive"
              icon={<FiUsers className="h-5 w-5" />}
            />
            <StatCard
              title="Conversion Rate"
              value="3.24%"
              change="-1.2%"
              changeType="negative"
              icon={<FiTrendingUp className="h-5 w-5" />}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>🏪 Shop Performance</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Key metrics for your retail business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {shopMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: themeConfig.colors.foreground }}>{metric.label}</span>
                      <span style={{ color: themeConfig.colors.foreground }}>{metric.value}%</span>
                    </div>
                    <Progress
                      value={metric.value}
                      className="h-2"
                      style={{
                        backgroundColor: `${themeConfig.colors.muted}50`,
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>🚀 Quick Actions</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Common retailer tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: "🏪", label: "Create New Shop" },
                  { icon: "📦", label: "Add New Product" },
                  { icon: "📊", label: "View Sales Report" },
                  { icon: "🎯", label: "Launch Promotion" },
                  { icon: "📞", label: "Contact Support" },
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start transition-all duration-200 hover:scale-[1.02] bg-transparent"
                    style={{
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${themeConfig.colors.primary}10`
                      e.currentTarget.style.borderColor = themeConfig.colors.primary
                      e.currentTarget.style.color = themeConfig.colors.primary
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                      e.currentTarget.style.borderColor = themeConfig.colors.border
                      e.currentTarget.style.color = themeConfig.colors.foreground
                    }}
                  >
                    <span className="mr-3 text-lg">{action.icon}</span>
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>💰 Sales Overview</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Revenue and sales performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: themeConfig.colors.primary }}>
                    $12,847
                  </div>
                  <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    Total Revenue This Month
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold" style={{ color: themeConfig.colors.foreground }}>
                      1,234
                    </div>
                    <p className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Orders
                    </p>
                  </div>
                  <div>
                    <div className="text-xl font-bold" style={{ color: themeConfig.colors.foreground }}>
                      $10.42
                    </div>
                    <p className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Avg Order Value
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>🏆 Top Products</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Best performing products this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.slice(0, 3).map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm" style={{ color: themeConfig.colors.foreground }}>
                          {product.name}
                        </p>
                        <p className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {product.sales} sales
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm" style={{ color: themeConfig.colors.foreground }}>
                          {product.revenue}
                        </p>
                        <p className="text-xs" style={{ color: themeConfig.colors.success }}>
                          {product.trend}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6 mt-6">
          <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: themeConfig.colors.foreground }}>📦 Product Performance</CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Detailed product analytics and inventory status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:scale-[1.01]"
                    style={{ backgroundColor: `${themeConfig.colors.muted}50` }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
                      >
                        <FiPackage className="h-6 w-6" style={{ color: themeConfig.colors.primary }} />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                          {product.name}
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {product.sales} units sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold" style={{ color: themeConfig.colors.foreground }}>
                        {product.revenue}
                      </p>
                      <Badge
                        style={{
                          backgroundColor: `${themeConfig.colors.success}20`,
                          color: themeConfig.colors.success,
                        }}
                      >
                        {product.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>👥 Customer Insights</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Customer behavior and engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: themeConfig.colors.primary }}>
                      856
                    </div>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Active Customers
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: themeConfig.colors.secondary }}>
                      4.8
                    </div>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Avg Rating
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: themeConfig.colors.foreground }}>Customer Retention</span>
                    <span style={{ color: themeConfig.colors.foreground }}>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>📋 Recent Activity</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Latest customer and order activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.slice(0, 3).map((activity, index) => (
                    <ActivityItem
                      key={index}
                      icon={activity.icon}
                      title={activity.title}
                      description={activity.description}
                      time={activity.time}
                      type={activity.type}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

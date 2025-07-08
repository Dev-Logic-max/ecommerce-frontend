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
import { FiTrendingUp, FiTruck, FiPackage, FiUsers, FiBarChart2, FiClock, FiCheckCircle } from "react-icons/fi"
// import { GiWarehouse } from "react-icons/gi"
import { LiaWarehouseSolid } from "react-icons/lia";

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

export function SupplierDashboardTabs() {
  const { themeConfig } = useAdminTheme()
  const [activeTab, setActiveTab] = useState("overview")

  const warehouseMetrics = [
    { label: "Warehouse Utilization", value: 78, status: "healthy" },
    { label: "Order Fulfillment Rate", value: 94, status: "healthy" },
    { label: "Inventory Accuracy", value: 89, status: "warning" },
    { label: "Delivery Performance", value: 92, status: "healthy" },
  ]

  const recentActivity = [
    {
      icon: "📦",
      title: "Bulk order received",
      description: "1,500 units from RetailCorp - Processing",
      time: "5 min ago",
      type: "info" as const,
    },
    {
      icon: "🚚",
      title: "Shipment dispatched",
      description: "Order #SUP-2024-001 sent to Warehouse B",
      time: "12 min ago",
      type: "success" as const,
    },
    {
      icon: "⚠️",
      title: "Low stock alert",
      description: "Warehouse A - Electronics section below threshold",
      time: "18 min ago",
      type: "warning" as const,
    },
    {
      icon: "✅",
      title: "Quality check passed",
      description: "Batch #B2024-045 approved for distribution",
      time: "25 min ago",
      type: "success" as const,
    },
    {
      icon: "🏭",
      title: "New warehouse online",
      description: "Warehouse E is now operational",
      time: "1 hour ago",
      type: "success" as const,
    },
  ]

  const topWarehouses = [
    { name: "Warehouse A - Electronics", capacity: 85, orders: 234, efficiency: "94%" },
    { name: "Warehouse B - Fashion", capacity: 67, orders: 189, efficiency: "91%" },
    { name: "Warehouse C - Home & Garden", capacity: 72, orders: 156, efficiency: "88%" },
    { name: "Warehouse D - Sports", capacity: 58, orders: 134, efficiency: "96%" },
    { name: "Warehouse E - Books", capacity: 43, orders: 98, efficiency: "92%" },
  ]

  const supplyChainMetrics = [
    { name: "On-Time Delivery", value: 94, target: 95, status: "warning" },
    { name: "Order Accuracy", value: 98, target: 95, status: "success" },
    { name: "Inventory Turnover", value: 87, target: 85, status: "success" },
    { name: "Cost Efficiency", value: 91, target: 90, status: "success" },
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
            { value: "warehouses", label: "🏭 Warehouses", icon: "🏭" },
            { value: "supply-chain", label: "🚚 Supply Chain", icon: "🚚" },
            { value: "analytics", label: "📈 Analytics", icon: "📈" },
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
              title="Total Warehouses"
              value="5"
              change="+1 new"
              changeType="positive"
              icon={<LiaWarehouseSolid className="h-5 w-5" />}
            />
            <StatCard
              title="Active Orders"
              value="1,847"
              change="+15.3%"
              changeType="positive"
              icon={<FiPackage className="h-5 w-5" />}
            />
            <StatCard
              title="Delivery Routes"
              value="23"
              change="+2 routes"
              changeType="positive"
              icon={<FiTruck className="h-5 w-5" />}
            />
            <StatCard
              title="Efficiency Rate"
              value="94.2%"
              change="+2.1%"
              changeType="positive"
              icon={<FiTrendingUp className="h-5 w-5" />}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>🏭 Warehouse Performance</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Key metrics across all warehouse locations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {warehouseMetrics.map((metric, index) => (
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
                  Common supplier operations and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: "🏭", label: "Add New Warehouse" },
                  { icon: "📦", label: "Bulk Inventory Update" },
                  { icon: "🚚", label: "Schedule Delivery" },
                  { icon: "📊", label: "Generate Supply Report" },
                  { icon: "🔧", label: "System Maintenance" },
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

        <TabsContent value="warehouses" className="space-y-6 mt-6">
          <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: themeConfig.colors.foreground }}>🏭 Warehouse Overview</CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Performance metrics and capacity utilization across all locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topWarehouses.map((warehouse, index) => (
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
                        <FiUsers className="h-6 w-6" style={{ color: themeConfig.colors.primary }} />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                          {warehouse.name}
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {warehouse.orders} active orders
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                          {warehouse.capacity}% Capacity
                        </span>
                        <Badge
                          style={{
                            backgroundColor:
                              warehouse.capacity > 80
                                ? `${themeConfig.colors.warning}20`
                                : `${themeConfig.colors.success}20`,
                            color: warehouse.capacity > 80 ? themeConfig.colors.warning : themeConfig.colors.success,
                          }}
                        >
                          {warehouse.efficiency}
                        </Badge>
                      </div>
                      <Progress
                        value={warehouse.capacity}
                        className="h-2 w-24"
                        style={{
                          backgroundColor: `${themeConfig.colors.muted}50`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supply-chain" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>🚚 Supply Chain Metrics</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Key performance indicators for supply chain operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supplyChainMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: themeConfig.colors.foreground }}>{metric.name}</span>
                      <span style={{ color: themeConfig.colors.foreground }}>
                        {metric.value}% / {metric.target}%
                      </span>
                    </div>
                    <Progress
                      value={metric.value}
                      className="h-2"
                      style={{
                        backgroundColor: `${themeConfig.colors.muted}50`,
                      }}
                    />
                    <div className="flex justify-between text-xs">
                      <span style={{ color: themeConfig.colors.foreground }}>Current</span>
                      <span style={{ color: themeConfig.colors.foreground }}>Target: {metric.target}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>📋 Recent Activity</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Latest supply chain operations and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.slice(0, 4).map((activity, index) => (
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

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Delivery Performance", icon: <FiTruck className="h-6 w-6" />, value: "94%", trend: "+2%" },
              { name: "Inventory Accuracy", icon: <FiPackage className="h-6 w-6" />, value: "98.5%", trend: "+1.2%" },
              {
                name: "Order Fulfillment",
                icon: <FiCheckCircle className="h-6 w-6" />,
                value: "96.8%",
                trend: "+3.1%",
              },
              { name: "Cost Efficiency", icon: <FiBarChart2 className="h-6 w-6" />, value: "91.2%", trend: "+0.8%" },
              { name: "Response Time", icon: <FiClock className="h-6 w-6" />, value: "2.3h", trend: "-15min" },
              { name: "Customer Satisfaction", icon: <FiUsers className="h-6 w-6" />, value: "4.8/5", trend: "+0.2" },
            ].map((metric, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div style={{ color: themeConfig.colors.primary }}>{metric.icon}</div>
                      <span style={{ color: themeConfig.colors.foreground }}>{metric.name}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: themeConfig.colors.primary }}>
                      {metric.value}
                    </div>
                    <Badge
                      style={{
                        backgroundColor: `${themeConfig.colors.success}20`,
                        color: themeConfig.colors.success,
                      }}
                    >
                      {metric.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

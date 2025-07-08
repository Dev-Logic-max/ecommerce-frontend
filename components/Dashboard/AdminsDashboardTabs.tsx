"use client"

import type React from "react"
import { useState } from "react"
import { useTheme } from "@/components/theme/AdminsThemeProvider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// React Icons
import {
  FiTrendingUp,
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiActivity,
  FiServer,
  FiDatabase,
  FiCpu,
} from "react-icons/fi"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
}

const StatCard = ({ title, value, change, changeType, icon }: StatCardProps) => {
  const { themeConfig } = useTheme()

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
  const { themeConfig } = useTheme()

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

export function AdminsDashboardTabs() {
  const { themeConfig } = useTheme()
  const [activeTab, setActiveTab] = useState("overview")

  const systemMetrics = [
    { label: "CPU Usage", value: 45, status: "healthy" },
    { label: "Memory Usage", value: 67, status: "warning" },
    { label: "Disk Usage", value: 34, status: "healthy" },
    { label: "Network I/O", value: 89, status: "critical" },
  ]

  const recentActivity = [
    {
      icon: "👤",
      title: "New user registered",
      description: "john.doe@example.com joined the platform",
      time: "2 min ago",
      type: "success" as const,
    },
    {
      icon: "📦",
      title: "Product updated",
      description: "iPhone 15 Pro inventory updated",
      time: "5 min ago",
      type: "info" as const,
    },
    {
      icon: "🛒",
      title: "Large order placed",
      description: "Order #12345 worth $2,500",
      time: "8 min ago",
      type: "success" as const,
    },
    {
      icon: "⚠️",
      title: "System alert",
      description: "High memory usage detected",
      time: "12 min ago",
      type: "warning" as const,
    },
    {
      icon: "🔑",
      title: "API key generated",
      description: "New API key for mobile app",
      time: "15 min ago",
      type: "info" as const,
    },
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
            { value: "performance", label: "⚡ Performance", icon: "⚡" },
            { value: "activity", label: "📋 Activity", icon: "📋" },
            { value: "system", label: "💚 System Health", icon: "💚" },
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
              value="$45,231.89"
              change="+20.1%"
              changeType="positive"
              icon={<FiDollarSign className="h-5 w-5" />}
            />
            <StatCard
              title="Active Users"
              value="2,350"
              change="+15.3%"
              changeType="positive"
              icon={<FiUsers className="h-5 w-5" />}
            />
            <StatCard
              title="Total Orders"
              value="1,234"
              change="+8.2%"
              changeType="positive"
              icon={<FiShoppingBag className="h-5 w-5" />}
            />
            <StatCard
              title="Conversion Rate"
              value="3.24%"
              change="-2.1%"
              changeType="negative"
              icon={<FiTrendingUp className="h-5 w-5" />}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>📈 Platform Metrics</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Key performance indicators for your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Server Uptime", value: "99.9%", status: "success" },
                  { label: "API Calls Today", value: "2.8M", status: "info" },
                  { label: "Error Rate", value: "0.02%", status: "success" },
                  { label: "Avg Response Time", value: "145ms", status: "success" },
                ].map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                      {metric.label}
                    </span>
                    <Badge
                      style={{
                        backgroundColor:
                          metric.status === "success"
                            ? `${themeConfig.colors.success}20`
                            : `${themeConfig.colors.info}20`,
                        color: metric.status === "success" ? themeConfig.colors.success : themeConfig.colors.info,
                      }}
                    >
                      {metric.value}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>🚀 Quick Actions</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Common developer tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: "🔧", label: "System Maintenance" },
                  { icon: "📊", label: "Generate Analytics Report" },
                  { icon: "🔄", label: "Clear Cache" },
                  { icon: "📤", label: "Export Data" },
                  { icon: "🔐", label: "Security Audit" },
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

        <TabsContent value="performance" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>⚡ Performance Metrics</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Real-time system performance monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemMetrics.map((metric, index) => (
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
                <CardTitle style={{ color: themeConfig.colors.foreground }}>📊 Traffic Analytics</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  API and web traffic overview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: themeConfig.colors.primary }}>
                    2.8M
                  </div>
                  <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    Total Requests Today
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold" style={{ color: themeConfig.colors.foreground }}>
                      1.2M
                    </div>
                    <p className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      API Calls
                    </p>
                  </div>
                  <div>
                    <div className="text-xl font-bold" style={{ color: themeConfig.colors.foreground }}>
                      1.6M
                    </div>
                    <p className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Web Requests
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 mt-6">
          <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: themeConfig.colors.foreground }}>📋 Recent Activity</CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Latest system activities and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
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
        </TabsContent>

        <TabsContent value="system" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Database", icon: <FiDatabase className="h-6 w-6" />, status: "healthy", usage: 67 },
              { name: "API Server", icon: <FiServer className="h-6 w-6" />, status: "healthy", usage: 45 },
              { name: "Storage", icon: <FiActivity className="h-6 w-6" />, status: "warning", usage: 89 },
              { name: "Cache", icon: <FiCpu className="h-6 w-6" />, status: "healthy", usage: 34 },
            ].map((service, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div style={{ color: themeConfig.colors.primary }}>{service.icon}</div>
                      <span style={{ color: themeConfig.colors.foreground }}>{service.name}</span>
                    </div>
                    <Badge
                      style={{
                        backgroundColor:
                          service.status === "healthy"
                            ? `${themeConfig.colors.success}20`
                            : `${themeConfig.colors.warning}20`,
                        color: service.status === "healthy" ? themeConfig.colors.success : themeConfig.colors.warning,
                      }}
                    >
                      {service.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: themeConfig.colors.foreground }}>Usage</span>
                      <span style={{ color: themeConfig.colors.foreground }}>{service.usage}%</span>
                    </div>
                    <Progress
                      value={service.usage}
                      className="h-2"
                      style={{
                        backgroundColor: `${themeConfig.colors.muted}50`,
                      }}
                    />
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

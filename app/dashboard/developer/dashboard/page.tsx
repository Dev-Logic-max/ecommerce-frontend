"use client"
import { useTheme } from "@/components/theme/AdminsThemeProvider"
import { AdminsDashboardTabs } from "@/components/Dashboard/AdminsDashboardTabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// React Icons
import {
  FiRefreshCw,
  FiDownload,
  FiTrendingUp,
  FiUsers,
  FiShoppingBag,
  FiPackage,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi"

export default function DeveloperDashboardPage() {
  const { themeConfig } = useTheme()

  // Mock data for dashboard
  const systemStats = {
    totalUsers: 12847,
    activeShops: 342,
    totalProducts: 8934,
    pendingOrders: 156,
    serverUptime: "99.9%",
    apiCalls: 2847392,
    errorRate: "0.02%",
    responseTime: "145ms",
  }

  const quickStats = [
    {
      title: "System Status",
      value: "All Systems Operational",
      icon: <FiCheckCircle className="h-6 w-6" />,
      status: "success",
      description: "All services running smoothly",
    },
    {
      title: "Active Alerts",
      value: "3 Warnings",
      icon: <FiAlertTriangle className="h-6 w-6" />,
      status: "warning",
      description: "Non-critical issues detected",
    },
    {
      title: "API Health",
      value: "98.5% Uptime",
      icon: <FiTrendingUp className="h-6 w-6" />,
      status: "success",
      description: "Excellent performance",
    },
    {
      title: "Database",
      value: "Optimized",
      icon: <FiPackage className="h-6 w-6" />,
      status: "success",
      description: "Query performance optimal",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
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
    <div className="min-h-screen p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{
              color: themeConfig.colors.foreground,
              textShadow: `0 2px 4px ${themeConfig.colors.primary}20`,
            }}
          >
            Developer Dashboard
          </h1>
          <p className="text-lg opacity-80" style={{ color: themeConfig.colors.foreground }}>
            Monitor, manage, and optimize your ecommerce platform
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge
              className="px-3 py-1"
              style={{
                backgroundColor: `${themeConfig.colors.success}20`,
                color: themeConfig.colors.success,
              }}
            >
              🟢 System Healthy
            </Badge>
            <Badge
              className="px-3 py-1"
              style={{
                backgroundColor: `${themeConfig.colors.info}20`,
                color: themeConfig.colors.info,
              }}
            >
              🚀 v2.1.0
            </Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="lg"
            className="transition-all duration-300 hover:scale-105 hover:shadow-lg bg-transparent"
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
            <FiDownload className="mr-2 h-5 w-5" />📊 Generate Report
          </Button>
          <Button
            size="lg"
            className="transition-all duration-300 hover:scale-105 hover:shadow-xl text-white font-semibold"
            style={{
              background: themeConfig.gradient,
            }}
          >
            <FiRefreshCw className="mr-2 h-5 w-5" />🔄 Refresh Data
          </Button>
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer group border-2"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${getStatusColor(stat.status)}50`
              e.currentTarget.style.boxShadow = `0 25px 50px -12px ${getStatusColor(stat.status)}30`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = themeConfig.colors.border
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                {stat.title}
              </CardTitle>
              <div
                className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  backgroundColor: `${getStatusColor(stat.status)}20`,
                  color: getStatusColor(stat.status),
                }}
              >
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1" style={{ color: themeConfig.colors.foreground }}>
                {stat.value}
              </div>
              <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
              Total Users
            </CardTitle>
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.primary}20` }}>
              <FiUsers className="h-5 w-5" style={{ color: themeConfig.colors.primary }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: themeConfig.colors.foreground }}>
              {systemStats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs flex items-center gap-1 mt-2">
              <span style={{ color: themeConfig.colors.success }}>↗️ +12%</span>
              <span className="opacity-70" style={{ color: themeConfig.colors.foreground }}>
                from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card
          className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
              Active Shops
            </CardTitle>
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.accent}20` }}>
              <FiShoppingBag className="h-5 w-5" style={{ color: themeConfig.colors.accent }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: themeConfig.colors.foreground }}>
              {systemStats.activeShops}
            </div>
            <p className="text-xs flex items-center gap-1 mt-2">
              <span style={{ color: themeConfig.colors.success }}>↗️ +8%</span>
              <span className="opacity-70" style={{ color: themeConfig.colors.foreground }}>
                from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card
          className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
              Total Products
            </CardTitle>
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.success}20` }}>
              <FiPackage className="h-5 w-5" style={{ color: themeConfig.colors.success }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: themeConfig.colors.foreground }}>
              {systemStats.totalProducts.toLocaleString()}
            </div>
            <p className="text-xs flex items-center gap-1 mt-2">
              <span style={{ color: themeConfig.colors.success }}>↗️ +15%</span>
              <span className="opacity-70" style={{ color: themeConfig.colors.foreground }}>
                from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card
          className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
              Pending Orders
            </CardTitle>
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.warning}20` }}>
              <FiAlertTriangle className="h-5 w-5" style={{ color: themeConfig.colors.warning }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: themeConfig.colors.foreground }}>
              {systemStats.pendingOrders}
            </div>
            <p className="text-xs flex items-center gap-1 mt-2">
              <span style={{ color: themeConfig.colors.danger }}>↘️ -5%</span>
              <span className="opacity-70" style={{ color: themeConfig.colors.foreground }}>
                from yesterday
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Tabs */}
      <AdminsDashboardTabs />

      {/* Footer Info */}
      <div className="text-center py-8 border-t" style={{ borderColor: themeConfig.colors.border }}>
        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
          Last updated: {new Date().toLocaleString()} • Server: {systemStats.serverUptime} uptime
        </p>
      </div>
    </div>
  )
}

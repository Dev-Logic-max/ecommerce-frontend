"use client"

import { useState, useEffect } from "react"
import {
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiShoppingBag,
  FiActivity,
  FiCalendar,
  FiDownload,
} from "react-icons/fi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme/AdminsThemeProvider"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Mock data generators
const generateChartData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return months.map((month) => ({
    month,
    revenue: Math.floor(Math.random() * 50000) + 20000,
    users: Math.floor(Math.random() * 1000) + 500,
    orders: Math.floor(Math.random() * 500) + 200,
    conversion: Math.floor(Math.random() * 10) + 2,
  }))
}

const generateRealtimeData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    activeUsers: Math.floor(Math.random() * 200) + 50,
    pageViews: Math.floor(Math.random() * 1000) + 300,
    apiCalls: Math.floor(Math.random() * 5000) + 1000,
  }))
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")
  const [chartData] = useState(generateChartData())
  const [realtimeData] = useState(generateRealtimeData())
  const { themeConfig } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 2847392,
      totalUsers: 12847,
      totalOrders: 8934,
      conversionRate: 3.24,
      growth: {
        revenue: 12.5,
        users: 8.3,
        orders: 15.7,
        conversion: -2.1,
      },
    },
    performance: {
      pageLoadTime: 1.2,
      apiResponseTime: 145,
      uptime: 99.9,
      errorRate: 0.02,
    },
    traffic: {
      organic: 45,
      direct: 25,
      social: 15,
      referral: 10,
      email: 5,
    },
    topPages: [
      { page: "/dashboard", views: 15420, bounce: 23.5 },
      { page: "/products", views: 12380, bounce: 31.2 },
      { page: "/orders", views: 9870, bounce: 28.7 },
      { page: "/analytics", views: 7650, bounce: 19.8 },
      { page: "/settings", views: 5430, bounce: 42.1 },
    ],
    devices: {
      desktop: 65,
      mobile: 28,
      tablet: 7,
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6 space-y-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight gradient-text">Analytics Dashboard</h1>
          <p className="text-lg opacity-80" style={{ color: themeConfig.colors.foreground }}>
            Comprehensive insights into your platform performance
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <FiCalendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="lg"
            className="transition-all duration-300 hover:scale-105 hover:shadow-lg bg-transparent"
            style={{
              borderColor: themeConfig.colors.border,
              color: themeConfig.colors.foreground,
            }}
          >
            <FiDownload className="mr-2 h-5 w-5" />
            Export Report
          </Button>
          <Button
            size="lg"
            className="transition-all duration-300 hover:scale-105 hover:shadow-xl text-white font-semibold"
            style={{
              background: themeConfig.gradient,
            }}
          >
            <FiActivity className="mr-2 h-5 w-5" />
            Real-time View
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Revenue",
            value: `$${analyticsData.overview.totalRevenue.toLocaleString()}`,
            change: analyticsData.overview.growth.revenue,
            icon: FiDollarSign,
            color: themeConfig.colors.success,
          },
          {
            title: "Active Users",
            value: analyticsData.overview.totalUsers.toLocaleString(),
            change: analyticsData.overview.growth.users,
            icon: FiUsers,
            color: themeConfig.colors.info,
          },
          {
            title: "Total Orders",
            value: analyticsData.overview.totalOrders.toLocaleString(),
            change: analyticsData.overview.growth.orders,
            icon: FiShoppingBag,
            color: themeConfig.colors.warning,
          },
          {
            title: "Conversion Rate",
            value: `${analyticsData.overview.conversionRate}%`,
            change: analyticsData.overview.growth.conversion,
            icon: FiTrendingUp,
            color: themeConfig.colors.danger,
          },
        ].map((metric, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer group border-2 card-hover"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                {metric.title}
              </CardTitle>
              <div
                className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  backgroundColor: `${metric.color}20`,
                  color: metric.color,
                }}
              >
                <metric.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2" style={{ color: themeConfig.colors.foreground }}>
                {metric.value}
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-medium", metric.change >= 0 ? "text-green-500" : "text-red-500")}>
                  {metric.change >= 0 ? "↗️" : "↘️"} {Math.abs(metric.change)}%
                </span>
                <span className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  vs last period
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList
          className="grid w-full grid-cols-4 p-1 rounded-xl"
          style={{
            backgroundColor: themeConfig.colors.muted,
          }}
        >
          {[
            { value: "overview", label: "Overview", icon: FiBarChart2 },
            { value: "traffic", label: "Traffic", icon: FiUsers },
            { value: "performance", label: "Performance", icon: FiActivity },
            { value: "realtime", label: "Real-time", icon: FiTrendingUp },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="transition-all duration-300 rounded-lg font-medium data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]"
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card
              className="shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
              }}
            >
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>Revenue Trend</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Monthly revenue performance over the year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between gap-2">
                  {chartData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                        style={{
                          height: `${(data.revenue / 70000) * 100}%`,
                          background: themeConfig.gradient,
                          minHeight: "20px",
                        }}
                        title={`${data.month}: $${data.revenue.toLocaleString()}`}
                      />
                      <span className="text-xs font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {data.month}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Pages */}
            <Card
              className="shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
              }}
            >
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>Top Pages</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Most visited pages and their performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.topPages.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {page.page}
                      </div>
                      <div className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                        {page.views.toLocaleString()} views
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className="text-xs"
                        style={{
                          backgroundColor:
                            page.bounce < 30 ? `${themeConfig.colors.success}20` : `${themeConfig.colors.warning}20`,
                          color: page.bounce < 30 ? themeConfig.colors.success : themeConfig.colors.warning,
                        }}
                      >
                        {page.bounce}% bounce
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Device Analytics */}
          <Card
            className="shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: themeConfig.colors.foreground }}>Device Analytics</CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                User device distribution and usage patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(analyticsData.devices).map(([device, percentage]) => (
                  <div key={device} className="text-center space-y-3">
                    <div className="text-4xl">{device === "desktop" ? "🖥️" : device === "mobile" ? "📱" : "📱"}</div>
                    <div>
                      <div className="text-2xl font-bold" style={{ color: themeConfig.colors.foreground }}>
                        {percentage}%
                      </div>
                      <div className="text-sm opacity-70 capitalize" style={{ color: themeConfig.colors.foreground }}>
                        {device}
                      </div>
                    </div>
                    <Progress
                      value={percentage}
                      className="h-2"
                      style={{
                        backgroundColor: `${themeConfig.colors.primary}20`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card
              className="shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
              }}
            >
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>Traffic Sources</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Where your visitors are coming from
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(analyticsData.traffic).map(([source, percentage]) => (
                  <div key={source} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="capitalize font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {source}
                      </span>
                      <span style={{ color: themeConfig.colors.foreground }}>{percentage}%</span>
                    </div>
                    <Progress
                      value={percentage}
                      className="h-3"
                      style={{
                        backgroundColor: `${themeConfig.colors.muted}50`,
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card
              className="shadow-xl"
              style={{
                backgroundColor: themeConfig.colors.card,
                borderColor: themeConfig.colors.border,
              }}
            >
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>User Engagement</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  How users interact with your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Average Session Duration", value: "4m 32s", icon: "⏱️" },
                  { label: "Pages per Session", value: "3.2", icon: "📄" },
                  { label: "Return Visitor Rate", value: "68%", icon: "🔄" },
                  { label: "New vs Returning", value: "32% / 68%", icon: "👥" },
                ].map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{metric.icon}</span>
                      <span className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {metric.label}
                      </span>
                    </div>
                    <span className="font-bold text-lg" style={{ color: themeConfig.colors.primary }}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Page Load Time",
                value: `${analyticsData.performance.pageLoadTime}s`,
                status: "good",
                icon: "⚡",
              },
              {
                title: "API Response Time",
                value: `${analyticsData.performance.apiResponseTime}ms`,
                status: "good",
                icon: "🔧",
              },
              {
                title: "Uptime",
                value: `${analyticsData.performance.uptime}%`,
                status: "excellent",
                icon: "🟢",
              },
              {
                title: "Error Rate",
                value: `${analyticsData.performance.errorRate}%`,
                status: "excellent",
                icon: "🛡️",
              },
            ].map((metric, index) => (
              <Card
                key={index}
                className="shadow-xl card-hover"
                style={{
                  backgroundColor: themeConfig.colors.card,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{metric.icon}</div>
                  <CardTitle className="text-sm" style={{ color: themeConfig.colors.foreground }}>
                    {metric.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: themeConfig.colors.foreground }}>
                    {metric.value}
                  </div>
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor:
                        metric.status === "excellent"
                          ? `${themeConfig.colors.success}20`
                          : `${themeConfig.colors.info}20`,
                      color: metric.status === "excellent" ? themeConfig.colors.success : themeConfig.colors.info,
                    }}
                  >
                    {metric.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <Card
            className="shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: themeConfig.colors.foreground }}>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                Real-time Activity
              </CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Live data from the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {[
                  { label: "Active Users", value: "1,247", change: "+12%" },
                  { label: "Page Views", value: "8,934", change: "+8%" },
                  { label: "API Calls", value: "45,231", change: "+15%" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg"
                    style={{ backgroundColor: `${themeConfig.colors.primary}10` }}
                  >
                    <div className="text-3xl font-bold mb-1" style={{ color: themeConfig.colors.foreground }}>
                      {stat.value}
                    </div>
                    <div className="text-sm opacity-70 mb-2" style={{ color: themeConfig.colors.foreground }}>
                      {stat.label}
                    </div>
                    <Badge
                      className="text-xs"
                      style={{
                        backgroundColor: `${themeConfig.colors.success}20`,
                        color: themeConfig.colors.success,
                      }}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="h-64 flex items-end justify-between gap-1">
                {realtimeData.slice(-12).map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{
                        height: `${(data.activeUsers / 250) * 100}%`,
                        background: themeConfig.gradient,
                        minHeight: "10px",
                      }}
                      title={`${data.hour}: ${data.activeUsers} users`}
                    />
                    <span className="text-xs" style={{ color: themeConfig.colors.foreground }}>
                      {data.hour}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

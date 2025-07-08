"use client"
import { useState } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// React Icons
import { FiDollarSign, FiTrendingUp, FiShoppingBag, FiBarChart, FiActivity } from "react-icons/fi"

interface SalesDetailsModalProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SalesDetailsModal({ trigger, open, onOpenChange }: SalesDetailsModalProps) {
  const { themeConfig } = useAdminTheme()
  const [activeTab, setActiveTab] = useState("overview")

  const salesData = {
    totalRevenue: "$45,678.90",
    totalOrders: 1234,
    avgOrderValue: "$37.02",
    conversionRate: "3.24%",
    growth: "+18.2%",
  }

  const topProducts = [
    { name: "iPhone 15 Pro", sales: 234, revenue: "$234,000", trend: "+12%" },
    { name: "Samsung Galaxy S24", sales: 189, revenue: "$189,000", trend: "+8%" },
    { name: "MacBook Air M3", sales: 156, revenue: "$312,000", trend: "+15%" },
    { name: "AirPods Pro", sales: 298, revenue: "$89,400", trend: "+22%" },
    { name: "iPad Pro", sales: 134, revenue: "$134,000", trend: "+5%" },
  ]

  const salesByPeriod = [
    { period: "Today", revenue: "$2,345", orders: 45, growth: "+12%" },
    { period: "This Week", revenue: "$16,789", orders: 312, growth: "+8%" },
    { period: "This Month", revenue: "$45,678", orders: 1234, growth: "+18%" },
    { period: "This Quarter", revenue: "$134,567", orders: 3456, growth: "+25%" },
  ]

  const customerSegments = [
    { segment: "New Customers", count: 234, percentage: 19, revenue: "$8,900" },
    { segment: "Returning Customers", count: 567, percentage: 46, revenue: "$21,300" },
    { segment: "VIP Customers", count: 89, percentage: 7, revenue: "$15,400" },
    { segment: "Inactive Customers", count: 344, percentage: 28, revenue: "$0" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="sm:max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        style={{
          backgroundColor: themeConfig.colors.background,
          borderColor: themeConfig.colors.border,
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <div
              className="p-2 rounded-lg"
              style={{
                background: themeConfig.gradient,
                color: "white",
              }}
            >
              <FiDollarSign className="h-6 w-6" />
            </div>
            Sales Analytics Dashboard
          </DialogTitle>
          <DialogDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
            Comprehensive sales performance and revenue analytics
          </DialogDescription>
        </DialogHeader>

        {/* Sales Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              label: "Total Revenue",
              value: salesData.totalRevenue,
              icon: <FiDollarSign className="h-5 w-5" />,
              color: themeConfig.colors.success,
            },
            {
              label: "Total Orders",
              value: salesData.totalOrders,
              icon: <FiShoppingBag className="h-5 w-5" />,
              color: themeConfig.colors.primary,
            },
            {
              label: "Avg Order Value",
              value: salesData.avgOrderValue,
              icon: <FiBarChart className="h-5 w-5" />,
              color: themeConfig.colors.secondary,
            },
            {
              label: "Conversion Rate",
              value: salesData.conversionRate,
              icon: <FiTrendingUp className="h-5 w-5" />,
              color: themeConfig.colors.info,
            },
            {
              label: "Growth",
              value: salesData.growth,
              icon: <FiActivity className="h-5 w-5" />,
              color: themeConfig.colors.success,
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div style={{ color: stat.color }}>{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: themeConfig.colors.foreground }}>
                  {stat.value}
                </div>
                <p className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className="grid w-full grid-cols-4 p-1 rounded-xl"
            style={{ backgroundColor: themeConfig.colors.muted }}
          >
            {[
              { value: "overview", label: "📊 Overview" },
              { value: "products", label: "📦 Products" },
              { value: "customers", label: "👥 Customers" },
              { value: "trends", label: "📈 Trends" },
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
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales by Period */}
              <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
                <CardHeader>
                  <CardTitle style={{ color: themeConfig.colors.foreground }}>📅 Sales by Period</CardTitle>
                  <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                    Revenue breakdown across different time periods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {salesByPeriod.map((period, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: `${themeConfig.colors.muted}50` }}
                    >
                      <div>
                        <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                          {period.period}
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {period.orders} orders
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold" style={{ color: themeConfig.colors.foreground }}>
                          {period.revenue}
                        </p>
                        <Badge
                          style={{
                            backgroundColor: `${themeConfig.colors.success}20`,
                            color: themeConfig.colors.success,
                          }}
                        >
                          {period.growth}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
                <CardHeader>
                  <CardTitle style={{ color: themeConfig.colors.foreground }}>🏆 Top Performing Products</CardTitle>
                  <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                    Best selling products by revenue
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topProducts.slice(0, 4).map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: `${themeConfig.colors.muted}50` }}
                    >
                      <div>
                        <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                          {product.name}
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {product.sales} units sold
                        </p>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6 mt-6">
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>📦 Product Performance</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Detailed breakdown of all product sales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                      style={{
                        backgroundColor: `${themeConfig.colors.muted}50`,
                        borderColor: themeConfig.colors.border,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold" style={{ color: themeConfig.colors.primary }}>
                          #{index + 1}
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
                        <p className="text-xl font-bold" style={{ color: themeConfig.colors.foreground }}>
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
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>👥 Customer Segments</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Customer distribution and revenue contribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border"
                      style={{
                        backgroundColor: `${themeConfig.colors.muted}50`,
                        borderColor: themeConfig.colors.border,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                          {segment.segment}
                        </h4>
                        <span className="font-bold" style={{ color: themeConfig.colors.foreground }}>
                          {segment.revenue}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span style={{ color: themeConfig.colors.foreground }}>{segment.count} customers</span>
                        <span style={{ color: themeConfig.colors.foreground }}>{segment.percentage}%</span>
                      </div>
                      <Progress
                        value={segment.percentage}
                        className="h-2"
                        style={{ backgroundColor: `${themeConfig.colors.muted}50` }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Revenue Growth", value: "+18.2%", description: "vs last month" },
                { name: "Order Volume", value: "+12.5%", description: "vs last month" },
                { name: "Customer Acquisition", value: "+8.1%", description: "new customers" },
              ].map((trend, index) => (
                <Card
                  key={index}
                  className="transition-all duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: themeConfig.colors.success }}>
                      {trend.value}
                    </div>
                    <h3 className="font-medium mb-1" style={{ color: themeConfig.colors.foreground }}>
                      {trend.name}
                    </h3>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      {trend.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t" style={{ borderColor: themeConfig.colors.border }}>
          <Button
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            style={{
              borderColor: themeConfig.colors.border,
              color: themeConfig.colors.foreground,
            }}
          >
            Close
          </Button>
          <Button style={{ background: themeConfig.gradient, color: "white" }}>Export Report</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

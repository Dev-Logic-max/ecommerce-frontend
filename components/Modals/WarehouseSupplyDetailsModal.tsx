"use client"
import { useState } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// React Icons
import { FiBarChart, FiPackage, FiMapPin, FiClock, FiCheckCircle, FiActivity } from "react-icons/fi"
// import { GiWarehouse } from "react-icons/gi"
import { LiaWarehouseSolid } from "react-icons/lia";

interface WarehouseSupplyDetailsModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  warehouse?: any
}

export function WarehouseSupplyDetailsModal({ open, onOpenChange, warehouse }: WarehouseSupplyDetailsModalProps) {
  const { themeConfig } = useAdminTheme()
  const [activeTab, setActiveTab] = useState("overview")

  if (!warehouse) return null

  const supplyMetrics = [
    { label: "Inbound Shipments", value: 45, target: 50, status: "warning" },
    { label: "Outbound Deliveries", value: 38, target: 35, status: "success" },
    { label: "Processing Time", value: 92, target: 90, status: "success" },
    { label: "Quality Control", value: 98, target: 95, status: "success" },
  ]

  const recentActivity = [
    {
      icon: "📦",
      title: "Bulk shipment received",
      description: "2,500 units from Supplier ABC",
      time: "15 min ago",
      type: "success" as const,
    },
    {
      icon: "🚚",
      title: "Delivery dispatched",
      description: "Order #WH-2024-001 to Retailer XYZ",
      time: "32 min ago",
      type: "info" as const,
    },
    {
      icon: "⚠️",
      title: "Low stock alert",
      description: "Electronics section below threshold",
      time: "1 hour ago",
      type: "warning" as const,
    },
    {
      icon: "✅",
      title: "Quality check completed",
      description: "Batch #B2024-089 approved",
      time: "2 hours ago",
      type: "success" as const,
    },
  ]

  const inventoryCategories = [
    { name: "Electronics", stock: 2450, capacity: 3000, value: "$245K", trend: "+12%" },
    { name: "Fashion", stock: 1800, capacity: 2500, value: "$180K", trend: "+8%" },
    { name: "Home & Garden", stock: 1200, capacity: 2000, value: "$120K", trend: "+15%" },
    { name: "Sports", stock: 950, capacity: 1500, value: "$95K", trend: "+5%" },
    { name: "Books", stock: 600, capacity: 1000, value: "$60K", trend: "+3%" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-6xl max-h-[90vh] overflow-y-auto custom-scrollbar"
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
              <FiBarChart className="h-6 w-6" />
            </div>
            Warehouse Supply Details
          </DialogTitle>
          <DialogDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
            Comprehensive supply chain analytics and operational metrics for {warehouse.name}
          </DialogDescription>
        </DialogHeader>

        {/* Warehouse Header Info */}
        <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${themeConfig.colors.primary}20` }}>
                  <LiaWarehouseSolid className="h-8 w-8" style={{ color: themeConfig.colors.primary }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: themeConfig.colors.foreground }}>
                    {warehouse.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <FiMapPin className="h-4 w-4 opacity-60" />
                    <span className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      {warehouse.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  className="mb-2"
                  style={{
                    backgroundColor:
                      warehouse.status === "active"
                        ? `${themeConfig.colors.success}20`
                        : `${themeConfig.colors.warning}20`,
                    color:
                      warehouse.status === "active"
                        ? themeConfig.colors.success
                        : themeConfig.colors
                          ? themeConfig.colors.success
                          : themeConfig.colors.warning,
                  }}
                >
                  {warehouse.status?.toUpperCase()}
                </Badge>
                <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  Manager: {warehouse.manager}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: themeConfig.colors.primary }}>
                  {warehouse.currentStock}
                </div>
                <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  Current Stock
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: themeConfig.colors.secondary }}>
                  {warehouse.orders}
                </div>
                <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  Active Orders
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: themeConfig.colors.success }}>
                  {warehouse.efficiency}%
                </div>
                <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  Efficiency
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: themeConfig.colors.info }}>
                  {warehouse.revenue}
                </div>
                <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  Revenue
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className="grid w-full grid-cols-4 p-1 rounded-xl"
            style={{ backgroundColor: themeConfig.colors.muted }}
          >
            {[
              { value: "overview", label: "📊 Overview" },
              { value: "inventory", label: "📦 Inventory" },
              { value: "operations", label: "🚚 Operations" },
              { value: "analytics", label: "📈 Analytics" },
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
              {/* Supply Metrics */}
              <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
                <CardHeader>
                  <CardTitle style={{ color: themeConfig.colors.foreground }}>🚚 Supply Chain Metrics</CardTitle>
                  <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                    Key performance indicators for supply operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supplyMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: themeConfig.colors.foreground }}>{metric.label}</span>
                        <span style={{ color: themeConfig.colors.foreground }}>
                          {metric.value} / {metric.target}
                        </span>
                      </div>
                      <Progress
                        value={(metric.value / metric.target) * 100}
                        className="h-2"
                        style={{ backgroundColor: `${themeConfig.colors.muted}50` }}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
                <CardHeader>
                  <CardTitle style={{ color: themeConfig.colors.foreground }}>📋 Recent Activity</CardTitle>
                  <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                    Latest warehouse operations and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-3 rounded-lg transition-all duration-200"
                        style={{ backgroundColor: `${themeConfig.colors.muted}50` }}
                      >
                        <span className="text-lg">{activity.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm" style={{ color: themeConfig.colors.foreground }}>
                            {activity.title}
                          </h4>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            {activity.description}
                          </p>
                        </div>
                        <span className="text-xs opacity-50" style={{ color: themeConfig.colors.foreground }}>
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6 mt-6">
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>📦 Inventory by Category</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Stock levels and capacity utilization across product categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg"
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
                            {category.name}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            {category.stock} / {category.capacity} units
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold" style={{ color: themeConfig.colors.foreground }}>
                            {category.value}
                          </span>
                          <Badge
                            style={{
                              backgroundColor: `${themeConfig.colors.success}20`,
                              color: themeConfig.colors.success,
                            }}
                          >
                            {category.trend}
                          </Badge>
                        </div>
                        <Progress
                          value={(category.stock / category.capacity) * 100}
                          className="h-2 w-24"
                          style={{ backgroundColor: `${themeConfig.colors.muted}50` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
                <CardHeader>
                  <CardTitle style={{ color: themeConfig.colors.foreground }}>🚚 Operational Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span style={{ color: themeConfig.colors.foreground }}>Inbound Processing</span>
                    <Badge
                      style={{ backgroundColor: `${themeConfig.colors.success}20`, color: themeConfig.colors.success }}
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: themeConfig.colors.foreground }}>Outbound Shipping</span>
                    <Badge
                      style={{ backgroundColor: `${themeConfig.colors.success}20`, color: themeConfig.colors.success }}
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: themeConfig.colors.foreground }}>Quality Control</span>
                    <Badge
                      style={{ backgroundColor: `${themeConfig.colors.warning}20`, color: themeConfig.colors.warning }}
                    >
                      Scheduled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: themeConfig.colors.foreground }}>Maintenance</span>
                    <Badge style={{ backgroundColor: `${themeConfig.colors.info}20`, color: themeConfig.colors.info }}>
                      Planned
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
                <CardHeader>
                  <CardTitle style={{ color: themeConfig.colors.foreground }}>⏰ Operating Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
                    { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span style={{ color: themeConfig.colors.foreground }}>{schedule.day}</span>
                      <span className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Throughput Rate", icon: <FiActivity className="h-6 w-6" />, value: "94%", trend: "+2%" },
                { name: "Order Accuracy", icon: <FiCheckCircle className="h-6 w-6" />, value: "98.5%", trend: "+1.2%" },
                { name: "Processing Time", icon: <FiClock className="h-6 w-6" />, value: "2.3h", trend: "-15min" },
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

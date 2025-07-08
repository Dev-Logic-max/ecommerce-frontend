"use client"
import { useState } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// React Icons
import { FiShoppingBag, FiPackage, FiTruck, FiSearch, FiFilter, FiEye, FiMapPin, FiUser } from "react-icons/fi"

interface OrdersDetailsModalProps {
  trigger? : React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function OrdersDetailsModal({ trigger, open, onOpenChange }: OrdersDetailsModalProps) {
  const { themeConfig } = useAdminTheme()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const orders = [
    {
      id: "ORD-2024-001",
      customer: "John Doe",
      email: "john@example.com",
      total: "$234.50",
      status: "delivered",
      items: 3,
      date: "2024-01-15",
      address: "123 Main St, New York, NY",
      paymentMethod: "Credit Card",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-2024-002",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      total: "$156.75",
      status: "shipped",
      items: 2,
      date: "2024-01-14",
      address: "456 Oak Ave, Los Angeles, CA",
      paymentMethod: "PayPal",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-2024-003",
      customer: "Mike Wilson",
      email: "mike@example.com",
      total: "$89.99",
      status: "processing",
      items: 1,
      date: "2024-01-13",
      address: "789 Pine St, Chicago, IL",
      paymentMethod: "Credit Card",
      trackingNumber: null,
    },
    {
      id: "ORD-2024-004",
      customer: "Emily Davis",
      email: "emily@example.com",
      total: "$445.20",
      status: "pending",
      items: 5,
      date: "2024-01-12",
      address: "321 Elm St, Houston, TX",
      paymentMethod: "Bank Transfer",
      trackingNumber: null,
    },
    {
      id: "ORD-2024-005",
      customer: "David Brown",
      email: "david@example.com",
      total: "$67.30",
      status: "cancelled",
      items: 1,
      date: "2024-01-11",
      address: "654 Maple Dr, Phoenix, AZ",
      paymentMethod: "Credit Card",
      trackingNumber: null,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return themeConfig.colors.success
      case "shipped":
        return themeConfig.colors.info
      case "processing":
        return themeConfig.colors.warning
      case "pending":
        return themeConfig.colors.secondary
      case "cancelled":
        return themeConfig.colors.danger
      default:
        return themeConfig.colors.muted
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return "✅"
      case "shipped":
        return "🚚"
      case "processing":
        return "⚙️"
      case "pending":
        return "⏳"
      case "cancelled":
        return "❌"
      default:
        return "📦"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && order.status === activeTab
  })

  const getTabCount = (status: string) => {
    if (status === "all") return orders.length
    return orders.filter((o) => o.status === status).length
  }

  const orderStats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    processing: orders.filter((o) => o.status === "processing").length,
    pending: orders.filter((o) => o.status === "pending").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

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
              <FiShoppingBag className="h-6 w-6" />
            </div>
            Orders Management
          </DialogTitle>
          <DialogDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
            Comprehensive order tracking and management dashboard
          </DialogDescription>
        </DialogHeader>

        {/* Order Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: "Total", value: orderStats.total, color: themeConfig.colors.primary },
            { label: "Delivered", value: orderStats.delivered, color: themeConfig.colors.success },
            { label: "Shipped", value: orderStats.shipped, color: themeConfig.colors.info },
            { label: "Processing", value: orderStats.processing, color: themeConfig.colors.warning },
            { label: "Pending", value: orderStats.pending, color: themeConfig.colors.secondary },
            { label: "Cancelled", value: orderStats.cancelled, color: themeConfig.colors.danger },
          ].map((stat, index) => (
            <Card
              key={index}
              className="transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <p className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
            <Input
              placeholder="Search orders by ID, customer, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            style={{
              borderColor: themeConfig.colors.border,
              color: themeConfig.colors.foreground,
            }}
          >
            <FiFilter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className="grid w-full grid-cols-6 p-1 rounded-xl"
            style={{ backgroundColor: themeConfig.colors.muted }}
          >
            {[
              { value: "all", label: "All", count: getTabCount("all") },
              { value: "delivered", label: "Delivered", count: getTabCount("delivered") },
              { value: "shipped", label: "Shipped", count: getTabCount("shipped") },
              { value: "processing", label: "Processing", count: getTabCount("processing") },
              { value: "pending", label: "Pending", count: getTabCount("pending") },
              { value: "cancelled", label: "Cancelled", count: getTabCount("cancelled") },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "transition-all duration-300 rounded-lg font-medium text-xs",
                  "data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]",
                )}
                style={{
                  color: activeTab === tab.value ? "white" : themeConfig.colors.foreground,
                  backgroundColor: activeTab === tab.value ? themeConfig.colors.primary : "transparent",
                }}
              >
                {tab.label} ({tab.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredOrders.length === 0 ? (
              <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
                <CardContent className="text-center py-12">
                  <FiShoppingBag
                    className="h-16 w-16 mx-auto mb-4 opacity-50"
                    style={{ color: themeConfig.colors.foreground }}
                  />
                  <h3 className="text-lg font-semibold mb-2" style={{ color: themeConfig.colors.foreground }}>
                    No orders found
                  </h3>
                  <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    {searchQuery ? "Try adjusting your search criteria" : "No orders match the selected status"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card
                    key={order.id}
                    className="transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                    style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="p-3 rounded-xl"
                            style={{ backgroundColor: `${getStatusColor(order.status)}20` }}
                          >
                            <span className="text-lg">{getStatusIcon(order.status)}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg" style={{ color: themeConfig.colors.foreground }}>
                              {order.id}
                            </h3>
                            <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                              {order.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            style={{
                              backgroundColor: `${getStatusColor(order.status)}20`,
                              color: getStatusColor(order.status),
                            }}
                          >
                            {order.status.toUpperCase()}
                          </Badge>
                          <p className="text-xl font-bold mt-1" style={{ color: themeConfig.colors.foreground }}>
                            {order.total}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <FiUser className="h-4 w-4 opacity-60" style={{ color: themeConfig.colors.foreground }} />
                          <div>
                            <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                              {order.customer}
                            </p>
                            <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                              {order.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <FiMapPin className="h-4 w-4 opacity-60" style={{ color: themeConfig.colors.foreground }} />
                          <div>
                            <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                              Delivery Address
                            </p>
                            <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                              {order.address}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <FiPackage className="h-4 w-4 opacity-60" style={{ color: themeConfig.colors.foreground }} />
                          <div>
                            <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                              {order.items} Items
                            </p>
                            <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                              {order.paymentMethod}
                            </p>
                          </div>
                        </div>
                      </div>

                      {order.trackingNumber && (
                        <div
                          className="flex items-center gap-3 mb-4 p-3 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.info}10` }}
                        >
                          <FiTruck className="h-4 w-4" style={{ color: themeConfig.colors.info }} />
                          <div>
                            <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                              Tracking Number: {order.trackingNumber}
                            </p>
                            <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                              Track your package
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          style={{
                            borderColor: themeConfig.colors.border,
                            color: themeConfig.colors.foreground,
                          }}
                        >
                          <FiEye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        {order.status === "pending" && (
                          <Button size="sm" style={{ background: themeConfig.gradient, color: "white" }}>
                            Process Order
                          </Button>
                        )}
                        {order.status === "processing" && (
                          <Button size="sm" style={{ background: themeConfig.gradient, color: "white" }}>
                            Mark as Shipped
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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
          <Button style={{ background: themeConfig.gradient, color: "white" }}>Export Orders</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

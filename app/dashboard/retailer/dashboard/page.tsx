"use client"

import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { RetailerDashboardTabs } from "@/components/Dashboard/RetailerDashboardTabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// React Icons
import {
  FiRefreshCw,
  FiDownload,
  FiTrendingUp,
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiStar,
  FiAlertTriangle,
} from "react-icons/fi"

export default function RetailerDashboardPage() {
  const { themeConfig } = useAdminTheme()

  // Mock data for retailer dashboard
  const retailerStats = {
    totalRevenue: 12847.89,
    totalOrders: 1234,
    activeCustomers: 856,
    averageRating: 4.8,
    conversionRate: 3.24,
    returnRate: 2.1,
    inventoryValue: 45230,
    lowStockItems: 12,
  }

  const quickStats = [
    {
      title: "Shop Status",
      value: "3 Active Shops",
      icon: <FiShoppingBag className="h-6 w-6" />,
      status: "success",
      description: "All shops operational",
    },
    {
      title: "Pending Orders",
      value: "15 Orders",
      icon: <FiPackage className="h-6 w-6" />,
      status: "warning",
      description: "Require immediate attention",
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5 Rating",
      icon: <FiStar className="h-6 w-6" />,
      status: "success",
      description: "Excellent customer feedback",
    },
    {
      title: "Inventory Status",
      value: "12 Low Stock",
      icon: <FiAlertTriangle className="h-6 w-6" />,
      status: "warning",
      description: "Items need restocking",
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
            Retailer Dashboard
          </h1>
          <p className="text-lg opacity-80" style={{ color: themeConfig.colors.foreground }}>
            Manage your shops, products, and customer relationships
          </p>
          <div className="flex items-center gap-2 mt-3">
            <Badge
              className="px-3 py-1"
              style={{
                backgroundColor: `${themeConfig.colors.success}20`,
                color: themeConfig.colors.success,
              }}
            >
              🟢 All Systems Online
            </Badge>
            <Badge
              className="px-3 py-1"
              style={{
                backgroundColor: `${themeConfig.colors.info}20`,
                color: themeConfig.colors.info,
              }}
            >
              🏪 3 Active Shops
            </Badge>
            <Badge
              className="px-3 py-1"
              style={{
                backgroundColor: `${themeConfig.colors.warning}20`,
                color: themeConfig.colors.warning,
              }}
            >
              📦 15 Pending Orders
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
            <FiDownload className="mr-2 h-5 w-5" />📊 Sales Report
          </Button>
          <Button
            size="lg"
            className="transition-all duration-300 hover:scale-105 hover:shadow-xl text-white font-semibold"
            style={{
              background: themeConfig.gradient,
            }}
          >
            <FiRefreshCw className="mr-2 h-5 w-5" />🔄 Sync Data
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
              Total Revenue
            </CardTitle>
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.success}20` }}>
              <FiDollarSign className="h-5 w-5" style={{ color: themeConfig.colors.success }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: themeConfig.colors.foreground }}>
              ${retailerStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs flex items-center gap-1 mt-2">
              <span style={{ color: themeConfig.colors.success }}>↗️ +18%</span>
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
              Total Orders
            </CardTitle>
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.primary}20` }}>
              <FiShoppingBag className="h-5 w-5" style={{ color: themeConfig.colors.primary }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: themeConfig.colors.foreground }}>
              {retailerStats.totalOrders.toLocaleString()}
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
              Active Customers
            </CardTitle>
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.info}20` }}>
              <FiUsers className="h-5 w-5" style={{ color: themeConfig.colors.info }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: themeConfig.colors.foreground }}>
              {retailerStats.activeCustomers.toLocaleString()}
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
              Conversion Rate
            </CardTitle>
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.warning}20` }}>
              <FiTrendingUp className="h-5 w-5" style={{ color: themeConfig.colors.warning }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: themeConfig.colors.foreground }}>
              {retailerStats.conversionRate}%
            </div>
            <p className="text-xs flex items-center gap-1 mt-2">
              <span style={{ color: themeConfig.colors.danger }}>↘️ -1.2%</span>
              <span className="opacity-70" style={{ color: themeConfig.colors.foreground }}>
                from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Tabs */}
      <div
        className="rounded-2xl p-6 border-2"
        style={{
          backgroundColor: themeConfig.colors.card,
          borderColor: themeConfig.colors.border,
          background: `linear-gradient(135deg, ${themeConfig.colors.card}, ${themeConfig.colors.cardHover})`,
        }}
      >
        <RetailerDashboardTabs />
      </div>
    </div>
  )
}

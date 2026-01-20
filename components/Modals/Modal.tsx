"use client"

import { useState } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { NewShopModal } from "@/components/Modals/NewShopModal"
import { UpdateShopModal } from "@/components/Modals/UpdateShopModal"
import { ViewShopModal } from "@/components/Modals/ViewShopModal"
import { DeleteShopModal } from "@/components/Modals/DeleteShopModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// React Icons
import {
  FiPlus,
  FiSearch,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiShoppingBag,
  FiMapPin,
  FiStar,
  FiPackage,
  FiDollarSign,
  FiActivity,
  FiRefreshCw,
  FiDownload,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi"

interface Shop {
  id: string | number
  name: string
  description: string
  category: string
  subcategories: string[]
  icon?: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  email: string
  businessLicense: string
  taxId: string
  spaceCapacity: string | number
  productCapacity: string | number
  currentProducts?: number
  features: {
    onlineOrdering: boolean
    deliveryService: boolean
    pickupService: boolean
    returnPolicy: boolean
    customerSupport: boolean
    loyaltyProgram: boolean
  }
  status: "active" | "pending" | "inactive" | "Active" | "Pending" | "Suspended" | "Inactive"
  createdAt: string
  lastUpdated?: string
  totalProducts?: number
  totalOrders?: number
  monthlyRevenue?: number
  totalRevenue?: number
  rating: number
  orders?: number
}

export default function ShopManagementPage() {
  const { themeConfig } = useAdminTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [newShopModalOpen, setNewShopModalOpen] = useState(false)
  const [updateShopModalOpen, setUpdateShopModalOpen] = useState(false)
  const [viewShopModalOpen, setViewShopModalOpen] = useState(false)
  const [deleteShopModalOpen, setDeleteShopModalOpen] = useState(false)
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)

  // Mock data combining both designs
  const shops: Shop[] = [
    {
      id: 1,
      name: "Tech Paradise",
      description: "Your one-stop destination for the latest electronics and gadgets",
      category: "electronics",
      subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories"],
      icon: "/placeholder.svg?height=100&width=100",
      address: "123 Tech Street, Silicon Valley, CA 94025",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      phone: "(555) 123-4567",
      email: "contact@techparadise.com",
      businessLicense: "BL-2023-001",
      taxId: "TX-789456123",
      spaceCapacity: 1200,
      productCapacity: 500,
      currentProducts: 324,
      features: {
        onlineOrdering: true,
        deliveryService: true,
        pickupService: true,
        returnPolicy: true,
        customerSupport: true,
        loyaltyProgram: false,
      },
      status: "active",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20",
      totalProducts: 245,
      totalOrders: 1250,
      monthlyRevenue: 45230,
      totalRevenue: 125000,
      rating: 4.8,
      orders: 234,
    },
    {
      id: 2,
      name: "Fashion Hub",
      description: "Trendy clothing and accessories for the modern lifestyle",
      category: "fashion",
      subcategories: ["Women's Clothing", "Men's Clothing", "Shoes", "Accessories"],
      icon: "/placeholder.svg?height=100&width=100",
      address: "456 Style Avenue, New York, NY 10001",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "(555) 987-6543",
      email: "info@fashionhub.com",
      businessLicense: "BL-2023-002",
      taxId: "TX-456789123",
      spaceCapacity: 800,
      productCapacity: 300,
      currentProducts: 189,
      features: {
        onlineOrdering: true,
        deliveryService: false,
        pickupService: true,
        returnPolicy: true,
        customerSupport: true,
        loyaltyProgram: true,
      },
      status: "pending",
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-22",
      totalProducts: 180,
      totalOrders: 890,
      monthlyRevenue: 32100,
      totalRevenue: 89000,
      rating: 4.6,
      orders: 178,
    },
    {
      id: 3,
      name: "Home Essentials",
      description: "Everything you need to make your house a home",
      category: "home",
      subcategories: ["Furniture", "Decor", "Garden Tools", "Lighting"],
      icon: "/placeholder.svg?height=100&width=100",
      address: "789 Home Street, Austin, TX 78701",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      phone: "(555) 456-7890",
      email: "support@homeessentials.com",
      businessLicense: "BL-2023-003",
      taxId: "TX-123456789",
      spaceCapacity: 1500,
      productCapacity: 600,
      currentProducts: 45,
      features: {
        onlineOrdering: false,
        deliveryService: true,
        pickupService: true,
        returnPolicy: false,
        customerSupport: true,
        loyaltyProgram: false,
      },
      status: "pending",
      createdAt: "2024-01-25",
      lastUpdated: "2024-01-25",
      totalProducts: 320,
      totalOrders: 650,
      monthlyRevenue: 8950,
      totalRevenue: 95000,
      rating: 4.2,
      orders: 67,
    },
    {
      id: 4,
      name: "Sports Central",
      description: "Premium sports equipment and athletic wear",
      category: "sports",
      subcategories: ["Equipment", "Apparel", "Footwear", "Accessories"],
      icon: "/placeholder.svg?height=100&width=100",
      address: "321 Sports Way, Denver, CO 80202",
      city: "Denver",
      state: "CO",
      zipCode: "80202",
      phone: "(555) 321-0987",
      email: "info@sportscentral.com",
      businessLicense: "BL-2023-004",
      taxId: "TX-987654321",
      spaceCapacity: 4000,
      productCapacity: 1800,
      currentProducts: 150,
      features: {
        onlineOrdering: true,
        deliveryService: true,
        pickupService: false,
        returnPolicy: true,
        customerSupport: false,
        loyaltyProgram: true,
      },
      status: "Suspended",
      createdAt: "2023-04-05",
      totalProducts: 150,
      totalOrders: 420,
      totalRevenue: 52000,
      rating: 3.9,
    },
    {
      id: 5,
      name: "Book Haven",
      description: "A cozy bookstore with a vast collection of books and media",
      category: "books",
      subcategories: ["Fiction", "Non-Fiction", "Educational", "Comics"],
      icon: "/placeholder.svg?height=100&width=100",
      address: "654 Library Lane, Seattle, WA 98101",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      phone: "(555) 654-3210",
      email: "contact@bookhaven.com",
      businessLicense: "BL-2023-005",
      taxId: "TX-654321987",
      spaceCapacity: 1500,
      productCapacity: 800,
      currentProducts: 95,
      features: {
        onlineOrdering: true,
        deliveryService: false,
        pickupService: true,
        returnPolicy: true,
        customerSupport: true,
        loyaltyProgram: true,
      },
      status: "Inactive",
      createdAt: "2023-05-12",
      totalProducts: 95,
      totalOrders: 280,
      totalRevenue: 28000,
      rating: 4.6,
    },
  ]

  const categories = [
    { value: "electronics", label: "📱 Electronics" },
    { value: "fashion", label: "👗 Fashion" },
    { value: "home", label: "🏠 Home & Garden" },
    { value: "health", label: "💊 Health & Beauty" },
    { value: "sports", label: "⚽ Sports & Outdoors" },
    { value: "books", label: "📚 Books & Media" },
    { value: "toys", label: "🧸 Toys & Games" },
    { value: "automotive", label: "🚗 Automotive" },
  ]

  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || shop.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesCategory = categoryFilter === "all" || shop.category === categoryFilter
    const matchesTab = activeTab === "all" || shop.status.toLowerCase() === activeTab.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return themeConfig.colors.success
      case "pending":
        return themeConfig.colors.warning
      case "suspended":
      case "inactive":
        return themeConfig.colors.danger
      default:
        return themeConfig.colors.foreground
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <FiCheckCircle className="h-4 w-4" />
      case "pending":
        return <FiClock className="h-4 w-4" />
      case "suspended":
      case "inactive":
        return <FiXCircle className="h-4 w-4" />
      default:
        return <FiAlertCircle className="h-4 w-4" />
    }
  }

  const handleViewShop = (shop: Shop) => {
    setSelectedShop(shop)
    setViewShopModalOpen(true)
  }

  const handleEditShop = (shop: Shop) => {
    setSelectedShop(shop)
    setUpdateShopModalOpen(true)
  }

  const handleDeleteShop = (shop: Shop) => {
    setSelectedShop(shop)
    setDeleteShopModalOpen(true)
  }

  const totalShops = shops.length
  const activeShops = shops.filter((shop) => shop.status.toLowerCase() === "active").length
  const totalRevenue = shops.reduce((sum, shop) => sum + (shop.totalRevenue || shop.monthlyRevenue || 0), 0)
  const averageRating = shops.reduce((sum, shop) => sum + shop.rating, 0) / shops.length

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{ color: themeConfig.colors.foreground, textShadow: `0 2px 4px ${themeConfig.colors.primary}20` }}
          >
            Shop Management
          </h1>
          <p className="text-lg opacity-80 mt-2" style={{ color: themeConfig.colors.foreground }}>
            Manage all your retail shops and their configurations
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            style={{ borderColor: themeConfig.colors.border, color: themeConfig.colors.foreground }}
          >
            <FiDownload className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            style={{ borderColor: themeConfig.colors.border, color: themeConfig.colors.foreground }}
          >
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <NewShopModal
            open={newShopModalOpen}
            onOpenChange={setNewShopModalOpen}
            trigger={
              <Button
                className="transition-all duration-300 hover:scale-105 text-white font-semibold"
                style={{ background: themeConfig.gradient }}
              >
                <FiPlus className="mr-2 h-5 w-5" />
                Create New Shop
              </Button>
            }
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          className="border-2"
          style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  Total Shops
                </p>
                <p className="text-2xl font-bold" style={{ color: themeConfig.colors.foreground }}>
                  {totalShops}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${themeConfig.colors.primary}20` }}>
                <FiShoppingBag className="h-6 w-6" style={{ color: themeConfig.colors.primary }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="border-2"
          style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  Active Shops
                </p>
                <p className="text-2xl font-bold" style={{ color: themeConfig.colors.foreground }}>
                  {activeShops}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${themeConfig.colors.success}20` }}>
                <FiCheckCircle className="h-6 w-6" style={{ color: themeConfig.colors.success }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="border-2"
          style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  Total Revenue
                </p>
                <p className="text-2xl font-bold" style={{ color: themeConfig.colors.foreground }}>
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${themeConfig.colors.success}20` }}>
                <FiDollarSign className="h-6 w-6" style={{ color: themeConfig.colors.success }} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="border-2"
          style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  Avg Rating
                </p>
                <p className="text-2xl font-bold" style={{ color: themeConfig.colors.foreground }}>
                  {averageRating.toFixed(1)}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${themeConfig.colors.warning}20` }}>
                <FiStar className="h-6 w-6" style={{ color: themeConfig.colors.warning }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card
        className="border-2"
        style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
      >
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle style={{ color: themeConfig.colors.foreground }}>Shop Directory</CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Manage and monitor all your retail shops
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FiSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50"
                  style={{ color: themeConfig.colors.foreground }}
                />
                <Input
                  placeholder="Search shops by name, description, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-96"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.foreground,
                  }}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Shops Table */}
      <Card
        className="border-2"
        style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}
      >
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Shops ({shops.length})</TabsTrigger>
              <TabsTrigger value="active">
                Active ({shops.filter((s) => s.status.toLowerCase() === "active").length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({shops.filter((s) => s.status.toLowerCase() === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive ({shops.filter((s) => s.status.toLowerCase() === "inactive" || s.status === "Suspended").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value={activeTab} className="mt-6">
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: `${themeConfig.colors.muted}50` }}>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Shop</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Category & Subcategories</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Location</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Contact</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Business Details</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Status</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Capacity & Utilization</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Performance</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShops.map((shop) => (
                      <TableRow key={shop.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0">
                              {shop.icon ? (
                                <img
                                  src={shop.icon || "/placeholder.svg"}
                                  alt={shop.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <FiShoppingBag className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 truncate" style={{ color: themeConfig.colors.foreground }}>
                                {shop.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate" style={{ color: `${themeConfig.colors.foreground}70` }}>
                                {shop.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">
                                {categories.find((c) => c.value === shop.category)?.label.split(" ")[0]}
                              </span>
                              <span className="text-sm text-gray-600">
                                {categories.find((c) => c.value === shop.category)?.label.substring(2)}
                              </span>
                            </div>
                            {shop.subcategories.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {shop.subcategories.map((sub, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {sub}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <FiMapPin className="h-3 w-3" />
                            {shop.address}, {shop.city}, {shop.state} {shop.zipCode}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm" style={{ color: themeConfig.colors.foreground }}>
                              Phone: {shop.phone}
                            </p>
                            <p className="text-sm" style={{ color: themeConfig.colors.foreground }}>
                              Email: {shop.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm" style={{ color: themeConfig.colors.foreground }}>
                              License: {shop.businessLicense}
                            </p>
                            <p className="text-sm" style={{ color: themeConfig.colors.foreground }}>
                              Tax ID: {shop.taxId}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div style={{ color: getStatusColor(shop.status) }}>{getStatusIcon(shop.status)}</div>
                            <span className="font-medium capitalize" style={{ color: getStatusColor(shop.status) }}>
                              {shop.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm" style={{ color: themeConfig.colors.foreground }}>
                              Space: {shop.spaceCapacity} sq ft
                            </div>
                            <div className="text-sm" style={{ color: themeConfig.colors.foreground }}>
                              Products: {shop.currentProducts || shop.totalProducts} / {shop.productCapacity}
                            </div>
                            <div className="w-20 bg-gray-200 rounded-full h-1">
                              <div
                                className="h-1 rounded-full"
                                style={{
                                  // width: `${((shop.currentProducts || shop.totalProducts || 0) / shop.productCapacity) * 100
                                  // }%`,
                                  width: `${((shop.currentProducts || shop.totalProducts || 0) / (Number(shop.productCapacity) || 1)) * 100}%`,
                                  backgroundColor: themeConfig.colors.primary,
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <FiDollarSign className="h-3 w-3" />
                              <span className="text-sm">
                                ${(shop.monthlyRevenue || shop.totalRevenue || 0).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiStar className="h-3 w-3" />
                              <span className="text-sm">
                                {shop.rating} ({shop.orders || shop.totalOrders || 0} orders)
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewShop(shop)}
                              className="h-8 w-8"
                            >
                              <FiEye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditShop(shop)}
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <FiEdit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteShop(shop)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {filteredShops.length === 0 && (
                <div className="text-center py-12">
                  <FiShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ color: themeConfig.colors.foreground }}>
                    No shops found
                  </h3>
                  <p className="text-gray-500 mb-4" style={{ color: `${themeConfig.colors.foreground}70` }}>
                    {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Get started by creating your first shop"}
                  </p>
                  {!searchTerm && statusFilter === "all" && categoryFilter === "all" && (
                    <NewShopModal
                      trigger={
                        <Button
                          className="flex items-center gap-2"
                          style={{ background: themeConfig.gradient, color: "white" }}
                        >
                          <FiPlus className="h-4 w-4" />
                          Create Your First Shop
                        </Button>
                      }
                      open={newShopModalOpen}
                      onOpenChange={setNewShopModalOpen}
                    />
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modals */}
      {selectedShop && (
        <>
          <ViewShopModal shop={selectedShop} open={viewShopModalOpen} onOpenChange={setViewShopModalOpen} />
          <UpdateShopModal shop={selectedShop} open={updateShopModalOpen} onOpenChange={setUpdateShopModalOpen} />
          <DeleteShopModal shop={selectedShop} open={deleteShopModalOpen} onOpenChange={setDeleteShopModalOpen} />
        </>
      )}
    </div>
  )
}
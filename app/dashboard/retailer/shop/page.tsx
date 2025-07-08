"use client"

import { useState } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { NewShopModal } from "@/components/Modals/NewShopModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// React Icons
import {
  FiShoppingBag,
  FiPlus,
  FiSearch,
  FiFilter,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiClock,
  FiDollarSign,
  FiStar,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi"

// Mock data
const mockShops = [
  {
    id: 1,
    name: "Tech Paradise",
    category: "electronics",
    status: "active",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    phone: "(555) 123-4567",
    email: "contact@techparadise.com",
    spaceCapacity: 1200,
    productCapacity: 500,
    currentProducts: 324,
    monthlyRevenue: 45230,
    rating: 4.8,
    orders: 234,
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20",
    features: ["onlineOrdering", "deliveryService", "returnPolicy"],
  },
  {
    id: 2,
    name: "Fashion Hub",
    category: "fashion",
    status: "active",
    address: "456 Style Avenue, New York, NY 10001",
    phone: "(555) 987-6543",
    email: "info@fashionhub.com",
    spaceCapacity: 800,
    productCapacity: 300,
    currentProducts: 189,
    monthlyRevenue: 32100,
    rating: 4.6,
    orders: 178,
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-22",
    features: ["onlineOrdering", "pickupService", "loyaltyProgram"],
  },
  {
    id: 3,
    name: "Home Essentials",
    category: "home",
    status: "pending",
    address: "789 Home Street, Austin, TX 78701",
    phone: "(555) 456-7890",
    email: "support@homeessentials.com",
    spaceCapacity: 1500,
    productCapacity: 600,
    currentProducts: 45,
    monthlyRevenue: 8950,
    rating: 4.2,
    orders: 67,
    createdAt: "2024-01-25",
    lastUpdated: "2024-01-25",
    features: ["deliveryService", "returnPolicy"],
  },
]

export default function ShopManagementPage() {
  const { themeConfig } = useAdminTheme()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [newShopModalOpen, setNewShopModalOpen] = useState(false)
  const [viewShopModal, setViewShopModal] = useState<any>(null)
  const [editShopModal, setEditShopModal] = useState<any>(null)
  const [deleteShopModal, setDeleteShopModal] = useState<any>(null)
  const [deleteConfirmStep, setDeleteConfirmStep] = useState(1)

  const shopCategories = [
    { value: "electronics", label: "📱 Electronics" },
    { value: "fashion", label: "👗 Fashion" },
    { value: "home", label: "🏠 Home & Garden" },
    { value: "health", label: "💊 Health & Beauty" },
    { value: "sports", label: "⚽ Sports & Outdoors" },
    { value: "books", label: "📚 Books & Media" },
    { value: "toys", label: "🧸 Toys & Games" },
    { value: "automotive", label: "🚗 Automotive" },
    { value: "jewelry", label: "💍 Jewelry" },
    { value: "food", label: "🍕 Food & Beverages" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return themeConfig.colors.success
      case "pending":
        return themeConfig.colors.warning
      case "inactive":
        return themeConfig.colors.danger
      default:
        return themeConfig.colors.foreground
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <FiCheckCircle className="h-4 w-4" />
      case "pending":
        return <FiClock className="h-4 w-4" />
      case "inactive":
        return <FiXCircle className="h-4 w-4" />
      default:
        return <FiAlertCircle className="h-4 w-4" />
    }
  }

  const filteredShops = mockShops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || shop.status === filterStatus
    const matchesCategory = filterCategory === "all" || shop.category === filterCategory
    const matchesTab = activeTab === "all" || shop.status === activeTab

    return matchesSearch && matchesStatus && matchesCategory && matchesTab
  })

  const handleDeleteShop = (shop: any) => {
    setDeleteShopModal(shop)
    setDeleteConfirmStep(1)
  }

  const confirmDelete = () => {
    if (deleteConfirmStep === 1) {
      setDeleteConfirmStep(2)
    } else {
      console.log("Deleting shop:", deleteShopModal)
      setDeleteShopModal(null)
      setDeleteConfirmStep(1)
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{
              color: themeConfig.colors.foreground,
              textShadow: `0 2px 4px ${themeConfig.colors.primary}20`,
            }}
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
            style={{
              borderColor: themeConfig.colors.border,
              color: themeConfig.colors.foreground,
            }}
          >
            <FiFilter className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <NewShopModal
            open={newShopModalOpen}
            onOpenChange={setNewShopModalOpen}
            trigger={
              <Button
                className="transition-all duration-300 hover:scale-105 text-white font-semibold"
                style={{
                  background: themeConfig.gradient,
                }}
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
                  {mockShops.length}
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
                  {mockShops.filter((s) => s.status === "active").length}
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
                  ${mockShops.reduce((sum, shop) => sum + shop.monthlyRevenue, 0).toLocaleString()}
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
                  {(mockShops.reduce((sum, shop) => sum + shop.rating, 0) / mockShops.length).toFixed(1)}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${themeConfig.colors.warning}20` }}>
                <FiStar className="h-6 w-6" style={{ color: themeConfig.colors.warning }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
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

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                <Input
                  placeholder="Search shops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.foreground,
                  }}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {shopCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Shops ({mockShops.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({mockShops.filter((s) => s.status === "active").length})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({mockShops.filter((s) => s.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive ({mockShops.filter((s) => s.status === "inactive").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: `${themeConfig.colors.muted}50` }}>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Shop Details</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Category</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Status</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Performance</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Capacity</TableHead>
                      <TableHead style={{ color: themeConfig.colors.foreground }}>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShops.map((shop) => (
                      <TableRow key={shop.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
                            >
                              <FiShoppingBag className="h-5 w-5" style={{ color: themeConfig.colors.primary }} />
                            </div>
                            <div>
                              <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                                {shop.name}
                              </p>
                              <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                                {shop.address.split(",")[0]}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {shopCategories.find((c) => c.value === shop.category)?.label}
                          </Badge>
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
                            <div className="flex items-center gap-2">
                              <FiDollarSign className="h-3 w-3" />
                              <span className="text-sm">${shop.monthlyRevenue.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiStar className="h-3 w-3" />
                              <span className="text-sm">
                                {shop.rating} ({shop.orders} orders)
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              Products: {shop.currentProducts}/{shop.productCapacity}
                            </div>
                            <div className="w-20 bg-gray-200 rounded-full h-1">
                              <div
                                className="h-1 rounded-full"
                                style={{
                                  width: `${(shop.currentProducts / shop.productCapacity) * 100}%`,
                                  backgroundColor: themeConfig.colors.primary,
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setViewShopModal(shop)}
                              className="h-8 w-8"
                            >
                              <FiEye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditShopModal(shop)}
                              className="h-8 w-8"
                            >
                              <FiEdit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteShop(shop)}
                              className="h-8 w-8 text-red-500 hover:text-red-700"
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Shop Modal */}
      <Dialog open={!!viewShopModal} onOpenChange={() => setViewShopModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {viewShopModal && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg" style={{ background: themeConfig.gradient }}>
                    <FiShoppingBag className="h-5 w-5 text-white" />
                  </div>
                  {viewShopModal.name}
                </DialogTitle>
                <DialogDescription>Detailed information about this shop</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <Label className="text-xs text-gray-500">Category</Label>
                        <p>{shopCategories.find((c) => c.value === viewShopModal.category)?.label}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Status</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <div style={{ color: getStatusColor(viewShopModal.status) }}>
                            {getStatusIcon(viewShopModal.status)}
                          </div>
                          <span className="capitalize" style={{ color: getStatusColor(viewShopModal.status) }}>
                            {viewShopModal.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Created</Label>
                        <p>{new Date(viewShopModal.createdAt).toLocaleDateString()}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <Label className="text-xs text-gray-500">Address</Label>
                        <p className="text-sm">{viewShopModal.address}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Phone</Label>
                        <p>{viewShopModal.phone}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Email</Label>
                        <p>{viewShopModal.email}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Capacity & Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-500">Space Capacity</Label>
                        <p>{viewShopModal.spaceCapacity} sq ft</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Product Utilization</Label>
                        <div className="mt-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>
                              {viewShopModal.currentProducts} / {viewShopModal.productCapacity}
                            </span>
                            <span>
                              {Math.round((viewShopModal.currentProducts / viewShopModal.productCapacity) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(viewShopModal.currentProducts / viewShopModal.productCapacity) * 100}%`,
                                backgroundColor: themeConfig.colors.primary,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Revenue & Rating</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <Label className="text-xs text-gray-500">Monthly Revenue</Label>
                        <p className="font-semibold text-lg" style={{ color: themeConfig.colors.success }}>
                          ${viewShopModal.monthlyRevenue.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Rating</Label>
                        <div className="flex items-center gap-2">
                          <FiStar className="h-4 w-4" style={{ color: themeConfig.colors.warning }} />
                          <span>{viewShopModal.rating} / 5.0</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Total Orders</Label>
                        <p>{viewShopModal.orders}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Enabled Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {viewShopModal.features.map((feature: string) => (
                        <Badge key={feature} variant="secondary">
                          {feature.replace(/([A-Z])/g, " $1").replace(/^./, (str: string) => str.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Shop Modal */}
      <Dialog open={!!editShopModal} onOpenChange={() => setEditShopModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {editShopModal && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FiEdit3 className="h-5 w-5" />
                  Edit Shop: {editShopModal.name}
                </DialogTitle>
                <DialogDescription>Update shop information and settings</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editName">Shop Name</Label>
                    <Input id="editName" defaultValue={editShopModal.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editCategory">Category</Label>
                    <Select defaultValue={editShopModal.category}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {shopCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="editAddress">Address</Label>
                  <Input id="editAddress" defaultValue={editShopModal.address} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editPhone">Phone</Label>
                    <Input id="editPhone" defaultValue={editShopModal.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editEmail">Email</Label>
                    <Input id="editEmail" defaultValue={editShopModal.email} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editSpaceCapacity">Space Capacity (sq ft)</Label>
                    <Input id="editSpaceCapacity" type="number" defaultValue={editShopModal.spaceCapacity} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editProductCapacity">Product Capacity</Label>
                    <Input id="editProductCapacity" type="number" defaultValue={editShopModal.productCapacity} />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setEditShopModal(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("Updating shop:", editShopModal)
                      setEditShopModal(null)
                    }}
                    style={{ background: themeConfig.gradient, color: "white" }}
                  >
                    Update Shop
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteShopModal}
        onOpenChange={() => {
          setDeleteShopModal(null)
          setDeleteConfirmStep(1)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <FiTrash2 className="h-5 w-5 text-red-500" />
              {deleteConfirmStep === 1 ? "Delete Shop?" : "Are you absolutely sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteConfirmStep === 1 ? (
                <>
                  You are about to delete <strong>{deleteShopModal?.name}</strong>. This action will permanently remove
                  the shop and all its data.
                </>
              ) : (
                <>
                  This action cannot be undone. This will permanently delete the shop
                  <strong> {deleteShopModal?.name}</strong> and remove all associated products, orders, and customer
                  data from our servers.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeleteShopModal(null)
                setDeleteConfirmStep(1)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">
              {deleteConfirmStep === 1 ? "Delete Shop" : "Yes, delete permanently"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewShopModal } from "@/components/Modals/NewShopModal"
import { UpdateShopModal } from "@/components/Modals/UpdateShopModal"
import { ViewShopModal } from "@/components/Modals/ViewShopModal"
import { DeleteShopModal } from "@/components/Modals/DeleteShopModal"

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
} from "react-icons/fi"

interface Shop {
  id: string
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
  spaceCapacity: string
  productCapacity: string
  features: {
    onlineOrdering: boolean
    deliveryService: boolean
    pickupService: boolean
    returnPolicy: boolean
    customerSupport: boolean
    loyaltyProgram: boolean
  }
  status: "Active" | "Pending" | "Suspended" | "Inactive"
  createdAt: string
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  rating: number
}

export default function ShopManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [newShopModalOpen, setNewShopModalOpen] = useState(false)
  const [updateShopModalOpen, setUpdateShopModalOpen] = useState(false)
  const [viewShopModalOpen, setViewShopModalOpen] = useState(false)
  const [deleteShopModalOpen, setDeleteShopModalOpen] = useState(false)
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)

  // Mock data
  const shops: Shop[] = [
    {
      id: "1",
      name: "TechHub Electronics",
      description: "Your one-stop destination for the latest electronics and gadgets",
      category: "electronics",
      subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories"],
      icon: "/placeholder.svg?height=100&width=100",
      address: "123 Tech Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      phone: "(555) 123-4567",
      email: "info@techhub.com",
      businessLicense: "BL-2023-001",
      taxId: "TX-789456123",
      spaceCapacity: "2500",
      productCapacity: "1000",
      features: {
        onlineOrdering: true,
        deliveryService: true,
        pickupService: true,
        returnPolicy: true,
        customerSupport: true,
        loyaltyProgram: false,
      },
      status: "Active",
      createdAt: "2023-01-15",
      totalProducts: 245,
      totalOrders: 1250,
      totalRevenue: 125000,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Fashion Forward",
      description: "Trendy clothing and accessories for the modern lifestyle",
      category: "fashion",
      subcategories: ["Women's Clothing", "Men's Clothing", "Shoes", "Accessories"],
      icon: "/placeholder.svg?height=100&width=100",
      address: "456 Fashion Ave",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "(555) 987-6543",
      email: "contact@fashionforward.com",
      businessLicense: "BL-2023-002",
      taxId: "TX-456789123",
      spaceCapacity: "3000",
      productCapacity: "1500",
      features: {
        onlineOrdering: true,
        deliveryService: false,
        pickupService: true,
        returnPolicy: true,
        customerSupport: true,
        loyaltyProgram: true,
      },
      status: "Pending",
      createdAt: "2023-02-20",
      totalProducts: 180,
      totalOrders: 890,
      totalRevenue: 89000,
      rating: 4.5,
    },
    {
      id: "3",
      name: "Home & Garden Paradise",
      description: "Everything you need to make your house a home",
      category: "home",
      subcategories: ["Furniture", "Decor", "Garden Tools", "Lighting"],
      icon: "/placeholder.svg?height=100&width=100",
      address: "789 Garden Blvd",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      phone: "(555) 456-7890",
      email: "hello@homegardenparadise.com",
      businessLicense: "BL-2023-003",
      taxId: "TX-123456789",
      spaceCapacity: "5000",
      productCapacity: "2000",
      features: {
        onlineOrdering: false,
        deliveryService: true,
        pickupService: true,
        returnPolicy: false,
        customerSupport: true,
        loyaltyProgram: false,
      },
      status: "Active",
      createdAt: "2023-03-10",
      totalProducts: 320,
      totalOrders: 650,
      totalRevenue: 95000,
      rating: 4.2,
    },
    {
      id: "4",
      name: "Sports Central",
      description: "Premium sports equipment and athletic wear",
      category: "sports",
      subcategories: ["Equipment", "Apparel", "Footwear", "Accessories"],
      icon: "/placeholder.svg?height=100&width=100",
      address: "321 Sports Way",
      city: "Denver",
      state: "CO",
      zipCode: "80202",
      phone: "(555) 321-0987",
      email: "info@sportscentral.com",
      businessLicense: "BL-2023-004",
      taxId: "TX-987654321",
      spaceCapacity: "4000",
      productCapacity: "1800",
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
      id: "5",
      name: "Book Haven",
      description: "A cozy bookstore with a vast collection of books and media",
      category: "books",
      subcategories: ["Fiction", "Non-Fiction", "Educational", "Comics"],
      icon: "/placeholder.svg?height=100&width=100",
      address: "654 Library Lane",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      phone: "(555) 654-3210",
      email: "contact@bookhaven.com",
      businessLicense: "BL-2023-005",
      taxId: "TX-654321987",
      spaceCapacity: "1500",
      productCapacity: "800",
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
      shop.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || shop.status.toLowerCase() === statusFilter
    const matchesCategory = categoryFilter === "all" || shop.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
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
  const activeShops = shops.filter((shop) => shop.status === "Active").length
  const totalRevenue = shops.reduce((sum, shop) => sum + shop.totalRevenue, 0)
  const averageRating = shops.reduce((sum, shop) => sum + shop.rating, 0) / shops.length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shop Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all your shops</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <FiDownload className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <FiRefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <NewShopModal
            trigger={
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <FiPlus className="h-4 w-4" />
                Add New Shop
              </Button>
            }
            open={newShopModalOpen}
            onOpenChange={setNewShopModalOpen}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Shops</p>
                <p className="text-3xl font-bold">{totalShops}</p>
              </div>
              <div className="p-3 bg-blue-400 bg-opacity-30 rounded-full">
                <FiShoppingBag className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Shops</p>
                <p className="text-3xl font-bold">{activeShops}</p>
              </div>
              <div className="p-3 bg-green-400 bg-opacity-30 rounded-full">
                <FiActivity className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-400 bg-opacity-30 rounded-full">
                <FiDollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg Rating</p>
                <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
              </div>
              <div className="p-3 bg-orange-400 bg-opacity-30 rounded-full">
                <FiStar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search shops by name, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
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
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
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
        </CardContent>
      </Card>

      {/* Shops Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiShoppingBag className="h-5 w-5" />
            Shops ({filteredShops.length})
          </CardTitle>
          <CardDescription>Manage your shops and monitor their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Shop</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Products</TableHead>
                  <TableHead className="font-semibold">Revenue</TableHead>
                  <TableHead className="font-semibold">Rating</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShops.map((shop) => (
                  <TableRow key={shop.id} className="hover:bg-gray-50 transition-colors">
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
                          <p className="font-semibold text-gray-900 truncate">{shop.name}</p>
                          <p className="text-sm text-gray-500 truncate">{shop.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {categories.find((c) => c.value === shop.category)?.label.split(" ")[0]}
                        </span>
                        <span className="text-sm text-gray-600">
                          {categories.find((c) => c.value === shop.category)?.label.substring(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FiMapPin className="h-3 w-3" />
                        {shop.city}, {shop.state}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(shop.status)} border font-medium`}>{shop.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <FiPackage className="h-3 w-3 text-gray-400" />
                        {shop.totalProducts}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                        <FiDollarSign className="h-3 w-3" />
                        {shop.totalRevenue.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <FiStar className="h-3 w-3 text-yellow-500" />
                        {shop.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewShop(shop)}
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No shops found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first shop"}
              </p>
              {!searchTerm && statusFilter === "all" && categoryFilter === "all" && (
                <NewShopModal
                  trigger={
                    <Button className="flex items-center gap-2">
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

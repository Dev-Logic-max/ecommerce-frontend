"use client"

import { useState, useEffect } from "react"
import { FiSearch, FiEdit2, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DeveloperSidebar } from "@/components/Sidebar/DeveloperSidebar"
import { DeveloperNavbar } from "@/components/Navbar/DeveloperNavbar"
import { useTheme } from "@/components/theme/AdminsThemeProvider"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "react-toastify"
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

// Generate mock shops
const generateMockShops = () => {
  const shopNames = [
    "TechGadgets Pro",
    "Fashion Hub",
    "Home Decor Plus",
    "Sports World",
    "Book Haven",
    "Electronics Store",
    "Beauty Corner",
    "Pet Paradise",
    "Garden Center",
    "Music Store",
    "Art Supplies",
    "Kitchen Essentials",
    "Toy Kingdom",
    "Fitness Gear",
    "Auto Parts",
    "Jewelry Box",
    "Craft Corner",
    "Office Supplies",
    "Health Store",
    "Travel Gear",
  ]

  const owners = [
    "John Smith",
    "Jane Doe",
    "Bob Johnson",
    "Alice Brown",
    "Mike Wilson",
    "Sarah Davis",
    "Tom Anderson",
    "Lisa Garcia",
    "David Miller",
    "Emma Taylor",
  ]

  const statuses = ["Active", "Pending", "Suspended", "Rejected"]
  const categories = ["Electronics", "Fashion", "Home", "Sports", "Books", "Beauty", "Pets", "Garden", "Music", "Art"]

  const shops = []

  for (let i = 1; i <= 25; i++) {
    const name = shopNames[Math.floor(Math.random() * shopNames.length)]
    const owner = owners[Math.floor(Math.random() * owners.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]

    // Create date between 2023-01-01 and now
    const start = new Date(2023, 0, 1).getTime()
    const end = new Date().getTime()
    const createdAt = new Date(start + Math.random() * (end - start))
    const formattedDate = createdAt.toISOString().split("T")[0]

    shops.push({
      id: i,
      name: `${name} ${i}`,
      owner,
      email: `${owner.toLowerCase().replace(" ", ".")}@example.com`,
      status,
      category,
      productsCount: Math.floor(Math.random() * 500) + 10,
      revenue: Math.floor(Math.random() * 100000) + 5000,
      createdAt: formattedDate,
      description: `A premium ${category.toLowerCase()} shop offering quality products and excellent service.`,
    })
  }

  return shops
}

const mockShops = generateMockShops()

export default function ShopManagementPage() {
  const [shops, setShops] = useState(mockShops)
  const [filteredShops, setFilteredShops] = useState(mockShops)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [shopsPerPage] = useState(10)
  const [selectedShop, setSelectedShop] = useState<any>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = shops

    if (searchTerm) {
      filtered = filtered.filter(
        (shop) =>
          shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((shop) => shop.status.toLowerCase() === statusFilter.toLowerCase())
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((shop) => shop.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    setFilteredShops(filtered)
    setCurrentPage(1)
  }, [shops, searchTerm, statusFilter, categoryFilter])

  // Get current shops for pagination
  const indexOfLastShop = currentPage * shopsPerPage
  const indexOfFirstShop = indexOfLastShop - shopsPerPage
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop)
  const totalPages = Math.ceil(filteredShops.length / shopsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleApproveShop = (shop: any) => {
    setSelectedShop(shop)
    setApproveDialogOpen(true)
  }

  const confirmApproveShop = () => {
    if (!selectedShop) return

    const updatedShops = shops.map((shop) => (shop.id === selectedShop.id ? { ...shop, status: "Active" } : shop))
    setShops(updatedShops)
    setApproveDialogOpen(false)
    toast.success(`Shop "${selectedShop.name}" approved successfully!`)
  }

  const handleRejectShop = (shop: any) => {
    const updatedShops = shops.map((s) => (s.id === shop.id ? { ...s, status: "Rejected" } : s))
    setShops(updatedShops)
    toast.error(`Shop "${shop.name}" rejected`)
  }

  const handleSuspendShop = (shop: any) => {
    const updatedShops = shops.map((s) => (s.id === shop.id ? { ...s, status: "Suspended" } : s))
    setShops(updatedShops)
    toast.warning(`Shop "${shop.name}" suspended`)
  }

  const handleDeleteShop = (shop: any) => {
    setSelectedShop(shop)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteShop = () => {
    if (!selectedShop) return

    setShops(shops.filter((shop) => shop.id !== selectedShop.id))
    setDeleteDialogOpen(false)
    toast.success(`Shop "${selectedShop.name}" deleted successfully!`)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500 hover:bg-green-600"
      case "pending":
        return "bg-amber-500 hover:bg-amber-600"
      case "suspended":
        return "bg-red-500 hover:bg-red-600"
      case "rejected":
        return "bg-gray-500 hover:bg-gray-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getCategoryBadgeColor = (category: string) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-amber-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-cyan-500",
      "bg-rose-500",
    ]
    return colors[category.length % colors.length]
  }

  const uniqueCategories = Array.from(new Set(shops.map((shop) => shop.category)))

  return (
    <div className="flex min-h-screen bg-background w-full p-5">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1
                className={cn(
                  "text-2xl font-bold tracking-tight text-shadow",
                  theme === "wooden" && "text-primary",
                  theme === "metallic" && "gradient-text theme-gradient",
                  theme === "ice" && "gradient-text theme-gradient",
                )}
              >
                Shop Management
              </h1>
              <Button
                className={cn(
                  "theme-gradient text-white border-none",
                  theme === "wooden" && "shadow-md",
                  theme === "metallic" && "shadow-inner",
                  theme === "ice" && "shadow-lg",
                )}
                onClick={() => toast.info("Create shop functionality is under development")}
              >
                <FiPlus className="mr-2 h-4 w-4" />
                Create Shop
              </Button>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Shops</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending Approval
                  <Badge variant="destructive" className="ml-2">
                    {shops.filter((s) => s.status === "Pending").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="active">Active Shops</TabsTrigger>
                <TabsTrigger value="suspended">Suspended</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card
                  className={cn(
                    "shadow-md",
                    theme === "dark" && "bg-card border-gray-800",
                    theme === "wooden" && "bg-card border-amber-800/20",
                    theme === "metallic" && "bg-opacity-80 backdrop-blur-sm border-gray-300/30",
                    theme === "ice" && "bg-opacity-70 backdrop-blur-sm border-blue-200/30",
                  )}
                >
                  <CardHeader>
                    <CardTitle>All Shops</CardTitle>
                    <CardDescription>Manage all shops in the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search shops..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              {uniqueCategories.map((category) => (
                                <SelectItem key={category} value={category.toLowerCase()}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Shop</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Owner</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                Category
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                Products
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Revenue</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {currentShops.map((shop) => (
                              <tr key={shop.id} className="hover:bg-muted/50">
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2">
                                      <AvatarImage
                                        src={`/placeholder.svg?height=32&width=32&text=${shop.name.charAt(0)}`}
                                        alt={shop.name}
                                      />
                                      <AvatarFallback>{shop.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="text-sm font-medium">{shop.name}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {shop.description.slice(0, 30)}...
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm">{shop.owner}</div>
                                  <div className="text-xs text-muted-foreground">{shop.email}</div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <Badge className={cn("text-white", getCategoryBadgeColor(shop.category))}>
                                    {shop.category}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <Badge className={cn("text-white", getStatusBadgeColor(shop.status))}>
                                    {shop.status}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">{shop.productsCount}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                  ${shop.revenue.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    {shop.status === "Pending" && (
                                      <>
                                        <Button
                                          size="sm"
                                          className="h-8 bg-green-500 hover:bg-green-600 text-white"
                                          onClick={() => handleApproveShop(shop)}
                                        >
                                          <FiCheck className="h-3 w-3 mr-1" />
                                          Approve
                                        </Button>
                                        <Button
                                          size="sm"
                                          className="h-8 bg-red-500 hover:bg-red-600 text-white"
                                          onClick={() => handleRejectShop(shop)}
                                        >
                                          <FiX className="h-3 w-3 mr-1" />
                                          Reject
                                        </Button>
                                      </>
                                    )}
                                    {shop.status === "Active" && (
                                      <Button
                                        size="sm"
                                        className="h-8 bg-amber-500 hover:bg-amber-600 text-white"
                                        onClick={() => handleSuspendShop(shop)}
                                      >
                                        Suspend
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                      onClick={() => toast.info("Edit shop functionality is under development")}
                                    >
                                      <FiEdit2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                      onClick={() => handleDeleteShop(shop)}
                                    >
                                      <FiTrash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {filteredShops.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No shops found matching your criteria</p>
                        </div>
                      )}

                      {/* Pagination */}
                      {filteredShops.length > 0 && (
                        <div className="flex items-center justify-center space-x-2 py-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                          >
                            First
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </Button>

                          <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              let pageNum
                              if (totalPages <= 5) {
                                pageNum = i + 1
                              } else if (currentPage <= 3) {
                                pageNum = i + 1
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i
                              } else {
                                pageNum = currentPage - 2 + i
                              }

                              return (
                                <Button
                                  key={pageNum}
                                  variant={currentPage === pageNum ? "default" : "outline"}
                                  size="sm"
                                  className={cn("h-8 w-8 p-0", currentPage === pageNum && "bg-primary text-white")}
                                  onClick={() => handlePageChange(pageNum)}
                                >
                                  {pageNum}
                                </Button>
                              )
                            })}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                          >
                            Last
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending">
                <Card
                  className={cn(
                    "shadow-md",
                    theme === "dark" && "bg-card border-gray-800",
                    theme === "wooden" && "bg-card border-amber-800/20",
                    theme === "metallic" && "bg-opacity-80 backdrop-blur-sm border-gray-300/30",
                    theme === "ice" && "bg-opacity-70 backdrop-blur-sm border-blue-200/30",
                  )}
                >
                  <CardHeader>
                    <CardTitle>Pending Approval</CardTitle>
                    <CardDescription>Shops waiting for approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {shops
                        .filter((shop) => shop.status === "Pending")
                        .map((shop) => (
                          <div key={shop.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage
                                    src={`/placeholder.svg?height=48&width=48&text=${shop.name.charAt(0)}`}
                                    alt={shop.name}
                                  />
                                  <AvatarFallback>{shop.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{shop.name}</h3>
                                  <p className="text-sm text-muted-foreground">Owner: {shop.owner}</p>
                                  <p className="text-sm text-muted-foreground">Category: {shop.category}</p>
                                  <p className="text-sm text-muted-foreground">{shop.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  onClick={() => handleApproveShop(shop)}
                                >
                                  <FiCheck className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                  onClick={() => handleRejectShop(shop)}
                                >
                                  <FiX className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      {shops.filter((shop) => shop.status === "Pending").length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No pending shops</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="active">
                <Card
                  className={cn(
                    "shadow-md",
                    theme === "dark" && "bg-card border-gray-800",
                    theme === "wooden" && "bg-card border-amber-800/20",
                    theme === "metallic" && "bg-opacity-80 backdrop-blur-sm border-gray-300/30",
                    theme === "ice" && "bg-opacity-70 backdrop-blur-sm border-blue-200/30",
                  )}
                >
                  <CardHeader>
                    <CardTitle>Active Shops</CardTitle>
                    <CardDescription>Currently operating shops</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Active shops view is under development</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Total active shops: {shops.filter((shop) => shop.status === "Active").length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="suspended">
                <Card
                  className={cn(
                    "shadow-md",
                    theme === "dark" && "bg-card border-gray-800",
                    theme === "wooden" && "bg-card border-amber-800/20",
                    theme === "metallic" && "bg-opacity-80 backdrop-blur-sm border-gray-300/30",
                    theme === "ice" && "bg-opacity-70 backdrop-blur-sm border-blue-200/30",
                  )}
                >
                  <CardHeader>
                    <CardTitle>Suspended Shops</CardTitle>
                    <CardDescription>Shops that have been suspended</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Suspended shops view is under development</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Total suspended shops: {shops.filter((shop) => shop.status === "Suspended").length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Approve Shop Dialog */}
      <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <AlertDialogContent
          className={cn(
            theme === "dark" && "bg-card border-gray-800",
            theme === "wooden" && "bg-card border-amber-800/20",
            theme === "metallic" && "bg-opacity-80 backdrop-blur-sm border-gray-300/30",
            theme === "ice" && "bg-opacity-70 backdrop-blur-sm border-blue-200/30",
          )}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Shop</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve the shop
              {selectedShop && <span className="font-medium"> "{selectedShop.name}"</span>}? This will make the shop
              active and visible to customers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmApproveShop} className="bg-green-500 hover:bg-green-600 text-white">
              Approve Shop
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Shop Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent
          className={cn(
            theme === "dark" && "bg-card border-gray-800",
            theme === "wooden" && "bg-card border-amber-800/20",
            theme === "metallic" && "bg-opacity-80 backdrop-blur-sm border-gray-300/30",
            theme === "ice" && "bg-opacity-70 backdrop-blur-sm border-blue-200/30",
          )}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Shop</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the shop
              {selectedShop && <span className="font-medium"> "{selectedShop.name}"</span>}? This action cannot be
              undone and will permanently remove all shop data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteShop} className="bg-red-500 hover:bg-red-600 text-white">
              Delete Shop
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

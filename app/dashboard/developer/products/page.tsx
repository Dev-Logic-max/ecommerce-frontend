"use client"

import { useState, useEffect } from "react"
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiEye } from "react-icons/fi"
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

// Generate mock products
const generateMockProducts = () => {
  const productNames = [
    "Smartphone Pro",
    "Wireless Headphones",
    "Gaming Laptop",
    "Smart Watch",
    "Tablet Device",
    "Bluetooth Speaker",
    "Digital Camera",
    "Fitness Tracker",
    "Wireless Mouse",
    "Keyboard Mechanical",
    "Monitor 4K",
    "External Hard Drive",
    "Power Bank",
    "USB Cable",
    "Phone Case",
    "Screen Protector",
    "Charging Dock",
    "Webcam HD",
    "Microphone USB",
    "Router WiFi",
  ]

  const categories = ["Electronics", "Accessories", "Computing", "Audio", "Mobile", "Gaming", "Storage"]
  const brands = ["TechCorp", "InnovateTech", "DigitalPro", "SmartDevices", "FutureTech"]
  const statuses = ["Active", "Inactive", "Out of Stock", "Discontinued"]

  const products = []

  for (let i = 1; i <= 30; i++) {
    const name = productNames[Math.floor(Math.random() * productNames.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const brand = brands[Math.floor(Math.random() * brands.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    products.push({
      id: i,
      name: `${name} ${i}`,
      category,
      brand,
      price: Math.floor(Math.random() * 1000) + 50,
      stock: Math.floor(Math.random() * 100),
      status,
      sku: `SKU-${String(i).padStart(4, "0")}`,
      description: `High-quality ${name.toLowerCase()} with advanced features and excellent performance.`,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    })
  }

  return products
}

const mockProducts = generateMockProducts()

export default function ProductManagementPage() {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((product) => product.status.toLowerCase() === statusFilter.toLowerCase())
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [products, searchTerm, categoryFilter, statusFilter])

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500 hover:bg-green-600"
      case "inactive":
        return "bg-gray-500 hover:bg-gray-600"
      case "out of stock":
        return "bg-red-500 hover:bg-red-600"
      case "discontinued":
        return "bg-amber-500 hover:bg-amber-600"
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
    ]
    return colors[category.length % colors.length]
  }

  const uniqueCategories = Array.from(new Set(products.map((product) => product.category)))

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
                Product Management
              </h1>
              <Button
                className={cn(
                  "theme-gradient text-white border-none",
                  theme === "wooden" && "shadow-md",
                  theme === "metallic" && "shadow-inner",
                  theme === "ice" && "shadow-lg",
                )}
                onClick={() => toast.info("Add product functionality is under development")}
              >
                <FiPlus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="low-stock">
                  Low Stock
                  <Badge variant="destructive" className="ml-2">
                    {products.filter((p) => p.stock < 10).length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
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
                    <CardTitle>All Products</CardTitle>
                    <CardDescription>Manage all products in the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search products..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2">
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

                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="out of stock">Out of Stock</SelectItem>
                              <SelectItem value="discontinued">Discontinued</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Product</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                Category
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Brand</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Price</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Stock</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {currentProducts.map((product) => (
                              <tr key={product.id} className="hover:bg-muted/50">
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2">
                                      <AvatarImage
                                        src={`/placeholder.svg?height=32&width=32&text=${product.name.charAt(0)}`}
                                        alt={product.name}
                                      />
                                      <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="text-sm font-medium">{product.name}</div>
                                      <div className="text-xs text-muted-foreground">{product.sku}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <Badge className={cn("text-white", getCategoryBadgeColor(product.category))}>
                                    {product.category}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">{product.brand}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">${product.price}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span
                                    className={cn(
                                      "text-sm",
                                      product.stock < 10 ? "text-red-500 font-medium" : "text-foreground",
                                    )}
                                  >
                                    {product.stock}
                                  </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <Badge className={cn("text-white", getStatusBadgeColor(product.status))}>
                                    {product.status}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                                      onClick={() => toast.info("View product functionality is under development")}
                                    >
                                      <FiEye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                      onClick={() => toast.info("Edit product functionality is under development")}
                                    >
                                      <FiEdit2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                      onClick={() => toast.info("Delete product functionality is under development")}
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

                      {filteredProducts.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No products found matching your criteria</p>
                        </div>
                      )}

                      {/* Pagination */}
                      {filteredProducts.length > 0 && (
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
                    <CardTitle>Active Products</CardTitle>
                    <CardDescription>Currently active products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Active products view is under development</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Total active products: {products.filter((p) => p.status === "Active").length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="low-stock">
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
                    <CardTitle>Low Stock Products</CardTitle>
                    <CardDescription>Products with low inventory levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products
                        .filter((p) => p.stock < 10)
                        .map((product) => (
                          <div key={product.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage
                                    src={`/placeholder.svg?height=48&width=48&text=${product.name.charAt(0)}`}
                                    alt={product.name}
                                  />
                                  <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{product.name}</h3>
                                  <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                                  <p className="text-sm text-muted-foreground">Brand: {product.brand}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-red-500">{product.stock} left</p>
                                <p className="text-sm text-muted-foreground">${product.price}</p>
                                <Button
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => toast.info("Restock functionality is under development")}
                                >
                                  Restock
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      {products.filter((p) => p.stock < 10).length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No low stock products</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="out-of-stock">
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
                    <CardTitle>Out of Stock Products</CardTitle>
                    <CardDescription>Products that are currently out of stock</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Out of stock products view is under development</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Total out of stock: {products.filter((p) => p.status === "Out of Stock").length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

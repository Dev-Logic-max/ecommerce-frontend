"use client"

import { useState, useEffect } from "react"
import { FiSearch, FiEye, FiPackage, FiTruck, FiCheck } from "react-icons/fi"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Generate mock orders
const generateMockOrders = () => {
  const customers = [
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

  const products = ["Smartphone Pro", "Wireless Headphones", "Gaming Laptop", "Smart Watch", "Tablet Device"]

  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"]
  const paymentStatuses = ["Paid", "Pending", "Failed", "Refunded"]

  const orders = []

  for (let i = 1; i <= 50; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)]
    const product = products[Math.floor(Math.random() * products.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)]
    const quantity = Math.floor(Math.random() * 5) + 1
    const price = Math.floor(Math.random() * 500) + 50

    // Create date between last 30 days and now
    const now = new Date()
    const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000)

    orders.push({
      id: i,
      orderNumber: `ORD-${String(i).padStart(6, "0")}`,
      customer,
      customerEmail: `${customer.toLowerCase().replace(" ", ".")}@example.com`,
      product,
      quantity,
      price,
      total: price * quantity,
      status,
      paymentStatus,
      createdAt: pastDate.toISOString().split("T")[0],
      shippingAddress: `${Math.floor(Math.random() * 9999)} Main St, City, State 12345`,
    })
  }

  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

const mockOrders = generateMockOrders()

export default function OrderManagementPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState(mockOrders)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentFilter, setPaymentFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(10)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.product.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status.toLowerCase() === statusFilter.toLowerCase())
    }

    if (paymentFilter !== "all") {
      filtered = filtered.filter((order) => order.paymentStatus.toLowerCase() === paymentFilter.toLowerCase())
    }

    setFilteredOrders(filtered)
    setCurrentPage(1)
  }, [orders, searchTerm, statusFilter, paymentFilter])

  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setOrderDetailsOpen(true)
  }

  const handleUpdateOrderStatus = (orderId: number, newStatus: string) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
    toast.success(`Order status updated to ${newStatus}`)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-500 hover:bg-amber-600"
      case "processing":
        return "bg-blue-500 hover:bg-blue-600"
      case "shipped":
        return "bg-purple-500 hover:bg-purple-600"
      case "delivered":
        return "bg-green-500 hover:bg-green-600"
      case "cancelled":
        return "bg-red-500 hover:bg-red-600"
      case "refunded":
        return "bg-gray-500 hover:bg-gray-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getPaymentBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-500 hover:bg-green-600"
      case "pending":
        return "bg-amber-500 hover:bg-amber-600"
      case "failed":
        return "bg-red-500 hover:bg-red-600"
      case "refunded":
        return "bg-gray-500 hover:bg-gray-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

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
                Order Management
              </h1>
              <Button
                className={cn(
                  "theme-gradient text-white border-none",
                  theme === "wooden" && "shadow-md",
                  theme === "metallic" && "shadow-inner",
                  theme === "ice" && "shadow-lg",
                )}
                onClick={() => toast.info("Export orders functionality is under development")}
              >
                <FiPackage className="mr-2 h-4 w-4" />
                Export Orders
              </Button>
            </div>

            {/* Order Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className={cn("shadow-md", theme === "dark" && "bg-card border-gray-800")}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{orders.length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-blue-500 bg-opacity-10 flex items-center justify-center">
                      <FiPackage className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={cn("shadow-md", theme === "dark" && "bg-card border-gray-800")}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Pending").length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-amber-500 bg-opacity-10 flex items-center justify-center">
                      <FiCheck className="h-5 w-5 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={cn("shadow-md", theme === "dark" && "bg-card border-gray-800")}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Shipped</p>
                      <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Shipped").length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-purple-500 bg-opacity-10 flex items-center justify-center">
                      <FiTruck className="h-5 w-5 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={cn("shadow-md", theme === "dark" && "bg-card border-gray-800")}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold">
                        ${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-green-500 bg-opacity-10 flex items-center justify-center">
                      <FiCheck className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                  <Badge variant="destructive" className="ml-2">
                    {orders.filter((o) => o.status === "Pending").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
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
                    <CardTitle>All Orders</CardTitle>
                    <CardDescription>Manage all orders in the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search orders..."
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
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Payment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Payments</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                              <SelectItem value="refunded">Refunded</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Order</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                Customer
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Product</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Total</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Payment</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {currentOrders.map((order) => (
                              <tr key={order.id} className="hover:bg-muted/50">
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm font-medium">{order.orderNumber}</div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarImage
                                        src={`/placeholder.svg?height=24&width=24&text=${order.customer.charAt(0)}`}
                                        alt={order.customer}
                                      />
                                      <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="text-sm font-medium">{order.customer}</div>
                                      <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm">{order.product}</div>
                                  <div className="text-xs text-muted-foreground">Qty: {order.quantity}</div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                  ${order.total.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <Badge className={cn("text-white", getStatusBadgeColor(order.status))}>
                                    {order.status}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <Badge className={cn("text-white", getPaymentBadgeColor(order.paymentStatus))}>
                                    {order.paymentStatus}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">{order.createdAt}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                      onClick={() => handleViewOrder(order)}
                                    >
                                      <FiEye className="h-4 w-4" />
                                    </Button>
                                    {order.status === "Pending" && (
                                      <Button
                                        size="sm"
                                        className="h-8 bg-green-500 hover:bg-green-600 text-white"
                                        onClick={() => handleUpdateOrderStatus(order.id, "Processing")}
                                      >
                                        Process
                                      </Button>
                                    )}
                                    {order.status === "Processing" && (
                                      <Button
                                        size="sm"
                                        className="h-8 bg-purple-500 hover:bg-purple-600 text-white"
                                        onClick={() => handleUpdateOrderStatus(order.id, "Shipped")}
                                      >
                                        Ship
                                      </Button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      {filteredOrders.length > 0 && (
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

              {/* Other tab contents with similar structure */}
              <TabsContent value="pending">
                <Card className={cn("shadow-md", theme === "dark" && "bg-card border-gray-800")}>
                  <CardHeader>
                    <CardTitle>Pending Orders</CardTitle>
                    <CardDescription>Orders waiting for processing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Pending orders view is under development</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Total pending: {orders.filter((o) => o.status === "Pending").length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Order Details Modal */}
      <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>{selectedOrder && `Order ${selectedOrder.orderNumber} details`}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Customer Information</h3>
                  <p className="text-sm">{selectedOrder.customer}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Order Information</h3>
                  <p className="text-sm">Order: {selectedOrder.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">Date: {selectedOrder.createdAt}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Product Details</h3>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{selectedOrder.product}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {selectedOrder.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${selectedOrder.total.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">${selectedOrder.price} each</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <p className="text-sm">{selectedOrder.shippingAddress}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge className={cn("text-white", getStatusBadgeColor(selectedOrder.status))}>
                    {selectedOrder.status}
                  </Badge>
                  <Badge className={cn("text-white", getPaymentBadgeColor(selectedOrder.paymentStatus))}>
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setOrderDetailsOpen(false)}>
                    Close
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => toast.info("Edit order functionality is under development")}
                  >
                    Edit Order
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  FiCheck,
  FiEdit2,
  FiFilter,
  FiSearch,
  FiTrash2,
  FiUserPlus,
  FiX,
  FiUsers,
  FiEye,
  FiMail,
  FiCalendar,
  FiShield,
  FiActivity,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiTruck,
  FiStar,
  FiUserCheck,
  FiUserX,
  FiEdit,
  FiSave,
  FiXCircle,
} from "react-icons/fi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme/AdminsThemeProvider"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Generate 40+ mock users with enhanced data
const generateMockUsers = () => {
  const roles = [
    { id: 1, name: "Developer" },
    { id: 2, name: "PlatformAdmin" },
    { id: 3, name: "OperationsAdmin" },
    { id: 4, name: "Retailer" },
    { id: 5, name: "Merchant" },
    { id: 6, name: "Supplier" },
    { id: 7, name: "Courier" },
    { id: 8, name: "Customer" },
  ]

  const firstNames = [
    "John",
    "Jane",
    "Bob",
    "Alice",
    "Mike",
    "Sarah",
    "David",
    "Emma",
    "James",
    "Olivia",
    "William",
    "Sophia",
    "Benjamin",
    "Isabella",
    "Lucas",
    "Mia",
    "Henry",
    "Charlotte",
    "Alexander",
    "Amelia",
  ]

  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Wilson",
    "Martinez",
    "Anderson",
    "Taylor",
    "Thomas",
    "Hernandez",
    "Moore",
    "Martin",
    "Jackson",
    "Thompson",
    "White",
    "Lopez",
  ]

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ]
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "India",
    "Mexico",
  ]

  const users = []

  for (let i = 1; i <= 45; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const username = (firstName + lastName.charAt(0)).toLowerCase() + Math.floor(Math.random() * 100)
    const role = roles[Math.floor(Math.random() * roles.length)]

    // Create date between 2022-01-01 and now
    const start = new Date(2022, 0, 1).getTime()
    const end = new Date().getTime()
    const createdAt = new Date(start + Math.random() * (end - start))
    const formattedDate = createdAt.toISOString().split("T")[0]

    // Generate additional user details
    const lastLogin = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    const status = Math.random() > 0.15 ? "Active" : "Inactive"
    const phone =
      Math.random() > 0.3
        ? `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
        : ""
    const city = cities[Math.floor(Math.random() * cities.length)]
    const country = countries[Math.floor(Math.random() * countries.length)]

    // Generate role-specific assets
    let assets = {}
    switch (role.id) {
      case 4: // Retailer
        assets = {
          shops: Math.floor(Math.random() * 5) + 1,
          products: Math.floor(Math.random() * 100) + 10,
          orders: Math.floor(Math.random() * 500) + 50,
          revenue: Math.floor(Math.random() * 50000) + 5000,
        }
        break
      case 5: // Merchant
        assets = {
          shops: Math.floor(Math.random() * 3) + 1,
          warehouses: Math.floor(Math.random() * 2) + 1,
          products: Math.floor(Math.random() * 200) + 20,
          orders: Math.floor(Math.random() * 1000) + 100,
          revenue: Math.floor(Math.random() * 100000) + 10000,
        }
        break
      case 6: // Supplier
        assets = {
          warehouses: Math.floor(Math.random() * 4) + 1,
          products: Math.floor(Math.random() * 500) + 50,
          orders: Math.floor(Math.random() * 2000) + 200,
          revenue: Math.floor(Math.random() * 200000) + 20000,
        }
        break
      case 7: // Courier
        assets = {
          deliveries: Math.floor(Math.random() * 1000) + 100,
          rating: (Math.random() * 2 + 3).toFixed(1),
          vehicles: Math.floor(Math.random() * 3) + 1,
        }
        break
      case 8: // Customer
        assets = {
          orders: Math.floor(Math.random() * 50) + 1,
          wishlist: Math.floor(Math.random() * 20) + 1,
          reviews: Math.floor(Math.random() * 30) + 1,
          spent: Math.floor(Math.random() * 5000) + 100,
        }
        break
      default: // Admin roles
        assets = {
          managedUsers: Math.floor(Math.random() * 100) + 10,
          systemAccess: ["Dashboard", "Analytics", "User Management", "Settings"],
          permissions: Math.floor(Math.random() * 20) + 5,
        }
    }

    users.push({
      id: i,
      username,
      fullName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email: Math.random() > 0.2 ? `${username}@example.com` : "",
      phone,
      city,
      country,
      role,
      status,
      createdAt: formattedDate,
      lastLogin,
      loginCount: Math.floor(Math.random() * 500) + 1,
      isVerified: Math.random() > 0.3,
      assets,
      rating: role.id === 7 ? (Math.random() * 2 + 3).toFixed(1) : null,
    })
  }

  // Add admin user
  users.unshift({
    id: 0,
    username: "admin",
    fullName: "Admin User",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+1 (555) 123-4567",
    city: "San Francisco",
    country: "United States",
    role: roles[0],
    status: "Active",
    createdAt: "2023-01-01",
    lastLogin: new Date().toISOString().split("T")[0],
    loginCount: 1250,
    isVerified: true,
    assets: {
      managedUsers: 150,
      systemAccess: ["Full Access"],
      permissions: 50,
    },
  })

  return users
}

// Mock data for users
const mockUsers = generateMockUsers()

// Enhanced mock data for role requests
const mockRoleRequests = [
  {
    id: 9,
    userId: 10,
    requestedRole: "Supplier",
    status: "PENDING",
    adminId: null,
    createdAt: "2025-06-18T11:10:21.313Z",
    updatedAt: "2025-06-18T11:10:21.313Z",
    reason: "I want to expand my business by supplying products to other merchants on the platform",
    businessDetails: "Currently operating 2 retail stores and looking to become a supplier",
    user: {
      id: 10,
      username: "testuser6",
      email: "test6@example.com",
      phone: "+1 (555) 987-6543",
      password: "$2b$10$OIvIDZh4tRNO5FOso5c/yuFTztz9DBW3O5r8NC/PagXgOjmXv9xtm",
      profilePicturePath: null,
      roleId: 8,
      fullName: "John Supplier",
      city: "Chicago",
      country: "United States",
      createdAt: "2025-06-16T22:19:14.619Z",
      updatedAt: "2025-06-16T22:19:14.619Z",
      role: {
        id: 8,
        name: "Customer",
      },
      currentAssets: {
        orders: 25,
        wishlist: 12,
        reviews: 18,
        spent: 2500,
      },
    },
  },
  {
    id: 8,
    userId: 15,
    requestedRole: "Retailer",
    status: "PENDING",
    adminId: null,
    createdAt: "2025-06-17T09:15:30.123Z",
    updatedAt: "2025-06-17T09:15:30.123Z",
    reason: "I have experience in retail and want to start selling on this platform",
    businessDetails: "5 years of retail experience, planning to open an online store",
    user: {
      id: 15,
      username: "retailer_jane",
      email: "jane.retailer@example.com",
      phone: "+1 (555) 123-7890",
      password: "$2b$10$OIvIDZh4tRNO5FOso5c/yuFTztz9DBW3O5r8NC/PagXgOjmXv9xtm",
      profilePicturePath: null,
      roleId: 8,
      fullName: "Jane Retailer",
      city: "New York",
      country: "United States",
      createdAt: "2025-06-15T14:30:45.789Z",
      updatedAt: "2025-06-15T14:30:45.789Z",
      role: {
        id: 8,
        name: "Customer",
      },
      currentAssets: {
        orders: 45,
        wishlist: 8,
        reviews: 32,
        spent: 4200,
      },
    },
  },
  {
    id: 7,
    userId: 22,
    requestedRole: "Merchant",
    status: "PENDING",
    adminId: null,
    createdAt: "2025-06-19T16:45:12.456Z",
    updatedAt: "2025-06-19T16:45:12.456Z",
    reason: "Looking to upgrade from retailer to merchant to access wholesale features",
    businessDetails: "Currently managing 3 retail shops, want to add warehouse capabilities",
    user: {
      id: 22,
      username: "merchant_mike",
      email: "mike.merchant@example.com",
      phone: "+1 (555) 456-1234",
      password: "$2b$10$OIvIDZh4tRNO5FOso5c/yuFTztz9DBW3O5r8NC/PagXgOjmXv9xtm",
      profilePicturePath: null,
      roleId: 4,
      fullName: "Mike Merchant",
      city: "Los Angeles",
      country: "United States",
      createdAt: "2025-06-10T11:20:30.654Z",
      updatedAt: "2025-06-10T11:20:30.654Z",
      role: {
        id: 4,
        name: "Retailer",
      },
      currentAssets: {
        shops: 3,
        products: 85,
        orders: 320,
        revenue: 25000,
      },
    },
  },
]

// Available roles
const roles = [
  { id: 1, name: "Developer" },
  { id: 2, name: "PlatformAdmin" },
  { id: 3, name: "OperationsAdmin" },
  { id: 4, name: "Retailer" },
  { id: 5, name: "Merchant" },
  { id: 6, name: "Supplier" },
  { id: 7, name: "Courier" },
  { id: 8, name: "Customer" },
]

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [roleRequests, setRoleRequests] = useState(mockRoleRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false)
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false)
  const [viewUserDialogOpen, setViewUserDialogOpen] = useState(false)
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
  const [deleteConfirmStep, setDeleteConfirmStep] = useState(1)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  const [editMode, setEditMode] = useState(false)
  const { themeConfig } = useTheme()

  // Form state for new user
  const [newUserForm, setNewUserForm] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    roleId: "",
  })

  // Form state for edit user
  const [editUserForm, setEditUserForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    roleId: "",
    status: "",
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter users based on different categories
  const getFilteredUsers = (category: string) => {
    let filteredUsers = users

    switch (category) {
      case "active":
        filteredUsers = users.filter((user) => user.status === "Active")
        break
      case "inactive":
        filteredUsers = users.filter((user) => user.status === "Inactive")
        break
      case "verified":
        filteredUsers = users.filter((user) => user.isVerified)
        break
      case "top":
        filteredUsers = users.filter((user) => user.loginCount > 200).sort((a, b) => b.loginCount - a.loginCount)
        break
      default:
        filteredUsers = users
    }

    return filteredUsers.filter((user) => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = roleFilter === null || user.role.id === roleFilter

      return matchesSearch && matchesRole
    })
  }

  const filteredUsers = getFilteredUsers("all")
  const activeUsers = getFilteredUsers("active")
  const inactiveUsers = getFilteredUsers("inactive")
  const verifiedUsers = getFilteredUsers("verified")
  const topUsers = getFilteredUsers("top")

  // Get current users for pagination
  const getPaginatedUsers = (usersList: any[]) => {
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    return usersList.slice(indexOfFirstUser, indexOfLastUser)
  }

  const handleApproveRoleRequest = (requestId: number) => {
    setRoleRequests((prev) => prev.filter((req) => req.id !== requestId))
    console.log("Role request approved successfully!")
  }

  const handleRejectRoleRequest = (requestId: number) => {
    setRoleRequests((prev) => prev.filter((req) => req.id !== requestId))
    console.log("Role request rejected")
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = {
      id: users.length + 1,
      username: newUserForm.username,
      fullName: newUserForm.fullName || newUserForm.username,
      firstName: newUserForm.fullName ? newUserForm.fullName.split(" ")[0] : newUserForm.username,
      lastName: newUserForm.fullName ? newUserForm.fullName.split(" ").slice(1).join(" ") : "",
      email: newUserForm.email,
      phone: newUserForm.phone,
      city: "",
      country: "",
      role: roles.find((r) => r.id === Number.parseInt(newUserForm.roleId)) || roles[7],
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
      loginCount: 0,
      isVerified: false,
      assets: {},
    }

    // setUsers([...users, newUser])
    setNewUserDialogOpen(false)
    setNewUserForm({
      username: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      roleId: "",
    })
    console.log("User created successfully!")
  }

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return

    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          fullName: editUserForm.fullName,
          firstName: editUserForm.fullName.split(" ")[0],
          lastName: editUserForm.fullName.split(" ").slice(1).join(" "),
          email: editUserForm.email,
          phone: editUserForm.phone,
          status: editUserForm.status,
          role: roles.find((r) => r.id === Number.parseInt(editUserForm.roleId)) || user.role,
        }
      }
      return user
    })

    setUsers(updatedUsers)
    setEditUserDialogOpen(false)
    setEditMode(false)
    console.log("User updated successfully!")
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return

    setUsers(users.filter((user) => user.id !== selectedUser.id))
    setDeleteUserDialogOpen(false)
    setDeleteConfirmStep(1)
    console.log("User deleted successfully!")
  }

  const openViewUserDialog = (user: any) => {
    setSelectedUser(user)
    setViewUserDialogOpen(true)
  }

  const openEditUserDialog = (user: any) => {
    setSelectedUser(user)
    setEditUserForm({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      status: user.status,
      roleId: user.role.id.toString(),
    })
    setEditMode(false)
    setEditUserDialogOpen(true)
  }

  const openDeleteUserDialog = (user: any) => {
    setSelectedUser(user)
    setDeleteConfirmStep(1)
    setDeleteUserDialogOpen(true)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUserForm({
      ...newUserForm,
      [name]: value,
    })
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditUserForm({
      ...editUserForm,
      [name]: value,
    })
  }

  const renderUserTable = (usersList: any[], title: string) => {
    const currentUsers = getPaginatedUsers(usersList)
    const totalPages = Math.ceil(usersList.length / usersPerPage)

    return (
      <Card
        className="shadow-xl border-2"
        style={{
          backgroundColor: themeConfig.colors.card,
          borderColor: themeConfig.colors.border,
        }}
      >
        <CardHeader>
          <CardTitle
            style={{ color: themeConfig.colors.foreground, textShadow: `0 2px 4px ${themeConfig.colors.primary}40` }}
          >
            {title} ({usersList.length})
          </CardTitle>
          <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
            Manage {title.toLowerCase()} in the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    backgroundColor: themeConfig.colors.background,
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.foreground,
                  }}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <FiFilter className="h-4 w-4" />
                    Filter by Role
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setRoleFilter(null)}>All Roles</DropdownMenuItem>
                  {roles.map((role) => (
                    <DropdownMenuItem key={role.id} onClick={() => setRoleFilter(role.id)}>
                      {role.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="border rounded-lg overflow-hidden" style={{ borderColor: themeConfig.colors.border }}>
              <table className="min-w-full divide-y" style={{ borderColor: themeConfig.colors.border }}>
                <thead style={{ backgroundColor: themeConfig.colors.muted }}>
                  <tr>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium"
                      style={{
                        color: themeConfig.colors.foreground,
                        textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                      }}
                    >
                      User
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium"
                      style={{
                        color: themeConfig.colors.foreground,
                        textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                      }}
                    >
                      Contact
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium"
                      style={{
                        color: themeConfig.colors.foreground,
                        textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                      }}
                    >
                      Role
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium"
                      style={{
                        color: themeConfig.colors.foreground,
                        textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                      }}
                    >
                      Status
                    </th>
                    <th
                      className="px-4 py-3 text-left text-xs font-medium"
                      style={{
                        color: themeConfig.colors.foreground,
                        textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                      }}
                    >
                      Created
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-medium"
                      style={{
                        color: themeConfig.colors.foreground,
                        textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: themeConfig.colors.border }}>
                  {currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition-colors duration-200"
                      style={{ backgroundColor: themeConfig.colors.card }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${themeConfig.colors.muted}50`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = themeConfig.colors.card
                      }}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${user.fullName.charAt(0)}`} />
                            <AvatarFallback>
                              {user.fullName
                                .split(" ")
                                .map((n: any) => n.charAt(0))
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div
                              className="text-sm font-medium"
                              style={{
                                color: themeConfig.colors.foreground,
                                textShadow: `0 1px 2px ${themeConfig.colors.primary}20`,
                              }}
                            >
                              {user.fullName}
                            </div>
                            <div className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm" style={{ color: themeConfig.colors.foreground }}>
                          {user.email || "No email"}
                        </div>
                        <div className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {user.phone || "No phone"}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          className={cn(
                            user.role.id === 1 && "bg-red-500 hover:bg-red-600",
                            user.role.id === 2 && "bg-amber-500 hover:bg-amber-600",
                            user.role.id === 3 && "bg-blue-500 hover:bg-blue-600",
                            user.role.id === 4 && "bg-purple-500 hover:bg-purple-600",
                            user.role.id === 5 && "bg-green-500 hover:bg-green-600",
                            user.role.id === 6 && "bg-teal-500 hover:bg-teal-600",
                            user.role.id === 7 && "bg-cyan-500 hover:bg-cyan-600",
                            user.role.id === 8 && "bg-gray-500 hover:bg-gray-600",
                            "text-white",
                          )}
                        >
                          {user.role.name}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Badge className={cn(user.status === "Active" ? "bg-green-500" : "bg-red-500", "text-white")}>
                            {user.status}
                          </Badge>
                          {user.isVerified && <FiShield className="h-4 w-4 text-blue-500" title="Verified" />}
                        </div>
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap text-sm"
                        style={{ color: themeConfig.colors.foreground }}
                      >
                        {user.createdAt}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => openViewUserDialog(user)}
                          >
                            <FiEye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                            onClick={() => openEditUserDialog(user)}
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => openDeleteUserDialog(user)}
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

            {usersList.length === 0 && (
              <div className="text-center py-8">
                <p style={{ color: themeConfig.colors.foreground }}>No users found matching your criteria</p>
              </div>
            )}

            {/* Pagination */}
            {usersList.length > 0 && (
              <div className="flex items-center justify-center space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
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
                        className={cn("h-8 w-8 p-0")}
                        style={{
                          background: currentPage === pageNum ? themeConfig.gradient : "transparent",
                          color: currentPage === pageNum ? "white" : themeConfig.colors.foreground,
                          borderColor: themeConfig.colors.border,
                        }}
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
    )
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
              textShadow: `0 4px 8px ${themeConfig.colors.primary}60, 0 2px 4px ${themeConfig.colors.primary}40`,
            }}
          >
            User Management
          </h1>
          <p
            className="text-lg opacity-80"
            style={{
              color: themeConfig.colors.foreground,
              textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
            }}
          >
            Manage users, roles, and permissions across the platform
          </p>
        </div>

        <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
          <Button
            size="lg"
            className="transition-all duration-300 hover:scale-105 hover:shadow-xl text-white font-semibold"
            style={{
              background: themeConfig.gradient,
              textShadow: `0 1px 2px rgba(0,0,0,0.3)`,
            }}
            onClick={() => setNewUserDialogOpen(true)}
          >
            <FiUserPlus className="mr-2 h-5 w-5" />
            Create User
          </Button>
          <DialogContent
            className="max-w-2xl"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            <DialogHeader>
              <DialogTitle
                style={{
                  color: themeConfig.colors.foreground,
                  textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                }}
              >
                Create New User
              </DialogTitle>
              <DialogDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Add a new user to the platform. Only username and password are required.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="username" style={{ color: themeConfig.colors.foreground }}>
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={newUserForm.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    required
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" style={{ color: themeConfig.colors.foreground }}>
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    value={newUserForm.password}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Enter password"
                    required
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fullName" style={{ color: themeConfig.colors.foreground }}>
                    Full Name <span className="text-gray-400">(optional)</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={newUserForm.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" style={{ color: themeConfig.colors.foreground }}>
                    Email <span className="text-gray-400">(optional)</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={newUserForm.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Enter email"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" style={{ color: themeConfig.colors.foreground }}>
                    Phone <span className="text-gray-400">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newUserForm.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role" style={{ color: themeConfig.colors.foreground }}>
                    Role
                  </Label>
                  <Select
                    value={newUserForm.roleId}
                    onValueChange={(value) => setNewUserForm({ ...newUserForm, roleId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setNewUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="text-white" style={{ background: themeConfig.gradient }}>
                  Create User
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all-users" className="space-y-4">
        <TabsList
          style={{
            backgroundColor: themeConfig.colors.muted,
          }}
        >
          <TabsTrigger value="all-users" className="flex items-center gap-2">
            <FiUsers className="h-4 w-4" />
            All Users
          </TabsTrigger>
          <TabsTrigger value="active-users" className="flex items-center gap-2">
            <FiUserCheck className="h-4 w-4" />
            Active Users
          </TabsTrigger>
          <TabsTrigger value="inactive-users" className="flex items-center gap-2">
            <FiUserX className="h-4 w-4" />
            Inactive Users
          </TabsTrigger>
          <TabsTrigger value="verified-users" className="flex items-center gap-2">
            <FiShield className="h-4 w-4" />
            Verified Users
          </TabsTrigger>
          <TabsTrigger value="top-users" className="flex items-center gap-2">
            <FiStar className="h-4 w-4" />
            Top Users
          </TabsTrigger>
          <TabsTrigger value="role-requests" className="flex items-center gap-2">
            <FiUserPlus className="h-4 w-4" />
            Role Requests
            {roleRequests.length > 0 && (
              <Badge className="ml-1 text-white" style={{ backgroundColor: themeConfig.colors.danger }}>
                {roleRequests.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-users">{renderUserTable(filteredUsers, "All Users")}</TabsContent>

        <TabsContent value="active-users">{renderUserTable(activeUsers, "Active Users")}</TabsContent>

        <TabsContent value="inactive-users">{renderUserTable(inactiveUsers, "Inactive Users")}</TabsContent>

        <TabsContent value="verified-users">{renderUserTable(verifiedUsers, "Verified Users")}</TabsContent>

        <TabsContent value="top-users">{renderUserTable(topUsers, "Top Users")}</TabsContent>

        <TabsContent value="role-requests">
          <Card
            className="shadow-xl border-2"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            <CardHeader>
              <CardTitle
                style={{
                  color: themeConfig.colors.foreground,
                  textShadow: `0 2px 4px ${themeConfig.colors.primary}40`,
                }}
              >
                Role Requests ({roleRequests.length})
              </CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Manage pending role upgrade requests with detailed user information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {roleRequests.length > 0 ? (
                <div className="space-y-6">
                  {roleRequests.map((request) => (
                    <Card
                      key={request.id}
                      className="border-2 transition-all duration-200 hover:shadow-lg"
                      style={{
                        backgroundColor: themeConfig.colors.background,
                        borderColor: themeConfig.colors.border,
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          {/* Request Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage
                                  src={`/placeholder.svg?height=64&width=64&text=${request.user.fullName?.charAt(0) || request.user.username.charAt(0).toUpperCase()}`}
                                />
                                <AvatarFallback className="text-lg">
                                  {request.user.fullName?.charAt(0) || request.user.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-2">
                                <div>
                                  <h3
                                    className="font-semibold text-xl"
                                    style={{
                                      color: themeConfig.colors.foreground,
                                      textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                                    }}
                                  >
                                    {request.user.fullName || request.user.username}
                                  </h3>
                                  <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                                    @{request.user.username} • ID: {request.user.id}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-gray-500 text-white">{request.user.role.name}</Badge>
                                  <span style={{ color: themeConfig.colors.foreground }}>→</span>
                                  <Badge className="bg-blue-500 text-white">{request.requestedRole}</Badge>
                                </div>
                                <div className="text-xs opacity-60" style={{ color: themeConfig.colors.foreground }}>
                                  Request ID: {request.id} • Requested on{" "}
                                  {new Date(request.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                className="text-white"
                                style={{ backgroundColor: themeConfig.colors.success }}
                                onClick={() => handleApproveRoleRequest(request.id)}
                              >
                                <FiCheck className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                className="text-white"
                                style={{ backgroundColor: themeConfig.colors.danger }}
                                onClick={() => handleRejectRoleRequest(request.id)}
                              >
                                <FiX className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>

                          {/* User Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4
                                className="font-semibold text-lg"
                                style={{
                                  color: themeConfig.colors.foreground,
                                  textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                                }}
                              >
                                Contact Information
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                  <FiMail className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                                  <div>
                                    <p className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                                      Email
                                    </p>
                                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                                      {request.user.email || "Not provided"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <FiPhone className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                                  <div>
                                    <p className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                                      Phone
                                    </p>
                                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                                      {request.user.phone || "Not provided"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <FiMapPin className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                                  <div>
                                    <p className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                                      Location
                                    </p>
                                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                                      {request.user.city && request.user.country
                                        ? `${request.user.city}, ${request.user.country}`
                                        : "Not provided"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4
                                className="font-semibold text-lg"
                                style={{
                                  color: themeConfig.colors.foreground,
                                  textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                                }}
                              >
                                Current Assets ({request.user.role.name})
                              </h4>
                              <div className="grid grid-cols-2 gap-3">
                                {Object.entries(request.user.currentAssets).map(([key, value]) => (
                                  <div
                                    key={key}
                                    className="text-center p-3 rounded-lg"
                                    style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                                  >
                                    <p className="text-lg font-bold" style={{ color: themeConfig.colors.primary }}>
                                      {typeof value === "number" ? value.toLocaleString() : value}
                                    </p>
                                    <p
                                      className="text-xs opacity-70 capitalize"
                                      style={{ color: themeConfig.colors.foreground }}
                                    >
                                      {key.replace(/([A-Z])/g, " $1").trim()}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Request Details */}
                          <div className="space-y-4">
                            <h4
                              className="font-semibold text-lg"
                              style={{
                                color: themeConfig.colors.foreground,
                                textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                              }}
                            >
                              Request Details
                            </h4>
                            <div
                              className="p-4 rounded-lg"
                              style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                            >
                              <div className="space-y-3">
                                <div>
                                  <p
                                    className="text-sm font-medium mb-1"
                                    style={{ color: themeConfig.colors.foreground }}
                                  >
                                    Reason for Role Change:
                                  </p>
                                  <p className="text-sm opacity-80" style={{ color: themeConfig.colors.foreground }}>
                                    {request.reason}
                                  </p>
                                </div>
                                <div>
                                  <p
                                    className="text-sm font-medium mb-1"
                                    style={{ color: themeConfig.colors.foreground }}
                                  >
                                    Business Details:
                                  </p>
                                  <p className="text-sm opacity-80" style={{ color: themeConfig.colors.foreground }}>
                                    {request.businessDetails}
                                  </p>
                                </div>
                                <div
                                  className="flex items-center justify-between text-xs opacity-60"
                                  style={{ color: themeConfig.colors.foreground }}
                                >
                                  <span>Member since: {new Date(request.user.createdAt).toLocaleDateString()}</span>
                                  <span>Last updated: {new Date(request.updatedAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <p
                    className="text-xl font-medium mb-2"
                    style={{
                      color: themeConfig.colors.foreground,
                      textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                    }}
                  >
                    No pending role requests
                  </p>
                  <p className="opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    All role requests have been processed
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View User Dialog */}
      <Dialog open={viewUserDialogOpen} onOpenChange={setViewUserDialogOpen}>
        <DialogContent
          className="max-w-4xl max-h-[90vh] overflow-y-auto"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
          }}
        >
          <DialogHeader>
            <DialogTitle
              style={{ color: themeConfig.colors.foreground, textShadow: `0 2px 4px ${themeConfig.colors.primary}40` }}
            >
              User Details
            </DialogTitle>
            <DialogDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
              Complete information about the selected user
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              {/* User Profile Section */}
              <div
                className="flex items-center space-x-4 p-6 rounded-lg"
                style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage src={`/placeholder.svg?height=80&width=80&text=${selectedUser.fullName.charAt(0)}`} />
                  <AvatarFallback className="text-2xl">
                    {selectedUser.fullName
                      .split(" ")
                      .map((n: any) => n.charAt(0))
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3
                    className="text-2xl font-semibold"
                    style={{
                      color: themeConfig.colors.foreground,
                      textShadow: `0 2px 4px ${themeConfig.colors.primary}30`,
                    }}
                  >
                    {selectedUser.fullName}
                  </h3>
                  <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    @{selectedUser.username} • ID: {selectedUser.id}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={cn(
                        selectedUser.role.id === 1 && "bg-red-500",
                        selectedUser.role.id === 2 && "bg-amber-500",
                        selectedUser.role.id === 3 && "bg-blue-500",
                        selectedUser.role.id === 4 && "bg-purple-500",
                        selectedUser.role.id === 5 && "bg-green-500",
                        selectedUser.role.id === 6 && "bg-teal-500",
                        selectedUser.role.id === 7 && "bg-cyan-500",
                        selectedUser.role.id === 8 && "bg-gray-500",
                        "text-white",
                      )}
                    >
                      {selectedUser.role.name}
                    </Badge>
                    <Badge
                      className={cn(selectedUser.status === "Active" ? "bg-green-500" : "bg-red-500", "text-white")}
                    >
                      {selectedUser.status}
                    </Badge>
                    {selectedUser.isVerified && (
                      <Badge className="bg-blue-500 text-white">
                        <FiShield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4
                    className="font-semibold text-lg"
                    style={{
                      color: themeConfig.colors.foreground,
                      textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                    }}
                  >
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <FiMail className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                          Email
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {selectedUser.email || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiPhone className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                          Phone
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {selectedUser.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiMapPin className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                          Location
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {selectedUser.city && selectedUser.country
                            ? `${selectedUser.city}, ${selectedUser.country}`
                            : "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4
                    className="font-semibold text-lg"
                    style={{
                      color: themeConfig.colors.foreground,
                      textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                    }}
                  >
                    Account Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <FiCalendar className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                          Member Since
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {selectedUser.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiActivity className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                          Last Login
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {selectedUser.lastLogin}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiUsers className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                          Total Logins
                        </p>
                        <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                          {selectedUser.loginCount?.toLocaleString() || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role-specific Assets */}
              {selectedUser.assets && Object.keys(selectedUser.assets).length > 0 && (
                <div className="space-y-4">
                  <h4
                    className="font-semibold text-lg"
                    style={{
                      color: themeConfig.colors.foreground,
                      textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                    }}
                  >
                    {selectedUser.role.name} Assets
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Retailer Assets */}
                    {selectedUser.role.id === 4 && (
                      <>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiPackage className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.primary }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.primary }}>
                            {selectedUser.assets.shops}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Shops
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiPackage className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.success }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.success }}>
                            {selectedUser.assets.products}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Products
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiActivity className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.info }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.info }}>
                            {selectedUser.assets.orders}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Orders
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiStar className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.warning }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.warning }}>
                            ${selectedUser.assets.revenue?.toLocaleString()}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Revenue
                          </p>
                        </div>
                      </>
                    )}

                    {/* Merchant Assets */}
                    {selectedUser.role.id === 5 && (
                      <>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiPackage className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.primary }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.primary }}>
                            {selectedUser.assets.shops}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Shops
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiPackage className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.secondary }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.secondary }}>
                            {selectedUser.assets.warehouses}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Warehouses
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiActivity className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.info }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.info }}>
                            {selectedUser.assets.orders}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Orders
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiStar className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.warning }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.warning }}>
                            ${selectedUser.assets.revenue?.toLocaleString()}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Revenue
                          </p>
                        </div>
                      </>
                    )}

                    {/* Supplier Assets */}
                    {selectedUser.role.id === 6 && (
                      <>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiPackage className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.secondary }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.secondary }}>
                            {selectedUser.assets.warehouses}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Warehouses
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiPackage className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.success }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.success }}>
                            {selectedUser.assets.products}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Products
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiActivity className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.info }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.info }}>
                            {selectedUser.assets.orders}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Orders
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiStar className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.warning }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.warning }}>
                            ${selectedUser.assets.revenue?.toLocaleString()}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Revenue
                          </p>
                        </div>
                      </>
                    )}

                    {/* Courier Assets */}
                    {selectedUser.role.id === 7 && (
                      <>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiTruck className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.primary }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.primary }}>
                            {selectedUser.assets.deliveries}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Deliveries
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiStar className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.warning }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.warning }}>
                            {selectedUser.assets.rating}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Rating
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiTruck className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.info }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.info }}>
                            {selectedUser.assets.vehicles}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Vehicles
                          </p>
                        </div>
                      </>
                    )}

                    {/* Customer Assets */}
                    {selectedUser.role.id === 8 && (
                      <>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiPackage className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.primary }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.primary }}>
                            {selectedUser.assets.orders}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Orders
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiStar className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.warning }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.warning }}>
                            {selectedUser.assets.wishlist}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Wishlist
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiActivity className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.info }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.info }}>
                            {selectedUser.assets.reviews}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Reviews
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiStar className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.success }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.success }}>
                            ${selectedUser.assets.spent?.toLocaleString()}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Total Spent
                          </p>
                        </div>
                      </>
                    )}

                    {/* Admin Assets */}
                    {(selectedUser.role.id === 1 || selectedUser.role.id === 2 || selectedUser.role.id === 3) && (
                      <>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiUsers className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.primary }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.primary }}>
                            {selectedUser.assets.managedUsers}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Managed Users
                          </p>
                        </div>
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiShield className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.success }} />
                          <p className="text-2xl font-bold" style={{ color: themeConfig.colors.success }}>
                            {selectedUser.assets.permissions}
                          </p>
                          <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                            Permissions
                          </p>
                        </div>
                        <div
                          className="col-span-2 text-center p-4 rounded-lg"
                          style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                        >
                          <FiActivity className="h-8 w-8 mx-auto mb-2" style={{ color: themeConfig.colors.info }} />
                          <p className="text-sm font-medium mb-2" style={{ color: themeConfig.colors.foreground }}>
                            System Access
                          </p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {selectedUser.assets.systemAccess?.map((access: any, index: any) => (
                              <Badge key={index} className="text-xs bg-blue-500 text-white">
                                {access}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Activity Summary */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.muted}30` }}>
                <h4
                  className="font-semibold text-lg mb-3"
                  style={{
                    color: themeConfig.colors.foreground,
                    textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                  }}
                >
                  Activity Summary
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: themeConfig.colors.primary }}>
                      {selectedUser.loginCount || 0}
                    </p>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Total Logins
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color:
                          selectedUser.status === "Active" ? themeConfig.colors.success : themeConfig.colors.danger,
                      }}
                    >
                      {selectedUser.status}
                    </p>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Current Status
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: themeConfig.colors.info }}>
                      {selectedUser.isVerified ? "Yes" : "No"}
                    </p>
                    <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                      Verified Account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewUserDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
        <DialogContent
          className="max-w-2xl"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
          }}
        >
          <DialogHeader>
            <DialogTitle
              style={{ color: themeConfig.colors.foreground, textShadow: `0 2px 4px ${themeConfig.colors.primary}40` }}
            >
              Edit User
            </DialogTitle>
            <DialogDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
              Update user information and settings
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              {/* User Info Display */}
              <div
                className="flex items-center space-x-4 p-4 rounded-lg"
                style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${selectedUser.fullName.charAt(0)}`} />
                  <AvatarFallback>
                    {selectedUser.fullName
                      .split(" ")
                      .map((n: any) => n.charAt(0))
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3
                    className="font-semibold text-lg"
                    style={{
                      color: themeConfig.colors.foreground,
                      textShadow: `0 1px 2px ${themeConfig.colors.primary}30`,
                    }}
                  >
                    @{selectedUser.username}
                  </h3>
                  <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    ID: {selectedUser.id} • Member since {selectedUser.createdAt}
                  </p>
                </div>
              </div>

              {/* Edit Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiEdit className="h-4 w-4" style={{ color: themeConfig.colors.primary }} />
                  <span style={{ color: themeConfig.colors.foreground }}>
                    Edit Mode: {editMode ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="flex gap-2">
                  {!editMode ? (
                    <Button
                      onClick={() => setEditMode(true)}
                      className="text-white"
                      style={{ backgroundColor: themeConfig.colors.primary }}
                    >
                      <FiEdit className="h-4 w-4 mr-2" />
                      Enable Edit
                    </Button>
                  ) : (
                    <Button onClick={() => setEditMode(false)} variant="outline">
                      <FiXCircle className="h-4 w-4 mr-2" />
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </div>

              <form onSubmit={handleEditUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-fullName" style={{ color: themeConfig.colors.foreground }}>
                      Full Name
                    </Label>
                    <Input
                      id="edit-fullName"
                      name="fullName"
                      value={editUserForm.fullName}
                      onChange={handleEditInputChange}
                      placeholder="Enter full name"
                      disabled={!editMode}
                      required
                      style={{
                        backgroundColor: editMode ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.foreground,
                        opacity: editMode ? 1 : 0.7,
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email" style={{ color: themeConfig.colors.foreground }}>
                      Email
                    </Label>
                    <Input
                      id="edit-email"
                      name="email"
                      value={editUserForm.email}
                      onChange={handleEditInputChange}
                      type="email"
                      placeholder="Enter email"
                      disabled={!editMode}
                      style={{
                        backgroundColor: editMode ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.foreground,
                        opacity: editMode ? 1 : 0.7,
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-phone" style={{ color: themeConfig.colors.foreground }}>
                      Phone
                    </Label>
                    <Input
                      id="edit-phone"
                      name="phone"
                      value={editUserForm.phone}
                      onChange={handleEditInputChange}
                      placeholder="Enter phone number"
                      disabled={!editMode}
                      style={{
                        backgroundColor: editMode ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.foreground,
                        opacity: editMode ? 1 : 0.7,
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-role" style={{ color: themeConfig.colors.foreground }}>
                        Role
                      </Label>
                      <Select
                        value={editUserForm.roleId}
                        onValueChange={(value) => setEditUserForm({ ...editUserForm, roleId: value })}
                        disabled={!editMode}
                      >
                        <SelectTrigger style={{ opacity: editMode ? 1 : 0.7 }}>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id.toString()}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-status" style={{ color: themeConfig.colors.foreground }}>
                        Status
                      </Label>
                      <Select
                        value={editUserForm.status}
                        onValueChange={(value) => setEditUserForm({ ...editUserForm, status: value })}
                        disabled={!editMode}
                      >
                        <SelectTrigger style={{ opacity: editMode ? 1 : 0.7 }}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditUserDialogOpen(false)}>
                    Close
                  </Button>
                  {editMode && (
                    <Button
                      type="submit"
                      className="text-white"
                      style={{ backgroundColor: themeConfig.colors.success }}
                    >
                      <FiSave className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </DialogFooter>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation */}
      <AlertDialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
        <AlertDialogContent
          className="max-w-2xl"
          style={{
            backgroundColor: themeConfig.colors.card,
            borderColor: themeConfig.colors.border,
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              style={{ color: themeConfig.colors.foreground, textShadow: `0 2px 4px ${themeConfig.colors.danger}40` }}
            >
              {deleteConfirmStep === 1 ? "Confirm User Deletion" : "Final Confirmation"}
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
              {deleteConfirmStep === 1
                ? "Review user information and assets before deletion"
                : "This action cannot be undone. All user data will be permanently deleted."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              {deleteConfirmStep === 1 ? (
                <>
                  {/* User Info */}
                  <div
                    className="flex items-center space-x-4 p-4 rounded-lg"
                    style={{ backgroundColor: `${themeConfig.colors.danger}20` }}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={`/placeholder.svg?height=48&width=48&text=${selectedUser.fullName.charAt(0)}`}
                      />
                      <AvatarFallback>
                        {selectedUser.fullName
                          .split(" ")
                          .map((n: any) => n.charAt(0))
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: themeConfig.colors.foreground }}>
                        {selectedUser.fullName}
                      </h3>
                      <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                        @{selectedUser.username} • {selectedUser.role.name}
                      </p>
                    </div>
                  </div>

                  {/* Assets Warning */}
                  {selectedUser.assets && Object.keys(selectedUser.assets).length > 0 && (
                    <div
                      className="p-4 rounded-lg border-2"
                      style={{
                        backgroundColor: `${themeConfig.colors.warning}20`,
                        borderColor: themeConfig.colors.warning,
                      }}
                    >
                      <h4 className="font-semibold text-lg mb-3" style={{ color: themeConfig.colors.warning }}>
                        ⚠️ User Assets Will Be Deleted
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(selectedUser.assets).map(([key, value]) => (
                          <div
                            key={key}
                            className="text-center p-2 rounded"
                            style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                          >
                            <p className="text-lg font-bold" style={{ color: themeConfig.colors.danger }}>
                              {/* {typeof value === "number"
                                ? value.toLocaleString()
                                : Array.isArray(value)
                                  ? value.length
                                  : value} */}
                            </p>
                            <p
                              className="text-xs opacity-70 capitalize"
                              style={{ color: themeConfig.colors.foreground }}
                            >
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Verification Status */}
                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: `${themeConfig.colors.muted}30` }}
                  >
                    <span style={{ color: themeConfig.colors.foreground }}>Account Verification Status:</span>
                    <Badge className={selectedUser.isVerified ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                      {selectedUser.isVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">🗑️</div>
                  <p className="text-xl font-semibold mb-2" style={{ color: themeConfig.colors.danger }}>
                    Delete {selectedUser.fullName}?
                  </p>
                  <p style={{ color: themeConfig.colors.foreground }}>
                    This will permanently delete the user and all associated data.
                  </p>
                </div>
              )}
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirmStep(1)}>Cancel</AlertDialogCancel>
            {deleteConfirmStep === 1 ? (
              <Button
                onClick={() => setDeleteConfirmStep(2)}
                className="text-white"
                style={{ backgroundColor: themeConfig.colors.warning }}
              >
                Continue
              </Button>
            ) : (
              <AlertDialogAction
                onClick={handleDeleteUser}
                className="text-white"
                style={{ backgroundColor: themeConfig.colors.danger }}
              >
                <FiTrash2 className="h-4 w-4 mr-2" />
                Delete Permanently
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FiCheck, FiEdit2, FiFilter, FiSearch, FiTrash2, FiUserPlus, FiX, FiUsers } from "react-icons/fi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DeveloperSidebar } from "@/components/Sidebar/DeveloperSidebar"
import { DeveloperNavbar } from "@/components/Navbar/DeveloperNavbar"
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

// Generate 40+ mock users
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

    users.push({
      id: i,
      username,
      email: `${username}@example.com`,
      role,
      createdAt: formattedDate,
    })
  }

  // Add admin user
  users.unshift({
    id: 0,
    username: "admin",
    email: "admin@example.com",
    role: roles[0],
    createdAt: "2023-01-01",
  })

  return users
}

// Mock data for users
const mockUsers = generateMockUsers()

// Mock data for role requests
const mockRoleRequests = [
  {
    id: 1,
    userId: 1,
    user: { username: "johndoe", email: "john@example.com" },
    requestedRole: "Retailer",
    status: "PENDING",
    createdAt: "2023-06-10",
  },
  {
    id: 2,
    userId: 2,
    user: { username: "janedoe", email: "jane@example.com" },
    requestedRole: "Merchant",
    status: "PENDING",
    createdAt: "2023-06-12",
  },
  {
    id: 3,
    userId: 5,
    user: { username: "mikebrown", email: "mike@example.com" },
    requestedRole: "Supplier",
    status: "PENDING",
    createdAt: "2023-06-13",
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
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  const { theme } = useTheme()

  // Form state for new user
  const [newUserForm, setNewUserForm] = useState({
    username: "",
    email: "",
    password: "",
    roleId: "",
  })

  // Form state for edit user
  const [editUserForm, setEditUserForm] = useState({
    username: "",
    email: "",
    roleId: "",
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === null || user.role.id === roleFilter

    return matchesSearch && matchesRole
  })

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const handleApproveRoleRequest = (requestId: number) => {
    // In a real app, this would call an API
    setRoleRequests((prev) => prev.filter((req) => req.id !== requestId))
    toast.success("Role request approved successfully!")
  }

  const handleRejectRoleRequest = (requestId: number) => {
    // In a real app, this would call an API
    setRoleRequests((prev) => prev.filter((req) => req.id !== requestId))
    toast.info("Role request rejected")
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API
    const newUser = {
      id: users.length + 1,
      username: newUserForm.username,
      email: newUserForm.email,
      role: roles.find((r) => r.id === Number.parseInt(newUserForm.roleId)) || roles[7], // Default to Customer
      createdAt: new Date().toISOString().split("T")[0],
    }

    setUsers([...users, newUser])
    setNewUserDialogOpen(false)
    setNewUserForm({
      username: "",
      email: "",
      password: "",
      roleId: "",
    })
    toast.success("User created successfully!")
  }

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return

    // In a real app, this would call an API
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          username: editUserForm.username,
          email: editUserForm.email,
          role: roles.find((r) => r.id === Number.parseInt(editUserForm.roleId)) || user.role,
        }
      }
      return user
    })

    setUsers(updatedUsers)
    setEditUserDialogOpen(false)
    toast.success("User updated successfully!")
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return

    // In a real app, this would call an API
    setUsers(users.filter((user) => user.id !== selectedUser.id))
    setDeleteUserDialogOpen(false)
    toast.success("User deleted successfully!")
  }

  const openEditUserDialog = (user: any) => {
    setSelectedUser(user)
    setEditUserForm({
      username: user.username,
      email: user.email,
      roleId: user.role.id.toString(),
    })
    setEditUserDialogOpen(true)
  }

  const openDeleteUserDialog = (user: any) => {
    setSelectedUser(user)
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

  return (
    <div className="flex min-h-screen bg-background w-full p-5">
      <div className="flex-1 flex flex-col">
        {/* Main content */}
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
                User Management
              </h1>
              <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
                <Button
                  className={cn(
                    "theme-gradient text-white border-none",
                    theme === "wooden" && "shadow-md",
                    theme === "metallic" && "shadow-inner",
                    theme === "ice" && "shadow-lg",
                  )}
                  onClick={() => setNewUserDialogOpen(true)}
                >
                  <FiUserPlus className="mr-2 h-4 w-4" />
                  Create User
                </Button>
                <DialogContent
                  className={cn(
                    theme === "dark" && "bg-card border-gray-800",
                    theme === "wooden" && "bg-card border-amber-800/20",
                    theme === "metallic" && "bg-opacity-80 backdrop-blur-sm border-gray-300/30",
                    theme === "ice" && "bg-opacity-70 backdrop-blur-sm border-blue-200/30",
                  )}
                >
                  <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>Add a new user to the platform with specific role.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateUser}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          value={newUserForm.username}
                          onChange={handleInputChange}
                          placeholder="Enter username"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={newUserForm.email}
                          onChange={handleInputChange}
                          type="email"
                          placeholder="Enter email"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          value={newUserForm.password}
                          onChange={handleInputChange}
                          type="password"
                          placeholder="Enter password"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
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
                      <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                        Create User
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Tabs defaultValue="users" className="space-y-4">
              <TabsList>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <FiUsers className="h-4 w-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="role-requests" className="flex items-center gap-2">
                  <FiUserPlus className="h-4 w-4" />
                  Role Requests
                  {roleRequests.length > 0 && (
                    <Badge variant="destructive" className="ml-1">
                      {roleRequests.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="users">
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
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>Manage all users in the platform</CardDescription>
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
                          />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
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

                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">User</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Email</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Role</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Created</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {currentUsers.map((user) => (
                              <tr key={user.id} className="hover:bg-muted/50">
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2">
                                      <AvatarImage
                                        src={`/placeholder.svg?height=32&width=32&text=${user.username.charAt(0).toUpperCase()}`}
                                      />
                                      <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm font-medium">{user.username}</div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">{user.email}</td>
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
                                <td className="px-4 py-3 whitespace-nowrap text-sm">{user.createdAt}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
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
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {filteredUsers.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No users found matching your criteria</p>
                        </div>
                      )}

                      {/* Pagination */}
                      {filteredUsers.length > 0 && (
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
                              // Show pages around current page
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

              <TabsContent value="role-requests">
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
                    <CardTitle>Role Requests</CardTitle>
                    <CardDescription>Manage pending role upgrade requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {roleRequests.length > 0 ? (
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">User</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                Requested Role
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {roleRequests.map((request) => (
                              <tr key={request.id} className="hover:bg-muted/50">
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2">
                                      <AvatarImage
                                        src={`/placeholder.svg?height=32&width=32&text=${request.user.username.charAt(0).toUpperCase()}`}
                                      />
                                      <AvatarFallback>{request.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="text-sm font-medium">{request.user.username}</div>
                                      <div className="text-xs text-muted-foreground">{request.user.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <Badge className="bg-blue-500 text-white">{request.requestedRole}</Badge>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">{request.createdAt}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-right">
                                  <Button
                                    className="h-8 mr-2 btn-approve"
                                    size="sm"
                                    onClick={() => handleApproveRoleRequest(request.id)}
                                  >
                                    <FiCheck className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    className="h-8 btn-reject"
                                    size="sm"
                                    onClick={() => handleRejectRoleRequest(request.id)}
                                  >
                                    <FiX className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No pending role requests</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
        <DialogContent
          className={cn(
            theme === "dark" && "bg-card border-gray-800",
            theme === "wooden" && "bg-card border-amber-800/20",
            theme === "metallic" && "bg-opacity-80 backdrop-blur-sm border-gray-300/30",
            theme === "ice" && "bg-opacity-70 backdrop-blur-sm border-blue-200/30",
          )}
        >
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditUser}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-username">Username</Label>
                <Input
                  id="edit-username"
                  name="username"
                  value={editUserForm.username}
                  onChange={handleEditInputChange}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  value={editUserForm.email}
                  onChange={handleEditInputChange}
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={editUserForm.roleId}
                  onValueChange={(value) => setEditUserForm({ ...editUserForm, roleId: value })}
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
              <Button type="button" variant="outline" onClick={() => setEditUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                Update User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation */}
      <AlertDialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
        <AlertDialogContent
          className={cn(
            theme === "dark" && "bg-card border-gray-800",
            theme === "wooden" && "bg-card border-amber-800/20",
            theme === "metallic" && "bg-opacity-80 backdrop-blur-sm border-gray-300/30",
            theme === "ice" && "bg-opacity-70 backdrop-blur-sm border-blue-200/30",
          )}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              {selectedUser && <span className="font-medium"> {selectedUser.username}</span>} and remove their data from
              the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-600 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

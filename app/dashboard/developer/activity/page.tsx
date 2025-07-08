"use client"

import { useState, useEffect } from "react"
import {
  FiActivity,
  FiCalendar,
  FiClock,
  FiSearch,
  FiUser,
  FiDownload,
  FiFilter,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme/AdminsThemeProvider"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Generate mock activity logs
const generateMockActivityLogs = () => {
  const users = [
    { username: "admin", role: "Developer", avatar: "👨‍💻" },
    { username: "johnd", role: "PlatformAdmin", avatar: "👨‍💼" },
    { username: "alicew", role: "OperationsAdmin", avatar: "👩‍💼" },
    { username: "bobm", role: "Retailer", avatar: "👨‍🏪" },
    { username: "sarahj", role: "Merchant", avatar: "👩‍🏪" },
  ]

  const actionTypes = [
    { type: "login", description: "Logged into the system", severity: "info" },
    { type: "logout", description: "Logged out of the system", severity: "info" },
    { type: "create", description: "Created a new resource", severity: "success" },
    { type: "update", description: "Updated a resource", severity: "warning" },
    { type: "delete", description: "Deleted a resource", severity: "danger" },
    { type: "approve", description: "Approved a request", severity: "success" },
    { type: "reject", description: "Rejected a request", severity: "danger" },
  ]

  const resourceTypes = ["user", "role", "shop", "product", "order", "warehouse", "payment", "setting"]

  const logs = []

  // Generate 100 random logs
  for (let i = 1; i <= 100; i++) {
    const user = users[Math.floor(Math.random() * users.length)]
    const action = actionTypes[Math.floor(Math.random() * actionTypes.length)]
    const resource = resourceTypes[Math.floor(Math.random() * resourceTypes.length)]

    // Create date between last 30 days and now
    const now = new Date()
    const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000)

    logs.push({
      id: i,
      user,
      action: action.type,
      description: action.description,
      severity: action.severity,
      resource,
      resourceId: Math.floor(Math.random() * 1000) + 1,
      timestamp: pastDate,
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    })
  }

  // Sort by timestamp (newest first)
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

const mockActivityLogs = generateMockActivityLogs()

export default function ActivityPage() {
  const [logs, setLogs] = useState(mockActivityLogs)
  const [filteredLogs, setFilteredLogs] = useState(mockActivityLogs)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [resourceFilter, setResourceFilter] = useState<string>("all")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [logsPerPage] = useState(15)
  const { themeConfig } = useTheme()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter logs based on search term and filters
    let filtered = logs

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.resource.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (actionFilter !== "all") {
      filtered = filtered.filter((log) => log.action === actionFilter)
    }

    if (resourceFilter !== "all") {
      filtered = filtered.filter((log) => log.resource === resourceFilter)
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter((log) => log.severity === severityFilter)
    }

    setFilteredLogs(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [logs, searchTerm, actionFilter, resourceFilter, severityFilter])

  // Get current logs for pagination
  const indexOfLastLog = currentPage * logsPerPage
  const indexOfFirstLog = indexOfLastLog - logsPerPage
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog)
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return themeConfig.colors.success
      case "warning":
        return themeConfig.colors.warning
      case "danger":
        return themeConfig.colors.danger
      case "info":
        return themeConfig.colors.info
      default:
        return themeConfig.colors.foreground
    }
  }

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "login":
        return themeConfig.colors.success
      case "logout":
        return themeConfig.colors.secondary
      case "create":
        return themeConfig.colors.info
      case "update":
        return themeConfig.colors.warning
      case "delete":
        return themeConfig.colors.danger
      case "approve":
        return themeConfig.colors.success
      case "reject":
        return themeConfig.colors.danger
      default:
        return themeConfig.colors.secondary
    }
  }

  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)))
  const uniqueResources = Array.from(new Set(logs.map((log) => log.resource)))
  const uniqueSeverities = Array.from(new Set(logs.map((log) => log.severity)))

  // Statistics
  const stats = {
    total: logs.length,
    today: logs.filter((log) => {
      const today = new Date()
      const logDate = new Date(log.timestamp)
      return logDate.toDateString() === today.toDateString()
    }).length,
    thisWeek: logs.filter((log) => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(log.timestamp) > weekAgo
    }).length,
    critical: logs.filter((log) => log.severity === "danger").length,
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6 space-y-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-muted rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight gradient-text text-shadow">Activity Logs</h1>
          <p className="text-lg opacity-80" style={{ color: themeConfig.colors.foreground }}>
            Monitor system activities and user actions in real-time
          </p>
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
            <FiDownload className="mr-2 h-5 w-5" />
            Export Logs
          </Button>
          <Button
            size="lg"
            className="transition-all duration-300 hover:scale-105 hover:shadow-xl text-white font-semibold"
            style={{
              background: themeConfig.gradient,
            }}
            onClick={() => window.location.reload()}
          >
            <FiRefreshCw className="mr-2 h-5 w-5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Activities", value: stats.total, icon: FiActivity, color: themeConfig.colors.info },
          { title: "Today's Activities", value: stats.today, icon: FiClock, color: themeConfig.colors.success },
          { title: "This Week", value: stats.thisWeek, icon: FiCalendar, color: themeConfig.colors.warning },
          { title: "Critical Events", value: stats.critical, icon: FiUser, color: themeConfig.colors.danger },
        ].map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer group border-2 card-hover"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium" style={{ color: themeConfig.colors.foreground }}>
                {stat.title}
              </CardTitle>
              <div
                className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                }}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2" style={{ color: themeConfig.colors.foreground }}>
                {stat.value.toLocaleString()}
              </div>
              <Progress
                value={Math.min((stat.value / stats.total) * 100, 100)}
                className="h-2"
                style={{
                  backgroundColor: `${stat.color}20`,
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList
          className="grid w-full grid-cols-3 p-1 rounded-xl"
          style={{
            backgroundColor: themeConfig.colors.muted,
          }}
        >
          {[
            { value: "all", label: "All Activity", icon: FiActivity },
            { value: "user", label: "User Activity", icon: FiUser },
            { value: "system", label: "System Events", icon: FiClock },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="transition-all duration-300 rounded-lg font-medium data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]"
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card
            className="shadow-xl border-2"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl" style={{ color: themeConfig.colors.foreground }}>
                    Activity Timeline
                  </CardTitle>
                  <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                    Comprehensive view of all system and user activities
                  </CardDescription>
                </div>
                <Badge
                  className="px-3 py-1 text-sm"
                  style={{
                    backgroundColor: `${themeConfig.colors.success}20`,
                    color: themeConfig.colors.success,
                  }}
                >
                  {filteredLogs.length} Records Found
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                  <Input
                    placeholder="Search activities, users, or resources..."
                    className="pl-10 border-2 transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      backgroundColor: themeConfig.colors.background,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={actionFilter} onValueChange={setActionFilter}>
                    <SelectTrigger className="w-[150px]">
                      <FiFilter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      {uniqueActions.map((action) => (
                        <SelectItem key={action} value={action}>
                          {action.charAt(0).toUpperCase() + action.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={resourceFilter} onValueChange={setResourceFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Resource" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Resources</SelectItem>
                      {uniqueResources.map((resource) => (
                        <SelectItem key={resource} value={resource}>
                          {resource.charAt(0).toUpperCase() + resource.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      {uniqueSeverities.map((severity) => (
                        <SelectItem key={severity} value={severity}>
                          {severity.charAt(0).toUpperCase() + severity.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Activity Table */}
              <div className="border rounded-xl overflow-hidden" style={{ borderColor: themeConfig.colors.border }}>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="min-w-full divide-y" style={{ borderColor: themeConfig.colors.border }}>
                    <thead style={{ backgroundColor: themeConfig.colors.muted }}>
                      <tr>
                        <th
                          className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                          style={{ color: themeConfig.colors.foreground }}
                        >
                          User
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                          style={{ color: themeConfig.colors.foreground }}
                        >
                          Action
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                          style={{ color: themeConfig.colors.foreground }}
                        >
                          Resource
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                          style={{ color: themeConfig.colors.foreground }}
                        >
                          Description
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                          style={{ color: themeConfig.colors.foreground }}
                        >
                          Timestamp
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                          style={{ color: themeConfig.colors.foreground }}
                        >
                          Severity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: themeConfig.colors.border }}>
                      {currentLogs.map((log) => (
                        <tr
                          key={log.id}
                          className="transition-all duration-300 hover:scale-[1.01] cursor-pointer card-hover"
                          style={{
                            backgroundColor: themeConfig.colors.card,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `linear-gradient(135deg, ${themeConfig.colors.primary}15, ${themeConfig.colors.accent}10)`
                            e.currentTarget.style.transform = "translateY(-1px)"
                            e.currentTarget.style.boxShadow = `0 4px 12px ${themeConfig.colors.primary}20`
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = themeConfig.colors.card
                            e.currentTarget.style.transform = "translateY(0)"
                            e.currentTarget.style.boxShadow = "none"
                          }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                {log.user.avatar}
                              </div>
                              <div>
                                <div className="text-sm font-bold" style={{ color: themeConfig.colors.foreground }}>
                                  {log.user.username}
                                </div>
                                <div className="text-xs opacity-70" style={{ color: themeConfig.colors.foreground }}>
                                  {log.user.role}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className="text-white font-medium px-3 py-1"
                              style={{
                                backgroundColor: getActionBadgeColor(log.action),
                              }}
                            >
                              {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant="outline"
                              className="font-medium px-3 py-1"
                              style={{
                                borderColor: themeConfig.colors.primary,
                                color: themeConfig.colors.primary,
                              }}
                            >
                              {log.resource.charAt(0).toUpperCase() + log.resource.slice(1)} #{log.resourceId}
                            </Badge>
                          </td>
                          <td
                            className="px-6 py-4 text-sm max-w-xs truncate"
                            style={{ color: themeConfig.colors.foreground }}
                          >
                            {log.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-2">
                              <FiCalendar className="h-4 w-4 opacity-50" />
                              <span style={{ color: themeConfig.colors.foreground }}>{formatDate(log.timestamp)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: getSeverityColor(log.severity),
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filteredLogs.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl font-medium mb-2" style={{ color: themeConfig.colors.foreground }}>
                    No activities found
                  </p>
                  <p className="opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}

              {/* Enhanced Pagination with Arrow Icons */}
              {filteredLogs.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                  <div className="text-sm" style={{ color: themeConfig.colors.foreground }}>
                    Showing {indexOfFirstLog + 1} to {Math.min(indexOfLastLog, filteredLogs.length)} of{" "}
                    {filteredLogs.length} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="transition-all duration-200 hover:scale-105"
                      style={{
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.foreground,
                      }}
                    >
                      <FiChevronLeft className="h-4 w-4" />
                      <FiChevronLeft className="h-4 w-4 -ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="transition-all duration-200 hover:scale-105"
                      style={{
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.foreground,
                      }}
                    >
                      <FiChevronLeft className="h-4 w-4" />
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
                            className={cn(
                              "h-10 w-10 p-0 transition-all duration-200 hover:scale-110",
                              currentPage === pageNum && "shadow-lg scale-110 btn-gradient",
                            )}
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
                      className="transition-all duration-200 hover:scale-105"
                      style={{
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.foreground,
                      }}
                    >
                      <FiChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="transition-all duration-200 hover:scale-105"
                      style={{
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.foreground,
                      }}
                    >
                      <FiChevronRight className="h-4 w-4" />
                      <FiChevronRight className="h-4 w-4 -ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card
            className="shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: themeConfig.colors.foreground }}>User Activity</CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                View user login, logout and account activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-xl font-medium mb-2" style={{ color: themeConfig.colors.foreground }}>
                  User Activity Dashboard
                </p>
                <p className="opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  This feature is coming soon with detailed user analytics
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card
            className="shadow-xl"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: themeConfig.colors.foreground }}>System Events</CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                View system-level events and operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚙️</div>
                <p className="text-xl font-medium mb-2" style={{ color: themeConfig.colors.foreground }}>
                  System Events Monitor
                </p>
                <p className="opacity-70" style={{ color: themeConfig.colors.foreground }}>
                  Advanced system monitoring and event tracking coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

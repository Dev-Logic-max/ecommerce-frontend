"use client"

import { useState } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// React Icons
import {
  FiShoppingBag,
  FiStar,
  FiDollarSign,
  FiTrendingUp,
  FiEdit3,
  FiCamera,
  FiSave,
  FiShield,
  FiEye,
  FiUser,
  FiMapPin,
  FiCalendar,
  FiAward,
  FiTarget,
  FiPieChart,
} from "react-icons/fi"

export default function RetailerProfilePage() {
  const { themeConfig } = useAdminTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const [profileData, setProfileData] = useState({
    name: "John Retailer",
    email: "john@retailstore.com",
    phone: "+1 (555) 123-4567",
    address: "123 Commerce Street, Business District, NY 10001",
    bio: "Experienced retailer with over 10 years in e-commerce. Specializing in electronics and fashion retail with a passion for customer satisfaction and innovative retail solutions.",
    website: "https://johnretailstore.com",
    businessName: "John's Electronics & Fashion Empire",
    taxId: "12-3456789",
    joinDate: "2024-01-15",
    lastLogin: "2024-01-25 10:30 AM",
  })

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    sms: false,
    emailMarketing: true,
    securityAlerts: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    showStats: true,
    showShops: true,
    showReviews: true,
  })

  const profileStats = [
    {
      label: "Total Shops",
      value: "3",
      icon: <FiShoppingBag className="h-6 w-6" />,
      color: themeConfig.colors.primary,
      change: "+1 this month",
      changeType: "positive" as const,
    },
    {
      label: "Average Rating",
      value: "4.8",
      icon: <FiStar className="h-6 w-6" />,
      color: themeConfig.colors.warning,
      change: "+0.2 this month",
      changeType: "positive" as const,
    },
    {
      label: "Monthly Revenue",
      value: "$86,280",
      icon: <FiDollarSign className="h-6 w-6" />,
      color: themeConfig.colors.success,
      change: "+18% vs last month",
      changeType: "positive" as const,
    },
    {
      label: "Growth Rate",
      value: "+24%",
      icon: <FiTrendingUp className="h-6 w-6" />,
      color: themeConfig.colors.info,
      change: "Excellent performance",
      changeType: "positive" as const,
    },
  ]

  const achievements = [
    {
      title: "Top Seller",
      description: "Achieved highest sales in Electronics category",
      date: "2024-01-20",
      icon: "🏆",
      rarity: "gold",
    },
    {
      title: "Customer Champion",
      description: "Maintained 4.8+ rating for 6 months",
      date: "2024-01-15",
      icon: "⭐",
      rarity: "platinum",
    },
    {
      title: "Quick Response",
      description: "Average response time under 2 hours",
      date: "2024-01-10",
      icon: "⚡",
      rarity: "silver",
    },
    {
      title: "Quality Products",
      description: "Return rate below 2% for 3 months",
      date: "2024-01-05",
      icon: "✨",
      rarity: "gold",
    },
  ]

  const performanceMetrics = [
    { label: "Customer Satisfaction", value: 96, color: themeConfig.colors.success },
    { label: "Order Fulfillment", value: 94, color: themeConfig.colors.primary },
    { label: "Response Time", value: 88, color: themeConfig.colors.info },
    { label: "Product Quality", value: 92, color: themeConfig.colors.warning },
  ]

  const handleSave = () => {
    setIsEditing(false)
    console.log("Profile saved:", profileData)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "platinum":
        return "linear-gradient(135deg, #E5E7EB, #F3F4F6)"
      case "gold":
        return "linear-gradient(135deg, #FDE68A, #F59E0B)"
      case "silver":
        return "linear-gradient(135deg, #F3F4F6, #D1D5DB)"
      default:
        return themeConfig.colors.muted
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Enhanced Header */}
      <div className="relative">
        {/* Background Banner */}
        <div
          className="h-48 rounded-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30"></div>

          {/* Header Content */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between h-full p-8">
            <div className="flex items-end gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-2xl">
                  <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                  <AvatarFallback
                    className="text-2xl font-bold text-white"
                    style={{ background: themeConfig.gradient }}
                  >
                    JR
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 shadow-lg"
                    style={{ background: themeConfig.gradient, color: "white" }}
                  >
                    <FiCamera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Profile Info */}
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                  {profileData.name}
                </h1>
                <p className="text-lg opacity-90 mb-2">{profileData.businessName}</p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge className="bg-white/20 text-white border-white/30">✅ Verified Retailer</Badge>
                  <span className="flex items-center gap-1">
                    <FiCalendar className="h-4 w-4" />
                    Joined {new Date(profileData.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <FiEdit3 className="mr-2 h-4 w-4" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
              {isEditing && (
                <Button onClick={handleSave} className="bg-white text-black hover:bg-white/90 font-semibold">
                  <FiSave className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {profileStats.map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer group border-2 overflow-hidden relative"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            {/* Animated Background */}
            <div
              className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
              style={{ backgroundColor: stat.color }}
            ></div>

            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-1" style={{ color: themeConfig.colors.foreground }}>
                    {stat.value}
                  </p>
                </div>
                <div
                  className="p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                  {stat.icon}
                </div>
              </div>
              <p
                className="text-sm font-medium"
                style={{
                  color: stat.changeType === "positive" ? themeConfig.colors.success : themeConfig.colors.danger,
                }}
              >
                {stat.changeType === "positive" ? "↗️" : "↘️"} {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className="grid w-full grid-cols-5 p-1 rounded-2xl h-14"
          style={{ backgroundColor: themeConfig.colors.muted }}
        >
          {[
            { value: "overview", label: "Overview", icon: "📊" },
            { value: "profile", label: "Profile", icon: "👤" },
            { value: "performance", label: "Performance", icon: "🎯" },
            { value: "settings", label: "Settings", icon: "⚙️" },
            { value: "security", label: "Security", icon: "🔒" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "transition-all duration-300 rounded-xl font-medium h-12 text-sm",
                "data-[state=active]:shadow-xl data-[state=active]:scale-[1.02]",
              )}
              style={{
                color: activeTab === tab.value ? "white" : themeConfig.colors.foreground,
                backgroundColor: activeTab === tab.value ? themeConfig.colors.primary : "transparent",
              }}
            >
              <span className="mr-2 text-base">{tab.icon}</span>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Overview */}
            <Card className="lg:col-span-2" style={{ backgroundColor: themeConfig.colors.card }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: themeConfig.colors.foreground }}>
                  <FiPieChart className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Your key performance indicators across all shops
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {metric.label}
                      </span>
                      <span className="text-sm font-bold" style={{ color: metric.color }}>
                        {metric.value}%
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={metric.value} className="h-3" />
                      <div
                        className="absolute inset-0 h-3 rounded-full opacity-20"
                        style={{ backgroundColor: metric.color, width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card style={{ backgroundColor: themeConfig.colors.card }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: themeConfig.colors.foreground }}>
                  <FiTarget className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="text-center p-4 rounded-xl"
                  style={{ backgroundColor: `${themeConfig.colors.success}10` }}
                >
                  <div className="text-2xl font-bold" style={{ color: themeConfig.colors.success }}>
                    479
                  </div>
                  <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    Total Orders This Month
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: `${themeConfig.colors.info}10` }}>
                  <div className="text-2xl font-bold" style={{ color: themeConfig.colors.info }}>
                    1,234
                  </div>
                  <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    Active Customers
                  </p>
                </div>
                <div
                  className="text-center p-4 rounded-xl"
                  style={{ backgroundColor: `${themeConfig.colors.warning}10` }}
                >
                  <div className="text-2xl font-bold" style={{ color: themeConfig.colors.warning }}>
                    858
                  </div>
                  <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    Products Listed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card style={{ backgroundColor: themeConfig.colors.card }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: themeConfig.colors.foreground }}>
                <FiAward className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Your latest accomplishments and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      background: getRarityColor(achievement.rarity),
                      borderColor: `${themeConfig.colors.border}50`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h4 className="font-semibold mb-1" style={{ color: themeConfig.colors.foreground }}>
                        {achievement.title}
                      </h4>
                      <p className="text-xs opacity-70 mb-2" style={{ color: themeConfig.colors.foreground }}>
                        {achievement.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {achievement.rarity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: themeConfig.colors.foreground }}>
                  <FiUser className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" style={{ color: themeConfig.colors.foreground }}>
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      backgroundColor: isEditing ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" style={{ color: themeConfig.colors.foreground }}>
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      backgroundColor: isEditing ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" style={{ color: themeConfig.colors.foreground }}>
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      backgroundColor: isEditing ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" style={{ color: themeConfig.colors.foreground }}>
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      backgroundColor: isEditing ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: themeConfig.colors.card }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: themeConfig.colors.foreground }}>
                  <FiMapPin className="h-5 w-5" />
                  Business Information
                </CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Manage your business details and address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName" style={{ color: themeConfig.colors.foreground }}>
                    Business Name
                  </Label>
                  <Input
                    id="businessName"
                    value={profileData.businessName}
                    onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      backgroundColor: isEditing ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId" style={{ color: themeConfig.colors.foreground }}>
                    Tax ID
                  </Label>
                  <Input
                    id="taxId"
                    value={profileData.taxId}
                    onChange={(e) => setProfileData({ ...profileData, taxId: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      backgroundColor: isEditing ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" style={{ color: themeConfig.colors.foreground }}>
                    Business Address
                  </Label>
                  <Textarea
                    id="address"
                    value={profileData.address}
                    onChange={(e: any) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    style={{
                      backgroundColor: isEditing ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" style={{ color: themeConfig.colors.foreground }}>
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e: any) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    style={{
                      backgroundColor: isEditing ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>Monthly Performance</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Your performance metrics for this month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {metric.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: metric.color }}>
                          {metric.value}%
                        </span>
                        <Badge
                          variant="secondary"
                          style={{
                            backgroundColor: `${metric.color}20`,
                            color: metric.color,
                          }}
                        >
                          {metric.value >= 90 ? "Excellent" : metric.value >= 75 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={metric.value} className="h-4" />
                      <div
                        className="absolute inset-0 h-4 rounded-full opacity-30 transition-all duration-500"
                        style={{
                          backgroundColor: metric.color,
                          width: `${metric.value}%`,
                          boxShadow: `0 0 10px ${metric.color}30`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: themeConfig.colors.card }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>Achievement Progress</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Track your progress towards next achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">🏆 Platinum Seller</span>
                    <span className="text-xs">7/10</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">⭐ 5-Star Master</span>
                    <span className="text-xs">4/5</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">🚀 Growth Leader</span>
                    <span className="text-xs">3/8</span>
                  </div>
                  <Progress value={37} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>Notification Preferences</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                        {key === "orderUpdates" && "Get notified about new orders and updates"}
                        {key === "promotions" && "Receive promotional offers and deals"}
                        {key === "newsletter" && "Monthly newsletter with tips and insights"}
                        {key === "sms" && "Urgent notifications via SMS"}
                        {key === "emailMarketing" && "Marketing emails and announcements"}
                        {key === "securityAlerts" && "Important security and account alerts"}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked: any) => setNotifications({ ...notifications, [key]: checked })}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: themeConfig.colors.card }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>Privacy Settings</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Control what information is visible to others
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                        {key === "profileVisible" && "Make your profile visible to public"}
                        {key === "showEmail" && "Display email address on profile"}
                        {key === "showPhone" && "Display phone number on profile"}
                        {key === "showStats" && "Show performance statistics"}
                        {key === "showShops" && "Display list of your shops"}
                        {key === "showReviews" && "Show customer reviews on profile"}
                      </p>
                    </div>
                    <Switch checked={value} onCheckedChange={(checked: any) => setPrivacy({ ...privacy, [key]: checked })} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6 mt-8">
          <Card style={{ backgroundColor: themeConfig.colors.card }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: themeConfig.colors.foreground }}>
                <FiShield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                    Account Security
                  </h4>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    style={{
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  >
                    <FiShield className="mr-3 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    style={{
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  >
                    <FiShield className="mr-3 h-4 w-4" />
                    Enable Two-Factor Authentication
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    style={{
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  >
                    <FiEye className="mr-3 h-4 w-4" />
                    View Login History
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                    Account Information
                  </h4>
                  <div className="p-4 rounded-lg border" style={{ backgroundColor: `${themeConfig.colors.muted}30` }}>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="opacity-70">Last Login:</span>
                        <span className="font-medium">{profileData.lastLogin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Account Created:</span>
                        <span className="font-medium">{new Date(profileData.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Security Score:</span>
                        <Badge
                          style={{
                            backgroundColor: `${themeConfig.colors.success}20`,
                            color: themeConfig.colors.success,
                          }}
                        >
                          High (85%)
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

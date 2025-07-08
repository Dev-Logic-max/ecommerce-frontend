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
import { cn } from "@/lib/utils"

// React Icons
import { FiTruck, FiPackage, FiTrendingUp, FiEdit3, FiCamera, FiSave, FiShield, FiEye } from "react-icons/fi"
// import { GiWarehouse } from "react-icons/gi"

export default function SupplierProfilePage() {
  const { themeConfig } = useAdminTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  const [profileData, setProfileData] = useState({
    name: "Supply Chain Manager",
    email: "manager@supplychain.com",
    phone: "+1 (555) 987-6543",
    address: "456 Industrial Blvd, Warehouse District, TX 75001",
    bio: "Experienced supply chain professional with 15+ years managing large-scale warehouse operations and logistics networks.",
    website: "https://supplychainpro.com",
    companyName: "Global Supply Solutions",
    taxId: "98-7654321",
    licenseNumber: "WH-2024-001",
  })

  const [notifications, setNotifications] = useState({
    inventoryAlerts: true,
    orderUpdates: true,
    systemMaintenance: false,
    performanceReports: true,
    sms: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    showCapacity: true,
    showPerformance: true,
  })

  const supplyStats = [
    {
      label: "Active Warehouses",
      value: "5",
      icon: <FiEye className="h-5 w-5" />,
      color: themeConfig.colors.primary,
    },
    { label: "Total Capacity", value: "50K", icon: <FiPackage className="h-5 w-5" />, color: themeConfig.colors.info },
    {
      label: "Monthly Throughput",
      value: "12.5K",
      icon: <FiTruck className="h-5 w-5" />,
      color: themeConfig.colors.success,
    },
    {
      label: "Efficiency Rate",
      value: "94%",
      icon: <FiTrendingUp className="h-5 w-5" />,
      color: themeConfig.colors.warning,
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    console.log("Profile saved:", profileData)
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
            Supplier Profile
          </h1>
          <p className="text-lg opacity-80 mt-2" style={{ color: themeConfig.colors.foreground }}>
            Manage your supplier profile and warehouse operations
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="transition-all duration-300 hover:scale-105"
            style={{
              borderColor: themeConfig.colors.border,
              color: themeConfig.colors.foreground,
            }}
          >
            <FiEdit3 className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
          {isEditing && (
            <Button
              onClick={handleSave}
              className="transition-all duration-300 hover:scale-105 text-white"
              style={{
                background: themeConfig.gradient,
              }}
            >
              <FiSave className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supplyStats.map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2"
            style={{
              backgroundColor: themeConfig.colors.card,
              borderColor: themeConfig.colors.border,
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: themeConfig.colors.foreground }}>
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className="grid w-full grid-cols-4 p-1 rounded-xl"
          style={{
            backgroundColor: themeConfig.colors.muted,
          }}
        >
          {[
            { value: "profile", label: "👤 Profile", icon: "👤" },
            { value: "company", label: "🏭 Company", icon: "🏭" },
            { value: "settings", label: "⚙️ Settings", icon: "⚙️" },
            { value: "security", label: "🔒 Security", icon: "🔒" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "transition-all duration-300 rounded-lg font-medium",
                "data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]",
              )}
              style={{
                color: activeTab === tab.value ? "white" : themeConfig.colors.foreground,
                backgroundColor: activeTab === tab.value ? themeConfig.colors.primary : "transparent",
              }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label.split(" ")[1]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4" style={{ borderColor: themeConfig.colors.primary }}>
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                    <AvatarFallback
                      className="text-2xl font-bold"
                      style={{
                        background: themeConfig.gradient,
                        color: "white",
                      }}
                    >
                      SM
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 rounded-full"
                      style={{
                        background: themeConfig.gradient,
                        color: "white",
                      }}
                    >
                      <FiCamera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg" style={{ color: themeConfig.colors.foreground }}>
                    {profileData.name}
                  </h3>
                  <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                    Certified Supplier
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    <Badge
                      style={{
                        background: `linear-gradient(135deg, ${themeConfig.colors.success}30, ${themeConfig.colors.success}20)`,
                        color: themeConfig.colors.success,
                      }}
                    >
                      ✅ Verified Supplier
                    </Badge>
                    <Badge
                      style={{
                        background: `linear-gradient(135deg, ${themeConfig.colors.info}30, ${themeConfig.colors.info}20)`,
                        color: themeConfig.colors.info,
                      }}
                    >
                      🏆 Premium Partner
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
                <CardHeader>
                  <CardTitle style={{ color: themeConfig.colors.foreground }}>Personal Information</CardTitle>
                  <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" style={{ color: themeConfig.colors.foreground }}>
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      disabled={!isEditing}
                      style={{
                        backgroundColor: isEditing ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                        borderColor: themeConfig.colors.border,
                        color: themeConfig.colors.foreground,
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" style={{ color: themeConfig.colors.foreground }}>
                      Professional Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={3}
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
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-6 mt-6">
          <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: themeConfig.colors.foreground }}>Company Information</CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Manage your company details and licensing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" style={{ color: themeConfig.colors.foreground }}>
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    value={profileData.companyName}
                    onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
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
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="licenseNumber" style={{ color: themeConfig.colors.foreground }}>
                    Warehouse License Number
                  </Label>
                  <Input
                    id="licenseNumber"
                    value={profileData.licenseNumber}
                    onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      backgroundColor: isEditing ? themeConfig.colors.background : `${themeConfig.colors.muted}50`,
                      borderColor: themeConfig.colors.border,
                      color: themeConfig.colors.foreground,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>Notification Preferences</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Choose how you want to receive supply chain notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                        Receive {key.toLowerCase().replace(/([A-Z])/g, " $1")} notifications
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
              <CardHeader>
                <CardTitle style={{ color: themeConfig.colors.foreground }}>Privacy Settings</CardTitle>
                <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                  Control what information is visible to merchants and partners
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium" style={{ color: themeConfig.colors.foreground }}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm opacity-70" style={{ color: themeConfig.colors.foreground }}>
                        Make {key.toLowerCase().replace(/([A-Z])/g, " $1")} visible to partners
                      </p>
                    </div>
                    <Switch checked={value} onCheckedChange={(checked) => setPrivacy({ ...privacy, [key]: checked })} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card style={{ backgroundColor: themeConfig.colors.card, borderColor: themeConfig.colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: themeConfig.colors.foreground }}>Security Settings</CardTitle>
              <CardDescription style={{ color: `${themeConfig.colors.foreground}70` }}>
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
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
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  style={{
                    borderColor: themeConfig.colors.border,
                    color: themeConfig.colors.foreground,
                  }}
                >
                  <FiEye className="mr-3 h-4 w-4" />
                  Warehouse Access Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

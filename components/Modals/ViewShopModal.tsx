"use client"

import type React from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// React Icons
import {
  FiShoppingBag,
  FiMapPin,
  FiDollarSign,
  FiPackage,
  FiStar,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiShield,
  FiCalendar,
  FiEye,
  FiHome,
  FiX, // Added FiX import
} from "react-icons/fi"

interface Shop {
  id: string | number
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
  spaceCapacity: string | number
  productCapacity: string | number
  features: {
    onlineOrdering: boolean
    deliveryService: boolean
    pickupService: boolean
    returnPolicy: boolean
    customerSupport: boolean
    loyaltyProgram: boolean
  }
  status: string
  createdAt: string
  totalProducts?: number
  totalOrders?: number
  totalRevenue?: number
  rating?: number
}

interface ViewShopModalProps {
  shop: Shop
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ViewShopModal({ shop, trigger, open, onOpenChange }: ViewShopModalProps) {
  const { themeConfig } = useAdminTheme()

  const shopCategories = [
    {
      value: "electronics",
      label: "📱 Electronics",
      description: "Phones, computers, gadgets",
      color: "var(--admin-modal-info)",
    },
    {
      value: "fashion",
      label: "👗 Fashion",
      description: "Clothing, shoes, accessories",
      color: "var(--admin-modal-secondary)",
    },
    {
      value: "home",
      label: "🏠 Home & Garden",
      description: "Furniture, decor, tools",
      color: "var(--admin-modal-success)",
    },
    {
      value: "health",
      label: "💊 Health & Beauty",
      description: "Cosmetics, supplements",
      color: "var(--admin-modal-warning)",
    },
    {
      value: "sports",
      label: "⚽ Sports & Outdoors",
      description: "Equipment, apparel",
      color: "var(--admin-modal-danger)",
    },
    {
      value: "books",
      label: "📚 Books & Media",
      description: "Books, movies, music",
      color: "var(--admin-modal-primary)",
    },
    {
      value: "toys",
      label: "🧸 Toys & Games",
      description: "Kids toys, board games",
      color: "var(--admin-modal-accent)",
    },
    {
      value: "automotive",
      label: "🚗 Automotive",
      description: "Car parts, accessories",
      color: "var(--admin-modal-muted)",
    },
    {
      value: "jewelry",
      label: "💍 Jewelry",
      description: "Rings, necklaces, watches",
      color: "var(--admin-modal-warning)",
    },
    {
      value: "food",
      label: "🍕 Food & Beverages",
      description: "Groceries, snacks, drinks",
      color: "var(--admin-modal-success)",
    },
    {
      value: "baby",
      label: "👶 Baby & Kids",
      description: "Diapers, strollers, clothing",
      color: "var(--admin-modal-secondary)",
    },
    {
      value: "pets",
      label: "🐾 Pet Supplies",
      description: "Food, toys, grooming",
      color: "var(--admin-modal-accent)",
    },
    {
      value: "office",
      label: "🖇️ Office & School Supplies",
      description: "Stationery, desks, organizers",
      color: "var(--admin-modal-info)",
    },
    {
      value: "crafts",
      label: "🎨 Arts & Crafts",
      description: "Painting, sewing, DIY kits",
      color: "var(--admin-modal-primary)",
    },
    {
      value: "appliances",
      label: "🧼 Appliances",
      description: "Kitchen, laundry, small appliances",
      color: "var(--admin-modal-muted)",
    },
    {
      value: "travel",
      label: "🧳 Travel & Luggage",
      description: "Bags, accessories, travel gear",
      color: "var(--admin-modal-warning)",
    },
    {
      value: "gaming",
      label: "🎮 Gaming",
      description: "Consoles, games, accessories",
      color: "var(--admin-modal-danger)",
    },
    {
      value: "fitness",
      label: "🏋️ Fitness & Wellness",
      description: "Gym equipment, yoga gear",
      color: "var(--admin-modal-success)",
    },
    {
      value: "collectibles",
      label: "🏺 Collectibles & Antiques",
      description: "Rare items, vintage goods",
      color: "var(--admin-modal-accent)",
    },
    {
      value: "musical",
      label: "🎸 Musical Instruments",
      description: "Guitars, keyboards, accessories",
      color: "var(--admin-modal-primary)",
    },
    {
      value: "beauty",
      label: "💄 Beauty & Personal Care",
      description: "Skincare, makeup, grooming",
      color: "var(--admin-modal-secondary)",
    },
    {
      value: "garden",
      label: "🌱 Garden & Outdoor",
      description: "Plants, tools, outdoor furniture",
      color: "var(--admin-modal-success)",
    },
    {
      value: "industrial",
      label: "🏭 Industrial & Scientific",
      description: "Tools, equipment, supplies",
      color: "var(--admin-modal-muted)",
    },
    {
      value: "luxury",
      label: "💎 Luxury Goods",
      description: "Premium items, designer products",
      color: "var(--admin-modal-warning)",
    },
    {
      value: "handmade",
      label: "🎭 Handmade & Artisan",
      description: "Crafted items, unique creations",
      color: "var(--admin-modal-accent)",
    },
  ]

  const selectedCategory = shopCategories.find((c) => c.value === shop.category)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "var(--admin-modal-success)"
      case "pending":
        return "var(--admin-modal-warning)"
      case "suspended":
        return "var(--admin-modal-danger)"
      case "inactive":
        return "var(--admin-modal-textMuted)"
      default:
        return "var(--admin-modal-primary)"
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "var(--admin-modal-successLight)"
      case "pending":
        return "var(--admin-modal-warningLight)"
      case "suspended":
        return "var(--admin-modal-dangerLight)"
      case "inactive":
        return "var(--admin-modal-mutedLight)"
      default:
        return "var(--admin-modal-primaryLight)"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="sm:max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        style={{
          backgroundColor: "var(--admin-modal-background)",
          borderColor: "var(--admin-modal-border)",
        }}
      >
        <DialogHeader className="pb-4 flex-shrink-0">
          <DialogTitle className="text-3xl font-bold flex items-center gap-3">
            <div
              className="p-3 rounded-xl shadow-lg"
              style={{
                background: themeConfig.gradient,
                color: "white",
              }}
            >
              <FiEye className="h-7 w-7" />
            </div>
            <div>
              <div style={{ color: "var(--admin-modal-text)" }}>Shop Details</div>
              <DialogDescription
                className="text-base mt-1 font-normal"
                style={{ color: "var(--admin-modal-textSecondary)" }}
              >
                Complete information about {shop.name}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Shop Header */}
          <Card
            className="border-2 shadow-lg"
            style={{
              backgroundColor: "var(--admin-modal-card)",
              borderColor: "var(--admin-modal-borderLight)",
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div
                  className="w-24 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0"
                  style={{ borderColor: "var(--admin-modal-border)" }}
                >
                  {shop.icon ? (
                    <img src={shop.icon || "/placeholder.svg"} alt="Shop Icon" className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--admin-modal-muted)" }}
                    >
                      <FiShoppingBag className="h-8 w-8" style={{ color: "var(--admin-modal-textMuted)" }} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--admin-modal-text)" }}>
                        {shop.name}
                      </h2>
                      <p className="text-lg mb-3" style={{ color: "var(--admin-modal-textSecondary)" }}>
                        {shop.description}
                      </p>
                    </div>
                    <Badge
                      className="px-3 py-1 text-sm font-medium"
                      style={{
                        backgroundColor: getStatusBgColor(shop.status),
                        color: getStatusColor(shop.status),
                        border: `1px solid ${getStatusColor(shop.status)}`,
                      }}
                    >
                      {shop.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm" style={{ color: "var(--admin-modal-textMuted)" }}>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="h-4 w-4" />
                      {shop.city}, {shop.state}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="h-4 w-4" />
                      {shop.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="h-4 w-4" />
                      Created {new Date(shop.createdAt).toLocaleDateString()}
                    </div>
                    {shop.rating && (
                      <div className="flex items-center gap-2">
                        <FiStar className="h-4 w-4" />
                        {shop.rating}/5.0
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card style={{ backgroundColor: "var(--admin-modal-card)", borderColor: "var(--admin-modal-border)" }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--admin-modal-infoLight)" }}>
                    <FiPackage className="h-5 w-5" style={{ color: "var(--admin-modal-info)" }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "var(--admin-modal-text)" }}>
                      {shop.totalProducts || 0}
                    </p>
                    <p className="text-sm" style={{ color: "var(--admin-modal-textMuted)" }}>
                      Products
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: "var(--admin-modal-card)", borderColor: "var(--admin-modal-border)" }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--admin-modal-successLight)" }}>
                    <FiShoppingBag className="h-5 w-5" style={{ color: "var(--admin-modal-success)" }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "var(--admin-modal-text)" }}>
                      {shop.totalOrders || 0}
                    </p>
                    <p className="text-sm" style={{ color: "var(--admin-modal-textMuted)" }}>
                      Orders
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: "var(--admin-modal-card)", borderColor: "var(--admin-modal-border)" }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--admin-modal-warningLight)" }}>
                    <FiDollarSign className="h-5 w-5" style={{ color: "var(--admin-modal-warning)" }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "var(--admin-modal-text)" }}>
                      ${shop.totalRevenue || 0}
                    </p>
                    <p className="text-sm" style={{ color: "var(--admin-modal-textMuted)" }}>
                      Revenue
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: "var(--admin-modal-card)", borderColor: "var(--admin-modal-border)" }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--admin-modal-primaryLight)" }}>
                    <FiStar className="h-5 w-5" style={{ color: "var(--admin-modal-primary)" }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "var(--admin-modal-text)" }}>
                      {shop.rating || 0}/5
                    </p>
                    <p className="text-sm" style={{ color: "var(--admin-modal-textMuted)" }}>
                      Rating
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category & Subcategories */}
            <Card style={{ backgroundColor: "var(--admin-modal-card)", borderColor: "var(--admin-modal-border)" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "var(--admin-modal-text)" }}>
                  <FiPackage className="h-5 w-5" />
                  Category & Subcategories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCategory && (
                  <div
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: "var(--admin-modal-categoryLight)",
                      borderColor: "var(--admin-modal-borderLight)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedCategory.label.split(" ")[0]}</span>
                      <div>
                        <p className="font-semibold" style={{ color: "var(--admin-modal-text)" }}>
                          {selectedCategory.label.substring(2)}
                        </p>
                        <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                          {selectedCategory.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {shop.subcategories.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: "var(--admin-modal-text)" }}>
                      Subcategories ({shop.subcategories.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {shop.subcategories.map((sub, index) => (
                        <Badge
                          key={index}
                          className="px-2 py-1 text-xs"
                          style={{
                            backgroundColor: "var(--admin-modal-badgeLight)",
                            color: "var(--admin-modal-primary)",
                            border: `1px solid var(--admin-modal-borderLight)`,
                          }}
                        >
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card style={{ backgroundColor: "var(--admin-modal-card)", borderColor: "var(--admin-modal-border)" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "var(--admin-modal-text)" }}>
                  <FiMapPin className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FiHome className="h-4 w-4 mt-1" style={{ color: "var(--admin-modal-textMuted)" }} />
                    <div>
                      <p className="font-medium" style={{ color: "var(--admin-modal-text)" }}>
                        Address
                      </p>
                      <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                        {shop.address}
                      </p>
                      <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                        {shop.city}, {shop.state} {shop.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiPhone className="h-4 w-4" style={{ color: "var(--admin-modal-textMuted)" }} />
                    <div>
                      <p className="font-medium" style={{ color: "var(--admin-modal-text)" }}>
                        Phone
                      </p>
                      <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                        {shop.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiMail className="h-4 w-4" style={{ color: "var(--admin-modal-textMuted)" }} />
                    <div>
                      <p className="font-medium" style={{ color: "var(--admin-modal-text)" }}>
                        Email
                      </p>
                      <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                        {shop.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card style={{ backgroundColor: "var(--admin-modal-card)", borderColor: "var(--admin-modal-border)" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "var(--admin-modal-text)" }}>
                  <FiShield className="h-5 w-5" />
                  Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium" style={{ color: "var(--admin-modal-text)" }}>
                      Business License
                    </p>
                    <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                      {shop.businessLicense}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium" style={{ color: "var(--admin-modal-text)" }}>
                      Tax ID
                    </p>
                    <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                      {shop.taxId}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium" style={{ color: "var(--admin-modal-text)" }}>
                        Space
                      </p>
                      <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                        {shop.spaceCapacity} sq ft
                      </p>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: "var(--admin-modal-text)" }}>
                        Capacity
                      </p>
                      <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                        {shop.productCapacity} products
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features & Services */}
            <Card style={{ backgroundColor: "var(--admin-modal-card)", borderColor: "var(--admin-modal-border)" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "var(--admin-modal-text)" }}>
                  <FiStar className="h-5 w-5" />
                  Features & Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(shop.features).map(([key, enabled]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-2 rounded-lg"
                      style={{
                        backgroundColor: enabled ? "var(--admin-modal-featureLight)" : "var(--admin-modal-mutedLight)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="p-1 rounded-full"
                          style={{
                            backgroundColor: enabled ? "var(--admin-modal-success)" : "var(--admin-modal-textMuted)",
                          }}
                        >
                          {enabled ? (
                            <FiCheckCircle className="h-3 w-3 text-white" />
                          ) : (
                            <FiX className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "var(--admin-modal-text)" }}>
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-6 border-t" style={{ borderColor: "var(--admin-modal-border)" }}>
          <Button
            onClick={() => onOpenChange?.(false)}
            style={{
              background: themeConfig.gradient,
              color: "white",
              border: "none",
            }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

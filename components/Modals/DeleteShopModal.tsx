"use client"

import type React from "react"

import { useState } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// React Icons
import {
  FiShoppingBag,
  FiTrash2,
  FiAlertTriangle,
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
  FiShield,
  FiInfo,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi"
import { toast } from "react-toastify"

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
}

interface DeleteShopModalProps {
  shop: Shop
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DeleteShopModal({ shop, trigger, open, onOpenChange }: DeleteShopModalProps) {
  const { themeConfig } = useAdminTheme()
  const [currentStep, setCurrentStep] = useState(1)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmationText, setConfirmationText] = useState("")

  const handleDelete = async () => {
    if (confirmationText !== shop.name) {
      toast.error("Shop name doesn't match. Please type the exact shop name.")
      return
    }

    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Shop deleted:", shop.id)
      toast.success("Shop deleted successfully!")
      onOpenChange?.(false)
      resetForm()
    } catch (error) {
      toast.error("Failed to delete shop")
    } finally {
      setIsDeleting(false)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setConfirmationText("")
  }

  const handleClose = () => {
    onOpenChange?.(false)
    resetForm()
  }

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
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
                backgroundColor: "var(--admin-modal-danger)",
                color: "white",
              }}
            >
              <FiTrash2 className="h-7 w-7" />
            </div>
            <div>
              <div style={{ color: "var(--admin-modal-text)" }}>Delete Shop</div>
              <DialogDescription
                className="text-base mt-1 font-normal"
                style={{ color: "var(--admin-modal-textSecondary)" }}
              >
                {currentStep === 1 ? "Review shop details before deletion" : "Confirm deletion permanently"}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                  currentStep >= 1 ? "text-white" : "text-gray-400 bg-white border-2",
                )}
                style={{
                  backgroundColor: currentStep >= 1 ? "var(--admin-modal-danger)" : "var(--admin-modal-card)",
                  borderColor: currentStep >= 1 ? "var(--admin-modal-danger)" : "var(--admin-modal-borderLight)",
                }}
              >
                {currentStep > 1 ? <FiCheck className="h-4 w-4" /> : "1"}
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: currentStep >= 1 ? "var(--admin-modal-text)" : "var(--admin-modal-textMuted)" }}
              >
                Review
              </span>
            </div>

            <div
              className="w-12 h-0.5"
              style={{ backgroundColor: currentStep >= 2 ? "var(--admin-modal-danger)" : "var(--admin-modal-border)" }}
            />

            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                  currentStep >= 2 ? "text-white" : "text-gray-400 bg-white border-2",
                )}
                style={{
                  backgroundColor: currentStep >= 2 ? "var(--admin-modal-danger)" : "var(--admin-modal-card)",
                  borderColor: currentStep >= 2 ? "var(--admin-modal-danger)" : "var(--admin-modal-borderLight)",
                }}
              >
                2
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: currentStep >= 2 ? "var(--admin-modal-text)" : "var(--admin-modal-textMuted)" }}
              >
                Confirm
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Step 1: Review Shop Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Warning Alert */}
              <Card
                className="border-2"
                style={{
                  backgroundColor: "var(--admin-modal-dangerLight)",
                  borderColor: "var(--admin-modal-danger)",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FiAlertTriangle className="h-6 w-6 mt-1" style={{ color: "var(--admin-modal-danger)" }} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--admin-modal-danger)" }}>
                        Warning: This action cannot be undone
                      </h3>
                      <p className="text-sm" style={{ color: "var(--admin-modal-danger)" }}>
                        Deleting this shop will permanently remove all associated data including products, orders, and
                        customer information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shop Details */}
              <Card
                style={{
                  backgroundColor: "var(--admin-modal-card)",
                  borderColor: "var(--admin-modal-border)",
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: "var(--admin-modal-text)" }}>
                    <FiShoppingBag className="h-5 w-5" />
                    Shop to be Deleted
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 rounded-xl overflow-hidden border-2"
                      style={{ borderColor: "var(--admin-modal-border)" }}
                    >
                      {shop.icon ? (
                        <img
                          src={shop.icon || "/placeholder.svg"}
                          alt="Shop Icon"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: "var(--admin-modal-muted)" }}
                        >
                          <FiShoppingBag className="h-6 w-6" style={{ color: "var(--admin-modal-textMuted)" }} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" style={{ color: "var(--admin-modal-text)" }}>
                        {shop.name}
                      </h3>
                      <p className="mb-3" style={{ color: "var(--admin-modal-textSecondary)" }}>
                        {shop.description}
                      </p>
                      {selectedCategory && (
                        <Badge
                          className="mb-3"
                          style={{
                            backgroundColor: "var(--admin-modal-badgeLight)",
                            color: "var(--admin-modal-primary)",
                          }}
                        >
                          {selectedCategory.label}
                        </Badge>
                      )}
                      <div className="text-sm" style={{ color: "var(--admin-modal-textMuted)" }}>
                        {shop.city}, {shop.state} • {shop.phone}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Summary */}
              <Card
                style={{
                  backgroundColor: "var(--admin-modal-card)",
                  borderColor: "var(--admin-modal-border)",
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: "var(--admin-modal-text)" }}>
                    <FiInfo className="h-5 w-5" />
                    Deletion Impact
                  </CardTitle>
                  <CardDescription style={{ color: "var(--admin-modal-textSecondary)" }}>
                    The following data will be permanently deleted:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className="p-4 rounded-lg border text-center"
                      style={{
                        backgroundColor: "var(--admin-modal-dangerLight)",
                        borderColor: "var(--admin-modal-danger)",
                      }}
                    >
                      <FiPackage className="h-8 w-8 mx-auto mb-2" style={{ color: "var(--admin-modal-danger)" }} />
                      <p className="text-2xl font-bold" style={{ color: "var(--admin-modal-danger)" }}>
                        {shop.totalProducts || 0}
                      </p>
                      <p className="text-sm" style={{ color: "var(--admin-modal-danger)" }}>
                        Products
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-lg border text-center"
                      style={{
                        backgroundColor: "var(--admin-modal-dangerLight)",
                        borderColor: "var(--admin-modal-danger)",
                      }}
                    >
                      <FiShoppingBag className="h-8 w-8 mx-auto mb-2" style={{ color: "var(--admin-modal-danger)" }} />
                      <p className="text-2xl font-bold" style={{ color: "var(--admin-modal-danger)" }}>
                        {shop.totalOrders || 0}
                      </p>
                      <p className="text-sm" style={{ color: "var(--admin-modal-danger)" }}>
                        Orders
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-lg border text-center"
                      style={{
                        backgroundColor: "var(--admin-modal-dangerLight)",
                        borderColor: "var(--admin-modal-danger)",
                      }}
                    >
                      <FiDollarSign className="h-8 w-8 mx-auto mb-2" style={{ color: "var(--admin-modal-danger)" }} />
                      <p className="text-2xl font-bold" style={{ color: "var(--admin-modal-danger)" }}>
                        ${shop.totalRevenue || 0}
                      </p>
                      <p className="text-sm" style={{ color: "var(--admin-modal-danger)" }}>
                        Revenue Data
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Final Warning */}
              <Card
                className="border-2"
                style={{
                  backgroundColor: "var(--admin-modal-dangerLight)",
                  borderColor: "var(--admin-modal-danger)",
                }}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <FiAlertTriangle
                      className="h-16 w-16 mx-auto mb-4"
                      style={{ color: "var(--admin-modal-danger)" }}
                    />
                    <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--admin-modal-danger)" }}>
                      Final Confirmation Required
                    </h3>
                    <p className="text-lg" style={{ color: "var(--admin-modal-danger)" }}>
                      This action is irreversible and will permanently delete all shop data.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Confirmation Input */}
              <Card
                style={{
                  backgroundColor: "var(--admin-modal-card)",
                  borderColor: "var(--admin-modal-border)",
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: "var(--admin-modal-text)" }}>
                    <FiShield className="h-5 w-5" />
                    Type Shop Name to Confirm
                  </CardTitle>
                  <CardDescription style={{ color: "var(--admin-modal-textSecondary)" }}>
                    To confirm deletion, please type the shop name exactly as shown below:
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className="p-3 rounded-lg border font-mono text-lg text-center"
                    style={{
                      backgroundColor: "var(--admin-modal-muted)",
                      borderColor: "var(--admin-modal-border)",
                      color: "var(--admin-modal-text)",
                    }}
                  >
                    {shop.name}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmationInput"
                      className="text-sm font-medium"
                      style={{ color: "var(--admin-modal-text)" }}
                    >
                      Enter shop name to confirm deletion:
                    </Label>
                    <Input
                      id="confirmationInput"
                      placeholder="Type shop name here..."
                      value={confirmationText}
                      onChange={(e) => setConfirmationText(e.target.value)}
                      style={{
                        backgroundColor: "var(--admin-modal-input)",
                        borderColor:
                          confirmationText === shop.name
                            ? "var(--admin-modal-success)"
                            : "var(--admin-modal-inputBorder)",
                        color: "var(--admin-modal-text)",
                      }}
                      className="focus:ring-2"
                    />
                    {confirmationText && confirmationText !== shop.name && (
                      <p className="text-sm" style={{ color: "var(--admin-modal-danger)" }}>
                        Shop name doesn't match. Please type exactly: {shop.name}
                      </p>
                    )}
                    {confirmationText === shop.name && (
                      <p className="text-sm flex items-center gap-1" style={{ color: "var(--admin-modal-success)" }}>
                        <FiCheck className="h-4 w-4" />
                        Shop name confirmed
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className="flex items-center justify-between pt-6 border-t flex-shrink-0"
          style={{ borderColor: "var(--admin-modal-border)" }}
        >
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center gap-2"
                style={{
                  borderColor: "var(--admin-modal-border)",
                  color: "var(--admin-modal-textSecondary)",
                  backgroundColor: "var(--admin-modal-buttonSecondary)",
                }}
              >
                <FiArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              style={{
                borderColor: "var(--admin-modal-border)",
                color: "var(--admin-modal-textSecondary)",
                backgroundColor: "var(--admin-modal-buttonSecondary)",
              }}
            >
              Cancel
            </Button>

            {currentStep < 2 ? (
              <Button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-6"
                style={{
                  backgroundColor: "var(--admin-modal-danger)",
                  color: "white",
                  border: "none",
                }}
              >
                Continue
                <FiArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleDelete}
                disabled={isDeleting || confirmationText !== shop.name}
                className="flex items-center gap-2 px-8"
                style={{
                  backgroundColor: "var(--admin-modal-danger)",
                  color: "white",
                  border: "none",
                  opacity: confirmationText !== shop.name ? 0.5 : 1,
                }}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Deleting Shop...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="h-4 w-4" />
                    Delete Shop Permanently
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

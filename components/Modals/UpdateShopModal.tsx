"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

// React Icons
import {
  FiShoppingBag,
  FiMapPin,
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiTruck,
  FiStar,
  FiCheck,
  FiCheckCircle,
  FiInfo,
  FiX,
  FiPhone,
  FiMail,
  FiShield,
  FiArrowRight,
  FiArrowLeft,
  FiUpload,
  FiImage,
  FiEdit3,
} from "react-icons/fi"
import { toast } from "react-toastify"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

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
}

interface UpdateShopModalProps {
  shop: Shop
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function UpdateShopModal({ shop, trigger, open, onOpenChange }: UpdateShopModalProps) {
  const { themeConfig } = useAdminTheme()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [shopIcon, setShopIcon] = useState<string | null>(shop.icon || null)

  const [shopData, setShopData] = useState({
    // Basic Info
    name: shop.name,
    description: shop.description,
    category: shop.category,
    subcategories: [...shop.subcategories],
    icon: null as File | null,

    // Location & Contact
    address: shop.address,
    city: shop.city,
    state: shop.state,
    zipCode: shop.zipCode,
    phone: shop.phone,
    email: shop.email,

    // Business Details
    businessLicense: shop.businessLicense,
    taxId: shop.taxId,
    spaceCapacity: shop.spaceCapacity,
    productCapacity: shop.productCapacity,

    // Features
    features: { ...shop.features },
  })

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

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setShopIcon(e.target?.result as string)
        setShopData({ ...shopData, icon: file })
        toast.success("Shop icon updated successfully!")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Shop updated:", shopData)
      toast.success("Shop updated successfully!")
      onOpenChange?.(false)
    } catch (error) {
      toast.error("Failed to update shop")
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    {
      id: 1,
      title: "Basic Info",
      subtitle: "Shop details",
      icon: <FiShoppingBag className="h-5 w-5" />,
      description: "Update your shop's basic information",
    },
    {
      id: 2,
      title: "Location",
      subtitle: "Address & Contact",
      icon: <FiMapPin className="h-5 w-5" />,
      description: "Update your shop's location and contact details",
    },
    {
      id: 3,
      title: "Business",
      subtitle: "Legal & Capacity",
      icon: <FiDollarSign className="h-5 w-5" />,
      description: "Update business registration and capacity information",
    },
    {
      id: 4,
      title: "Features",
      subtitle: "Services & Options",
      icon: <FiStar className="h-5 w-5" />,
      description: "Configure your shop's features and services",
    },
    {
      id: 5,
      title: "Review",
      subtitle: "Final Check",
      icon: <FiCheck className="h-5 w-5" />,
      description: "Review and confirm all changes before updating",
    },
  ]

  // Handle subcategory addition
  const handleSubcategoryAdd = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    e.preventDefault()
    const input = (document.getElementById("subcategory") as HTMLInputElement)?.value.trim()
    if (input) {
      if (shopData.subcategories.includes(input)) {
        toast.warn("This subcategory already exists!")
      } else if (shopData.subcategories.length >= 12) {
        toast.error("You can add a maximum of 12 subcategories.")
      } else {
        setShopData({ ...shopData, subcategories: [...shopData.subcategories, input] })
        ;(document.getElementById("subcategory") as HTMLInputElement).value = ""
        toast.success("Subcategory added successfully!")
      }
    } else {
      toast.info("Please enter a subcategory name.")
    }
  }

  // Handle subcategory removal
  const handleSubcategoryRemove = (subcategory: string) => {
    setShopData({
      ...shopData,
      subcategories: shopData.subcategories.filter((s) => s !== subcategory),
    })
  }

  const selectedCategory = shopCategories.find((c) => c.value === shopData.category)

  // Calculate progress based on filled fields
  const calculateProgress = () => {
    let totalFields = 0
    let filledFields = 0

    // // Basic Info fields
    // totalFields += 4
    // if (shopData.name.trim()) filledFields++
    // if (shopData.description.trim()) filledFields++
    // if (shopData.subcategories.length > 0) filledFields++
    // if (shopIcon) filledFields++

    // // Location fields
    // totalFields += 6
    // if (shopData.address.trim()) filledFields++
    // if (shopData.city.trim()) filledFields++
    // if (shopData.state.trim()) filledFields++
    // if (shopData.zipCode.trim()) filledFields++
    // if (shopData.phone.trim()) filledFields++
    // if (shopData.email.trim()) filledFields++

    // // Business fields
    // totalFields += 4
    // if (shopData.businessLicense.trim()) filledFields++
    // if (shopData.taxId.trim()) filledFields++
    // if (shopData.spaceCapacity.trim()) filledFields++
    // if (shopData.productCapacity.trim()) filledFields++

    // Features (count enabled features)
    totalFields += Object.keys(shopData.features).length
    filledFields += Object.values(shopData.features).filter(Boolean).length

    return Math.round((filledFields / totalFields) * 100)
  }

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          className="sm:max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar"
          style={{
            backgroundColor: "var(--admin-modal-background)",
            borderColor: "var(--admin-modal-border)",
          }}
        >
          <DialogHeader className="pb-4 flex-shrink-0">
            <div className="flex items-start justify-between">
              <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                <div
                  className="p-3 rounded-xl shadow-lg"
                  style={{
                    background: themeConfig.gradient,
                    color: "white",
                  }}
                >
                  <FiEdit3 className="h-7 w-7" />
                </div>
                <div>
                  <div style={{ color: "var(--admin-modal-text)" }}>Update Shop</div>
                  <DialogDescription
                    className="text-base mt-1 font-normal"
                    style={{ color: "var(--admin-modal-textSecondary)" }}
                  >
                    Update your shop details and configurations
                  </DialogDescription>
                </div>
              </DialogTitle>

              {/* Progress Percentage */}
              <div className="text-right mr-4">
                <div className="text-2xl font-bold" style={{ color: "var(--admin-modal-primary)" }}>
                  {calculateProgress()}%
                </div>
                <div className="text-sm" style={{ color: "var(--admin-modal-textMuted)" }}>
                  Complete
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Step Navigation */}
          <div className="flex-shrink-0 mb-6">
            <div className="relative">
              {/* Progress Line */}
              <div
                className="absolute top-6 left-0 right-0 h-0.5"
                style={{ backgroundColor: "var(--admin-modal-progressBackground)" }}
              >
                <div
                  className="h-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    background: themeConfig.gradient,
                  }}
                />
              </div>

              {/* Step Navigation */}
              <div className="flex justify-between items-center relative z-10">
                {steps.map((step, index) => (
                  <Tooltip key={step.id}>
                    <TooltipTrigger asChild>
                      <div
                        className="flex flex-col items-center group cursor-pointer"
                        onClick={() => setCurrentStep(step.id)}
                      >
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 shadow-lg mb-3",
                            currentStep >= step.id
                              ? "text-white transform scale-110"
                              : "text-gray-400 bg-white border-2 hover:scale-105",
                          )}
                          style={{
                            backgroundColor:
                              currentStep >= step.id ? "var(--admin-modal-primary)" : "var(--admin-modal-card)",
                            borderColor:
                              currentStep >= step.id ? "var(--admin-modal-primary)" : "var(--admin-modal-borderLight)",
                            boxShadow: currentStep >= step.id ? `0 4px 20px var(--admin-modal-shadow)` : undefined,
                          }}
                        >
                          {currentStep > step.id ? <FiCheckCircle className="h-6 w-6" /> : step.icon}
                        </div>

                        <div className="text-center">
                          <div
                            className={cn("font-semibold text-sm transition-colors", currentStep >= step.id ? "" : "")}
                            style={{
                              color:
                                currentStep >= step.id ? "var(--admin-modal-text)" : "var(--admin-modal-textMuted)",
                            }}
                          >
                            {step.title}
                          </div>
                          <div className="text-xs mt-1" style={{ color: "var(--admin-modal-textMuted)" }}>
                            {step.subtitle}
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="max-w-xs"
                      style={{ backgroundColor: "var(--admin-modal-tooltip)", color: "var(--admin-modal-tooltipText)" }}
                    >
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm opacity-90">{step.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content - Scrollable */}
          <div className="space-y-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <Card
                  className="border-2 shadow-lg"
                  style={{
                    backgroundColor: "var(--admin-modal-card)",
                    borderColor: "var(--admin-modal-borderLight)",
                  }}
                >
                  <CardHeader className="gap-0">
                    <CardTitle className="flex items-center gap-2 text-lg" style={{ color: "var(--admin-modal-text)" }}>
                      <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--admin-modal-primaryLight)" }}>
                        <FiShoppingBag className="h-5 w-5" style={{ color: "var(--admin-modal-primary)" }} />
                      </div>
                      Basic Shop Information
                    </CardTitle>
                    <CardDescription style={{ color: "var(--admin-modal-textSecondary)" }}>
                      Update the basic details about your shop
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Shop Icon Upload */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="shopIcon"
                        className="text-sm font-medium flex items-center gap-2"
                        style={{ color: "var(--admin-modal-text)" }}
                      >
                        <FiImage className="h-4 w-4" />
                        Shop Icon
                      </Label>
                      <div className="flex items-center gap-4">
                        <div
                          className="w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-all duration-300"
                          style={{
                            borderColor: "var(--admin-modal-border)",
                            backgroundColor: shopIcon ? "transparent" : "var(--admin-modal-muted)",
                          }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {shopIcon ? (
                            <img
                              src={shopIcon || "/placeholder.svg"}
                              alt="Shop Icon"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-center">
                              <FiUpload
                                className="h-6 w-6 mx-auto mb-1"
                                style={{ color: "var(--admin-modal-textMuted)" }}
                              />
                              <span className="text-xs" style={{ color: "var(--admin-modal-textMuted)" }}>
                                Upload
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full"
                            style={{
                              borderColor: "var(--admin-modal-primary)",
                              color: "var(--admin-modal-primary)",
                              backgroundColor: "transparent",
                            }}
                          >
                            <FiUpload className="mr-2 h-4 w-4" />
                            Update Shop Icon
                          </Button>
                          <p className="text-xs mt-1" style={{ color: "var(--admin-modal-textMuted)" }}>
                            PNG, JPG up to 5MB. Recommended: 200x200px
                          </p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleIconUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="shopName"
                        className="text-sm font-medium flex items-center gap-2"
                        style={{ color: "var(--admin-modal-text)" }}
                      >
                        <FiShoppingBag className="h-4 w-4" />
                        Shop Name
                      </Label>
                      <Input
                        id="shopName"
                        placeholder="Enter your shop name"
                        value={shopData.name}
                        onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
                        style={{
                          backgroundColor: "var(--admin-modal-input)",
                          borderColor: "var(--admin-modal-inputBorder)",
                          color: "var(--admin-modal-text)",
                        }}
                        className="focus:ring-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="shopDescription"
                        className="text-sm font-medium flex items-center gap-2"
                        style={{ color: "var(--admin-modal-text)" }}
                      >
                        <FiInfo className="h-4 w-4" />
                        Shop Description
                      </Label>
                      <Textarea
                        id="shopDescription"
                        placeholder="Describe your shop and what you sell..."
                        value={shopData.description}
                        onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
                        rows={4}
                        style={{
                          backgroundColor: "var(--admin-modal-input)",
                          borderColor: "var(--admin-modal-inputBorder)",
                          color: "var(--admin-modal-text)",
                        }}
                        className="focus:ring-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="category"
                        className="text-sm font-medium flex items-center gap-2"
                        style={{ color: "var(--admin-modal-text)" }}
                      >
                        <FiPackage className="h-4 w-4" />
                        Category (Cannot be changed)
                      </Label>
                      <div
                        className="p-3 rounded-lg border-2 bg-gray-50"
                        style={{
                          backgroundColor: "var(--admin-modal-muted)",
                          borderColor: "var(--admin-modal-border)",
                          color: "var(--admin-modal-textMuted)",
                        }}
                      >
                        {selectedCategory && (
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{selectedCategory.label.split(" ")[0]}</span>
                            <div>
                              <div className="font-medium">{selectedCategory.label.substring(2)}</div>
                              <div className="text-xs">{selectedCategory.description}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs" style={{ color: "var(--admin-modal-textMuted)" }}>
                        Category cannot be changed after shop creation. Contact support if you need to change the main
                        category.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="subcategory"
                        className="text-sm font-medium flex items-center gap-2"
                        style={{ color: "var(--admin-modal-text)" }}
                      >
                        <FiStar className="h-4 w-4" />
                        Subcategories (Max 12)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="subcategory"
                          placeholder="e.g., Smartphones, Laptops"
                          onKeyPress={(e) => e.key === "Enter" && handleSubcategoryAdd(e)}
                          style={{
                            backgroundColor: "var(--admin-modal-input)",
                            borderColor: "var(--admin-modal-inputBorder)",
                            color: "var(--admin-modal-text)",
                          }}
                          className="focus:ring-2"
                        />
                        <Button
                          onClick={handleSubcategoryAdd}
                          variant="outline"
                          className="px-4 bg-transparent"
                          style={{
                            borderColor: "var(--admin-modal-primary)",
                            color: "var(--admin-modal-primary)",
                            backgroundColor: "transparent",
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      {shopData.subcategories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {shopData.subcategories.map((sub, index) => (
                            <Badge
                              key={index}
                              className="flex items-center gap-2 px-3 py-1 text-sm"
                              style={{
                                backgroundColor: "var(--admin-modal-badgeLight)",
                                color: "var(--admin-modal-primary)",
                                border: `1px solid var(--admin-modal-borderLight)`,
                              }}
                            >
                              {sub}
                              <button
                                onClick={() => handleSubcategoryRemove(sub)}
                                className="ml-1 hover:text-red-500 transition-colors"
                              >
                                <FiX className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {selectedCategory && (
                      <div className="mt-4">
                        <div
                          className="p-4 rounded-xl border-2 transition-all duration-300"
                          style={{
                            backgroundColor: "var(--admin-modal-categoryLight)",
                            borderColor: "var(--admin-modal-borderLight)",
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="p-3 rounded-full text-2xl"
                              style={{ backgroundColor: "var(--admin-modal-highlight)" }}
                            >
                              {selectedCategory.label.split(" ")[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-lg" style={{ color: "var(--admin-modal-text)" }}>
                                {selectedCategory.label.substring(2)}
                              </p>
                              <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                                {selectedCategory.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Location & Contact */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card
                  style={{
                    backgroundColor: "var(--admin-modal-card)",
                    borderColor: "var(--admin-modal-border)",
                  }}
                >
                  <CardHeader className="gap-0">
                    <CardTitle className="flex items-center gap-2 text-lg" style={{ color: "var(--admin-modal-text)" }}>
                      <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--admin-modal-primaryLight)" }}>
                        <FiMapPin className="h-5 w-5" style={{ color: "var(--admin-modal-primary)" }} />
                      </div>
                      Location & Contact Information
                    </CardTitle>
                    <CardDescription style={{ color: "var(--admin-modal-textSecondary)" }}>
                      Update your shop's location and contact details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="text-sm font-medium flex items-center gap-2"
                        style={{ color: "var(--admin-modal-text)" }}
                      >
                        <FiMapPin className="h-4 w-4" />
                        Street Address
                      </Label>
                      <Input
                        id="address"
                        placeholder="Enter your shop address"
                        value={shopData.address}
                        onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
                        style={{
                          backgroundColor: "var(--admin-modal-input)",
                          borderColor: "var(--admin-modal-inputBorder)",
                          color: "var(--admin-modal-text)",
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="city"
                          className="text-sm font-medium"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          City
                        </Label>
                        <Input
                          id="city"
                          placeholder="City"
                          value={shopData.city}
                          onChange={(e) => setShopData({ ...shopData, city: e.target.value })}
                          style={{
                            backgroundColor: "var(--admin-modal-input)",
                            borderColor: "var(--admin-modal-inputBorder)",
                            color: "var(--admin-modal-text)",
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="state"
                          className="text-sm font-medium"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          State
                        </Label>
                        <Input
                          id="state"
                          placeholder="State"
                          value={shopData.state}
                          onChange={(e) => setShopData({ ...shopData, state: e.target.value })}
                          style={{
                            backgroundColor: "var(--admin-modal-input)",
                            borderColor: "var(--admin-modal-inputBorder)",
                            color: "var(--admin-modal-text)",
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="zipCode"
                          className="text-sm font-medium"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          ZIP Code
                        </Label>
                        <Input
                          id="zipCode"
                          placeholder="ZIP Code"
                          value={shopData.zipCode}
                          onChange={(e) => setShopData({ ...shopData, zipCode: e.target.value })}
                          style={{
                            backgroundColor: "var(--admin-modal-input)",
                            borderColor: "var(--admin-modal-inputBorder)",
                            color: "var(--admin-modal-text)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium flex items-center gap-2"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          <FiPhone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          placeholder="(555) 123-4567"
                          value={shopData.phone}
                          onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                          style={{
                            backgroundColor: "var(--admin-modal-input)",
                            borderColor: "var(--admin-modal-inputBorder)",
                            color: "var(--admin-modal-text)",
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium flex items-center gap-2"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          <FiMail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="shop@example.com"
                          value={shopData.email}
                          onChange={(e) => setShopData({ ...shopData, email: e.target.value })}
                          style={{
                            backgroundColor: "var(--admin-modal-input)",
                            borderColor: "var(--admin-modal-inputBorder)",
                            color: "var(--admin-modal-text)",
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Business Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card
                  style={{
                    backgroundColor: "var(--admin-modal-card)",
                    borderColor: "var(--admin-modal-border)",
                  }}
                >
                  <CardHeader className="gap-0">
                    <CardTitle className="flex items-center gap-2 text-lg" style={{ color: "var(--admin-modal-text)" }}>
                      <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--admin-modal-primaryLight)" }}>
                        <FiDollarSign className="h-5 w-5" style={{ color: "var(--admin-modal-primary)" }} />
                      </div>
                      Business Details & Capacity
                    </CardTitle>
                    <CardDescription style={{ color: "var(--admin-modal-textSecondary)" }}>
                      Update business registration and capacity information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="businessLicense"
                          className="text-sm font-medium flex items-center gap-2"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          <FiShield className="h-4 w-4" />
                          Business License
                        </Label>
                        <Input
                          id="businessLicense"
                          placeholder="Business License Number"
                          value={shopData.businessLicense}
                          onChange={(e) => setShopData({ ...shopData, businessLicense: e.target.value })}
                          style={{
                            backgroundColor: "var(--admin-modal-input)",
                            borderColor: "var(--admin-modal-inputBorder)",
                            color: "var(--admin-modal-text)",
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="taxId"
                          className="text-sm font-medium flex items-center gap-2"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          <FiDollarSign className="h-4 w-4" />
                          Tax ID
                        </Label>
                        <Input
                          id="taxId"
                          placeholder="Tax Identification Number"
                          value={shopData.taxId}
                          onChange={(e) => setShopData({ ...shopData, taxId: e.target.value })}
                          style={{
                            backgroundColor: "var(--admin-modal-input)",
                            borderColor: "var(--admin-modal-inputBorder)",
                            color: "var(--admin-modal-text)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="spaceCapacity"
                          className="text-sm font-medium flex items-center gap-2"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          <FiMapPin className="h-4 w-4" />
                          Space Capacity (sq ft)
                        </Label>
                        <Input
                          id="spaceCapacity"
                          type="number"
                          placeholder="1000"
                          value={shopData.spaceCapacity}
                          onChange={(e) => setShopData({ ...shopData, spaceCapacity: e.target.value })}
                          style={{
                            backgroundColor: "var(--admin-modal-input)",
                            borderColor: "var(--admin-modal-inputBorder)",
                            color: "var(--admin-modal-text)",
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="productCapacity"
                          className="text-sm font-medium flex items-center gap-2"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          <FiPackage className="h-4 w-4" />
                          Product Capacity
                        </Label>
                        <Input
                          id="productCapacity"
                          type="number"
                          placeholder="500"
                          value={shopData.productCapacity}
                          onChange={(e) => setShopData({ ...shopData, productCapacity: e.target.value })}
                          style={{
                            backgroundColor: "var(--admin-modal-input)",
                            borderColor: "var(--admin-modal-inputBorder)",
                            color: "var(--admin-modal-text)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Capacity Visual */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div
                        className="p-4 rounded-lg border"
                        style={{
                          backgroundColor: "var(--admin-modal-infoLight)",
                          borderColor: "var(--admin-modal-border)",
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--admin-modal-highlight)" }}>
                            <FiMapPin className="h-6 w-6" style={{ color: "var(--admin-modal-info)" }} />
                          </div>
                          <div>
                            <p className="font-semibold text-lg" style={{ color: "var(--admin-modal-text)" }}>
                              Space Capacity
                            </p>
                            <p className="text-xl" style={{ color: "var(--admin-modal-textSecondary)" }}>
                              {shopData.spaceCapacity || "0"} sq ft
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="p-4 rounded-lg border"
                        style={{
                          backgroundColor: "var(--admin-modal-successLight)",
                          borderColor: "var(--admin-modal-border)",
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--admin-modal-highlight)" }}>
                            <FiPackage className="h-6 w-6" style={{ color: "var(--admin-modal-success)" }} />
                          </div>
                          <div>
                            <p className="font-semibold text-lg" style={{ color: "var(--admin-modal-text)" }}>
                              Product Capacity
                            </p>
                            <p className="text-xl" style={{ color: "var(--admin-modal-textSecondary)" }}>
                              {shopData.productCapacity || "0"} products
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Features & Services */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <Card
                  style={{
                    backgroundColor: "var(--admin-modal-card)",
                    borderColor: "var(--admin-modal-border)",
                  }}
                >
                  <CardHeader className="gap-0">
                    <CardTitle className="flex items-center gap-2 text-lg" style={{ color: "var(--admin-modal-text)" }}>
                      <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--admin-modal-primaryLight)" }}>
                        <FiStar className="h-5 w-5" style={{ color: "var(--admin-modal-primary)" }} />
                      </div>
                      Features & Services
                    </CardTitle>
                    <CardDescription style={{ color: "var(--admin-modal-textSecondary)" }}>
                      Update your shop's features and services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium" style={{ color: "var(--admin-modal-text)" }}>
                        Available Services
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(shopData.features).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-300 hover:shadow-md"
                            style={{
                              borderColor: "var(--admin-modal-border)",
                              backgroundColor: value ? "var(--admin-modal-featureLight)" : "var(--admin-modal-card)",
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="p-3 rounded-full transition-all duration-300"
                                style={{
                                  backgroundColor: value
                                    ? "var(--admin-modal-primaryLight)"
                                    : "var(--admin-modal-mutedLight)",
                                  color: value ? "var(--admin-modal-primary)" : "var(--admin-modal-textMuted)",
                                }}
                              >
                                {key === "onlineOrdering" && <FiShoppingBag className="h-4 w-4" />}
                                {key === "deliveryService" && <FiTruck className="h-4 w-4" />}
                                {key === "pickupService" && <FiMapPin className="h-4 w-4" />}
                                {key === "returnPolicy" && <FiCheck className="h-4 w-4" />}
                                {key === "customerSupport" && <FiUsers className="h-4 w-4" />}
                                {key === "loyaltyProgram" && <FiStar className="h-4 w-4" />}
                              </div>
                              <div>
                                <p className="font-medium" style={{ color: "var(--admin-modal-text)" }}>
                                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                </p>
                                <p className="text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                                  {key === "onlineOrdering" && "Allow customers to place orders online"}
                                  {key === "deliveryService" && "Offer delivery to customers"}
                                  {key === "pickupService" && "Allow customers to pickup orders"}
                                  {key === "returnPolicy" && "Accept returns and exchanges"}
                                  {key === "customerSupport" && "Provide customer support"}
                                  {key === "loyaltyProgram" && "Reward loyal customers"}
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={value}
                              onCheckedChange={(checked) =>
                                setShopData({
                                  ...shopData,
                                  features: { ...shopData.features, [key]: checked },
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <Card
                  style={{
                    backgroundColor: "var(--admin-modal-card)",
                    borderColor: "var(--admin-modal-border)",
                  }}
                >
                  <CardHeader className="gap-0">
                    <CardTitle className="flex items-center gap-2 text-lg" style={{ color: "var(--admin-modal-text)" }}>
                      <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--admin-modal-primaryLight)" }}>
                        <FiCheck className="h-5 w-5" style={{ color: "var(--admin-modal-primary)" }} />
                      </div>
                      Review & Confirm Changes
                    </CardTitle>
                    <CardDescription style={{ color: "var(--admin-modal-textSecondary)" }}>
                      Review all changes before updating your shop
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Shop Preview */}
                    <div
                      className="p-6 rounded-xl border-2"
                      style={{
                        backgroundColor: "var(--admin-modal-highlight)",
                        borderColor: "var(--admin-modal-borderLight)",
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-16 h-16 rounded-xl overflow-hidden border-2"
                          style={{ borderColor: "var(--admin-modal-border)" }}
                        >
                          {shopIcon ? (
                            <img
                              src={shopIcon || "/placeholder.svg"}
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
                            {shopData.name || "Shop Name"}
                          </h3>
                          <p className="mb-3" style={{ color: "var(--admin-modal-textSecondary)" }}>
                            {shopData.description || "Shop description"}
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
                          <div
                            className="flex items-center gap-4 text-sm"
                            style={{ color: "var(--admin-modal-textMuted)" }}
                          >
                            <div className="flex items-center gap-1">
                              <FiMapPin className="h-4 w-4" />
                              {shopData.city && shopData.state ? `${shopData.city}, ${shopData.state}` : "Location"}
                            </div>
                            <div className="flex items-center gap-1">
                              <FiPhone className="h-4 w-4" />
                              {shopData.phone || "Phone"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className="p-4 rounded-lg border"
                        style={{
                          backgroundColor: "var(--admin-modal-infoLight)",
                          borderColor: "var(--admin-modal-border)",
                        }}
                      >
                        <h4
                          className="font-semibold mb-3 flex items-center gap-2"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          <FiMapPin className="h-4 w-4" />
                          Location Details
                        </h4>
                        <div className="space-y-2 text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                          <p>{shopData.address || "Address not provided"}</p>
                          <p>
                            {shopData.city || "City"}, {shopData.state || "State"} {shopData.zipCode || "ZIP"}
                          </p>
                          <p>{shopData.email || "Email not provided"}</p>
                        </div>
                      </div>

                      <div
                        className="p-4 rounded-lg border"
                        style={{
                          backgroundColor: "var(--admin-modal-successLight)",
                          borderColor: "var(--admin-modal-border)",
                        }}
                      >
                        <h4
                          className="font-semibold mb-3 flex items-center gap-2"
                          style={{ color: "var(--admin-modal-text)" }}
                        >
                          <FiPackage className="h-4 w-4" />
                          Capacity
                        </h4>
                        <div className="space-y-2 text-sm" style={{ color: "var(--admin-modal-textSecondary)" }}>
                          <p>Space: {shopData.spaceCapacity || "0"} sq ft</p>
                          <p>Products: {shopData.productCapacity || "0"} items</p>
                          <p>Subcategories: {shopData.subcategories.length}</p>
                        </div>
                      </div>
                    </div>

                    {/* Enabled Features */}
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: "var(--admin-modal-text)" }}>
                        Enabled Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(shopData.features)
                          .filter(([, enabled]) => enabled)
                          .map(([feature]) => (
                            <Badge
                              key={feature}
                              className="px-3 py-1"
                              style={{
                                backgroundColor: "var(--admin-modal-featureLight)",
                                color: "var(--admin-modal-success)",
                                border: `1px solid var(--admin-modal-borderLight)`,
                              }}
                            >
                              <FiCheckCircle className="h-3 w-3 mr-1" />
                              {feature.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    {/* Subcategories */}
                    {shopData.subcategories.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3" style={{ color: "var(--admin-modal-text)" }}>
                          Subcategories ({shopData.subcategories.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {shopData.subcategories.map((sub, index) => (
                            <Badge
                              key={index}
                              className="px-3 py-1"
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
                  Previous
                </Button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange?.(false)}
                style={{
                  borderColor: "var(--admin-modal-border)",
                  color: "var(--admin-modal-textSecondary)",
                  backgroundColor: "var(--admin-modal-buttonSecondary)",
                }}
              >
                Cancel
              </Button>

              {currentStep < 5 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center gap-2 px-6"
                  style={{
                    background: themeConfig.gradient,
                    color: "white",
                    border: "none",
                  }}
                >
                  Next
                  <FiArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8"
                  style={{
                    background: themeConfig.gradient,
                    color: "white",
                    border: "none",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Updating Shop...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="h-4 w-4" />
                      Update Shop
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}

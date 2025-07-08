"use client"

import type React from "react"

import { useState } from "react"
import { useAdminTheme } from "@/components/theme/AdminsUsersThemeProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// React Icons
import { FiShoppingBag, FiMapPin, FiDollarSign, FiPackage, FiUsers, FiTruck, FiStar, FiCheck } from "react-icons/fi"

interface NewShopModalProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function NewShopModal({ trigger, open, onOpenChange }: NewShopModalProps) {
  const { themeConfig } = useAdminTheme()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [shopData, setShopData] = useState({
    // Basic Info
    name: "",
    description: "",
    category: "",
    subcategory: "",

    // Location & Contact
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",

    // Business Details
    businessLicense: "",
    taxId: "",
    spaceCapacity: "",
    productCapacity: "",

    // Operating Hours
    operatingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "10:00", close: "16:00", closed: true },
    },

    // Features
    features: {
      onlineOrdering: true,
      deliveryService: true,
      pickupService: true,
      returnPolicy: true,
      customerSupport: true,
      loyaltyProgram: false,
    },

    // Policies
    returnPolicy: "",
    shippingPolicy: "",
    privacyPolicy: "",
  })

  const shopCategories = [
    { value: "electronics", label: "📱 Electronics", description: "Phones, computers, gadgets" },
    { value: "fashion", label: "👗 Fashion", description: "Clothing, shoes, accessories" },
    { value: "home", label: "🏠 Home & Garden", description: "Furniture, decor, tools" },
    { value: "health", label: "💊 Health & Beauty", description: "Cosmetics, supplements" },
    { value: "sports", label: "⚽ Sports & Outdoors", description: "Equipment, apparel" },
    { value: "books", label: "📚 Books & Media", description: "Books, movies, music" },
    { value: "toys", label: "🧸 Toys & Games", description: "Kids toys, board games" },
    { value: "automotive", label: "🚗 Automotive", description: "Car parts, accessories" },
    { value: "jewelry", label: "💍 Jewelry", description: "Rings, necklaces, watches" },
    { value: "food", label: "🍕 Food & Beverages", description: "Groceries, snacks, drinks" },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Shop created:", shopData)
    setIsSubmitting(false)
    onOpenChange?.(false)

    // Reset form
    setCurrentStep(1)
    setShopData({
      name: "",
      description: "",
      category: "",
      subcategory: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      businessLicense: "",
      taxId: "",
      spaceCapacity: "",
      productCapacity: "",
      operatingHours: {
        monday: { open: "09:00", close: "18:00", closed: false },
        tuesday: { open: "09:00", close: "18:00", closed: false },
        wednesday: { open: "09:00", close: "18:00", closed: false },
        thursday: { open: "09:00", close: "18:00", closed: false },
        friday: { open: "09:00", close: "18:00", closed: false },
        saturday: { open: "10:00", close: "16:00", closed: false },
        sunday: { open: "10:00", close: "16:00", closed: true },
      },
      features: {
        onlineOrdering: true,
        deliveryService: true,
        pickupService: true,
        returnPolicy: true,
        customerSupport: true,
        loyaltyProgram: false,
      },
      returnPolicy: "",
      shippingPolicy: "",
      privacyPolicy: "",
    })
  }

  const steps = [
    { id: 1, title: "Basic Info", icon: <FiShoppingBag className="h-4 w-4" /> },
    { id: 2, title: "Location", icon: <FiMapPin className="h-4 w-4" /> },
    { id: 3, title: "Business", icon: <FiDollarSign className="h-4 w-4" /> },
    { id: 4, title: "Features", icon: <FiStar className="h-4 w-4" /> },
    { id: 5, title: "Review", icon: <FiCheck className="h-4 w-4" /> },
  ]

  const getStepProgress = () => ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="sm:max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        style={{
          backgroundColor: themeConfig.colors.background,
          borderColor: themeConfig.colors.border,
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <div
              className="p-2 rounded-lg"
              style={{
                background: themeConfig.gradient,
                color: "white",
              }}
            >
              <FiShoppingBag className="h-6 w-6" />
            </div>
            Create New Shop
          </DialogTitle>
          <DialogDescription>Set up your new shop with all the necessary details and configurations</DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                    currentStep >= step.id ? "text-white" : "text-gray-400 bg-gray-100",
                  )}
                  style={{
                    backgroundColor: currentStep >= step.id ? themeConfig.colors.primary : undefined,
                  }}
                >
                  {currentStep > step.id ? <FiCheck className="h-4 w-4" /> : step.icon}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={getStepProgress()} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card
                style={{
                  backgroundColor: themeConfig.colors.card,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FiShoppingBag className="h-5 w-5" />
                    Basic Shop Information
                  </CardTitle>
                  <CardDescription>Start with the basic details about your shop</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shopName">Shop Name *</Label>
                    <Input
                      id="shopName"
                      placeholder="Enter your shop name"
                      value={shopData.name}
                      onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shopDescription">Shop Description *</Label>
                    <Textarea
                      id="shopDescription"
                      placeholder="Describe your shop and what you sell"
                      value={shopData.description}
                      onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={shopData.category}
                        onValueChange={(value) => setShopData({ ...shopData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {shopCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              <div className="flex items-center gap-2">
                                <span>{cat.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subcategory">Subcategory</Label>
                      <Input
                        id="subcategory"
                        placeholder="e.g., Smartphones, Laptops"
                        value={shopData.subcategory}
                        onChange={(e) => setShopData({ ...shopData, subcategory: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Selected Category Preview */}
                  {shopData.category && (
                    <div className="mt-4">
                      <div
                        className="p-4 rounded-lg border"
                        style={{ backgroundColor: `${themeConfig.colors.primary}10` }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {shopCategories.find((c) => c.value === shopData.category)?.label.split(" ")[0]}
                          </span>
                          <div>
                            <p className="font-medium">
                              {shopCategories.find((c) => c.value === shopData.category)?.label.substring(2)}
                            </p>
                            <p className="text-sm opacity-70">
                              {shopCategories.find((c) => c.value === shopData.category)?.description}
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
                  backgroundColor: themeConfig.colors.card,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FiMapPin className="h-5 w-5" />
                    Location & Contact Information
                  </CardTitle>
                  <CardDescription>Provide your shop's location and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      placeholder="Enter your shop address"
                      value={shopData.address}
                      onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={shopData.city}
                        onChange={(e) => setShopData({ ...shopData, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="State"
                        value={shopData.state}
                        onChange={(e) => setShopData({ ...shopData, state: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        placeholder="ZIP Code"
                        value={shopData.zipCode}
                        onChange={(e) => setShopData({ ...shopData, zipCode: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="(555) 123-4567"
                        value={shopData.phone}
                        onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="shop@example.com"
                        value={shopData.email}
                        onChange={(e) => setShopData({ ...shopData, email: e.target.value })}
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
                  backgroundColor: themeConfig.colors.card,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FiDollarSign className="h-5 w-5" />
                    Business Details & Capacity
                  </CardTitle>
                  <CardDescription>Business registration and capacity information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessLicense">Business License *</Label>
                      <Input
                        id="businessLicense"
                        placeholder="Business License Number"
                        value={shopData.businessLicense}
                        onChange={(e) => setShopData({ ...shopData, businessLicense: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID *</Label>
                      <Input
                        id="taxId"
                        placeholder="Tax Identification Number"
                        value={shopData.taxId}
                        onChange={(e) => setShopData({ ...shopData, taxId: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="spaceCapacity">Space Capacity (sq ft) *</Label>
                      <Input
                        id="spaceCapacity"
                        type="number"
                        placeholder="1000"
                        value={shopData.spaceCapacity}
                        onChange={(e) => setShopData({ ...shopData, spaceCapacity: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productCapacity">Product Capacity *</Label>
                      <Input
                        id="productCapacity"
                        type="number"
                        placeholder="500"
                        value={shopData.productCapacity}
                        onChange={(e) => setShopData({ ...shopData, productCapacity: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Capacity Visual */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 rounded-lg border" style={{ backgroundColor: `${themeConfig.colors.info}10` }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.info}20` }}>
                          <FiMapPin className="h-4 w-4" style={{ color: themeConfig.colors.info }} />
                        </div>
                        <div>
                          <p className="font-medium">Space Capacity</p>
                          <p className="text-sm opacity-70">{shopData.spaceCapacity || "0"} sq ft</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="p-4 rounded-lg border"
                      style={{ backgroundColor: `${themeConfig.colors.success}10` }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeConfig.colors.success}20` }}>
                          <FiPackage className="h-4 w-4" style={{ color: themeConfig.colors.success }} />
                        </div>
                        <div>
                          <p className="font-medium">Product Capacity</p>
                          <p className="text-sm opacity-70">{shopData.productCapacity || "0"} products</p>
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
                  backgroundColor: themeConfig.colors.card,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FiStar className="h-5 w-5" />
                    Features & Services
                  </CardTitle>
                  <CardDescription>Configure your shop's features and services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Available Services</h4>
                    {Object.entries(shopData.features).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${themeConfig.colors.primary}20` }}
                          >
                            {key === "onlineOrdering" && <FiShoppingBag className="h-4 w-4" />}
                            {key === "deliveryService" && <FiTruck className="h-4 w-4" />}
                            {key === "pickupService" && <FiMapPin className="h-4 w-4" />}
                            {key === "returnPolicy" && <FiCheck className="h-4 w-4" />}
                            {key === "customerSupport" && <FiUsers className="h-4 w-4" />}
                            {key === "loyaltyProgram" && <FiStar className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium">
                              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            </p>
                            <p className="text-sm opacity-70">
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
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <Card
                style={{
                  backgroundColor: themeConfig.colors.card,
                  borderColor: themeConfig.colors.border,
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FiCheck className="h-5 w-5" />
                    Review Shop Details
                  </CardTitle>
                  <CardDescription>Review all information before creating your shop</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-2">BASIC INFORMATION</h4>
                        <div className="space-y-2">
                          <p>
                            <strong>Shop Name:</strong> {shopData.name}
                          </p>
                          <p>
                            <strong>Category:</strong>{" "}
                            {shopCategories.find((c) => c.value === shopData.category)?.label}
                          </p>
                          <p>
                            <strong>Description:</strong> {shopData.description}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-2">LOCATION</h4>
                        <div className="space-y-2">
                          <p>
                            <strong>Address:</strong> {shopData.address}
                          </p>
                          <p>
                            <strong>City:</strong> {shopData.city}, {shopData.state} {shopData.zipCode}
                          </p>
                          <p>
                            <strong>Phone:</strong> {shopData.phone}
                          </p>
                          <p>
                            <strong>Email:</strong> {shopData.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-2">BUSINESS DETAILS</h4>
                        <div className="space-y-2">
                          <p>
                            <strong>Business License:</strong> {shopData.businessLicense}
                          </p>
                          <p>
                            <strong>Tax ID:</strong> {shopData.taxId}
                          </p>
                          <p>
                            <strong>Space Capacity:</strong> {shopData.spaceCapacity} sq ft
                          </p>
                          <p>
                            <strong>Product Capacity:</strong> {shopData.productCapacity} products
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-2">ENABLED FEATURES</h4>
                        <div className="space-y-2">
                          {Object.entries(shopData.features)
                            .filter(([_, value]) => value)
                            .map(([key, _]) => (
                              <Badge key={key} variant="secondary">
                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {currentStep < 5 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && (!shopData.name || !shopData.category)) ||
                  (currentStep === 2 && (!shopData.address || !shopData.city || !shopData.state)) ||
                  (currentStep === 3 && (!shopData.businessLicense || !shopData.taxId))
                }
                style={{ background: themeConfig.gradient, color: "white" }}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{ background: themeConfig.gradient, color: "white" }}
              >
                {isSubmitting ? "Creating Shop..." : "Create Shop"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

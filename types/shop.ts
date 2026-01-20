// Plain TypeScript interfaces for frontend use
export interface CreateShopData {
    name: string;
    description?: string;
    category?: string;
    subcategories?: string[];
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phone?: string;
    email?: string;
    businessLicense?: string;
    taxId?: string;
    spaceCapacity?: string;
    productCapacity?: string;
    //   features?: {
    //     onlineOrdering?: boolean;
    //     deliveryService?: boolean;
    //     pickupService?: boolean;
    //     returnPolicy?: boolean;
    //     customerSupport?: boolean;
    //     loyaltyProgram?: boolean;
    //   };
    features?: string; // JSON string
    returnPolicy?: string;
    shippingPolicy?: string;
    privacyPolicy?: string;
    progress?: number;
}

export interface UpdateShopData {
    name?: string;
    description?: string;
    category?: string;
    subcategories?: string[];
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phone?: string;
    email?: string;
    businessLicense?: string;
    taxId?: string;
    spaceCapacity?: string;
    productCapacity?: string;
    features?: string;
    returnPolicy?: string;
    shippingPolicy?: string;
    privacyPolicy?: string;
    progress?: number;
}
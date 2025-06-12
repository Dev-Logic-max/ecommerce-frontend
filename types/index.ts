export interface CreateWarehouseDto {
    name: string;
    location?: string;
    description?: string;
    warehouseIcon?: string;
    capacity?: number;
}

export interface CreateShopProductDto {
    name: string;
    description?: string;
    price: number;
    stock: number;
    shopId: number;
    warehouseId?: number;
}

export interface UpdateShopProductDto {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
}

export interface CreateWarehouseProductDto {
    name: string;
    description?: string;
    price: number;
    stock: number;
}

export interface UpdateWarehouseProductDto {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
}

export interface CreateOrderDto {
    productId: number;
    quantity: number;
}
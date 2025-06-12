import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

// Base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Keeping your original withCredentials
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for authenticated requests
api.interceptors.request.use(
  (config) => {
    const publicEndpoints = ['/auth/signup', '/auth/login'];
    if (publicEndpoints.some((endpoint) => config.url?.includes(endpoint))) {
      return config;
    }
    const token = Cookies.get('token') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error('Request failed!');
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 409) {
      return Promise.reject(error); // Let frontend handle it
    }
    toast.error(error.response?.data?.message || 'Something went wrong!');
    return Promise.reject(error);
  }
);

// Export APi methods
export const authApi = {
  // 🔒 Authentication Endpoints
  signup: (data: { username: string; email?: string; phone?: string; password: string }) =>
    api.post('/auth/signup', data),
  login: (data: { username?: string; email?: string; password: string }) =>
    api.post('/auth/login', data),
  verify: () => api.get('/auth/verify'),

  // 👤 User Management
  createUser: (data: { username: string; password: string; roleId: number; email?: string; phone?: string }) =>
    api.post('/auth/create-user', data),
  updateUser: (data: { username?: string; email?: string; phone?: string; password?: string; profilePicture?: string }) =>
    api.patch('/auth/update', data),
  getUsers: () => api.get('/auth/users'),
  getUser: (id: number) => api.get(`/auth/user/${id}`),

  // 🛠️ Role Management
  createRole: (data: { name: string }) => api.post('/auth/create-role', data),
  requestRole: (data: { requestedRole: string }) => api.post('/auth/role-request', data),
  getRoleRequests: () => api.get('/auth/role-requests'),
  getUserRoleRequests: () => api.get('/auth/role-requests/user'),
  approveRole: (id: number) => api.post(`/auth/role/approve/${id}`),
  rejectRole: (id: number) => api.post(`/auth/role/reject/${id}`),

  // 🏪 Shop Management
  createShop: (data: { name: string; description?: string }) => api.post('/auth/create-shop', data),
  updateShop: (id: number, data: { name?: string; description?: string }) =>
    api.patch(`/auth/update-shop/${id}`, data),
  deleteShop: (id: number) => api.delete(`/auth/delete-shop/${id}`),
  getUserShops: () => api.get('/auth/shops'),
  getPendingShops: () => api.get('/auth/shops/pending'),
  approveShop: (id: number) => api.put(`/auth/shops/${id}/approve`),
  rejectShop: (id: number) => api.put(`/auth/shops/${id}/reject`),

  // 📦 Product Management
  createProduct: (data: { name: string; description?: string; price: number; stock: number; shopId: number }) =>
    api.post('/auth/shop-products', data),
  updateProduct: (id: number, data: { name?: string; description?: string; price?: number; stock?: number }) =>
    api.put(`/auth/shop-products/${id}`, data),
  deleteProduct: (id: number) => api.delete(`/auth/shop-products/${id}`),
  getShopProducts: (shopId: number) => api.get(`/auth/shops/${shopId}/products`),
  getAllProducts: () => api.get('/auth/products'),
  getLowStockProducts: () => api.get('/auth/products/low-stock'),
  searchProducts: (query: string) => api.get('/auth/search-products', { params: { q: query } }),

  // 📜 Order Management
  createOrder: (data: { productId: number; quantity: number }) => api.post('/auth/orders', data),
  getUserOrders: () => api.get('/auth/orders'),
  getAllOrders: () => api.get('/auth/orders/all'),
  updateOrderStatus: (id: number, status: string) => api.put(`/auth/orders/${id}/status`, { status }),
  requestWarehouseOrder: (data: { productId: number; quantity: number; shopId?: number }) => api.post('/auth/request-warehouse-order', data),
  createWarehouseOrder: (data: { productId: number; quantity: number; shopId?: number }) => api.post('/auth/warehouse-orders', data),

  // 🔔 Notification Management
  getUserNotifications: () => api.get('/auth/notifications'),

  // 🗂️ Category Management
  getCategories: () => api.get('/auth/categories'),
  createCategory: (data: { name: string }) => api.post('/auth/categories', data),
  deleteCategory: (id: number) => api.delete(`/auth/categories/${id}`),

  // 🛒 Cart Management
  getCart: () => api.get('/auth/cart'),
  addToCart: (productId: number, data: { quantity?: number }) => api.post(`/auth/cart/${productId}`, data),
  updateCart: (productId: number, data: { quantity: number }) => api.put(`/auth/cart/${productId}`, data),
  removeFromCart: (productId: number) => api.delete(`/auth/cart/${productId}`),
  checkout: (data: { items: any[] }) => api.post('/auth/checkout', data),

  // ❤️ Wishlist Management
  getWishlist: () => api.get('/auth/wishlist'),
  addToWishlist: (productId: number) => api.post(`/auth/wishlist/${productId}`),
  removeFromWishlist: (productId: number) => api.delete(`/auth/wishlist/${productId}`),

  // 🏬 Warehouse Management
  createWarehouse: (data: { name: string; location?: string; description?: string; warehouseIcon?: string; capacity?: number }) => api.post('/auth/warehouse', data),
  updateWarehouse: (data: { name?: string; location?: string }) => api.put('/auth/warehouse', data),
  deleteWarehouse: () => api.delete('/auth/warehouse'),
  getWarehouse: () => api.get('/auth/warehouse'),
  getWarehouseProducts: () => api.get('/auth/warehouse-products'),
  createWarehouseProduct: (data: { name: string; description?: string; price: number; stock: number; warehouseId: number }) => api.post('/auth/warehouse-products', data),
  updateWarehouseProduct: (id: number, data: { name?: string; description?: string; price?: number; stock?: number }) => api.put(`/auth/warehouse-products/${id}`, data),
  deleteWarehouseProduct: (id: number) => api.delete(`/auth/warehouse-products/${id}`),
  searchWarehouseProducts: (query: string) => api.get('/auth/search-warehouse-products', { params: { q: query } }),

  // 🚚 Courier Management
  getAssignedOrders: () => api.get('/auth/orders/assigned'),
};

export default authApi;
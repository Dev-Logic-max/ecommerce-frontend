'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../lib/api/auth';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CustomerDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [productId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);

  useEffect(() => {
    if (!loading && user?.role === 8) {
      fetchProducts();
      fetchOrders();
    }
  }, [loading, user]);

  const fetchProducts = async () => {
    try {
      const response = await authApi.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products!');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await authApi.getUserOrders();
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders!');
    }
  };

  const handlePlaceOrder = async () => {
    if (!productId || quantity <= 0) {
      toast.error('Please select a valid product and quantity!');
      return;
    }
    try {
      await authApi.createOrder({ productId, quantity });
      toast.success('Order placed successfully!');
      setOpenOrderDialog(false);
      setProductId(0);
      setQuantity(1);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to place order!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 8) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Customer Dashboard</h1>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
        <p className="text-lg text-gray-600 mb-8">Welcome, {user.username}! Browse products and manage orders.</p>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Available Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="p-4 border rounded-md">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800">${product.price}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <Dialog open={openOrderDialog} onOpenChange={setOpenOrderDialog}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setProductId(product.id);
                        setOpenOrderDialog(true);
                      }}
                    >
                      Place Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Place Order</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Product</Label>
                        <Input value={product.name} disabled />
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          min="1"
                          max={product.stock}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenOrderDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handlePlaceOrder}>Confirm Order</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 border rounded-md">
                <p>Order ID: {order.id}</p>
                <p>Product: {order.product.name}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Total: ${order.total}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function OperationsAdminDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState('PROCESSING');

  useEffect(() => {
    if (!loading && user?.role === 3) {
      fetchOrders();
      fetchInventory();
    }
  }, [loading, user]);

  const fetchOrders = async () => {
    try {
      const response = await authApi.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders!');
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await authApi.getLowStockProducts();
      setInventory(response.data);
    } catch (error) {
      toast.error('Failed to fetch inventory!');
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrderId) return;
    try {
      await authApi.updateOrderStatus(selectedOrderId, newStatus);
      toast.success('Order status updated successfully!');
      setSelectedOrderId(null);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 3) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Operations Admin Dashboard</h1>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
        <p className="text-lg text-gray-600 mb-8">Welcome, {user.username}! Manage orders and inventory.</p>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 border rounded-md">
                <div>
                  <Label>Order ID</Label>
                  <Input value={order.id ?? ''} disabled />
                </div>
                <p>Product: {order.product.name}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Total: ${order.total}</p>
                <p>Status: {order.status}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      Update Status
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Order Status</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Order ID</Label>
                        <Input value={order.id ?? ''} disabled />
                      </div>
                      <div>
                        <Label>New Status</Label>
                        <Select value={newStatus} onValueChange={setNewStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PROCESSING">Processing</SelectItem>
                            <SelectItem value="SHIPPED">Shipped</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSelectedOrderId(null)}>
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateStatus}>Update</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Low Stock Inventory</h2>
          <div className="space-y-4">
            {inventory.map((product) => (
              <div key={product.id} className="p-4 border rounded-md">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800">${product.price}</p>
                <p className="text-red-600">Stock: {product.stock}</p>
                <p>Shop: {product.shop.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

export default function CourierDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && user?.role === 7) { // Assuming 7 is Courier role
      fetchOrders();
    }
  }, [loading, user]);

  const fetchOrders = async () => {
    try {
      const response = await authApi.getAssignedOrders(); // Use getAssignedrders from authApi
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders!');
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      await authApi.updateOrderStatus(orderId, status);
      fetchOrders();
      toast.success('Order status updated!');
    } catch (error) {
      toast.error('Failed to update status!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 7) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Courier Dashboard</h1>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded-md">
              <p>Order ID: {order.id}</p>
              <p>Product: {order.product.name}</p>
              <p>Status: {order.status}</p>
              <div className="mt-2 space-x-2">
                <Button
                  onClick={() => updateOrderStatus(order.id, 'SHIPPED')}
                  disabled={order.status !== 'PROCESSING'}
                >
                  Mark Shipped
                </Button>
                <Button
                  onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                  disabled={order.status !== 'SHIPPED'}
                >
                  Mark Delivered
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
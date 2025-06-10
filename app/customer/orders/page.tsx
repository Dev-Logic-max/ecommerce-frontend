'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export default function CustomerOrders() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [productId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!loading && user?.role === 8) {
      fetchOrders();
    }
  }, [loading, user]);

  const fetchOrders = async () => {
    try {
      const response = await authApi.getUserOrders();
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders!');
    }
  };

  const handleCreateOrder = async () => {
    try {
      await authApi.createOrder({ productId, quantity });
      toast.success('Order placed!');
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
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Place New Order</h2>
          <div className="space-y-4">
            <input
              type="number"
              value={productId}
              onChange={(e) => setProductId(parseInt(e.target.value))}
              placeholder="Product ID"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              placeholder="Quantity"
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleCreateOrder}
              className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition duration-200"
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{order.product.name}</h3>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-gray-800">Total: ${order.total}</p>
              <p className="text-gray-800">Status: {order.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
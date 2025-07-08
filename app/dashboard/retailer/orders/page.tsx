'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../../lib/api/auth';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function RetailerOrders() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [shopId, setShopId] = useState<number | null>(null);
  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && user?.role === 4) {
      fetchShops();
    }
  }, [loading, user]);

  useEffect(() => {
    fetchOrders();
  }, [shops, shopId]);

  const fetchShops = async () => {
    try {
      const response = await authApi.getUserShops();
      setShops(response.data);
    } catch (error) {
      toast.error('Failed to fetch shops!');
    }
  };

  const fetchOrders = async () => {
    try {
      const responseUserOrders = await authApi.getUserOrders();
      console.log("Orders against unique used Id", responseUserOrders)
      const response = await authApi.getAdminOrders(); // Fetch all orders to filter client-side
      console.log("All Orders against unique used Id of retailer", response)
      const retailerShopIds = shops.map((shop) => shop.id);
      //   let filteredOrders = response.data.filter((order: any) => 
      //     order.shopId && retailerShopIds.includes(order.shopId)
      //   );
      let filteredOrders = response.data;
      if (shopId) {
        filteredOrders = filteredOrders.filter((order: any) => order.shopId === shopId);
      }
      setOrders(filteredOrders);
      console.log("Filtered Orders:", filteredOrders); // Debug log
    } catch (error) {
      toast.error('Failed to fetch orders!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 4) {
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
          <h2 className="text-xl font-semibold mb-4">Select Shop to View Orders</h2>
          <select
            value={shopId || ''}
            onChange={(e) => setShopId(parseInt(e.target.value) || null)}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option value="">All Shops</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </select>
          <p className="mb-4">Total Orders: {orders.length}</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.product?.name || 'N/A'}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.user?.username || 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No orders found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
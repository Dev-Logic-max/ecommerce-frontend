'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../../lib/api/auth';
// import { useAuth } from '../../../../hooks/useAuth';
import { useAuth } from '@/app/hooks/useAuth';
import { toast } from 'react-toastify';

export default function RetailerShops() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [shops, setShops] = useState<any[]>([]);
  const [shopId, setShopId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!loading && user?.role === 4) {
      fetchShops();
    }
  }, [loading, user]);

  const fetchShops = async () => {
    try {
      const response = await authApi.getUserShops();
      setShops(response.data);
    } catch (error) {
      toast.error('Failed to fetch shops!');
    }
  };

  const handleUpdate = async () => {
    try {
      await authApi.updateShop(parseInt(shopId), { name, description });
      toast.success('Shop updated!');
      fetchShops();
    } catch (error) {
      toast.error('Failed to update shop!');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await authApi.deleteShop(id);
      toast.success('Shop deleted!');
      fetchShops();
    } catch (error) {
      toast.error('Failed to delete shop!');
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
          <h1 className="text-3xl font-bold text-gray-800">My Shops</h1>
          <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {shops.map(shop => (
            <div key={shop.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{shop.name}</h3>
              <p className="text-gray-600">{shop.description}</p>
              <div className="mt-2 space-x-2">
                <input
                  value={shopId === shop.id.toString() ? name : ''}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="New Name"
                  className="p-2 border rounded-md"
                />
                <input
                  value={shopId === shop.id.toString() ? description : ''}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="New Description"
                  className="p-2 border rounded-md"
                />
                <button
                  onClick={() => { setShopId(shop.id.toString()); handleUpdate(); }}
                  className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(shop.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
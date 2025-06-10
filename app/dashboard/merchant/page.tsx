'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

export default function MerchantDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && user?.role === 5) { // Assuming 5 is Merchant role
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

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 5) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Merchant Dashboard</h1>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
        <div className="space-y-4">
          {shops.map((shop) => (
            <div key={shop.id} className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold">{shop.name}</h3>
              <p>{shop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ShopsMarketplace() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [shops, setShops] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading) fetchShops();
  }, [loading]);

  const fetchShops = async () => {
    try {
      const response = await authApi.getUserShops(); // Adjust to get all shops if needed
      setShops(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch shops!');
    }
  };

  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shops Marketplace</h1>
        <Input
          placeholder="Search shops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredShops.map((shop) => (
            <div key={shop.id} className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold">{shop.name}</h3>
              <p>{shop.description || 'No description'}</p>
              <Link href={`/marketplace/shops/${shop.id}`}>
                <Button className="mt-2">View Products</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
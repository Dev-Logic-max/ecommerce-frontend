'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && user?.role === 8) {
      fetchWishlist();
    }
  }, [loading, user]);

  const fetchWishlist = async () => {
    try {
      // Assuming a wishlist endpoint (to be added in backend)
      const response = await authApi.getWishlist(); // Use getWishlist from authApi
      setWishlist(response.data);
    } catch (error) {
      toast.error('Failed to fetch wishlist!');
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      await authApi.removeFromWishlist(productId); // Use removeFromWishlist from authApi
      setWishlist(wishlist.filter((item) => item.id !== productId));
      toast.success('Item removed from wishlist!');
    } catch (error) {
      toast.error('Failed to remove item!');
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
              <Button
                variant="destructive"
                onClick={() => removeFromWishlist(item.id)}
                className="mt-2"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
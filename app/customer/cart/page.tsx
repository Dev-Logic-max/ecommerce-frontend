'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!loading && user?.role === 8) {
      fetchCart();
    }
  }, [loading, user]);

  const fetchCart = async () => {
    try {
      const response = await authApi.getCart(); // Use getCart from authApi
      setCart(response.data);
      setTotal(response.data.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0));
    } catch (error) {
      toast.error('Failed to fetch cart!');
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      await authApi.updateCart(productId, { quantity }); // Use updateCart from authApi
      fetchCart();
    } catch (error) {
      toast.error('Failed to update quantity!');
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await authApi.removeFromCart(productId);
      fetchCart();
      toast.success('Item removed from cart!');
    } catch (error) {
      toast.error('Failed to remove item!');
    }
  };

  const checkout = async () => {
    try {
      await authApi.checkout({ items: cart });
      setCart([]);
      setTotal(0);
      toast.success('Checkout successful!');
    } catch (error) {
      toast.error('Checkout failed!');
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cart</h1>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price} x</p>
              </div>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  min="1"
                  className="w-16"
                />
                <Button
                  variant="destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-xl font-semibold">Total: ${total}</p>
            <Button onClick={checkout} className="mt-2">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
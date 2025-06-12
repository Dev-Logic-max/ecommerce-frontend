'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { authApi } from '../../../../lib/api/auth';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

export default function ShopProducts() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!loading) fetchProducts();
  }, [loading, id]);

  const fetchProducts = async () => {
    try {
      const response = await authApi.getShopProducts(parseInt(id as string));
      setProducts(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch products!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shop Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
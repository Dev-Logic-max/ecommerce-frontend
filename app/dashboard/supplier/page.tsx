'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SupplierDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [warehouse, setWarehouse] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [productName, setProductName] = useState('');
  const [productStock, setProductStock] = useState(0);
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    if (!loading && user?.role === 6) { // Assuming 6 is Supplier role
      fetchWarehouse();
      fetchProducts();
    }
  }, [loading, user]);

  const fetchWarehouse = async () => {
    try {
      const response = await authApi.getUserShops();
      setWarehouse(response.data);
    } catch (error) {
      toast.error('Failed to fetch warehouse!');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await authApi.getShopProducts(warehouse?.id || 0); // Adjust based on shopId or warehouseId
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products!');
    }
  };

  const addProduct = async () => {
    try {
      await authApi.createProduct({
        name: productName,
        description: '', // Optional, can be enhanced
        price: productPrice,
        stock: productStock,
        shopId: warehouse?.id || 0,
      });
      setProductName('');
      setProductStock(0);
      setProductPrice(0);
      fetchProducts();
      toast.success('Product added!');
    } catch (error) {
      toast.error('Failed to add product!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 6) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Supplier Dashboard</h1>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Warehouse</h2>
          {warehouse && (
            <div>
              <p>Name: {warehouse.name}</p>
              <p>Location: {warehouse.location}</p>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
          <div className="mb-4 space-x-2">
            <Input
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mr-2"
            />
            <Input
              type="number"
              placeholder="Price"
              value={productPrice}
              onChange={(e) => setProductPrice(parseInt(e.target.value) || 0)}
              className="mr-2"
            />
            <Input
              type="number"
              placeholder="Stock"
              value={productStock}
              onChange={(e) => setProductStock(parseInt(e.target.value) || 0)}
              className="mr-2"
            />
            <Button onClick={addProduct}>Add Product</Button>
          </div>
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
    </div>
  );
}
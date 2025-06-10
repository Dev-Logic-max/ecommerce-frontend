'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../../lib/api/auth';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

export default function RetailerProducts() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [shopId, setShopId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [editProductId, setEditProductId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && user?.role === 4) {
      fetchProducts();
    }
  }, [loading, user, shopId]);

  const fetchProducts = async () => {
    try {
      const response = await authApi.getShopProducts(shopId);
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products!');
    }
  };

  const handleCreateProduct = async () => {
    try {
      await authApi.createProduct({ shopId, name, description, price, stock });
      toast.success('Product created!');
      setName('');
      setDescription('');
      setPrice(0);
      setStock(0);
      fetchProducts();
    } catch (error) {
      toast.error('Failed to create product!');
    }
  };

  const handleUpdateProduct = async (id: number) => {
    try {
      await authApi.updateProduct(id, { name, description, price, stock });
      toast.success('Product updated!');
      setEditProductId(null);
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product!');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await authApi.deleteProduct(id);
      toast.success('Product deleted!');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product!');
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
          <h1 className="text-3xl font-bold text-gray-800">My Products</h1>
          <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{editProductId ? 'Update Product' : 'Create Product'}</h2>
          <div className="space-y-4">
            <input
              type="number"
              value={shopId}
              onChange={(e) => setShopId(parseInt(e.target.value))}
              placeholder="Shop ID"
              className="w-full p-2 border rounded-md"
            />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border rounded-md"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              placeholder="Price"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
              placeholder="Stock"
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={editProductId ? () => handleUpdateProduct(editProductId) : handleCreateProduct}
              className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition duration-200"
            >
              {editProductId ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800">${product.price}</p>
              <p className="text-gray-600">Stock: {product.stock}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => {
                    setEditProductId(product.id);
                    setName(product.name);
                    setDescription(product.description || '');
                    setPrice(product.price);
                    setStock(product.stock);
                  }}
                  className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
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
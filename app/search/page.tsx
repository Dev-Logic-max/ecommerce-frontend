'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../lib/api/auth';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export default function SearchPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        if (query.length > 2) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [query]);

    const fetchProducts = async () => {
        try {
            const response = await authApi.searchProducts(query);
            setProducts(response.data);
        } catch (error) {
            toast.error('Failed to search products!');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Search Products</h1>
                    <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Logout
                    </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or category..."
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="p-4 border rounded-md">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-gray-800">${product.price}</p>
                                <p className="text-gray-600">Stock: {product.stock}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PlatformAdminDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [pendingShops, setPendingShops] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && user?.role === 2) {
      fetchPendingShops();
      fetchCategories();
    }
  }, [loading, user]);

  const fetchPendingShops = async () => {
    try {
      const response = await authApi.getPendingShops();
      setPendingShops(response.data);
    } catch (error) {
      toast.error('Failed to fetch pending shops!');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await authApi.getCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories!');
    }
  };

  const handleApproveShop = async () => {
    if (!selectedShopId) return;
    try {
      await authApi.approveShop(selectedShopId);
      toast.success('Shop approved successfully!');
      setSelectedShopId(null);
      fetchPendingShops();
    } catch (error) {
      toast.error('Failed to approve shop!');
    }
  };

  const handleRejectShop = async () => {
    if (!selectedShopId) return;
    try {
      await authApi.rejectShop(selectedShopId);
      toast.success('Shop rejected successfully!');
      setSelectedShopId(null);
      fetchPendingShops();
    } catch (error) {
      toast.error('Failed to reject shop!');
    }
  };

  const handleCreateCategory = async () => {
    try {
      await authApi.createCategory({ name: newCategory });
      toast.success('Category created successfully!');
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to create category!');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await authApi.deleteCategory(id);
      toast.success('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 2) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Platform Admin Dashboard</h1>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
        <p className="text-lg text-gray-600 mb-8">Welcome, {user.username}! Manage shops and categories.</p>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Pending Shops</h2>
          <div className="space-y-4">
            {pendingShops.map((shop) => (
              <div key={shop.id} className="p-4 border rounded-md">
                <p>Shop: {shop.name}</p>
                <p>Owner: {shop.owner.username}</p>
                <div className="mt-2 space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        onClick={() => setSelectedShopId(shop.id)}
                      >
                        Approve
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Approval</DialogTitle>
                      </DialogHeader>
                      <p>Are you sure you want to approve this shop?</p>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedShopId(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleApproveShop}>Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={() => setSelectedShopId(shop.id)}
                      >
                        Reject
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Rejection</DialogTitle>
                      </DialogHeader>
                      <p>Are you sure you want to reject this shop?</p>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedShopId(null)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleRejectShop}>
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
          <div className="mb-4">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category Name"
              className="w-full mb-2"
            />
            <Button onClick={handleCreateCategory}>Create Category</Button>
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-2 border rounded-md">
                <span>{category.name}</span>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
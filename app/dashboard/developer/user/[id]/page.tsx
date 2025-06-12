'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { authApi } from '../../../../../lib/api/auth';
import { useAuth } from '../../../../../app/hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

export default function UserDetails() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    if (!loading && user?.role === 1) {
      fetchUserDetails();
    }
  }, [loading, user, id]);

  const fetchUserDetails = async () => {
    try {
      const response = await authApi.getUser(parseInt(id as string)); // Converting string to number
      setUserDetails(response.data);
    } catch (error) {
      toast.error('Failed to fetch user details!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 1) {
    router.push('/login');
    return null;
  }

  if (!userDetails) return <div>No details available</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Details</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p><strong>ID:</strong> {userDetails.id}</p>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {userDetails.phone || 'N/A'}</p>
          <p><strong>Role:</strong> {userDetails.role.name}</p>
          <p><strong>Profile:</strong> {userDetails.profile?.name || 'N/A'}</p>
          <p><strong>Shops:</strong> {userDetails.shops?.length || 0}</p>
          <p><strong>Warehouse:</strong> {userDetails.warehouse?.name || 'N/A'}</p>
          <p><strong>Orders:</strong> {userDetails.orders?.length || 0}</p>
          <p><strong>Notifications:</strong> {userDetails.notifications?.length || 0}</p>
          <p><strong>Connections:</strong> {[...(userDetails.retailerConnections || []), ...(userDetails.supplierConnections || []), ...(userDetails.courierConnections || [])].length || 0}</p>
          <p><strong>Sold Shops:</strong> {userDetails.soldShops?.length || 0}</p>
          <p><strong>Bought Shops:</strong> {userDetails.boughtShops?.length || 0}</p>
          <p><strong>Role Requests:</strong> {userDetails.roleRequest?.length || 0}</p>
          <p><strong>Carts:</strong> {userDetails.carts?.length || 0}</p>
          <p><strong>Wishlists:</strong> {userDetails.wishlists?.length || 0}</p>
          <p><strong>Created At:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
          <p><strong>Updated At:</strong> {new Date(userDetails.updatedAt).toLocaleDateString()}</p>
          <Button onClick={() => router.back()} className="mt-4">Back</Button>
        </div>
      </div>
    </div>
  );
}
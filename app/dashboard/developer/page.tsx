'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { useTheme } from '@/components/theme/AdminsThemeProvider';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { approveRole, approveShop, approveWarehouse, createRole, createUser, fetchRoleRequests, fetchUsers, fetchWarehouses, rejectRole, rejectShop, rejectWarehouse } from '@/lib/store/slices/developerSlice';
import { fetchShops } from '@/lib/store/slices/developerSlice';
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

interface Category {
  id: number;
  name: string;
  createdBy: { id: number; username: string; role: { name: string }; profilePicture: string } | null;
  updatedBy?: { id: number; username: string; role: { name: string }; profilePicture: string } | null;
  createdById: number;
  updatedById?: number | null;
  createdAt: string;
  updatedAt?: string;
}

export default function DeveloperDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  // Redux developer Slice functionality
  const dispatch = useAppDispatch();
  const { roleRequest: { roleRequests, loading: roleRequestLoading } } = useAppSelector((state: RootState) => state.developer);
  const { allUsers: { users, loading: userLoading } } = useAppSelector((state: RootState) => state.developer);
  const { shop: { shops, loading: shopLoading } } = useAppSelector((state: RootState) => state.developer);
  const { warehouse: { warehouses, loading: warehouseLoading } } = useAppSelector((state: RootState) => state.developer);
  // const { pagination: { currentPage, itemsPerPage, selectedRole } } = useAppSelector((state: RootState) => state.developer);

  // States for developer dashboard
  const [roleName, setRoleName] = useState('');
  const [newUser, setNewUser] = useState({ username: '', password: '', roleId: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryId, setNewCategoryId] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState<{ id: number | null, name: string }>({ id: null, name: '' })
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  // Add state to track original category ID before edit
  // const [categoryIdBeforeEdit, setCategoryIdBeforeEdit] = useState<number | null>(null);

  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Dialogs States
  const [openRoleApproveDialog, setOpenRoleApproveDialog] = useState(false);
  const [openShopApproveDialog, setOpenShopApproveDialog] = useState(false);
  const [openRoleRejectDialog, setOpenRoleRejectDialog] = useState(false);
  const [openShopRejectDialog, setOpenShopRejectDialog] = useState(false);
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);
  const [openWarehouseApproveDialog, setOpenWarehouseApproveDialog] = useState(false);
  const [openWarehouseRejectDialog, setOpenWarehouseRejectDialog] = useState(false);
  const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(false);
  const [openViewCategoryDialog, setOpenViewCategoryDialog] = useState(false);
  const [openEditCategoryDialog, setOpenEditCategoryDialog] = useState(false);
  const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] = useState(false);

  // Pagenation States
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [userItemsPerPage] = useState(10); // Adjust items per page as needed
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Theme of developer Dashboard
  const { theme } = useTheme()

  useEffect(() => {
    if (!authLoading && user?.role === 1) {
      dispatch(fetchRoleRequests());
      dispatch(fetchUsers());
      dispatch(fetchShops());
      dispatch(fetchWarehouses());
      fetchCategories();
    }
  }, [authLoading, user, dispatch]);

  const fetchCategories = async () => {
    try {
      const id = user?.id;
      if (!id) throw new Error('User ID is undefined');
      const response = await authApi.getCategories();
      setCategories(response.data || [])
    } catch (error) {
      toast.error('Failed to fetch Categories!')
      setCategories([])
    }
  }

  const createCategory = async () => {
    if (!newCategoryId || newCategoryId > 9999 || newCategoryId < 1) {
      toast.error('Category ID must be a 4-digit number (1-9999)');
      return;
    }
    try {
      const response = await authApi.createCategory({ id: newCategoryId, name: newCategoryName });
      if (response.status === 201) {
        toast.success(`Category "${response.data.name}" created!`);
      }
      setNewCategoryId(null);
      setNewCategoryName('');
      setOpenCreateCategoryDialog(false);
      fetchCategories();
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error && (error as any).response?.data?.message) {
        toast.error((error as any).response.data.message);
      } else {
        toast.error('Failed to create category!');
      }
    }
  };

  const updateCategory = async () => {
    if (!editCategory.id || typeof editCategory.id !== 'number') {
      toast.error('Invalid category ID!');
      return;
    }
    if (editCategory.id > 9999 || editCategory.id < 1) {
      toast.error('Category ID must be a 4-digit number (1-9999)');
      return;
    }
    try {
      // if (editCategory.name) ({ id: editCategory.id, name: editCategory.name }).name = editCategory.name; // Only send name if changed
      // if (editCategory.id !== categoryIdBeforeEdit) ({ id: editCategory.id, name: editCategory.name }).id = editCategory.id; // Only send new ID if changed
      const response = await authApi.updateCategory(editCategory.id, { id: editCategory.id, name: editCategory.name });
      if (response.status === 200) {
        toast.success(`Category "${response.data.name}" updated!`);
      }
      setEditCategory({ id: null, name: '' });
      setOpenEditCategoryDialog(false);
      fetchCategories();
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error && (error as any).response?.data?.message) {
        toast.error((error as any).response.data.message);
      } else {
        toast.error('Failed to update category!');
      }
    }
  };

  const handleViewCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenViewCategoryDialog(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenDeleteCategoryDialog(true);
  };

  const deleteCategory = async () => {
    if (!selectedCategoryId || typeof selectedCategoryId !== 'number') {
      toast.error('Invalid category ID!');
      return;
    }
    try {
      const response = await authApi.deleteCategory(selectedCategoryId);
      if (response.status === 200) {
        toast.success(`Category "${response.data.name}" deleted!`);
      }
      setOpenDeleteCategoryDialog(false);
      setSelectedCategoryId(null);
      setSelectedCategory(null); // Clear selected category
      fetchCategories();
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error && (error as any).response?.data?.message) {
        toast.error((error as any).response.data.message);
      } else {
        toast.error('Failed to delete category!');
      }
    }
  };

  const handleApproveRole = async () => {
    if (!selectedRequestId) return;
    dispatch(approveRole(selectedRequestId));
    setOpenRoleApproveDialog(false);
  };

  const handleRejectRole = async () => {
    if (!selectedRequestId) return;
    dispatch(rejectRole(selectedRequestId));
    setOpenRoleRejectDialog(false);
  };

  const handleApproveShop = async () => {
    if (!selectedShopId) return;
    dispatch(approveShop(selectedShopId));
    setOpenShopApproveDialog(false);
  };

  const handleRejectShop = async () => {
    if (!selectedShopId) return;
    dispatch(rejectShop(selectedShopId));
    setOpenShopRejectDialog(false);
  };

  const handleApproveWarehouse = async () => {
    if (!selectedWarehouseId) return;
    dispatch(approveWarehouse(selectedWarehouseId));
    setOpenWarehouseApproveDialog(false);
  };

  const handleRejectWarehouse = async () => {
    if (!selectedWarehouseId) return;
    dispatch(rejectWarehouse(selectedWarehouseId));
    setOpenWarehouseRejectDialog(false);
  };

  const handleCreateRole = async () => {
    if (roleName) {
      dispatch(createRole(roleName));
      setRoleName('');
    }
  };

  const handleCreateUser = async () => {
    dispatch(createUser(newUser));
    setOpenCreateUserDialog(false);
    setNewUser({ username: '', password: '', roleId: 0 });
  };

  // if (authLoading || roleRequestLoading || userLoading || shopLoading || warehouseLoading ) return <div>Loading...</div>;
  if (authLoading) return <div>Loading...</div>;
  if (!user || user.role !== 1) {
    router.push('/login');
    return null;
  }

  // Filter users by role
  const platformAdmins = users.filter(user => user.roleId === 2);
  const operationsAdmins = users.filter(user => user.roleId === 3);

  const pendingRoleRequests = roleRequests.filter((req) => req.status === 'PENDING').length;
  const approvedRoleRequests = roleRequests.filter((req) => req.status === 'APPROVED').length;
  const rejectedRoleRequests = roleRequests.filter((req) => req.status === 'REJECTED').length;

  const pendingShops = shops.length;
  const pendingWarehouses = warehouses.length;

  const roleRequestPending = roleRequests.filter(user => user.status === "PENDING")

  // Pagination Logic
  const indexOfLastItem = userCurrentPage * userItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - userItemsPerPage;
  const currentRoleRequests = roleRequestPending.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(roleRequestPending.length / userItemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6 bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl sm:text-2xl md:3xl font-bold text-blue-800">Developer Dashboard</h1>
          <Button onClick={logout} variant="destructive" className="bg-red-600 hover:bg-red-700">
            Logout
          </Button>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-center sm:text-start text-gray-700 mb-4 sm:mb-8">Welcome, {user.username}! Manage the platform here.</p>

        {/* Manage Role Requests */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="sm:flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-green-700">Manage Role Requests</h2>
            <span className="text-sm text-gray-600">Pending Requests: {pendingRoleRequests}</span>
          </div>
          <Table className="w-full">
            <TableHeader className="bg-green-100">
              <TableRow>
                <TableHead className="text-green-800">User ID</TableHead>
                <TableHead className="text-green-800">User</TableHead>
                <TableHead className="text-green-800">Email</TableHead>
                <TableHead className="text-green-800">Requested Role</TableHead>
                <TableHead className="text-green-800">Current Role</TableHead>
                <TableHead className="text-green-800">Request Time</TableHead>
                <TableHead className="text-green-800">Status</TableHead>
                <TableHead className="text-green-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roleRequests.filter((req) => req.status === 'PENDING').length > 0 ? (
                roleRequests.filter((req) => req.status === 'PENDING')
                  .map((request) => (
                    <TableRow key={request.id} className="hover:bg-green-50">
                      <TableCell className="text-gray-700">{request.userId}</TableCell>
                      <TableCell className="text-gray-700">{request.user.username}</TableCell>
                      <TableCell className="text-gray-700">{request.user.email || 'N/A'}</TableCell>
                      <TableCell className="text-gray-700">{request.requestedRole}</TableCell>
                      <TableCell className="text-gray-700">{request.user?.role?.name}</TableCell>
                      <TableCell className="text-gray-700">{new Date(request.createdAt).toLocaleString()}</TableCell>
                      <TableCell className="text-gray-700">{request.status}</TableCell>
                      <TableCell>
                        <Dialog open={openRoleApproveDialog} onOpenChange={setOpenRoleApproveDialog}>
                          <DialogTrigger asChild>
                            <Button
                              variant="default"
                              className="mr-2 bg-blue-500 text-white hover:bg-blue-600"
                              onClick={() => setSelectedRequestId(request.id)}
                            >
                              Approve
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle className="text-blue-800">Confirm Approval</DialogTitle>
                              <DialogDescription className="text-gray-600">
                                Approve the role request for {roleRequests.find(req => req.id === selectedRequestId)?.user.username || 'Unknown User'}.
                              </DialogDescription>
                            </DialogHeader>
                            <p className="text-gray-700">Are you sure you want to approve this role request?</p>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setOpenRoleApproveDialog(false)} className="text-gray-700">
                                Cancel
                              </Button>
                              <Button onClick={handleApproveRole} className="bg-blue-500 text-white hover:bg-blue-600">
                                Confirm
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Dialog open={openRoleRejectDialog} onOpenChange={setOpenRoleRejectDialog}>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              className="bg-red-500 text-white hover:bg-red-600"
                              onClick={() => setSelectedRequestId(request.id)}
                            >
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle className="text-red-800">Confirm Rejection</DialogTitle>
                              <DialogDescription className="text-gray-600">
                                Reject the role request for {roleRequests.find(req => req.id === selectedRequestId)?.user.username || 'Unknown User'}.
                              </DialogDescription>
                            </DialogHeader>
                            <p className="text-gray-700">Are you sure you want to reject this role request?</p>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setOpenRoleRejectDialog(false)} className="text-gray-700">
                                Cancel
                              </Button>
                              <Button variant="destructive" onClick={handleRejectRole} className="bg-red-500 text-white hover:bg-red-600">
                                Confirm
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">No pending requests</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Role Request History */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="sm:flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-purple-700">Role Request History</h2>
            <div className="space-x-4">
              <span className="text-sm text-gray-600">Approved: {approvedRoleRequests}</span>
              <span className="text-sm text-gray-600">Rejected: {rejectedRoleRequests}</span>
            </div>
          </div>
          <Table className="w-full">
            <TableHeader className="bg-purple-100">
              <TableRow>
                <TableHead className="text-purple-800">User ID</TableHead>
                <TableHead className="text-purple-800">User</TableHead>
                <TableHead className="text-purple-800">Email</TableHead>
                <TableHead className="text-purple-800">Requested Role</TableHead>
                <TableHead className="text-purple-800">Status</TableHead>
                <TableHead className="text-purple-800">Admin ID</TableHead>
                <TableHead className="text-purple-800">Approved/Rejected By</TableHead>
                <TableHead className="text-purple-800">Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roleRequests.filter((req) => req.status === 'APPROVED' || req.status === 'REJECTED').length > 0 ? (
                roleRequests.filter((req) => req.status === 'APPROVED' || req.status === 'REJECTED')
                  .map((request) => (
                    <TableRow key={request.id} className="hover:bg-purple-50">
                      <TableCell className="text-gray-700">{request.userId}</TableCell>
                      <TableCell className="text-gray-700">{request.user.username}</TableCell>
                      <TableCell className="text-gray-700">{request.user.email || 'N/A'}</TableCell>
                      <TableCell className="text-gray-700">{request.requestedRole}</TableCell>
                      <TableCell className="text-gray-700">{request.status}</TableCell>
                      <TableCell className="text-gray-700">{request.adminId || 'N/A'}</TableCell>
                      <TableCell className="text-gray-700">{request.adminId ? 'Developer' : 'N/A'}</TableCell>
                      <TableCell className="text-gray-700">{new Date(request.updatedAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">No history available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Manage Shop Requests */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="sm:flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-700">Manage Shop Requests</h2>
            <span className="text-sm text-gray-600">Pending Requests: {pendingShops}</span>
          </div>
          <Table className="w-full">
            <TableHeader className="bg-yellow-100">
              <TableRow>
                <TableHead className="text-yellow-800">Owner ID</TableHead>
                <TableHead className="text-yellow-800">Owner</TableHead>
                <TableHead className="text-yellow-800">Shop Name</TableHead>
                <TableHead className="text-yellow-800">Location</TableHead>
                <TableHead className="text-yellow-800">Current Role</TableHead>
                <TableHead className="text-yellow-800">Request Time</TableHead>
                <TableHead className="text-yellow-800">Status</TableHead>
                <TableHead className="text-yellow-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shops.length > 0 ? (
                shops.map((shop) => (
                  <TableRow key={shop.id} className="hover:bg-yellow-50">
                    <TableCell className="text-gray-700">{shop.ownerId}</TableCell>
                    <TableCell className="text-gray-700">{shop.owner.username}</TableCell>
                    <TableCell className="text-gray-700">{shop.name}</TableCell>
                    <TableCell className="text-gray-700">{shop.location || 'N/A'}</TableCell>
                    <TableCell className="text-gray-700">{shop.owner?.role?.name}</TableCell>
                    <TableCell className="text-gray-700">{new Date(shop.createdAt).toLocaleString()}</TableCell>
                    <TableCell className="text-gray-700">{shop.status}</TableCell>
                    <TableCell>
                      <Dialog open={openShopApproveDialog} onOpenChange={setOpenShopApproveDialog}>
                        <DialogTrigger asChild>
                          <Button
                            variant="default"
                            className="mr-2 bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => setSelectedShopId(shop.id)}
                          >
                            Approve
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle className="text-blue-800">Confirm Shop Approval</DialogTitle>
                            <DialogDescription className="text-gray-600">
                              Approve the shop request for {shops.find(req => req.id === selectedShopId)?.name || 'Unknown Shop name'}.
                            </DialogDescription>
                          </DialogHeader>
                          <p className="text-gray-700">Are you sure you want to approve this shop?</p>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenShopApproveDialog(false)} className="text-gray-700">
                              Cancel
                            </Button>
                            <Button onClick={handleApproveShop} className="bg-blue-500 text-white hover:bg-blue-600">
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={openShopRejectDialog} onOpenChange={setOpenShopRejectDialog}>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="bg-red-500 text-white hover:bg-red-600"
                            onClick={() => setSelectedShopId(shop.id)}
                          >
                            Reject
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle className="text-red-800">Confirm Shop Rejection</DialogTitle>
                            <DialogDescription className="text-gray-600">
                              Reject the shop request for {shops.find(req => req.id === selectedShopId)?.name || 'Unknown Shop name'}.
                            </DialogDescription>
                          </DialogHeader>
                          <p className="text-gray-700">Are you sure you want to reject this shop?</p>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenShopRejectDialog(false)} className="text-gray-700">
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleRejectShop} className="bg-red-500 text-white hover:bg-red-600">
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">No pending shops</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Manage Warehouse Requests */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="sm:flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-indigo-700">Manage Warehouse Requests</h2>
            <span className="text-sm text-gray-600">Pending Requests: {pendingWarehouses}</span>
          </div>
          <Table className="w-full">
            <TableHeader className="bg-indigo-100">
              <TableRow>
                <TableHead className="text-indigo-800">Owner ID</TableHead>
                <TableHead className="text-indigo-800">Owner</TableHead>
                <TableHead className="text-indigo-800">Warehouse Name</TableHead>
                <TableHead className="text-indigo-800">Location</TableHead>
                <TableHead className="text-indigo-800">Current Role</TableHead>
                <TableHead className="text-indigo-800">Request Time</TableHead>
                <TableHead className="text-indigo-800">Status</TableHead>
                <TableHead className="text-indigo-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.length > 0 ? (
                warehouses.map((warehouse) => (
                  <TableRow key={warehouse.id} className="hover:bg-indigo-50">
                    <TableCell className="text-gray-700">{warehouse.supplierId}</TableCell>
                    <TableCell className="text-gray-700">{warehouse.supplier?.username || 'N/A'}</TableCell>
                    <TableCell className="text-gray-700">{warehouse.name}</TableCell>
                    <TableCell className="text-gray-700">{warehouse.location || 'N/A'}</TableCell>
                    <TableCell className="text-gray-700">{warehouse.supplier?.role.name || 'N/A'}</TableCell>
                    <TableCell className="text-gray-700">{new Date(warehouse.createdAt).toLocaleString()}</TableCell>
                    <TableCell className="text-gray-700">{warehouse.status || 'PENDING'}</TableCell>
                    <TableCell>
                      <Dialog open={openWarehouseApproveDialog} onOpenChange={setOpenWarehouseApproveDialog}>
                        <DialogTrigger asChild>
                          <Button
                            variant="default"
                            className="mr-2 bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => setSelectedWarehouseId(warehouse.id)}
                          >
                            Approve
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle className="text-blue-800">Confirm Warehouse Approval</DialogTitle>
                            <DialogDescription className="text-gray-600">
                              Approve the warehouse request for {warehouse.name}.
                            </DialogDescription>
                          </DialogHeader>
                          <p className="text-gray-700">Are you sure you want to approve this warehouse?</p>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenWarehouseApproveDialog(false)} className="text-gray-700">
                              Cancel
                            </Button>
                            <Button onClick={handleApproveWarehouse} className="bg-blue-500 text-white hover:bg-blue-600">
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={openWarehouseRejectDialog} onOpenChange={setOpenWarehouseRejectDialog}>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="bg-red-500 text-white hover:bg-red-600"
                            onClick={() => setSelectedWarehouseId(warehouse.id)}
                          >
                            Reject
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle className="text-red-800">Confirm Warehouse Rejection</DialogTitle>
                            <DialogDescription className="text-gray-600">
                              Reject the warehouse request for {warehouse.name}.
                            </DialogDescription>
                          </DialogHeader>
                          <p className="text-gray-700">Are you sure you want to reject this warehouse?</p>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenWarehouseRejectDialog(false)} className="text-gray-700">
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleRejectWarehouse} className="bg-red-500 text-white hover:bg-red-600">
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">No pending warehouses</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Platform Admins */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="sm:flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-teal-700">Platform Admins (Role ID 2)</h2>
            <span className="text-sm text-gray-600">Total: {users.filter((user) => user.roleId === 2).length}</span>
          </div>
          <Table className="w-full">
            <TableHeader className="bg-teal-100">
              <TableRow>
                <TableHead className="text-teal-800">ID</TableHead>
                <TableHead className="text-teal-800">Username</TableHead>
                <TableHead className="text-teal-800">Email</TableHead>
                <TableHead className="text-teal-800">Phone</TableHead>
                <TableHead className="text-teal-800">Current Role</TableHead>
                <TableHead className="text-teal-800">Created At</TableHead>
                <TableHead className="text-teal-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.filter((user) => user.roleId === 2).length > 0 ? (
                users.filter((user) => user.roleId === 2)
                  .map((user) => (
                    <TableRow key={user.id} className="hover:bg-teal-50">
                      <TableCell className="text-gray-700">{user.id}</TableCell>
                      <TableCell className="text-gray-700">{user.username}</TableCell>
                      <TableCell className="text-gray-700">{user.email || 'N/A'}</TableCell>
                      <TableCell className="text-gray-700">{user.phone || 'N/A'}</TableCell>
                      <TableCell className="text-gray-700">{user.role.name}</TableCell>
                      <TableCell className="text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Link href={`/dashboard/developer/user/${user.id}`}>
                          <Button variant="outline" className="text-teal-700 border-teal-700 hover:bg-teal-100">
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">No Platform Admins</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Operations Admins */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="sm:flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-orange-700">Operations Admins (Role ID 3)</h2>
            <span className="text-sm text-gray-600">Total: {users.filter((user) => user.roleId === 3).length}</span>
          </div>
          <Table className="w-full">
            <TableHeader className="bg-orange-100">
              <TableRow>
                <TableHead className="text-orange-800">ID</TableHead>
                <TableHead className="text-orange-800">Username</TableHead>
                <TableHead className="text-orange-800">Email</TableHead>
                <TableHead className="text-orange-800">Phone</TableHead>
                <TableHead className="text-orange-800">Current Role</TableHead>
                <TableHead className="text-orange-800">Created At</TableHead>
                <TableHead className="text-orange-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.filter((user) => user.roleId === 3).length > 0 ? (
                users
                  .filter((user) => user.roleId === 3)
                  .map((user) => (
                    <TableRow key={user.id} className="hover:bg-orange-50">
                      <TableCell className="text-gray-700">{user.id}</TableCell>
                      <TableCell className="text-gray-700">{user.username}</TableCell>
                      <TableCell className="text-gray-700">{user.email || 'N/A'}</TableCell>
                      <TableCell className="text-gray-700">{user.phone || 'N/A'}</TableCell>
                      <TableCell className="text-gray-700">{user.role.name}</TableCell>
                      <TableCell className="text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Link href={`/dashboard/developer/user/${user.id}`}>
                          <Button variant="outline" className="text-orange-700 border-orange-700 hover:bg-orange-100">
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">No Operations Admins</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Manage Categories */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-teal-700">Manage Categories</h2>
            {/* Create Category */}
            <Dialog open={openCreateCategoryDialog} onOpenChange={setOpenCreateCategoryDialog}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                  </svg>
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-teal-800">Create Category</DialogTitle>
                  <DialogDescription className="text-gray-600">Add a new category to the system.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-700">ID (1-9999)</Label>
                    <Input
                      type="number"
                      value={newCategoryId || ''}
                      onChange={(e) => setNewCategoryId(parseInt(e.target.value) || null)}
                      placeholder="Category ID"
                      className="w-full border-gray-300 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Name</Label>
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Category Name"
                      className="w-full border-gray-300 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenCreateCategoryDialog(false)} className="text-gray-700">
                    Cancel
                  </Button>
                  <Button onClick={createCategory} className="bg-teal-600 text-white hover:bg-teal-700">
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table className="w-full">
            <TableHeader className="bg-teal-50">
              <TableRow>
                <TableHead className="text-teal-800">ID</TableHead>
                <TableHead className="text-teal-800">Name</TableHead>
                <TableHead className="text-teal-800">Created By</TableHead>
                <TableHead className="text-teal-800">Updated By</TableHead>
                <TableHead className="text-teal-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category.id} className="hover:bg-teal-50">
                    <TableCell className="text-gray-700">{category.id}</TableCell>
                    <TableCell className="text-gray-700">{category.name}</TableCell>
                    <TableCell className="text-gray-700">
                      {category.createdBy ? `${category.createdBy.username} (${category.createdBy.role?.name || 'N/A'}, ID: ${category.createdById})` : 'N/A'}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {category.updatedBy ? `${category.updatedBy.username} (${category.updatedBy.role?.name || 'N/A'}, ID: ${category.updatedById})` : 'N/A'}
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      {/* View Category */}
                      <Dialog open={openViewCategoryDialog} onOpenChange={setOpenViewCategoryDialog}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleViewCategory(category)}
                          >
                            <FaEye className="w-5 h-5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-blue-800">Category Details</DialogTitle>
                          </DialogHeader>
                          <div className="p-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <img
                                  src={selectedCategory?.createdBy?.profilePicture || '/default-avatar.png'}
                                  alt="Created By"
                                  className="w-16 h-16 rounded-full mb-2"
                                />
                                <p className="text-gray-700"><strong>Created By:</strong> {selectedCategory?.createdBy?.username || 'N/A'} (Role: {selectedCategory?.createdBy?.role?.name || 'N/A'})</p>
                                <p className="text-gray-700"><strong>Created At:</strong> {new Date(selectedCategory?.createdAt || '').toLocaleString()}</p>
                              </div>
                              {selectedCategory?.updatedBy && (
                                <div>
                                  <img
                                    src={selectedCategory.updatedBy.profilePicture || '/default-avatar.png'}
                                    alt="Updated By"
                                    className="w-16 h-16 rounded-full mb-2"
                                  />
                                  <p className="text-gray-700"><strong>Updated By:</strong> {selectedCategory.updatedBy.username} (Role: {selectedCategory.updatedBy.role?.name || 'N/A'})</p>
                                  <p className="text-gray-700"><strong>Updated At:</strong> {new Date(selectedCategory.updatedAt || '').toLocaleString()}</p>
                                </div>
                              )}
                            </div>
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-blue-100">
                                  <th className="p-2 text-blue-800">Field</th>
                                  <th className="p-2 text-blue-800">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-t">
                                  <td className="p-2 font-semibold text-gray-700">ID</td>
                                  <td className="p-2 text-gray-700">{selectedCategory?.id}</td>
                                </tr>
                                <tr className="border-t">
                                  <td className="p-2 font-semibold text-gray-700">Name</td>
                                  <td className="p-2 text-gray-700">{selectedCategory?.name}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenViewCategoryDialog(false)} className="text-gray-700">
                              Close
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Edit Category */}
                      <Dialog open={openEditCategoryDialog} onOpenChange={setOpenEditCategoryDialog}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-green-500 hover:text-green-700"
                            onClick={() => {
                              setEditCategory({ id: category.id, name: category.name });
                              setOpenEditCategoryDialog(true);
                            }}
                          >
                            <FaEdit className="w-5 h-5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle className="text-green-800">Edit Category</DialogTitle>
                            <DialogDescription className="text-gray-600">Update the category details.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-gray-700">ID</Label>
                              <Input
                                value={editCategory.id || ''}
                                onChange={(e) => setEditCategory({ ...editCategory, id: parseInt(e.target.value) || null })}
                                placeholder="Category ID"
                                className="w-full border-gray-300 focus:ring-green-500"
                              disabled={!editCategory.id}
                              />
                            </div>
                            <div>
                              <Label className="text-gray-700">Name</Label>
                              <Input
                                value={editCategory.name}
                                onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                                placeholder="Category Name"
                                className="w-full border-gray-300 focus:ring-green-500"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenEditCategoryDialog(false)} className="text-gray-700">
                              Cancel
                            </Button>
                            <Button onClick={updateCategory} className="bg-green-600 text-white hover:bg-green-700">
                              Save
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Delete Category */}
                      <Dialog open={openDeleteCategoryDialog} onOpenChange={setOpenDeleteCategoryDialog}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-red-500 hover:text-red-700"
                            // onClick={() => handleDeleteCategory(category)}
                            onClick={() => {
                              setSelectedCategoryId(category.id);
                              setSelectedCategory(category);
                              setOpenDeleteCategoryDialog(true);
                            }}
                          >
                            <FaTrash className="w-5 h-5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle className="text-red-800">Delete Category</DialogTitle>
                            <DialogDescription className="text-gray-600">
                              Are you sure you want to delete the category "{selectedCategory?.name || 'Unknown Category'}?"
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenDeleteCategoryDialog(false)} className="text-gray-700">
                              Cancel
                            </Button>
                            <Button onClick={deleteCategory} className="bg-red-600 text-white hover:bg-red-700">
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">No categories</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* All Users */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className='sm:flex justify-between items-center'>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4">All Users</h2>
            <div className="mb-4 flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Total Users: {users.filter(user => ![2, 3].includes(user.roleId)).filter(user => !selectedRole || user.role.name === selectedRole).length}
              </span>
              <select
                value={selectedRole || ''}
                onChange={(e) => setSelectedRole(e.target.value === '' ? "" : e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Roles</option>
                {/* {[...new Set(users.map(user => user.role.name))].filter(role => ![2, 3].includes(role.roleId)).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))} */}
                <option value="Retailer">Retailer</option> {/* Role ID 4 */}
                <option value="Merchant">Merchant</option> {/* Role ID 5 */}
                <option value="Supplier">Supplier</option> {/* Role ID 6 */}
                <option value="Courier">Courier</option> {/* Role ID 7 */}
                <option value="Customer">Customer</option> {/* Role ID 8 */}
              </select>
            </div>
          </div>
          <Table className="w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-gray-800">ID</TableHead>
                <TableHead className="text-gray-800">Username</TableHead>
                <TableHead className="text-gray-800">Email</TableHead>
                <TableHead className="text-gray-800">Phone</TableHead>
                <TableHead className="text-gray-800">Role</TableHead>
                <TableHead className="text-gray-800">Created At</TableHead>
                <TableHead className="text-gray-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users
                  .filter(user => ![2, 3].includes(user.roleId)) // Exclude Platform and Operations Admins
                  .filter(user => !selectedRole || user.role.name === selectedRole)
                  .slice((userCurrentPage - 1) * userItemsPerPage, userCurrentPage * userItemsPerPage)
                  .map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50">
                      <TableCell className="text-gray-700">{user.id}</TableCell>
                      <TableCell className="text-gray-700">{user.username}</TableCell>
                      <TableCell className="text-gray-700">{user.email || 'N/A'}</TableCell>
                      <TableCell className="text-gray-700">{user.phone || 'N/A'}</TableCell>
                      <TableCell className="text-gray-700">{user.role.name}</TableCell>
                      <TableCell className="text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Link href={`/dashboard/developer/user/${user.id}`}>
                          <Button variant="outline" className="text-gray-700 border-gray-700 hover:bg-gray-100">
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">No users</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => setUserCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={userCurrentPage === 1}
              className="mr-2 bg-blue-500 text-white hover:bg-blue-600"
            >
              Previous
            </Button>
            <span className="mx-2 py-2">{userCurrentPage}</span>
            <Button
              onClick={() => setUserCurrentPage(prev => prev + 1)}
              disabled={(userCurrentPage * userItemsPerPage) >= users.filter(user => ![2, 3].includes(user.roleId)).length}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Next
            </Button>
          </div>
        </div>

        {/* Create New Role */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Role</h2>
          <div className="flex space-x-4">
            <Input
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="New Role Name"
              className="flex-1"
            />
            <Button onClick={handleCreateRole}>Create Role</Button>
          </div>
        </div>

        {/* Create New Admin User */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Create New Admin User</h2>
          <Dialog open={openCreateUserDialog} onOpenChange={setOpenCreateUserDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md transition duration-200">
                Create Admin User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white rounded-lg p-6">
              <DialogHeader>
                <DialogTitle className="text-blue-800">Create Admin User</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Create a new admin user with the specified details.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">Username</Label>
                  <Input
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="Username"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Password</Label>
                  <Input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Role ID (e.g., 2 for Platform Admin, 3 for Operations Admin)</Label>
                  <Input
                    type="number"
                    value={newUser.roleId}
                    onChange={(e) => setNewUser({ ...newUser, roleId: parseInt(e.target.value) || 0 })}
                    placeholder="Role ID"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpenCreateUserDialog(false)}
                  className="text-gray-700 border-gray-700 hover:bg-gray-100 p-2 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateUser}
                  className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md transition duration-200"
                >
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
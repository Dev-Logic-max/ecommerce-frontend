'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleRequestSchema, RoleRequestFormData } from '../../../lib/schemas/auth';
import { authApi } from '../../../lib/api/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { useAuth, useRoleRequest } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { verifyToken, fetchRoleRequests, logout } from '../../../lib/store/slices/authSlice';
import { RootState } from '../../../lib/store';

export default function RoleRequestPage() {
    // const { user, loading } = useAuth();

    const dispatch = useAppDispatch();
    const { user, loading, roleRequests } = useAppSelector((state: RootState) => state.auth);

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<RoleRequestFormData>({
        resolver: zodResolver(roleRequestSchema),
    });
    // const { roleRequests, fetchRoleRequests } = useRoleRequest();

    // useEffect(() => {
    //     fetchRoleRequests();
    // }, [user]); // Trigger only when user changes

    useEffect(() => {
        dispatch(verifyToken(() => router.push('/login')));
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (!user || user.role === 1) { // Restrict Developers from requesting roles
        router.push(user ? '/' : '/login');
        return null;
    }

    const onSubmit = async (data: RoleRequestFormData) => {
        try {
            console.log("Attempting to send request with data", data)
            const response = await authApi.requestRole(data);
            console.log('Response from server:', response);
            toast.success('Role request submitted! Awaiting approval.', { autoClose: 5000 });
            // fetchRoleRequests(); // Refresh requests
            dispatch(fetchRoleRequests());
        } catch (error: any) {
            console.error('Error submitting role request:', error.response ? error.response.data : error.message);
            if (error.response?.status === 409) {
                toast.info('A pending request already exists for this role. Please wait for approval.', { autoClose: 5000 });
            } else {
                toast.error('Failed to submit role request due to an unexpected error.', { autoClose: 5000 });
            }
        }
    };

    const handleLogout = () => dispatch(logout(() => router.push('/')));

    const pendingRequest = roleRequests.find(r => r.status === 'PENDING');
    const approvedRequest = roleRequests.find(r => r.status === 'APPROVED');
    const rejectedRequest = roleRequests.find(r => r.status === 'REJECTED');

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Request Role</h2>
                {pendingRequest && (
                    <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                        Pending request for {pendingRequest.requestedRole}. Awaiting approval.
                    </div>
                )}
                {approvedRequest && (
                    <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
                        Your request for {approvedRequest.requestedRole} has been approved!
                    </div>
                )}
                {rejectedRequest && (
                    <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                        Your request for {rejectedRequest.requestedRole} has been rejected.
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Role</label>
                        <select
                            {...register('requestedRole')}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select a role</option>
                            <option value="Retailer">Retailer</option>
                            <option value="Merchant">Merchant</option>
                            <option value="Supplier">Supplier</option>
                            <option value="Courier">Courier</option>
                            <option value="Customer">Customer</option>
                        </select>
                        {errors.requestedRole && <p className="text-red-500 text-sm">{errors.requestedRole.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition duration-200"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
}
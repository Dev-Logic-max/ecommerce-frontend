'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleRequestSchema, RoleRequestFormData } from '../../../lib/schemas/auth';
import { authApi } from '../../../lib/api/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

export default function RoleRequestPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<RoleRequestFormData>({
        resolver: zodResolver(roleRequestSchema),
    });

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
            toast.success('Role request submitted! Awaiting approval.', {
                autoClose: 5000, // 5 seconds duration
            });
            // router.push('/'); // Redirect to homepage after submission
        } catch (error: any) {
            console.error('Error submitting role request:', error.response ? error.response.data : error.message);
            if (error.response?.status === 409) {
                toast.info('A pending request already exists for this role. Please wait for approval.', {
                    autoClose: 5000, // 5 seconds duration
                });
            } else {
                toast.error('Failed to submit role request due to an unexpected error.', {
                    autoClose: 5000, // 5 seconds duration
                });
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Request Role</h2>
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
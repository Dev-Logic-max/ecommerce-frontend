'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema, UpdateUserFormData } from '../../../lib/schemas/auth';
import { authApi } from '../../../lib/api/auth';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function UpdateProfilePage() {
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
    });
    const [preview, setPreview] = useState<string | null>(null);

    const onSubmit = async (data: UpdateUserFormData) => {
        try {
            await authApi.updateUser(data);
            toast.success('Profile updated!');
        } catch (error) {
            toast.error('Update failed!');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                // Add file to form data
                const formData = new FormData();
                formData.append('profilePicture', file);
                authApi.updateUser({ profilePicture: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Update Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username (optional)</label>
                        <input
                            {...register('username')}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email (optional)</label>
                        <input
                            {...register('email')}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone (optional)</label>
                        <input
                            {...register('phone')}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password (optional)</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Picture (optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 w-full"
                        />
                        {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-full" />}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition duration-200"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}
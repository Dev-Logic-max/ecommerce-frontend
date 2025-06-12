'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../../lib/schemas/auth';
import { authApi } from '../../../lib/api/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);
    try {
      // Both are same logics
      // const { token, user } = await authApi.login(data).then(res => res.data);

      const response = await authApi.login(data);
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Store token in cookies for middleware
      Cookies.set('token', token, { expires: 7, path: "/" }); // Expires in 7 days

      toast.success('Login successful!');

      // Redirect based on role
      const rolePaths: { [key: number]: string } = {
        1: '/dashboard/developer',
        2: '/dashboard/platform-admin',
        3: '/dashboard/operations-admin',
        4: '/dashboard/retailer',
        5: '/dashboard/merchant',
        6: '/dashboard/supplier',
        7: '/dashboard/courier',
        8: '/customer', // Updated to direct /customer for role 8
      };

      // Force a full page reload to let middleware process the token
      setTimeout(() => {
        window.location.href = rolePaths[user.role] || '/customer'; // Full navigation
      }, 1500); // 1.5 seconds delay for toast visibility
      
    } catch (error) {
      toast.error('Login failed!');
    } finally {
      setIsSubmitting(false); // Always reset submitting state
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username or Email</label>
            <input
              {...register('username')}
              placeholder="Username or Email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-200"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-200"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition duration-200"
          >
            {isSubmitting ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transform transition-all duration-300 hover:shadow-3xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-600">Log in to your account to continue</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
            <input
              {...register('username')}
              placeholder="Enter your username or email"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 placeholder-gray-400"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 placeholder-gray-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account? <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
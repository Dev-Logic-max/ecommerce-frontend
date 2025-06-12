// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signupSchema, SignupFormData } from '@/lib/schemas/auth';
// import { signup } from '@/lib/api/auth';
// import { useRouter } from 'next/navigation';

// export default function SignupPage() {
//     const router = useRouter();
//     const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
//         resolver: zodResolver(signupSchema),
//     });

//     const onSubmit = async (data: SignupFormData) => {
//         try {
//             const { token } = await signup(data);
//             localStorage.setItem('token', token);
//             router.push('/dashboard/customer');
//         } catch (error) {
//             alert('Signup failed');
//         }
//     };

//     return (
//         <div className="flex min-h-screen items-center justify-center bg-gray-100">
//             <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
//                 <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Username</label>
//                         <input
//                             {...register('username')}
//                             className="mt-1 w-full rounded-md border border-gray-300 p-2"
//                         />
//                         {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Email (optional)</label>
//                         <input
//                             {...register('email')}
//                             className="mt-1 w-full rounded-md border border-gray-300 p-2"
//                         />
//                         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Phone (optional)</label>
//                         <input
//                             {...register('phone')}
//                             className="mt-1 w-full rounded-md border border-gray-300 p-2"
//                         />
//                         {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             {...register('password')}
//                             className="mt-1 w-full rounded-md border border-gray-300 p-2"
//                         />
//                         {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
//                     >
//                         Sign Up
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }


'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '../../../lib/schemas/auth';
import { authApi } from '../../../lib/api/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function SignupPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { token, user } = await authApi.signup(data).then(res => res.data);
      localStorage.setItem('token', token);
      toast.success('Signup successful!');

      // Redirect based on role
      const rolePaths: { [key: number]: string } = {
        1: '/dashboard/developer',
        2: '/dashboard/platform-admin',
        3: '/dashboard/operations-admin',
        4: '/dashboard/retailer',
        5: '/dashboard/merchant',
        6: '/dashboard/supplier',
        7: '/dashboard/courier',
        8: '/customer',
      };
      router.push(rolePaths[user.role] || '/customer');
    } catch (error) {
      toast.error('Signup failed!');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
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
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
}
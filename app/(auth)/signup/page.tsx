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


// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signupSchema, SignupFormData } from '../../../lib/schemas/auth';
// import { authApi } from '../../../lib/api/auth';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';
// import { useState } from 'react';

// export default function SignupPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1); // 1 = Profile, 2 = Signup
//   const [profileData, setProfileData] = useState({ name: '', address: '', city: '', country: '' });
//   const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//   });

//   const onProfileSubmit = (data: { name: string; address: string; city: string; country: string }) => {
//     setProfileData(data);
//     setStep(2); // Move to signup step
//   };

//   const onSignupSubmit = async (data: SignupFormData) => {
//     try {
//       // Combine profile data (if provided) with signup data
//       const finalData = { ...data, profile: Object.keys(profileData).some(key => profileData[key]) ? profileData : undefined };
//       const response = await authApi.signup(finalData);
//       const { token, user } = response.data;

//       localStorage.setItem('token', token);
//       toast.success('Signup successful!');

//       const rolePaths: { [key: number]: string } = {
//         1: '/dashboard/developer',
//         2: '/dashboard/platform-admin',
//         3: '/dashboard/operations-admin',
//         4: '/dashboard/retailer',
//         5: '/dashboard/merchant',
//         6: '/dashboard/supplier',
//         7: '/dashboard/courier',
//         8: '/customer',
//       };
//       router.push(rolePaths[user.role] || '/customer');
//     } catch (error) {
//       toast.error('Signup failed!');
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
//       <div className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-2xl transform transition-all duration-300 hover:shadow-3xl border border-gray-100">
//         <div className="text-center mb-8">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Join Us Today</h2>
//           <p className="text-sm text-gray-600">Create your account in a few simple steps</p>
//         </div>
//         <div className="space-y-8">
//           {step === 1 && (
//             <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-6 bg-gray-50 p-6 rounded-xl">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Add Your Profile (Optional)</h3>
//               <p className="text-sm text-gray-600 mb-4">Fill in your details or <button type="button" onClick={() => setStep(2)} className="text-blue-600 hover:text-blue-800 font-medium underline">skip this step</button></p>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                 <input
//                   {...register('name')}
//                   placeholder="Enter your full name"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 placeholder-gray-400"
//                 />
//                 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                 <input
//                   {...register('address')}
//                   placeholder="Enter your address"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 placeholder-gray-400"
//                 />
//                 {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                   <input
//                     {...register('city')}
//                     placeholder="Enter your city"
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 placeholder-gray-400"
//                   />
//                   {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                   <input
//                     {...register('country')}
//                     placeholder="Enter your country"
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 placeholder-gray-400"
//                   />
//                   {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105"
//               >
//                 Next Step
//               </button>
//             </form>
//           )}
//           {step === 2 && (
//             <form onSubmit={handleSubmit(onSignupSubmit)} className="space-y-6 bg-gray-50 p-6 rounded-xl">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Create Your Account</h3>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                 <input
//                   {...register('username')}
//                   placeholder="Choose a username"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 placeholder-gray-400"
//                 />
//                 {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
//                 <input
//                   {...register('email')}
//                   placeholder="Enter your email"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 placeholder-gray-400"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
//                 <input
//                   {...register('phone')}
//                   placeholder="Enter your phone"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 placeholder-gray-400"
//                 />
//                 {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                 <input
//                   type="password"
//                   {...register('password')}
//                   placeholder="Create a password"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 placeholder-gray-400"
//                 />
//                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105"
//               >
//                 Sign Up
//               </button>
//             </form>
//           )}
//           {step === 2 && (
//             <p className="mt-6 text-center text-sm text-gray-600">
//               Already have an account? <a href="/login" className="text-pink-600 hover:text-pink-800 font-medium">Log In</a>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  username: z.string().optional(),
  email: z.string().email('Invalid credentials (email)').optional(),
  password: z.string().min(1, 'Password is required'),
}).refine(data => data.username || data.email, {
  message: 'Username or Email is required',
  path: ['username'],
});

export const updateUserSchema = z.object({
  username: z.string().min(1, 'Username is required').optional(),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  profilePicture: z.string().optional(),
});

export const roleRequestSchema = z.object({
  requestedRole: z.enum(['Retailer', 'Merchant', 'Supplier', 'Courier', 'Customer'], { errorMap: () => ({ message: 'Please select a valid role' }) }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type RoleRequestFormData = z.infer<typeof roleRequestSchema>;
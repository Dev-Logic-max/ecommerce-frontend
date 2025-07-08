'use client';

import { useAuth } from '../../app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const getNavLinks = () => {
    if (!user) return [];
    switch (user.role) {
      case 1: // Developer
        return [
          { href: '/dashboard/developer', label: 'Developer Dashboard' },
          { href: '/search', label: 'Search Products' },
        ];
      case 2: // Platform Admin
        return [
          { href: '/dashboard/platform-admin', label: 'Platform Admin Dashboard' },
          { href: '/search', label: 'Search Products' },
        ];
      case 3: // Operations Admin
        return [
          { href: '/dashboard/operations-admin', label: 'Operations Admin Dashboard' },
          { href: '/search', label: 'Search Products' },
        ];
      case 4: // Retailer
        return [
          { href: '/dashboard/retailer', label: 'Retailer Dashboard' },
          { href: '/search', label: 'Search Products' },
          { href: '/dashboard/retailer/orders', label: 'Orders' },
          { href: '/dashboard/retailer/shops', label: 'Shops' },
          { href: '/dashboard/retailer/products', label: 'Products' },
        ];
      case 5: // Merchant
        return [
          { href: '/dashboard/merchant', label: 'Merchant Dashboard' },
          { href: '/search', label: 'Search Products' },
          { href: '/dashboard/merchant/orders', label: 'My Orders' },
        ];
      case 6: // Supplier
        return [
          { href: '/dashboard/supplier', label: 'Supplier Dashboard' },
          { href: '/search', label: 'Search Products' },
          { href: '/dashboard/supplier/orders', label: 'My Orders' },
        ];
      case 7: // Courier
        return [
          { href: '/dashboard/courier', label: 'Courier Dashboard' },
          { href: '/search', label: 'Search Products' },
          { href: '/dashboard/courier/orders', label: 'My Orders' },
        ];
      case 8: // Customer
        return [
          { href: '/customer', label: 'Customer Dashboard' },
          { href: '/search', label: 'Search Products' },
          { href: '/customer/orders', label: 'My Orders' },
        ];
      default:
        return [{ href: '/search', label: 'Search Products' }];
    }
  };

  const navLinks = getNavLinks();

  if (!user) return null; // Remove redirect, handled by middleware

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-gray-300"
            >
              {link.label}
            </Link>
          ))}
          {user.role !== 1 && (
            <Link href="/role-request" >
              Request Role
            </Link>
          )}
        </div>
        <div>
          <span className="mr-4">Welcome, {user.username}</span>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
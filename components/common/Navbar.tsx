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
        ];
      case 8: // Customer
        return [
          { href: '/customer', label: 'Customer Dashboard' },
          { href: '/search', label: 'Search Products' },
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
            <a
              key={link.href}
              href={link.href}
              className="hover:text-gray-300"
            >
              {link.label}
            </a>
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
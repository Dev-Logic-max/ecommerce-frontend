import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../lib/api/auth';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface User {
  id: number;
  username: string;
  role: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const verifyToken = async () => {
    try {
      const response = await authApi.verify();
      setUser({ id: response.data.user.sub, username: response.data.user.username, role: response.data.user.role });
    } catch (error) {
      localStorage.removeItem('token');
      Cookies.remove('token');
      setUser(null);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    Cookies.remove('token');
    setUser(null);
    toast.success('Logged out successfully!');
    // router.push('/login');
    router.push('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  return { user, loading, logout };
};

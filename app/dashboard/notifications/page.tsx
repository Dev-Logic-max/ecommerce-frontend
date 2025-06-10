'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export default function NotificationsPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        if (!loading && user) {
            fetchNotifications();
        }
    }, [loading, user]);

    const fetchNotifications = async () => {
        try {
            const response = await authApi.getUserNotifications();
            setNotifications(response.data);
        } catch (error) {
            toast.error('Failed to fetch notifications!');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
                    <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Logout
                    </button>
                </div>
                <div className="space-y-4">
                    {notifications.map(notification => (
                        <div key={notification.id} className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-gray-800">{notification.message}</p>
                            <p className="text-gray-600 text-sm">Type: {notification.type}</p>
                            <p className="text-gray-600 text-sm">
                                {new Date(notification.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const errorMessage = typeof window !== 'undefined' ? window.location.search.split('error=')[1] || 'Page Not Found' : 'Page Not Found';

  useEffect(() => {
    // Optionally log the error or redirect after a delay
    console.log('[NotFound] Error:', errorMessage);
  }, [errorMessage]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md text-center">
        <h2 className="mb-6 text-3xl font-bold text-red-600">404 - Not Found</h2>
        <p className="mb-4 text-lg text-gray-700">{decodeURIComponent(errorMessage)}</p>
        <button
          onClick={() => router.push('/')}
          className="rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 transition duration-200"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
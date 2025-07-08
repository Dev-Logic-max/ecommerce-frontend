"use client"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the E-commerce Platform</h1>
      <p className="text-lg text-gray-600 mb-8">A platform for Developers, Admins, Retailers, Suppliers, and Customers.</p>
      <div className="space-x-4">
        <a
          href="/signup"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
        >
          Login
        </a>
      </div>
    </div>
  );
}
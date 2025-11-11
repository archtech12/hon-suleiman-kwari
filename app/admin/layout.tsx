'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is authenticated (except on login page)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [router, pathname]);

  // Add loading indicator for navigation
  useEffect(() => {
    const handleRouteChangeStart = () => setIsLoading(true);
    const handleRouteChangeComplete = () => setIsLoading(false);
    
    // In a real app, you would use Next.js router events
    // For now, we'll just simulate
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  // Don't show sidebar and header on login page
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-green-600 animate-pulse"></div>
        </div>
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-green-800 text-white transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div className="text-xl font-bold">Admin Dashboard</div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="mt-6">
          <Link href="/admin" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">dashboard</span>
            <span>Dashboard</span>
          </Link>
          
          <Link href="/admin/about" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">info</span>
            <span>About</span>
          </Link>
          
          <Link href="/admin/projects" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">work</span>
            <span>Projects</span>
          </Link>
          
          <Link href="/admin/news" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">article</span>
            <span>News</span>
          </Link>
          
          <Link href="/admin/constituency" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">location_on</span>
            <span>Constituency</span>
          </Link>
          
          <Link href="/admin/legislative" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">gavel</span>
            <span>Legislative</span>
          </Link>
          
          <Link href="/admin/media" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">image</span>
            <span>Media</span>
          </Link>
          
          <Link href="/admin/contact" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">contact_mail</span>
            <span>Contact</span>
          </Link>
          
          <Link href="/admin/applications" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">assignment</span>
            <span>Applications</span>
          </Link>
          
          <Link href="/admin/users" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">group</span>
            <span>User Management</span>
          </Link>
          
          <Link href="/admin/change-password" className="flex items-center px-4 py-3 text-white hover:bg-green-700">
            <span className="material-symbols-outlined mr-3">lock</span>
            <span>Change Password</span>
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-green-700"
              >
                <span className="material-symbols-outlined mr-1">logout</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
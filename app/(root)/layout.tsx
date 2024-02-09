'use client';

import Header from '@/components/shared/header';
import Sidebar from '@/components/shared/sidebar/sidebar';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const protectedRoutes = ['/', '/dashboard'];
  let isAuthenticated: boolean;

  if (typeof localStorage !== 'undefined') {
    isAuthenticated = !!localStorage.getItem('token');
  } else {
    isAuthenticated = false;
  }

  useEffect(() => {
    if (!isAuthenticated && protectedRoutes.includes(pathname)) {
      redirect('/login');
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Sidebar />
      <div className={`duration-300 flex-1 flex-col space-y-5 md:ml-[280px]`}>
        <Header />
        <main className="flex-1 md:mx-5 pb-10">{children}</main>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const Header = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Only try to access localStorage when in the client-side environment
    if (typeof window !== 'undefined') {
      try {
        const user = JSON.parse(localStorage.getItem('user') as string);
        if (user && user.email) {
          setEmail(user.email);
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        // Handle the error appropriately, e.g., redirect to login or show a message
      }
    }
  }, []);

  return (
    <header className="w-full border-b border-gray-300 flex justify-end py-3 px-5">
      <div className="flex gap-x-5">
        <Link
          href="/login"
          onClick={() => {
            // Ensure this runs only on the client side
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
            }
          }}
        >
          {email && (
            <Avatar>
              <AvatarImage src="https://drive.google.com/file/d/1em-PVgw9RWYunZvZHdNrBUnRLu6Hl3lY/view?usp=sharing" />
              <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full border-b border-gray-300 flex justify-end py-3 px-5">
      <div className="flex gap-x-5">
        <Link
          href="/login"
          onClick={() => {
            localStorage.removeItem('token');
          }}
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;

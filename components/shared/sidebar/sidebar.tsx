'use client';

import { BookKey, CircleUserRound, Layers2, TicketCheck } from 'lucide-react';
import SidebarHeader from './sidebar-header';
import SidebarMenu from './sidebar-menu';
import { useSidebar } from '@/store/sidebar-store';

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const menus = [
    {
      title: 'Kelola Akun',
      icon: <CircleUserRound className="text-white text-3xl rounded cursor-pointer" />,
      link: '/users',
    },
    {
      title: 'Kelola Banner',
      icon: <TicketCheck className="text-white text-3xl rounded cursor-pointer" />,
      link: '/banners',
    },
    {
      title: 'Kelola Lapang',
      icon: <Layers2 className="text-white text-3xl rounded cursor-pointer" />,
      link: '/fields',
    },
    {
      title: 'Data Resevasi Lapang',
      icon: <BookKey className="text-white text-3xl rounded cursor-pointer" />,
      link: '/booking',
    },
  ];

  return (
    <div className="fixed z-10 hidden md:block">
      <div className={`w-[280px] bg-sidebar h-screen duration-300 relative z-10`}>
        <div className="flex flex-col justify-between h-full overflow-y-auto">
          <div className="flex flex-col justify-center">
            <SidebarHeader props={isOpen} />
            {menus.map((menu, index) => (
              <SidebarMenu
                key={index}
                menu={menu}
                isOpen={isOpen}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

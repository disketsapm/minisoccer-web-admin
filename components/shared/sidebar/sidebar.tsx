'use client';

import { LayoutDashboard, Settings } from 'lucide-react';
import SidebarHeader from './sidebar-header';
import SidebarMenu from './sidebar-menu';
import { useSidebar } from '@/store/sidebar-store';

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const menus = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="text-white text-3xl rounded cursor-pointer" />,
      link: '/dashboard',
    },
    {
      title: 'Access Control',
      icon: <Settings className="text-white text-3xl rounded cursor-pointer" />,
      submenu: [
        {
          title: 'Role',
          link: '/access_control/role',
        },
        {
          title: 'Account',
          link: '/access_control/account',
        },
        {
          title: 'Menu',
          link: '/access_control/menu',
        },
        {
          title: 'Profile',
          link: '/access_control/profile',
        },
      ],
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

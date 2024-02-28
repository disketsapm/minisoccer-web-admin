import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

type SidebarMenuItem = {
  title: string;
  link?: string;
  submenu?: SidebarMenuItem[];
  icon?: React.ReactNode;
};

type SidebarMenuProps = {
  menu: SidebarMenuItem;
  isOpen: boolean;
};

const SidebarMenu = ({ menu, isOpen }: SidebarMenuProps) => {
  const currentPath = usePathname();
  const [submenuVisible, setSubmenuVisible] = useState<boolean[]>(
    Array(menu.submenu?.length).fill(false)
  );
  const [renderMenuItemVisible, setRenderMenuItemVisible] = useState<boolean[]>(
    Array(menu.submenu?.length).fill(false)
  );

  const toggleVisibility = (index: number, array: boolean[]) => {
    array[index] = !array[index];
    array.forEach((_, i) => {
      if (i !== index) {
        array[i] = false;
      }
    });
    array = [...array];

    if (array === submenuVisible) {
      setSubmenuVisible(array);
    } else {
      setRenderMenuItemVisible(array);
    }
  };

  const renderMenuItem = (item: SidebarMenuItem, index: number) => (
    <li
      key={index}
      className={`mt-4 hover:opacity-100 px-3 py-1 ${
        item.link === currentPath ? "opacity-100 bg-gray-800 rounded-md " : "opacity-80"
      }`}
      onClick={() => toggleVisibility(index, renderMenuItemVisible)}
    >
      <Link
        href={item.link || "#"}
        className={`${item.link ? "cursor-pointer" : "pointer-events-none"}`}
      >
        <div className="flex justify-between w-full">
          <h1
            className={`text-white text-lg font-medium  ml-5 cursor-pointer w-full ${
              isOpen ? "" : "hidden"
            }`}
          >
            {item.title}
          </h1>

          {item.submenu && isOpen && (
            <ChevronRight
              className={`duration-300 cursor-pointer text-white text-sm ${
                renderMenuItemVisible[index] ? "transform rotate-90" : ""
              }`}
            />
          )}
        </div>
      </Link>
      {item.submenu && renderMenuItemVisible[index] && isOpen && renderSubMenu(item.submenu)}
    </li>
  );

  const renderSubMenu = (submenu: SidebarMenuItem[]) => (
    <ul className="cursor-pointer list-disc list-inside ml-3">
      {submenu.map((item, subIndex) => renderMenuItem(item, subIndex))}
    </ul>
  );

  return (
    <div className="px-6 select-none">
      <div
        onClick={() => toggleVisibility(0, submenuVisible)}
        className={`flex items-center w-full my-3 gap-x-3 hover:opacity-100  ${
          menu.link === currentPath
            ? "opacity-100 border-2 border-white  rounded-md  p-2"
            : "opacity-80"
        }`}
      >
        {menu.icon}
        {isOpen && menu.title && (
          <Link
            href={menu.link || ""}
            className={`w-full ${menu.link ? "cursor-pointer" : "pointer-events-none"}`}
          >
            <h1
              className={`text-white font-medium text-lg cursor-pointer w-full ${
                isOpen ? "" : "hidden"
              }`}
            >
              {menu.title}
            </h1>
          </Link>
        )}

        {menu.submenu && isOpen && (
          <ChevronRight
            className={`text-white text-sm duration-300 cursor-pointer  ${
              submenuVisible[0] ? "transform rotate-90" : ""
            }`}
          />
        )}
      </div>

      {menu.submenu && submenuVisible[0] && isOpen && renderSubMenu(menu.submenu)}
    </div>
  );
};

export default SidebarMenu;

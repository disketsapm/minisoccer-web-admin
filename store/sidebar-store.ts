import { create } from 'zustand';

type SidebarState = {
  isOpen: boolean;
  isSidebarVisible: boolean;
  isSubMenuVisible: boolean;
  toggleOpenSidebar: () => void;
  toggleSidebarVisibility: () => void;
  toggleSubMenuVisibility: () => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  isSidebarVisible: true,
  isSubMenuVisible: true,
  toggleOpenSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleSidebarVisibility: () => set((state) => ({ isSidebarVisible: !state.isSidebarVisible })),
  toggleSubMenuVisibility: () => set((state) => ({ isSubMenuVisible: !state.isSubMenuVisible })),
}));

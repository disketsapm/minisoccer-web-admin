import { create } from 'zustand';

type UserId = {
  userId: string | null;
  setUserId: (userId: string | undefined) => void;
};

export const useUserId = create<UserId>((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));

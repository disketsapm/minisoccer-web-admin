import { create } from 'zustand';

type UserId = {
  userId: number | null;
  setUserId: (userId: number | undefined) => void;
};

export const useUserId = create<UserId>((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));

import { create } from "zustand";

type IUsersCount = {
  usersCount: number;
  setUsersCount: (num: number) => void;
};

export const useUsersCount = create<IUsersCount>((set) => ({
  usersCount: 0,
  setUsersCount: (num) => {
    set(() => ({
      usersCount: num,
    }));
  },
}));

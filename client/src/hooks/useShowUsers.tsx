import { create } from "zustand";

type IUsers = {
  showUsers: boolean;
  setShowUsers: (num: boolean) => void;
};

export const useShowUsers = create<IUsers>((set) => ({
  showUsers: false,
  setShowUsers: (bool) => {
    set(() => ({
      showUsers: bool,
    }));
  },
}));

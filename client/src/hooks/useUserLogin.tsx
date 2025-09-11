import { create } from "zustand";

type IUser = {
  userName: string;
  setUserName: (name: string) => void;
  userId: string;
  setUserId: () => void;
  isLogin: boolean;
  setIsLogin: (bool: boolean) => void;
};

export const useUserLogin = create<IUser>((set) => ({
  userName: "",
  setUserName: (name) => {
    set(() => ({
      userName: name,
    }));
  },
  userId: "",
  setUserId: () => {
    const id = crypto.randomUUID();
    set(() => ({
      userId: id,
    }));
  },
  isLogin: false,
  setIsLogin: (bool) => {
    set(() => ({
      isLogin: bool,
    }));
  },
}));

import { create } from "zustand";

type IUser = {
  userName: string;
  setUserName: (name: string) => void;
  userId: string;
  setUserId: () => void;
  addUserId: (str: string) => void;
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
  addUserId: (str) => {
    set(() => ({
      userId: str,
    }));
  },
  isLogin: false,
  setIsLogin: (bool) => {
    set(() => ({
      isLogin: bool,
    }));
  },
}));

import { create } from "zustand";

type IProfile = {
  showProfile: boolean;
  setShowProfile: (num: boolean) => void;
};

export const useShowProfile = create<IProfile>((set) => ({
  showProfile: false,
  setShowProfile: (bool) => {
    set(() => ({
      showProfile: bool,
    }));
  },
}));

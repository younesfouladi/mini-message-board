import { create } from "zustand";

type IMessagesCount = {
  messagesCount: number;
  setMessagesCount: (num: number) => void;
};

export const useMessagesCount = create<IMessagesCount>((set) => ({
  messagesCount: 0,
  setMessagesCount: (num) => {
    set(() => ({
      messagesCount: num,
    }));
  },
}));

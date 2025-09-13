import { create } from "zustand";

interface IData {
  userId: string;
  userName: string;
  text: string;
  time: string;
}

type Idb = [string, IData];

type IMessage = {
  messages: Idb[] | null;
  setMessages: (data: Idb[]) => void;
  addMessage: (msg: [string, IData]) => void;
};

export const useMessages = create<IMessage>((set) => ({
  messages: null,
  setMessages: (data) => {
    set(() => ({
      messages: data,
    }));
  },
  addMessage: (msg) => {
    set((state) => ({
      messages: state.messages ? [...state.messages, msg] : [msg],
    }));
  },
}));

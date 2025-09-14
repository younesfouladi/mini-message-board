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
  editStatus: (msg: [string, IData], newSt: string) => void;
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
  editStatus: (msg, newSt) => {
    set((state) => ({
      messages: state.messages
        ? state.messages.map((item) =>
            item[1].time === msg[1].time && item[1].userId === msg[1].userId
              ? [newSt, item[1]]
              : item
          )
        : null,
    }));
  },
}));

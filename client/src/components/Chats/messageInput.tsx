import { useState } from "react";
import { useUserLogin } from "../../hooks/useUserLogin";
import { useShallow } from "zustand/shallow";
import { useMessages } from "../../hooks/useMessages";

type Imsg = {
  userId: string;
  userName: string;
  text: string;
  time: string;
};

type Idb = [string, Imsg];

export default function MessageInput({
  bottomRef,
  scrollRef,
}: {
  bottomRef: React.RefObject<HTMLDivElement | null>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const server = import.meta.env.VITE_SERVER;
  const [userId, userName] = useUserLogin(
    useShallow((states) => [states.userId, states.userName])
  );
  const [input, setinput] = useState("");
  const addMessage = useMessages((states) => states.addMessage);
  const editStatus = useMessages((state) => state.editStatus);

  const handleSendinput = async () => {
    if (!input.trim()) return;
    const newMessage: Idb = [
      "sending",
      {
        userId: userId,
        userName: userName,
        text: input,
        time: new Date().toISOString(),
      },
    ];

    addMessage(newMessage);
    setinput("");

    try {
      const req = await fetch(`${server}/api/message/send`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          userName: userName,
          text: newMessage[1].text,
          time: newMessage[1].time,
        }),
      });
      await req.json();
      editStatus(newMessage, "sent");
    } catch (err) {
      editStatus(newMessage, "failed");
      console.error(err);
    }
  };

  return (
    <div className="text-neutral-50 py-4 flex gap-2 items-center justify-center h-fit w-full border-t-1 border-section">
      <input
        type="text"
        value={input}
        onChange={(e) => setinput(e.target.value)}
        placeholder="Type something..."
        className="bg-section rounded-full py-2 px-4 min-w-[70vw] sm:min-w-100"
        onKeyDown={(e) => (e.key === "Enter" ? handleSendinput() : null)}
        autoFocus
      />
      <button
        className="bg-section p-2 rounded-full cursor-pointer"
        onClick={handleSendinput}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
}

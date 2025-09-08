import { useEffect, useRef, useState } from "react";
import { Spinner } from "@heroui/spinner";

type Imessage = [string, string];

interface Idata {
  name: string;
  messages: Imessage[];
}

type IDb = Record<string, Idata>;

interface ISortedMessage {
  userId: string;
  userName: string;
  text: string;
  time: string;
}

export const Messages = ({ server }: { server: string }) => {
  const [data, setData] = useState<IDb | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(`${server}/api/messages`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(`Error Fetching Data : ${err}`));
  }, [server]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (!data)
    return (
      <div className="fixed w-full top-1/2 flex gap-1 items-center justify-center text-neutral-400 text-xl">
        Loading
        <Spinner size="sm" color="default" variant="dots" />
      </div>
    );

  const sortedMessages: ISortedMessage[] = Object.entries(data)
    .flatMap(([userId, user]) =>
      user.messages.map(([text, time]) => ({
        userId,
        userName: user.name,
        text,
        time,
      }))
    )
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return (
    <div className="px-4 pb-22 flex flex-col gap-4 h-full overflow-y-auto">
      {sortedMessages.map((msg) => (
        <div key={msg.userId + msg.time} className="flex gap-2">
          <div
            role="img"
            className="bg-pink-300 w-10 h-10 rounded-full flex items-center justify-center"
          >
            {msg.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className=" text-neutral-200">{msg.userName}</h4>
            <div className="text-neutral-400 bg-neutral-800 p-2 rounded-xl">
              <p>{msg.text}</p>
              <p>{msg.time}</p>
            </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

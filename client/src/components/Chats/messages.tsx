import { useEffect, useRef, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { ReceiverBubble } from "./chatBubbles";

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
      {sortedMessages.map((msg, index) =>
        index > 0 && sortedMessages[index - 1].userId === msg.userId ? (
          <ReceiverBubble
            key={msg.userId + msg.time}
            userId={msg.userId}
            userName={msg.userName}
            text={msg.text}
            time={msg.time}
            isLastUser={true}
          />
        ) : (
          <ReceiverBubble
            key={msg.userId + msg.time}
            userId={msg.userId}
            userName={msg.userName}
            text={msg.text}
            time={msg.time}
            isLastUser={false}
          />
        )
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

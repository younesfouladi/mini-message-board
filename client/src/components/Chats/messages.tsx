import { useEffect, useRef, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { ReceiverBubble } from "./chatBubbles";

interface IData {
  userId: string;
  userName: string;
  text: string;
  time: string;
}

export const Messages = ({ server }: { server: string }) => {
  const [data, setData] = useState<IData[] | null>(null);
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

  return (
    <div className="px-4 pb-22 flex flex-col gap-4 h-full overflow-y-auto">
      {data.map((msg, index) =>
        index > 0 && data[index - 1].userId === msg.userId ? (
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

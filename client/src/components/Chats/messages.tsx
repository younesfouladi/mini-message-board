import { useEffect, useRef, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { ReceiverBubble } from "./chatBubbles";
import { AnimatePresence, motion } from "motion/react";

interface IData {
  userId: string;
  userName: string;
  text: string;
  time: string;
}

export const Messages = ({ server }: { server: string }) => {
  const [data, setData] = useState<IData[] | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    fetch(`${server}/api/messages`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(`Error Fetching Data : ${err}`));
  }, [server]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScroll(!entry.isIntersecting);
      },
      {
        root: scrollRef.current,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [data]);

  if (!data)
    return (
      <div className="fixed w-full top-1/2 flex gap-1 items-center justify-center text-neutral-400 text-xl">
        Loading
        <Spinner size="sm" color="default" variant="dots" />
      </div>
    );

  const handleScroll = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="px-4 pb-22 flex flex-col gap-4 h-full overflow-y-auto"
      ref={scrollRef}
    >
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

      <AnimatePresence>
        {showScroll && (
          <motion.div
            className="p-1 rounded-full w-10 h-10 flex items-center justify-center bg-neutral-800 text-neutral-300 fixed right-4 bottom-20 cursor-pointer"
            key="scrollBtn"
            initial={{ opacity: 0, scale: 0, rotate: 180, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={handleScroll}
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={bottomRef}></div>
    </div>
  );
};

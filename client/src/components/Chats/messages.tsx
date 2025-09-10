import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Spinner } from "@heroui/spinner";
import { ReceiverBubble } from "./chatBubbles";
import { AnimatePresence, motion } from "motion/react";

interface IData {
  userId: string;
  userName: string;
  text: string;
  time: string;
}

type Idb = [string, IData];

export const Messages = ({ server }: { server: string }) => {
  const [data, setData] = useState<Idb[] | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showScroll, setShowScroll] = useState(false);
  const [count, setCount] = useState<number>(50);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const prevScroll = useRef({ height: 0, top: 0 });
  const isFetchingMore = useRef(false);

  useEffect(() => {
    fetch(`${server}/api/messages/get?count=50`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(`Error Fetching Data : ${err}`));
  }, [server]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [server]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScroll(!entry.isIntersecting);
      },
      {
        root: scrollRef.current,
        threshold: 0.3,
      }
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [data]);

  const loadMore = useCallback(async () => {
    if (isFetchingMore.current) return;
    if (!scrollRef.current) return;
    isFetchingMore.current = true;
    prevScroll.current.height = scrollRef.current.scrollHeight;
    prevScroll.current.top = scrollRef.current.scrollTop;
    setCount((prev) => prev + 50);
    try {
      const res = await fetch(`${server}/api/messages/get?count=${count}`, {
        method: "POST",
      });
      const json: Idb[] = await res.json();
      setData(() => json);
    } catch (err) {
      console.error(`Error Fetching Previous Messages : ${err}`);
    } finally {
      isFetchingMore.current = false;
    }
  }, [server, count]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLoading(entry.isIntersecting);
        isLoadingRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: scrollRef.current,
        threshold: 0.1,
      }
    );
    const firstChild = scrollRef.current?.firstChild;
    if (firstChild instanceof Element) {
      observer.observe(firstChild);
    }

    return () => observer.disconnect();
  }, [data, loadMore]);

  useLayoutEffect(() => {
    if (!isLoadingRef.current) return;
    if (!scrollRef.current) return;

    const newHeight = scrollRef.current?.scrollHeight;
    const heightDiff = newHeight - prevScroll.current.height;
    scrollRef.current.scrollTop = prevScroll.current.top + heightDiff;
    prevScroll.current = { height: 0, top: 0 };
  }, [data]);

  if (!data)
    return (
      <div className="w-full top-1/2 flex gap-1 items-center justify-center text-neutral-400 text-xl">
        Loading
        <Spinner size="sm" color="default" variant="dots" />
      </div>
    );

  const handleScroll = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="px-4 pb-4 flex flex-col gap-4 h-full overflow-y-auto relative"
      ref={scrollRef}
    >
      {data.map((item, index) =>
        index > 0 && data[index - 1][1].userId === item[1].userId ? (
          <ReceiverBubble
            key={item[1].userId + item[1].time}
            userId={item[1].userId}
            userName={item[1].userName}
            text={item[1].text}
            time={item[1].time}
            isLastUser={true}
          />
        ) : (
          <ReceiverBubble
            key={item[1].userId + item[1].time}
            userId={item[1].userId}
            userName={item[1].userName}
            text={item[1].text}
            time={item[1].time}
            isLastUser={false}
          />
        )
      )}

      <AnimatePresence>
        {showScroll && (
          <motion.div
            className="p-1 rounded-full w-10 h-10 flex items-center justify-center bg-section text-neutral-300 fixed right-4 bottom-20 cursor-pointer"
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
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loadingPopup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-neutral-200 absolute top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-700 to-purple-500 py-2 px-4 rounded-full"
          >
            <div className="font-bold flex items-center justify-center gap-1">
              Loading
              <Spinner variant="dots" size="sm" color="white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={bottomRef}></div>
    </div>
  );
};

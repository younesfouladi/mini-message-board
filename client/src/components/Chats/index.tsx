import { useEffect, useState } from "react";
import { Messages } from "./messages";
import { Spinner } from "@heroui/spinner";

export const Chats = () => {
  const server = import.meta.env.VITE_SERVER;
  const [messagesCount, setMessagesCount] = useState<number>(0);

  useEffect(() => {
    fetch(`${server}/api/messages/count`)
      .then((res) => res.json())
      .then((data) => setMessagesCount(data.count))
      .catch((err) => console.log(`Error Fetching msg counts : ${err}`));
  }, [server]);

  return (
    <div className="h-full grid grid-rows-[min-content_1fr]">
      <div className="flex items-center justify-between bg-neutral-800 p-4">
        <button className="text-neutral-50">
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
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-neutral-50 text-lg">TOP Team</h1>
          <div className="flex text-neutral-500 text-shadow-amber-700">
            {messagesCount === 0 ? (
              <Spinner size="sm" color="default" />
            ) : (
              <p>{messagesCount} messages</p>
            )}
          </div>
        </div>
        <button className="text-neutral-50">
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>
      <Messages server={server} />
      <div className="text-neutral-50 bg-neutral-800 fixed bottom-6 rounded-full p-1 left-1/2 -translate-x-1/2 flex items-center">
        <input
          type="text"
          placeholder="Type something..."
          className="bg-neutral-900 rounded-full py-2 px-4 min-w-[70vw] sm:min-w-100"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 mx-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </div>
    </div>
  );
};

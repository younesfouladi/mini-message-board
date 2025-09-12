import { useCallback, useEffect, useState } from "react";
import { useUsersCount } from "../../hooks/useUsersCount";
import { useMessagesCount } from "../../hooks/useMessagesCount";
import { useShowUsers } from "../../hooks/useShowUsers";
import { AnimatePresence, motion } from "motion/react";
import { Spinner } from "@heroui/spinner";

interface IData {
  userId: string;
  userName: string;
  messagesCount: number;
}

export default function Users() {
  const server = import.meta.env.VITE_SERVER;
  const [users, setUsers] = useState<IData[] | null>(null);
  const messagesCount = useMessagesCount((states) => states.messagesCount);
  const setMessagesCount = useMessagesCount(
    (states) => states.setMessagesCount
  );
  const usersCount = useUsersCount((states) => states.usersCount);
  const showUsers = useShowUsers((states) => states.showUsers);
  const setShowUsers = useShowUsers((states) => states.setShowUsers);

  useEffect(() => {
    fetch(`${server}/api/messages/count`)
      .then((res) => res.json())
      .then((data) => setMessagesCount(data.count))
      .catch((err) => console.error(`Error Fetching Users Data`, err));
  }, [server, setMessagesCount]);

  useEffect(() => {
    fetch(`${server}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(`Error Fetching Users Data`, err));
  }, [server]);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1536) {
      setShowUsers(true);
    } else {
      setShowUsers(false);
    }
  }, [setShowUsers]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <>
      <AnimatePresence>
        {showUsers && (
          <motion.aside
            className="absolute z-10 inset-0 p-10 backdrop-blur-sm bg-[#11111196] flex items-center justify-center w-full h-full 2xl:backdrop-blur-none 2xl:bg-inherit 2xl:static 2xl:p-0 2xl:max-h-4/5 2xl:w-fit"
            onClick={(e) => {
              if (window.innerWidth >= 1536) return;
              if (e.target === e.currentTarget) {
                setShowUsers(false);
              }
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <button
              className="text-neutral-50 cursor-pointer fixed top-8 right-8 2xl:hidden"
              onClick={() => setShowUsers(false)}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="bg-section text-neutral-50 max-h-9/10 overflow-y-auto px-8 rounded-2xl space-y-6 py-4">
              <div className="flex justify-center gap-10">
                <h3 className="flex gap-2">
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
                  {usersCount > 0 ? (
                    usersCount
                  ) : (
                    <Spinner size="sm" color="default" />
                  )}
                </h3>
                <h3 className="flex gap-2">
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
                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                  </svg>
                  {messagesCount > 0 ? (
                    messagesCount
                  ) : (
                    <Spinner size="sm" color="default" />
                  )}
                </h3>
              </div>
              {users ? (
                <div className="flex flex-col gap-6">
                  {users?.map((user) => (
                    <div key={user.userId} className="flex gap-4 items-center">
                      <div
                        role="img"
                        className="bg-pink-400 w-12 h-12 rounded-full flex items-center justify-center"
                      >
                        {user.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{user.userName}</p>
                        <p className="text-sm">
                          Total Messages : {user.messagesCount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1">
                  <Spinner variant="dots" size="sm" color="white" />
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

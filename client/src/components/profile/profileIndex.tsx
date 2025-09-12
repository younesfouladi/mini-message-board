import { useUserLogin } from "../../hooks/useUserLogin";
import { useShowProfile } from "../../hooks/useShowProfile";
import { useShallow } from "zustand/shallow";
import { AnimatePresence } from "framer-motion";
import { motion } from "motion/react";
import { useEffect, useCallback, useState } from "react";

export const Profile = () => {
  const server = import.meta.env.VITE_SERVER;
  const [userName, userId] = useUserLogin(
    useShallow((states) => [states.userName, states.userId])
  );
  const [showProfile, setShowProfile] = useShowProfile(
    useShallow((states) => [states.showProfile, states.setShowProfile])
  );
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${server}/api/users/${userId}/count`)
      .then((res) => res.json())
      .then((data) => setCount(data))
      .catch((err) =>
        console.error(`Error Fetching user messages count : ${err}`)
      );
  }, [server, userId]);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1536) {
      setShowProfile(true);
    } else {
      setShowProfile(false);
    }
  }, [setShowProfile]);

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
        {showProfile && (
          <motion.aside
            className="absolute z-10 backdrop-blur-sm bg-[#11111196] flex items-center justify-center w-full h-full 2xl:backdrop-blur-none 2xl:bg-inherit 2xl:static 2xl:h-fit 2xl:w-fit 2xl:mt-10"
            onClick={(e) => {
              if (window.innerWidth >= 1536) return;
              e.stopPropagation();
              if (e.target === e.currentTarget) {
                setShowProfile(false);
              }
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <button
              className="text-neutral-50 cursor-pointer fixed top-8 right-8 2xl:hidden"
              onClick={() => setShowProfile(false)}
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
            <div className="text-neutral-50 bg-section flex flex-col gap-2 items-center px-4 py-6 rounded-2xl">
              <h3>Your Profile</h3>
              <div className="bg-main px-14 py-4 rounded-2xl flex flex-col items-center gap-4">
                <div
                  role="img"
                  className="bg-pink-400 w-18 h-18 rounded-full flex items-center justify-center"
                >
                  {userName.charAt(0)}
                </div>
                <p className="font-semibold text-lg">{userName}</p>
                <p className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  {count}
                </p>
                <button
                  className="bg-red-900 cursor-pointer flex gap-1 text-red-50 text-sm p-2 rounded-xl"
                  onClick={() => {
                    localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE);
                    window.location.href = "/login";
                  }}
                >
                  Logout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

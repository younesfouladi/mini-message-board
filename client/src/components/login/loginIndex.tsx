import type React from "react";
import { useUserLogin } from "../../hooks/useUserLogin";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "@heroui/tooltip";
import { Navigate } from "react-router-dom";
import { addToast, ToastProvider } from "@heroui/react";
import { AnimatePresence, motion } from "motion/react";

export default function Login() {
  const setUserName = useUserLogin((states) => states.setUserName);
  const setUserId = useUserLogin((states) => states.setUserId);
  const [isValid, setIsValid] = useState(false);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const isLogin = useUserLogin((state) => state.isLogin);
  const setIsLogin = useUserLogin((state) => state.setIsLogin);
  const server = import.meta.env.VITE_SERVER;

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE)) {
      setIsLogin(true);
    }
  });

  const handleValidity = () => {
    if (!userNameRef.current?.checkValidity()) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSendUserData = async () => {
    const userName = useUserLogin.getState().userName;
    const userId = useUserLogin.getState().userId;

    try {
      const req = await fetch(`${server}/api/users/new`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: userId, name: userName }),
      });
      await req.json();
      setIsLogin(true);
    } catch (err) {
      addToast({
        title: "Login Error",
        description: `Error Sending User data to server : ${err}`,
        color: "danger",
      });
    }
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isValid) return;
    e.preventDefault();
    if (userNameRef.current) {
      setUserName(userNameRef.current?.value);
      setUserId();
      handleSendUserData();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isLogin ? (
          <motion.div
            className="flex flex-col w-full h-full bg-main text-neutral-50 justify-center gap-8 items-center p-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <ToastProvider />
            <h1 className="text-center text-md">
              Welcome to <br /> Mini Message Board
            </h1>
            <div className="bg-section p-2 space-y-6 rounded-3xl h-fit">
              <div className="bg-[url('./images/login-bg.webp')] w-[clamp(200px,70vw,500px)] aspect-square bg-cover rounded-2xl"></div>
              <div className="w-full px-4">
                <form className="flex flex-col items-center gap-6 my-8">
                  <label className="flex gap-2 items-center relative">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      className="px-4 py-2 w-full bg-main rounded-4xl"
                      minLength={5}
                      required
                      ref={userNameRef}
                      onChange={handleValidity}
                      autoFocus
                    />
                    {!isValid ? (
                      <div className="absolute right-2">
                        <Tooltip
                          key="formerror"
                          className=""
                          color="danger"
                          content="!REQUIRED - at least 5 characters"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-7 text-red-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            />
                          </svg>
                        </Tooltip>
                      </div>
                    ) : null}
                  </label>
                  <button
                    type="submit"
                    className={`${
                      isValid ? "bg-neutral-100" : "bg-neutral-600"
                    } rounded-full w-[90%] text-main font-bold px-6 py-2 transition-background`}
                    onClick={(e) => handleLogin(e)}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        ) : (
          <Navigate to="/" />
        )}
      </AnimatePresence>
    </>
  );
}

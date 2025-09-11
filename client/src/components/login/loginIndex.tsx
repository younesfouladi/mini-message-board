import type React from "react";
import { useUserLogin } from "../../hooks/useUserLogin";
import { useState } from "react";
import { Tooltip } from "@heroui/tooltip";

export default function Login() {
  const setUserName = useUserLogin((states) => states.setUserName);
  const setUserId = useUserLogin((states) => states.setUserId);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col w-full h-full bg-main text-neutral-50 justify-center gap-8 items-center p-10">
      <h1 className="text-center text-md">
        Welcome to <br /> Mini Message Board
      </h1>
      <div className="bg-section p-2 space-y-6 rounded-3xl h-fit">
        <div className="bg-[url('./images/login-bg.webp')] w-[clamp(200px,70vw,500px)] aspect-square bg-cover rounded-2xl"></div>
        <div className="w-full px-4">
          <form className="flex flex-col items-center gap-6 my-8">
            <label className="flex gap-2 items-center">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="px-4 py-2 w-full bg-main rounded-4xl user-invalid:border-red-700 user-invalid:border-2 user-valid:border-green-700 user-valid:border-2"
                minLength={5}
                required
              />
              {error !== "" ? (
                <Tooltip
                  key="formerror"
                  className=""
                  color="danger"
                  content={error}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </Tooltip>
              ) : null}
            </label>
            <button
              type="submit"
              className="bg-neutral-100 rounded-full w-[90%] text-main font-bold px-6 py-2"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

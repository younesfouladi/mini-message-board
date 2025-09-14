import { Spinner } from "@heroui/spinner";
import { useUserLogin } from "../../hooks/useUserLogin";
import { CheckCheck, X } from "lucide-react";

type IBubble = {
  userId?: string;
  userName: string;
  text: string;
  time: string;
  isLastUser: boolean;
  status?: string;
};

export const Bubble = ({
  userId,
  userName,
  text,
  time,
  isLastUser,
  status,
}: IBubble) => {
  const id = useUserLogin((state) => state.userId);

  return (
    <>
      {id !== userId && isLastUser ? (
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"></div>
          <div>
            <div className="bg-section px-4 py-2 flex flex-col rounded-r-3xl rounded-l-3xl rounded-tl-md">
              <p className="text-neutral-300">{text}</p>
              <p className="self-end text-sm text-neutral-500">
                {new Date(time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
          </div>
        </div>
      ) : id !== userId && !isLastUser ? (
        <div className="flex gap-2">
          <div
            role="img"
            className="bg-pink-400 w-10 h-10 rounded-full flex items-center justify-center"
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-neutral-200 font-bold text-sm my-1">
              {userName}
            </h4>
            <div className="bg-section px-4 py-2 flex flex-col rounded-r-3xl rounded-bl-3xl rounded-tl-md">
              <p className="text-neutral-300">{text}</p>
              <p className="self-end text-sm text-neutral-500">
                {new Date(time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <SenderBubble text={text} time={time} status={status} />
      )}
    </>
  );
};

type ISBubble = {
  text: string;
  time: string;
  status?: string;
};

export const SenderBubble = ({ text, time, status }: ISBubble) => {
  return (
    <>
      <div className="flex gap-2 self-end">
        <div className="w-10 h-10 rounded-full flex items-center justify-center"></div>
        <div>
          <div className="bg-gradient-to-r from-purple-800 to-purple-600 px-4 py-2 flex flex-col rounded-r-3xl rounded-l-3xl rounded-tr-md">
            <p className="text-neutral-200">{text}</p>
            <div className="flex items-center gap-0.5 self-end">
              <p className="text-sm text-neutral-300">
                {new Date(time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
              {status && status === "sending" ? (
                <Spinner size="sm" variant="gradient" color="default" />
              ) : status && status === "failed" ? (
                <X size={18} className="text-red-400" />
              ) : (
                <CheckCheck className="text-neutral-50" size={18} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

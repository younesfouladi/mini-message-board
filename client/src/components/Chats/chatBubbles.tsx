type IBubble = {
  userId?: string;
  userName: string;
  text: string;
  time: string;
  isLastUser: boolean;
};

export const ReceiverBubble = ({
  userName,
  text,
  time,
  isLastUser,
}: IBubble) => {
  return (
    <>
      {isLastUser ? (
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
      ) : (
        <div className="flex gap-2">
          <div
            role="img"
            className="bg-pink-300 w-10 h-10 rounded-full flex items-center justify-center"
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
      )}
    </>
  );
};

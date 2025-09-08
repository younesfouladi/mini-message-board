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
          <div
            role="img"
            className="w-10 h-10 rounded-full flex items-center justify-center"
          ></div>
          <div>
            <div className="text-neutral-400 bg-neutral-800 p-2 rounded-xl">
              <p>{text}</p>
              <p>{time}</p>
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
            <h4 className=" text-neutral-200">{userName}</h4>
            <div className="text-neutral-400 bg-neutral-800 p-2 rounded-xl">
              <p>{text}</p>
              <p>{time}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

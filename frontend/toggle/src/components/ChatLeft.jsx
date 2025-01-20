import React from "react";

const ChatLeft = ({ user }) => {
  const _class = user ? "bg-gray-200" : "bg-white";
  const initials = user.slice(0, 2).toUpperCase();

  return (
    <div>
      <div
        className={
          "conversation-item p-1 dark:bg-gray-700 hover:bg-gray-200 mx-3 mt-2 rounded-md " +
          _class
        }
      >
        <div className={"flex items-center p-2  cursor-pointer  "}>
          <div className="w-7 h-7 m-1 text-lg font-medium text-gray-200 bg-slate-400 p-6 flex justify-center items-center rounded-full">
            {initials}
          </div>
          <div className="flex-grow p-2">
            <div className="flex justify-between text-md ">
              <div className="text-lg font-medium text-gray-700 dark:text-gray-200">
                {user}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLeft;

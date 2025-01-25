import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatLeft = ({ user }) => {
  const { unreadMessages, setUnreadMessages, toggleVisibility } =
    useContext(ChatContext);
  const _class = user ? "bg-gray-200" : "bg-white";
  const initials = user.slice(0, 2).toUpperCase();

  const renderNotificationDot = (sender) => {
    const unreadCount = unreadMessages[sender] || 0;
    console.log(unreadCount);

    if (unreadCount > 0) {
      return (
        <span className="w-3 h-3 px-2 py-1 bg-gray-400 text-slate-200 font-medium rounded-full">
          {unreadCount}
        </span>
      ); // Add your CSS for the dot
    }
    return null;
  };

  useEffect(() => {
    saveUnreadMessages(); // Save messages whenever unreadMessages changes
  }, [unreadMessages]);

  useEffect(() => {
    loadUnreadMessages(); // Load messages when the component mounts
  }, [setUnreadMessages]);

  // Save unread messages to local storage
  const saveUnreadMessages = () => {
    console.log(unreadMessages);

    localStorage.setItem("unreadMessages", JSON.stringify(unreadMessages));
  };

  // Load unread messages from local storage
  const loadUnreadMessages = () => {
    const data = localStorage.getItem("unreadMessages");
    setUnreadMessages(JSON.parse(data));
  };

  return (
    <div>
      <div
        className={
          "conversation-item p-1 dark:bg-gray-700 hover:bg-gray-200 mx-3 mt-2 rounded-md " +
          _class
        }
        onClick={toggleVisibility}
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

              <div>{renderNotificationDot(user)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLeft;

import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import NewChat from "./NewChat";
import Search from "./Search";
import ChatLeft from "./ChatLeft";

const Chat = () => {
  const {
    message,
    messages,
    setMessage,
    sendMessage,
    search,
    chatUser,
    selectedUser,
    usernames,
    getMessage,
    online,
  } = useContext(ChatContext);

  const initials = selectedUser
    ? selectedUser.username.slice(0, 2).toUpperCase()
    : "";

  return (
    <div className="flex flex-row border border-gray-400 border-t-0 max-h-full">
      {/* Left side */}
      <div className="w-[35%] inline-block py-5 border border-gray-400">
        {search ? <Search /> : ""}
        <NewChat />
        <div></div>

        <div className="flex flex-col cursor-pointer">
          <div>
            {usernames.length > 0
              ? usernames.map((user, index) => (
                  <div key={index} onClick={() => getMessage(user)}>
                    <ChatLeft user={user} />
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="w-[65%] inline-block ">
        <div className="flex flex-col w-full ">
          {selectedUser && (
            <div>
              <div className="flex text-lg font-medium mb-3">
                <div className="w-full h-15 p-1 bg-gray-600  dark:bg-gray-800 shadow-md">
                  <div className="flex p-2 align-middle items-center">
                    <div className="w-7 h-7 m-1 text-lg font-medium text-gray-200 bg-slate-400 p-6 flex justify-center items-center rounded-full">
                      {initials}
                    </div>
                    <div className="flex-grow p-2">
                      <div className="text-md text-gray-50 font-semibold">
                        {selectedUser.username}
                      </div>
                      <div className="flex items-center">
                        {online ? (
                          <div>
                            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                            <div className="text-xs text-gray-50 ml-1">
                              Online
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                            <div className="text-xs text-gray-50 ml-1">
                              Offline
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-3 overflow-auto max-h-[75vh] mb-3">
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mt-2 px-2 py-3 rounded-md w-fit ${
                        msg.sender === selectedUser.username
                          ? "bg-gray-400 text-white"
                          : "bg-gray-500 text-white ml-auto mr-3"
                      }`}
                    >
                      <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                  ))
                ) : (
                  <div>No messages yet.</div> // Display when there are no messages
                )}
              </div>
              <form
                onSubmit={sendMessage}
                className="border border-gray-500 py-4 px-3 w-[65.5%]"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message"
                />
                <button type="submit">Send</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

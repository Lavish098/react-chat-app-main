import React, { useContext, useRef, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { assets } from "../assets/assets";

const ChatRight = () => {
  const {
    message,
    messages,
    setMessage,
    sendMessage,
    selectedUser,
    online,
    toggleVisibility,
  } = useContext(ChatContext);

  const initials = selectedUser
    ? selectedUser.username.slice(0, 2).toUpperCase()
    : "";

  const messageEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message container when new messages arrive
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full md:h-[10%]">
        {selectedUser && (
          <div>
            <div className="flex text-lg fixed top-0 w-full font-medium mb-3">
              <div className="flex items-center w-full h-15 p-1 bg-gray-600  dark:bg-gray-800 shadow-md">
                <div onClick={toggleVisibility} className=" text-slate-500">
                  <svg
                    width="44px"
                    height="44px"
                    viewBox="-4.08 -4.08 32.16 32.16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#d4d3d3"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17"
                        stroke="#d4d3d3"
                        stroke-width="1.248"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="flex p-2 align-middle items-center w-full">
                  <div className="w-4 h-4 md:w-7 md:h-7 m-1 text-base md:text-lg font-medium text-gray-200 bg-slate-400 p-6 flex justify-center items-center rounded-full">
                    {initials}
                  </div>
                  <div className="flex-grow p-2 w-full">
                    <div className="text-md text-gray-50 font-semibold">
                      {selectedUser.username}
                    </div>
                    <div className="">
                      {online ? (
                        <div className="w-full flex items-center">
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
            <div className="ml-3 overflow-y-auto mb-28 flex flex-col">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`px-2 py-3 w-fit dark:bg-gray-800 my-2 rounded-2xl ${
                      msg.sender === selectedUser.username
                        ? "bg-gray-400 text-white rounded-bl-none"
                        : "bg-gray-500 text-white ml-auto mr-3 rounded-br-none"
                    }`}
                  >
                    {msg.message}
                  </div>
                ))
              ) : (
                <div>No messages yet.</div> // Display when there are no messages
              )}
            </div>

            <div ref={messageEndRef} />

            <form onSubmit={sendMessage} className="">
              <div className="h-15 fixed bottom-0 right-0 w-full md:w-[63%] p-3 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center">
                  <div className="p-2 text-gray-600 dark:text-gray-200 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="search-chat flex flex-grow p-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message"
                      className="input text-gray-700 dark:text-gray-200 text-sm p-5 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md"
                    />

                    <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                      <button type="submit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRight;

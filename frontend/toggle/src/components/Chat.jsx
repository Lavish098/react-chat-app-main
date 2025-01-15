import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const {
    message,
    messages,
    setMessage,
    sendMessage,
    searchUser,
    setSearchUsername,
    searchUsername,
    chatUser,
    selectedUser,
    usernames,
    getMessage,
  } = useContext(ChatContext);
  return (
    <div className="flex flex-row border border-gray-400 mt-10 max-h-full">
      {/* Left side */}
      <div className="w-[30%] inline-block py-5 border border-gray-400">
        <div className=" text-black w-full">
          <input
            type="text"
            className=" text-black text-xl px-2 py-5 outline-none mb-2 mx-3 w-[90%] border border-gray-500"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <button
            onClick={searchUser}
            className="py-3 rounded-md bg-slate-500 w-[80%] my-3 mx-3 text-xl text-white font-medium"
          >
            search
          </button>
          {/* <ul>{chatUser}</ul> */}
        </div>

        <div className="flex flex-col cursor-pointer">
          <div>
            {usernames.length > 0
              ? usernames.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => getMessage(user)}
                    className="border border-gray-400 py-4 px-2 text-gray-700 mb-2 mx-2 text-xl "
                  >
                    {user}
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="w-[70%] inline-block py-5 px-4">
        <div className="flex flex-col w-full ">
          {selectedUser && (
            <div>
              <div className="flex text-lg font-medium mb-3">
                <h2 className="p-2 text-gray-700">Chatting with:</h2>
                <h2 className="ml-2 bg-slate-600 text-base text-white p-2 rounded-md">
                  {selectedUser.username}
                </h2>
              </div>
              <div className="ml-3 overflow-auto max-h-[75vh] mb-3">
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mt-2 px-2 py-3 rounded-md w-fit ${
                        msg.sender === selectedUser.username
                          ? "bg-blue-500 text-white"
                          : "bg-gray-500 text-white ml-auto"
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

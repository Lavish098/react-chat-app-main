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
    <div className="flex flex-row border border-gray-400 mt-10 h-[85vh]">
      {/* Left side */}
      <div className="w-[25%] inline-block py-5 border border-gray-400">
        <div className="bg-gray-700 text-white">
          <input
            type="text"
            className="border border-gray-500 text-black py-2 mb-2"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <button onClick={searchUser}>search</button>
          {/* <ul>{chatUser}</ul> */}
        </div>

        <div className="flex flex-col">
          <div>
            {usernames.length > 0
              ? usernames.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => getMessage(user)}
                    className="border border-gray-400 py-4 px-2 text-black"
                  >
                    {user}
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="w-[60%] inline-block py-5">
        <div className="flex flex-col">
          {selectedUser && (
            <div>
              <h2>Chatting with: {selectedUser.username}</h2>
              <div className="ml-3">
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className="bg-gray-500 text-white mt-2 px-2 py-3 rounded-md w-[40%]"
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
                className="border border-gray-500 py-4 px-3 w-[65.5%] fixed bottom-[26px]"
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

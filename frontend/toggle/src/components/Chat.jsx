import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import NewChat from "./NewChat";
import Search from "./Search";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";

const Chat = () => {
  const { search, usernames, getMessage, online, isVisible } =
    useContext(ChatContext);

  return (
    <div className="flex flex-row w-full h-screen ">
      {/* Left side */}
      <div
        className={` inline-block py-5 shadow-lg  ${
          isVisible ? "hidden" : "block md:block"
        }`}
      >
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
      <div
        className={`w-[100%] md:block h-screen rounded-full ${
          isVisible ? "block " : "hidden "
        }}`}
      >
        <ChatRight />
      </div>
    </div>
  );
};

export default Chat;

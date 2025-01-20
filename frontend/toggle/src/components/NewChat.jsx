import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const NewChat = () => {
  const { searchBar } = useContext(ChatContext);
  return (
    <div className="px-4 py-3">
      <div
        onClick={searchBar}
        className="bg-gray-600 px-4 py-3 rounded-md flex justify-center items-center text-slate-300"
      >
        <h2>NEW CHAT</h2>
      </div>
    </div>
  );
};

export default NewChat;

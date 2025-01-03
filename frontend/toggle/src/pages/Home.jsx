import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

export default Home;

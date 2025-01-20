import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { assets } from "../assets/assets";
import { ChatContext } from "../context/ChatContext";
const NavBar = () => {
  const { logout, chatUser } = useContext(ChatContext);
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between py-7 px-4 font-medium border-b border-gray-800">
      <Link to="/">
        <div className="flex items-center justify-center gap-3">
          <img
            src={assets.chat_icon}
            className="w-12 h-12 cursor-pointer"
            alt=""
          />
          <h1 className="text-xl">Chat App</h1>
        </div>
      </Link>

      <div className="sm:flex hidden justify-between items-center gap-6">
        <Link to="/">
          <h2>Home</h2>
        </Link>

        <Link to="/chats">
          <h2>Chats</h2>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {chatUser ? (
          <div className="group relative">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-black text-slate-200 px-4 py-2 rounded-md">
            <Link to="/login">Login</Link>
          </div>
        )}

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* SideBar menu for mobile */}

      <div
        className={`absolute z-10 top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/chats"
          >
            CHATS
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

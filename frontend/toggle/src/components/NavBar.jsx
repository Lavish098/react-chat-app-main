import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { assets } from "../assets/assets";
import { ChatContext } from "../context/ChatContext";
const NavBar = () => {
  const { logout, chatUser, isVisible } = useContext(ChatContext);

  return (
    <div
      className={`flex  bg-white dark:bg-gray-900 shadow-lg ${
        isVisible ? "hidden" : "flex"
      }`}
    >
      <div className="w-20  text-gray-500 h-screen flex flex-col items-center justify-between py-5">
        <Link to="/">
          <div className="flex items-center justify-center gap-3">
            <img
              src={assets.chat_icon}
              className="w-12 h-12 cursor-pointer"
              alt=""
            />
          </div>
        </Link>

        <div className="flex flex-col">
          <div className="py-4 hover:text-gray-700">
            <Link to="/">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </div>

          <div className="py-4 hover:text-gray-700 flex flex-col items-center justify-center text-blue-600">
            <Link to="/chats">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Link>
            <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
          </div>
          <div className="py-4 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
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
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
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

          {/* <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt=""
          /> */}
        </div>
      </div>
    </div>

    /* SideBar menu for mobile */

    /* <div
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
      </div> */
  );
};

export default NavBar;

import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const {
    searchUser,
    searchBar,
    setSearchUsername,
    searchUsername,
    chatUser,
    selectUser,
  } = useContext(ChatContext);
  return (
    <div className="absolute top-24 left-0 bg-slate-300 z-50 w-full h-screen">
      <div className="flex justify-center items-start ">
        <div className=" bg-white px-4 pt-7 pb-32 rounded-xl h-[40%] text-black w-[50%] z-10 flex flex-col justify-center items-center mx-4 my-52">
          <div className="flex justify-end items-end w-full mb-4 ">
            <h3
              className="px-3 py-2 text-slate-300 rounded bg-gray-500"
              onClick={searchBar}
            >
              Close
            </h3>
          </div>
          <input
            type="text"
            className=" text-slate-600 bg-slate-200 border-none text-md px-5 py-3 outline-none mb-2 mx-3 w-[100%] rounded-md border border-gray-500"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            placeholder="Search for your friends"
          />
          <button
            onClick={searchUser}
            className="py-3 rounded-md bg-slate-500 w-[50%] my-3 mx-3 text-xl text-white font-medium"
          >
            search
          </button>

          <div>
            {chatUser.length > 0 ? (
              <button
                className="py-3 px-2 mt-9 rounded-md bg-slate-500 w-full text-md text-white font-medium"
                onClick={() => {
                  selectUser();
                  searchBar();
                }}
              >
                {chatUser}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

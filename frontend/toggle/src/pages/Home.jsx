import React, { useContext } from "react";
import { assets } from "../assets/assets";

const Home = () => {
  return (
    <section className="flex justify-center items-center bg-slate-200 dark:bg-gray-900 min-h-[46.9rem]">
      <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols12">
        <div className="flex flex-col sm:flex-row  mr-auto place-self-center px-3">
          <div className="flex  items-center lg:mt-0 lg:col-span-5 lg:hidden">
            <img
              className="object-contain w-52 h-36 rounded-lg lg:rounded-none lg:rounded-r-lg invert-0 dark:invert"
              src={assets.main_chat}
              alt="chat"
            />
          </div>
          <div>
            <h1 className="max-w-2xl mb-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-7xl dark:text-white">
              React Chat App
            </h1>
            <p className="max-w-2xl mb-6 font-normal text-gray-500 lg:mb-8 md:text-2xl lg:text-xl dark:text-gray-400">
              This is a realtime chat app built with react
            </p>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            className="object-contain w-full h-72 rounded-lg lg:rounded-none lg:rounded-r-lg"
            src={assets.main_chat}
            alt="chat"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chats from "./pages/Chats";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <NavBar />
      {/* <SearchBar /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<ProtectedRoute element={<Chats />} />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;

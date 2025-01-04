import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { data, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchUsername, setSearchUsername] = useState("");
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    const searchedUser = localStorage.getItem("searchedUser");
    if (searchedUser) {
      setUsernames(JSON.parse(searchedUser));
    }
  }, []);

  // search user
  const searchUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/search?username=${searchUsername}`
      );
      const data = await response.json();
      if (data) {
        const savedUser = localStorage.getItem("searchedUser");

        const usernamesArray = savedUser ? JSON.parse(savedUser) : [];

        const newUsername = data[0].username;
        if (!usernamesArray.includes(newUsername)) {
          usernamesArray.push(newUsername);
          localStorage.setItem("searchedUser", JSON.stringify(usernamesArray));
        }
      }
      setSelectedUser(data[0]);

      setChatUser(data[0].username); // Set the chat user to the found user
      setSearchUsername(""); // Clear the search input
      fetchMessages(data[0].username); // Fetch messages for the found user
    } catch (error) {
      toast.error("User does not exist");
    }
  };

  const getMessage = (username) => {
    setSelectedUser({ username: username });
    fetchMessages(username);
  };

  const fetchMessages = async (username) => {
    const user = localStorage.getItem("chatUser");

    const response = await fetch(
      `http://localhost:5000/message/${username}?user=${user}`
    );
    const data = await response.json();
    setMessages(data);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("chatUser");

    if (message && selectedUser) {
      try {
        const chatMessage = {
          sender: user, // Replace with actual username
          receiver: selectedUser.username,
          message: message,
        };

        await fetch("http://localhost:5000/send-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chatMessage),
        });

        setMessage(""); // Clear the message input
        socket.emit("message", chatMessage);
        fetchMessages(selectedUser.username); // Fetch updated messages
      } catch (error) {
        alert("Failed to send message");
      }
    }
    setMessage("");
  };

  const navigate = useNavigate();

  const auth = () => {
    const token = Cookies.get("jwt");
    if (token) {
      navigate("/");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 400) {
      const data = await response.json();
      const errorMessages = Object.values(data).filter(Boolean).join(", ");
      toast.error(errorMessages);
    } else {
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("chatUser", data.username);
        setChatUser(data.username);
        toast.success("Registration successful");
        Cookies.set("jwt", data.token);
        navigate("/");
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 400) {
      const data = await response.json();
      const errorMessages = Object.values(data).filter(Boolean).join(", ");
      toast.error(errorMessages);
    } else {
      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("chatUser", data.username);
        setChatUser(data.username);
        toast.success("Login successful");
        Cookies.set("jwt", data.token);
        navigate("/");
      }
    }
  };

  const logout = () => {
    Cookies.remove("jwt");
    navigate("/login");
  };
  const value = {
    handleLoginSubmit,
    formData,
    setFormData,
    handleSignUpSubmit,
    navigate,
    auth,
    messages,
    message,
    setMessage,
    sendMessage,
    searchUser,
    setSearchUsername,
    searchUsername,
    chatUser,
    selectedUser,
    usernames,
    getMessage,
    logout,
  };

  return (
    <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
  );
};

export default ChatContextProvider;

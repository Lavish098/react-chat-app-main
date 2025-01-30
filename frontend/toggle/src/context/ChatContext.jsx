import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { data, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

const socket = io("https://react-chat-app-main.onrender.com");

// https://react-chat-app-main.onrender.com

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
  const [chatUser, setChatUser] = useState([]);
  const [search, setSeacrh] = useState(false);
  const [online, setOnline] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    socket.on("message", (newMessage = { sender, receiver, message }) => {
      console.log(newMessage);

      // const newMessage = { sender, receiver, message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Update unread messages count
      setUnreadMessages((prev) => ({
        ...prev,
        [newMessage.sender]: (prev[newMessage.sender] || 0) + 1,
      }));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    // Listen for user status updates
    socket.on("userStatus", (data) => {
      console.log(data);

      const { userId, online } = data;
      console.log(userId, online);
      setOnline(userId, online);

      console.log(online);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const userId = localStorage.getItem("chatUser");
    socket.emit("registerUser", userId);
  });

  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
  };

  useEffect(() => {
    // Check if the view is mobile on initial render
    checkIfMobile();

    // Add event listener to handle window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const searchedUser = localStorage.getItem("searchedUser");
    if (searchedUser) {
      setUsernames(JSON.parse(searchedUser));
    }
  }, []);

  const toggleVisibility = () => {
    if (isMobile) {
      setIsVisible((prev) => !prev);
    }
  };

  //search bar
  const searchBar = () => {
    if (search) {
      setSeacrh(false);
    } else {
      setSeacrh(true);
    }
  };

  // search user
  const searchUser = async (e) => {
    setSpinner(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `https://react-chat-app-main.onrender.com/search?username=${searchUsername}`
      );
      const data = await response.json();
      console.log(data[0]);
      setSpinner(false);

      setSelectedUser(data[0]);
      setChatUser(data[0]);
      setSearchUsername(""); // Clear the search input
      fetchMessages(data[0].username); // Fetch messages for the found user
    } catch (error) {
      setSpinner(false);

      toast.error("User does not exist");
    }
  };

  const selectUser = () => {
    console.log("selected");

    if (chatUser > 0) {
      console.log(chatUser);
    }

    if (chatUser) {
      console.log(chatUser);

      const savedUser = localStorage.getItem("searchedUser");

      const usernamesArray = savedUser ? JSON.parse(savedUser) : [];

      const newUsername = chatUser;

      if (!usernamesArray.includes(newUsername)) {
        usernamesArray.push(newUsername.username);
        localStorage.setItem("searchedUser", JSON.stringify(usernamesArray));
      }
    }
    const searchedUser = localStorage.getItem("searchedUser");
    if (searchedUser) {
      setUsernames(JSON.parse(searchedUser));
    }
  };

  const getMessage = (username) => {
    setSelectedUser({ username: username });
    fetchMessages(username);
    localStorage.removeItem("unreadMessages");
  };

  const fetchMessages = async (username) => {
    const user = localStorage.getItem("chatUser");

    const response = await fetch(
      `https://react-chat-app-main.onrender.com/message/${username}?user=${user}`
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

        await fetch("https://react-chat-app-main.onrender.com/send-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chatMessage),
        });

        setMessage(""); // Clear the message input
        socket.emit("message", chatMessage);
        fetchMessages(selectedUser.username); // Fetch updated messages
      } catch (error) {
        console.log(error);

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

  //Authentication

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const response = await fetch(
      "https://react-chat-app-main.onrender.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.status === 400) {
      setSpinner(false);
      const data = await response.json();
      const errorMessages = Object.values(data).filter(Boolean).join(", ");
      toast.error(errorMessages);
    } else {
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("chatUser", data.username);
        localStorage.setItem("userId", data.userId);
        setChatUser(data);
        toast.success("Registration successful");
        Cookies.set("jwt", data.token);
        navigate("/");
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    setSpinner(true);
    e.preventDefault();
    const response = await fetch(
      "https://react-chat-app-main.onrender.com/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.status === 400) {
      setSpinner(false);
      const data = await response.json();
      const errorMessages = Object.values(data).filter(Boolean).join(", ");
      toast.error(errorMessages);
    } else {
      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("chatUser", data.username);
        localStorage.setItem("userId", data.userId);
        setChatUser(data);
        toast.success("Login successful");
        Cookies.set("jwt", data.token);
        navigate("/");
      }
    }
  };

  const logout = () => {
    Cookies.remove("jwt");
    setChatUser([]);
    localStorage.removeItem("chatUser");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  //Values
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
    searchBar,
    search,
    selectUser,
    online,
    spinner,
    unreadMessages,
    setUnreadMessages,
    isVisible,
    toggleVisibility,
  };

  return (
    <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
  );
};

export default ChatContextProvider;

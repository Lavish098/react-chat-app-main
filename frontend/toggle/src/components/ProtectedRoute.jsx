import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { navigate } = useContext(ChatContext);

  useEffect(() => {
    const token = Cookies.get("jwt");
    console.log(token);

    if (!token) {
      navigate("/login");
    }
  }, []);
  return element;
};

export default ProtectedRoute;

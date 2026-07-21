import React, { createContext, useState } from "react";
import { signupAPI } from "../services/authApi";
import { signinAPI } from "../services/authApi";

export const AuthContext = createContext({
  isAdmin:false,
  isAuthenticated:false,
  userEmail:"",
  token:null,
  logoutHandler: () => {},
  signup: (email, password) => {},
  signin: (email, password) => {},
});

const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const initialIsAdmin = localStorage.getItem("isAdmin") === "true";

  const [token, setToken] = useState(initialToken);
  const [userEmail, setUserEmail] = useState(initialEmail);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  async function signup(email, password) {
    try {
      const data = await signupAPI(email, password);
      
      return { success: true, message: "Signup successful" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error?.message || "Signup failed",
      };
    }
  }

   async function signin(email, password) {
    try {
      const data = await signinAPI(email, password);

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("email", email);
      localStorage.setItem("isAdmin", email.includes("@admin.com"));
        setToken(data.idToken);
        setUserEmail(email);
        setIsAdmin(email.includes("@admin.com"));
        setIsAuthenticated(true);
      
      return { success: true, message: "Signin successful" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error?.message || "Login failed",
      };
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    setToken(null);
    setUserEmail(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
  };

  const contextValue = {
    isAdmin,
    isAuthenticated,
    userEmail,
    token,
    logoutHandler,
    signup,
    signin
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  async function authenticateUser(username, password) {
    try {
      console.log("Attempting to login...");

      let data = { username, password };
      let res = await fetch(
        "https://powerpal-ij11.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("login fetch completed status", res.status);
      if (res.status !== 200) {
        console.log("Wrong credentials after login attempt");
        return null;
      } else {
        let user = await res.json();
        console.log("setting current user");
        setCurrentUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function registerUser(username, password, firstname, lastname, email) {
    try {
      console.log("Attempting to sign up...");

      let data = { username, password, firstname, lastname, email };
      let res = await fetch(
        "https://powerpal-ij11.onrender.com/api/users/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      //TODO check res for error specefications

      if (res.status !== 201) {
        console.log("Failed to register");
        const errorData = await res.json();
        setErrorMsg(errorData.error);
      } else {
        console.log("Registered successfully");
        await authenticateUser(username, password);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const value = {
    currentUser,
    setCurrentUser,
    authenticateUser,
    registerUser,
    errorMsg,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

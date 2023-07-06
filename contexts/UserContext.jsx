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
      email = email.toLowerCase();
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

  async function updateUser(username, firstname, lastname, email) {
    try {
      console.log("Attempting to update user...");
      const data = { username, firstname, lastname, email };
      const res = await fetch(
        `https://powerpal-ij11.onrender.com/api/users/update/details/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.status !== 200) {
        console.log("Failed to update user");
        const errorData = await res.json();
        setErrorMsg(errorData.error);
      } else {
        console.log("User updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function changePassword(oldPassword, newPassword) {
    try {
      console.log("Attempting to change user password...");
      const data = { oldPassword, newPassword };
      const res = await fetch(
        `https://powerpal-ij11.onrender.com/api/users/update/password/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.status !== 200) {
        console.log("Failed to change password");
        const errorData = await res.json();
        setErrorMsg(errorData.error);
      } else {
        console.log("Password changed successfully");
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
    updateUser,
    changePassword,
    errorMsg,
    setErrorMsg
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

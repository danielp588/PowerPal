import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [myStations, setMyStations] = useState([]);
  const [nameChangeModalVisible, setNameChangeModalVisible] = useState(false);
  const [stationNameChange, setStationNameChange] = useState();

  //user functions
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
        return false;
      } else {
        let user = await res.json();
        console.log("setting current user");
        setCurrentUser(user);
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  //password exposed when sending to server side - bonus todo
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
        console.log(errorData);
        alert(errorData.error);
      } else {
        alert("Updated successfuly! Log out to see the changes.");
        console.log("User updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function changePassword(oldPassword, newPassword) {
    try {
      console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
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
        alert(errorData);
      } else {
        console.log("Password changed successfully");
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        alert("Password changed!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //user's my station functions
  async function saveStation(station) {
    try {
      if (!currentUser) {
        alert("You must be logged in to save stations.");
        return;
      }

      console.log("Saving station to user's myStations...");
      console.log(station);
      let res = await fetch(
        `https://powerpal-ij11.onrender.com/api/users/addStation/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(station),
        }
      );

      if (res.status !== 200) {
        const errorData = await res.json();
        alert(errorData.msg);
        console.log(
          "Failed to save station to user's myStations. status: " + res.status
        );
        console.log(errorData.msg);
      } else {
        alert("Station saved.");
        console.log(
          "Station saved to user's myStations successfully. status: " +
            res.status
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteStation(stationId) {
    try {
      console.log("Deleting station from user's myStations...");
      console.log(stationId);

      let res = await fetch(
        `https://powerpal-ij11.onrender.com/api/users/deleteStation/${currentUser._id}/${stationId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status !== 200) {
        const errorData = await res.json();
        alert(errorData.msg);
        console.log(
          "Failed to delete station from user's myStations. status: " +
            res.status
        );
        console.log(errorData.msg);
      } else {
        alert("Station deleted.");
        console.log(
          "Station deleted from user's myStations successfully. status: " +
            res.status
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function loadMyStations() {
    try {
      console.log("Loading user's stations data");
      let res = await fetch(
        `https://powerpal-ij11.onrender.com/api/users/getStations/${currentUser._id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let data = await res.json();
      console.log(data)
      setMyStations(data);
      console.log("User's my stations loaded successfully");
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
    setErrorMsg,
    saveStation,
    loadMyStations,
    myStations,
    deleteStation,
    nameChangeModalVisible,
    setNameChangeModalVisible,
    stationNameChange,
    setStationNameChange
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

import { View, Text } from 'react-native'
import React, {createContext, useState} from 'react'

export const UserContext = createContext();
export default function UserContextProvider({children}) {

    const [currentUser, setCurrentUser] = useState([]);

    async function authenticateUser(username, password){
        try{
            console.log("Attempting to login...");
            let res = await fetch('http://192.168.1.22:3000/users');
            console.log("test");
            let data = await res.json();
            console.log(`hello ${data}`);
        }
        catch(error){
            console.error(error);
        }
    }

    const value = {
        currentUser,
        authenticateUser
    }

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}
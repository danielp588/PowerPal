import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

//testing - connecting client - server - mongo
const Menu = () => {
  const [users, setUsers] = useState([]);

  const LoadUsers = async () => {
    try {
      //expo cant read 'localhost' adress, so i switched to my ip adress for
      //the connection to work. might be different on other machines.port is still 3000
      let res = await fetch("http://192.168.1.118:3000/users");
      let data = await res.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    LoadUsers();
  }, []);

  return (
    <View>
      <Text>Users:</Text>
      {users.map((user) => (
        <Text>
          user's name: {user.firstname}
        </Text>
      ))}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});

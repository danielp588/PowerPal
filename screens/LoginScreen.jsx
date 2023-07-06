import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginMsg, setLoginMsg] = useState("");

  const { authenticateUser, currentUser } = useContext(UserContext);

  async function handleAuthenticateUser() {
    try {
      setLoginMsg("");
      setLoginMsg("Logging in...");
      await authenticateUser(username, password);
      currentUser ? setLoginMsg("") : setLoginMsg("Try again");
    } catch (error) {
      console.error(error);
    }
  }

  function handleSignUp() {
    navigation.navigate("SignUpScreen");
  }

  return (
    <View>
      <Text style={styles.header}>Login</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Text style={styles.msgText}>{loginMsg}</Text>
        <View style={{marginHorizontal: 12}}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4ECB71" }]}
            onPress={handleAuthenticateUser}
          >
            <View>
              <Text style={styles.buttontext}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <View>
              <Text style={styles.buttontext}>Sign up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 35,
    marginLeft: 12,
    fontSize: 35,
    textAlign: "left",
    fontWeight: "bold",
  },
  msgText: {
    marginLeft: 12,
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
  button: {
    padding: 15,
    backgroundColor: "#476BE6",
    fontSize: 16,
    width: "100%",
    alignSelf: "center",
    margin: 10,
    borderRadius: 30,
  },
  buttontext: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 22,
  },
});

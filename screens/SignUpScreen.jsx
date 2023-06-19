import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [signUpMsg, setSignUpMsg] = useState("");
  const [signUpProcess, setSignUpProccess] = useState(false);

  const { registerUser, currentUser, errorMsg } = useContext(UserContext);

  async function handleRegister() {
    try {
      setSignUpMsg("Registering...");
      await registerUser(username, password, firstname, lastname, email);
      setSignUpProccess(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    //using use effect in order to render the current user immediatly after a successful sign up

    //checking if a handleRegister has been triggered, and not in the render of the page
    if (signUpProcess) {
      !currentUser
        ? setSignUpMsg(errorMsg)
        : navigation.navigate("TabNavigator");

      setSignUpProccess(false);
    }
  }, [signUpProcess]);

  return (
    <View>
      <ScrollView>
        <Text style={styles.header}>Welcome!</Text>
        <Text style={styles.headerSmall}>Please fill in the fields</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            placeholder="First name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            placeholder="Last name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            keyboardType='email-address'
            placeholder="email@mail.com"
          />
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
          <Text style ={{marginLeft: 12}}>{signUpMsg}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4ECB71" }]}
            onPress={handleRegister}
          >
            <View>
              <Text style={styles.buttontext}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 12,
    fontSize: 35,
    textAlign: "left",
  },
  headerSmall: {
    marginLeft: 12,
    fontSize: 20,
    textAlign: "left",
  },
  msgText: {
    marginLeft: 12,
    marginBottom: 24,
    fontSize: 16,
    color: "red",
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
    width: 200,
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

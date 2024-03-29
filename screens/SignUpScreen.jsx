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
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [signUpMsg, setSignUpMsg] = useState("");
  const [signUpProcess, setSignUpProccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const { registerUser, currentUser, errorMsg } = useContext(UserContext);

  async function handleRegister() {
    // ========== [Username Validations] ==========
    // Username Length 4 - 24 characters
    if (username.length < 4 || username.length > 24)
      return alert("Username must contain 4-24 characters!");
    // Username A-z & 0-9 only
    for (let i = 0; i < username.length; i++) {
      if (
        (username[i] < "A" || username[i] > "Z") &&
        (username[i] < "a" || username[i] > "z") &&
        (username[i] < "0" || username[i] > "9")
      )
        return alert(
          "Username may only contain English characters and numbers!"
        );
    }

    // ========== [Password Validations] ==========
    // Password Length 6 - 32 characters
    if (password.length < 6 || username.length > 32)
      return alert("Password must contain 6-32 characters!");
    // Password contains lowercase, uppercase, and a number.
    let lowercase = false,
      uppercase = false,
      number = false;
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "a" && password[i] <= "z") lowercase = true;
      else if (password[i] >= "A" && password[i] <= "Z") uppercase = true;
      else if (password[i] >= "0" && password[i] <= "9") number = true;
    }
    if (!lowercase || !uppercase || !number)
      return alert("Password must contain lowercase, uppercase, and a number.");

    // ========== [Firstname Validations] ==========
    // Firstname Length 2 - 24 characters
    if (firstname.length < 2 || firstname.length > 24)
      return alert("Firstname must contain 2-24 characters!");
    // Firstname A-z only
    for (let i = 0; i < firstname.length; i++) {
      if (
        (firstname[i] < "A" || firstname[i] > "Z") &&
        (firstname[i] < "a" || firstname[i] > "z")
      )
        return alert("Firstname may only contain English characters!");
    }

    // ========== [Email Validations] ==========
    if (email[0] == ".") return alert("Invalid email address!");
    let at = false,
      dot = false;
    for (let i = 0; i < email.length; i++) {
      // contains only A-z, 0-9, .-_
      if (
        (email[i] < "A" || email[i] > "Z") &&
        (email[i] < "a" || email[i] > "z") &&
        (email[i] < "0" || email[i] > "9") &&
        email[i] != "." &&
        email[i] != "-" &&
        email[i] != "_" &&
        email[i] != "@"
      )
        return alert("Invalid email address!");
      if (email[i] == "@") {
        if (at) return alert("Invalid email address!");
        if (i < 2) return alert("Invalid email address!");
        if (email[i - 1] == ".") return alert("Invalid email address!");
        at = true;
      }
      if (at && email[i] == ".") {
        if (i == email.length - 1) return alert("Invalid email address!");
        dot = true;
      }
    }
    if (!at || !dot) return alert("Invalid email address!");

    try {
      setSignUpMsg("Registering...");
      await registerUser(username, password, firstname, lastname, email);
      setSignUpProccess(true);
    } catch (error) {
      console.error(error);
    }
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="chevron-back-outline" size={32} />
        </TouchableOpacity>
        <View>
          <Text style={styles.header}>Welcome!</Text>
          <Text style={styles.headerSmall}>Please fill in the fields</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>Username</Text>
          <TextInput style={styles.input} onChangeText={setUsername} />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>First name</Text>
          <TextInput style={styles.input} onChangeText={setFirstName} />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>Last name</Text>
          <TextInput style={styles.input} onChangeText={setLastName} />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </ScrollView>
      <Text style={{ marginLeft: 12 }}>{signUpMsg}</Text>
      <View style={{ marginHorizontal: 12 }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4ECB71" }]}
          onPress={handleRegister}
        >
          <Text style={styles.buttontext}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "800",
    color: "#070033",
    marginTop: 30,
    marginLeft: 12,
    fontSize: 35,
    textAlign: "left",
  },
  headerContainer: {
    paddingBottom: 10,
    borderBottomColor: "#4ECB71",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-start",
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
  inputBox: {
    margin: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  fieldName: {
    fontWeight: "500",
    color: "#070033",
  },
  button: {
    padding: 15,
    width: "100%",
    backgroundColor: "#476BE6",
    fontSize: 16,
    alignSelf: "center",
    borderRadius: 30,
  },
  buttontext: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 22,
  },
  inputFocused: {
    borderColor: "#476BE6",
    borderWidth: 2,
  },
});

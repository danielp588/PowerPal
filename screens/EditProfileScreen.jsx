import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen() {
  const navigation = useNavigation();

  const { currentUser, updateUser } = useContext(UserContext);

  const [username, setUsername] = useState(currentUser.username);
  const [firstname, setFirstName] = useState(currentUser.firstname);
  const [lastname, setLastName] = useState(currentUser.lastname);
  const [email, setEmail] = useState(currentUser.email);

  async function handleEditDetails() {
    console.log("username: " + username);
    console.log("firstname: " + firstname);
    console.log("lastname: " + lastname);
    console.log("email: " + email);
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
      await updateUser(username, firstname, lastname, email);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  async function handleChangePassword() {
    try {
      navigation.navigate("ChangePassword");
    } catch (error) {
      console.error(error);
    }
  }

  const handleGoBack = () => {
    navigation.navigate("TabNavigator");
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="chevron-back-outline" size={32} />
        </TouchableOpacity>
        <Text style={styles.header}>Edit details</Text>
        {/*TODO this icon as a button and goes back a screen*/}
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>First name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            defaultValue={currentUser.firstname}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>Last name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            defaultValue={currentUser.lastname}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            defaultValue={currentUser.email}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            defaultValue={currentUser.username}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditDetails}>
          <Text style={styles.buttonText}>Edit details</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center" }}>or</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#476BE6" }]}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "800",
    color: "#070033",
    marginTop: 15,
    marginLeft: 8,
    fontSize: 35,
    textAlign: "left",
  },
  headerContainer: {
    paddingBottom: 10,
    borderBottomColor: "#4ECB71",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  headerSmall: {
    color: "#070033",
    fontSize: 28,
    textAlign: "left",
  },
  msgText: {
    marginLeft: 12,
    marginBottom: 24,
    fontSize: 16,
    color: "red",
  },
  input: {
    marginHorizontal: 5,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  inputBox: {
    margin: 10,
  },
  fieldName: {
    fontWeight: "500",
    color: "#070033",
  },
  buttonContainer: {
    marginHorizontal: 12,
  },
  button: {
    padding: 15,
    backgroundColor: "#4ECB71",
    fontSize: 16,
    width: "100%",
    alignSelf: "center",
    margin: 7,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
  },
});

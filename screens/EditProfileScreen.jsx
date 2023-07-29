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

  const { currentUser, setCurrentUser, errorMsg, updateUser, changePassword } =
    useContext(UserContext);

  const [username, setUsername] = useState(currentUser.username);
  const [firstname, setFirstName] = useState(currentUser.firstname);
  const [lastname, setLastName] = useState(currentUser.lastname);
  const [email, setEmail] = useState(currentUser.email);

  async function handleEditDetails() {
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

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Edit details</Text>
        {/*TODO this icon as a button and goes back a screen*/}
        <Ionicons name="chevron-back-outline" size={32} />
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
    justifyContent: "space-between",
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
    flexDirection: "row",
  },
  button: {
    padding: 15,
    backgroundColor: "#4ECB71",
    fontSize: 16,
    maxWidth: "70%",
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

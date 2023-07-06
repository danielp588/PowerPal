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

export default function EditProfileScreen() {
  const navigation = useNavigation();

  const { currentUser, errorMsg, updateUser, changePassword } =
    useContext(UserContext);

  const [username, setUsername] = useState(currentUser.username);
  const [firstname, setFirstName] = useState(currentUser.firstname);
  const [lastname, setLastName] = useState(currentUser.lastname);
  const [email, setEmail] = useState(currentUser.email);
  const [editMsg, setEditMsg] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  async function handleEditDetails() {
    try {
      await updateUser(username, firstname, lastname, email);
      setEditMsg("Details edited successfuly, log out to see the updates");
    } catch (error) {
      setEditMsg(errorMsg);
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
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          {/*TODO add a back button so that people wont be confused*/}
          <Text style={styles.headerSmall}>Edit details</Text>
        </View>
        <View>
          <Text style={styles.fieldName}>First name</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onChangeText={setFirstName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultValue={currentUser.firstname}
          />
          <Text style={styles.fieldName}>Last name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            defaultValue={currentUser.lastname}
          />
          <Text style={styles.fieldName}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            defaultValue={currentUser.email}
          />
          <Text style={styles.fieldName}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            defaultValue={currentUser.username}
          />
        </View>
        <Text>{editMsg}</Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditDetails}>
          <Text style={styles.buttonText}>Edit details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    margin: 8,
  },
  scrollContainer: {
    height: "87%",
  },
  header: {
    fontWeight: "800",
    color: "#070033",
    fontSize: 35,
    textAlign: "left",
  },
  headerContainer: {
    paddingBottom: 10,
    borderBottomColor: "#476BE6",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
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
    borderRadius: 30,
  },
  inputFocused: {
    borderColor: "#4ECB71",
    borderWidth: 2,
  },
  fieldName: {
    fontWeight: "500",
    color: "#070033",
    margin: 5,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  button: {
    padding: 15,
    backgroundColor: "#476BE6",
    fontSize: 16,
    maxWidth: "50%",
    alignSelf: "center",
    margin: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
  },
});

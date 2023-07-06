import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect} from "react";
import { UserContext } from "../contexts/UserContext";

export default function ChangePasswordScreen() {
  const { setErrorMsg, errorMsg, changePassword } = useContext(UserContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConf, setNewPasswordConf] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  async function handleChangePassword() {
    try {
      setErrorMsg("");
      newPassword === newPasswordConf
        ? await changePassword(oldPassword, newPassword)
        : setErrorMsg("Password doesn't match the confirmation.");
    } catch (error) {}
  }

  useEffect(() => {
    setErrorMsg("");
  },[])

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          {/*TODO add a back button so that people wont be confused*/}
          <Text style={styles.headerSmall}>Change password</Text>
        </View>
        <View>
          <Text style={styles.fieldName}>Insert your old password</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onChangeText={setOldPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultValue="Old password"
          />
          <Text style={styles.fieldName}>Insert your new password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNewPassword}
            defaultValue="New password"
          />
          <Text style={styles.fieldName}>Confirm new password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNewPasswordConf}
            defaultValue="Confirm new password"
          />
        </View>
        <Text>{errorMsg}</Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
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

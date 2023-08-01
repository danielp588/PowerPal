import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const { changePassword } = useContext(UserContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConf, setNewPasswordConf] = useState("");

  async function handleChangePassword() {
    try {
      newPassword === newPasswordConf
        ? await changePassword(oldPassword, newPassword)
        : alert("Password doesn't match the confirmation.");
    } catch (error) {
      console.error(error);
    }
  }
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="chevron-back-outline" size={32} />
        </TouchableOpacity>
        <Text style={styles.header}>Change password</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>Old password</Text>
          <TextInput style={styles.input} onChangeText={setOldPassword} />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>New password</Text>
          <TextInput style={styles.input} onChangeText={setNewPassword} />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.fieldName}>Confirm new password</Text>
          <TextInput style={styles.input} onChangeText={setNewPasswordConf} />
        </View>
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
  header: {
    fontWeight: "800",
    color: "#070033",
    marginLeft: 8,
    fontSize: 30,
    textAlign: "left",
  },
  headerContainer: {
    marginTop: 14,
    paddingBottom: 14,
    marginBottom: 5,
    borderBottomColor: "#476BE6",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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
    alignSelf: "center",
    marginHorizontal:12
  },
  button: {
    padding: 15,
    backgroundColor: "#476BE6",
    fontSize: 16,
    width:"100%",
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

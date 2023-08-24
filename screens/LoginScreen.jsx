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

  //check why login msg is not shown
  async function handleAuthenticateUser() {
    try {
      setLoginMsg("");
      setLoginMsg("Logging in...");
      let loggedIn = authenticateUser(username, password);
      if (loggedIn) {
        setLoginMsg("");
        navigation.navigate("TabNavigator");
      } else {
        setLoginMsg("Try again");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleSignUp() {
    navigation.navigate("SignUpScreen");
  }

  return (
    <View style={{ backgroundColor: "#4ECB71" }}>
      <SafeAreaView>
        <View style={[{ backgroundColor: "#f0f8ff" }, { height: "100%" }]}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Login</Text>
            <Text style={styles.headerSmall}>
              Or sign up if you haven't yet!
            </Text>
          </View>

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
          <Text style={styles.msgText}>{loginMsg}</Text>
          <View style={{ marginHorizontal: 12 }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#476BE6" }]}
              onPress={()=> handleAuthenticateUser()}
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
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "800",
    color: "#070033",
    marginLeft: 8,
    fontSize: 35,
    textAlign: "left",
  },
  headerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: "#476BE6",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
  },
  headerSmall: {
    color: "#070033",
    fontSize: 20,
    marginLeft: 8,
    textAlign: "left",
  },
  msgText: {
    marginLeft: 12,
    fontSize: 16,
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
  button: {
    padding: 15,
    backgroundColor: "#4ECB71",
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

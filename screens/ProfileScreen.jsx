import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  function handleLogOut() {
    setCurrentUser(null);
  }

  function handleEditProfile() {
    navigation.navigate("EditProfile");
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Hello {currentUser.firstname}</Text>
        <Text style={styles.headerSmall}>These are your details</Text>
      </View>
      <View>
        <Text style={styles.fieldName}>First name: {currentUser.firstname}</Text>

        <Text style={styles.fieldName}>Last name: {currentUser.lastname}</Text>

        <Text style={styles.fieldName}>Email: {currentUser.email}</Text>

        <Text style={styles.fieldName}>Username: {currentUser.username}</Text>

        
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4ECB71" }]}
          onPress={handleLogOut}
        >
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    margin: 8,
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
    marginHorizontal: 5,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
  fieldName: {
    fontWeight: "500",
    color: "#070033",
    margin: 5,
    marginTop: 15,
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

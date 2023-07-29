import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
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
      <View style={styles.detailsBox}>
        <View style={styles.fieldBox}>
          <Text style={styles.fieldName}>First name:</Text>
          <Text>{currentUser.firstname}</Text>
        </View>
        <View style={styles.fieldBox}>
          <Text style={styles.fieldName}>Last name:</Text>
          <Text>{currentUser.lastname}</Text>
        </View>
        <View style={styles.fieldBox}>
          <Text style={styles.fieldName}>Email:</Text>
          <Text>{currentUser.email}</Text>
        </View>
        <View style={styles.fieldBox}>
          <Text style={styles.fieldName}>Username:</Text>
          <Text>{currentUser.username}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#476BE6" }]}
          onPress={handleLogOut}
        >
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontSize: 30 }}>TODO'S</Text>
        <Text>1. Edit profile - error handling with server side. input checks (no empty fields etc. take from register screen) </Text>
        <Text>2. Fast Find commponent. </Text>
        <Text>3. Linking to navigation app on "go there" press </Text>
        <Text>4. Search bar in the top of map screen.</Text>
        <Text>5. Menu screen (the fuck to add even?)</Text>
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
    marginBottom: 24,
    fontSize: 16,
    color: "red",
  },
  detailsBox: {
    backgroundColor: "rgba(128, 128, 128, 0.05)",
  },
  fieldBox: {
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "baseline",
  },
  fieldName: {
    fontWeight: "bold",
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
    backgroundColor: "#4ECB71",
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

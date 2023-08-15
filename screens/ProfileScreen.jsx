import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleLogOut = () => {
    setCurrentUser(null);
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: "#4ECB71" }}>
      <SafeAreaView>
        <View style={[{ backgroundColor: "white" }, { height: "100%" }]}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Ionicons name="chevron-back-outline" size={32} />
            </TouchableOpacity>
            <View>
              <Text style={styles.header}>Hello {currentUser.firstname}</Text>
              <Text style={styles.headerSmall}>These are your details</Text>
            </View>
          </View>
          <View style={styles.spaceBox}>
            <View>
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
                style={styles.button}
                onPress={handleEditProfile}
              >
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#476BE6" }]}
                onPress={handleLogOut}
              >
                <Text style={styles.buttonText}>Log out</Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 15,
    marginLeft: 8,
    fontSize: 35,
    textAlign: "left",
  },
  headerContainer: {
    flexDirection:"row",
    alignItems:"center",
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
  spaceBox: {
    flexDirection: "column",
    //to add space?
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
    marginHorizontal: 12,
  },
  button: {
    padding: 15,
    backgroundColor: "#4ECB71",
    fontSize: 16,
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
  },
});

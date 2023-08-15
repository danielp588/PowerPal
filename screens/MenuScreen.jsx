import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";

export default function MenuScreen({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenProfile = () => {
    navigation.navigate("Profile");
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    navigation.navigate("TabNavigator");
  };

  return (
    //view below sets the color for the phone bar that shows the time, battery etc.
    <View style={{ backgroundColor: "#4ECB71" }}>
      <SafeAreaView>
        <View style={[{ backgroundColor: "white" }, { height: "100%" }]}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.header}>Menu</Text>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Ionicons name="close-outline" size={36} />
            </TouchableOpacity>
          </View>
          <View style={styles.menuBox}>
            {currentUser ? (
              <TouchableOpacity
                style={{ paddingTop: 25 }}
                onPress={() => handleOpenProfile()}
              >
                <View style={styles.menuItem}>
                  <Ionicons name="person-outline" size={24} />
                  <Text style={styles.menuText}>Profile</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={{ paddingTop: 25 }}>
              <View style={styles.menuItem}>
                <Ionicons name="settings-outline" size={24} />
                <Text style={styles.menuText}>Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingTop: 25 }}>
              <View style={styles.menuItem}>
                <Ionicons name="information-circle-outline" size={24} />
                <Text style={styles.menuText}>Information</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingTop: 25 }}>
              <View style={styles.menuItem}>
                <Ionicons name="megaphone-outline" size={24} />
                <Text style={styles.menuText}>Contact us</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingTop: 25 }}>
              <View style={styles.menuItem}>
                <Ionicons name="code-slash-outline" size={24} />
                <Text style={styles.menuText}>About us</Text>
              </View>
            </TouchableOpacity>
            {currentUser ? (
              <TouchableOpacity
                style={{ paddingTop: 25 }}
                onPress={() => handleLogOut()}
              >
                <View style={styles.menuItem}>
                  <Ionicons name="power-outline" size={24} />
                  <Text style={styles.menuText}>Log out</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          {/* <View style={styles.logoContainer}>
            <Image
              source={require("../assets/icons/PowerPalLogo.png")}
              style={{ resizeMode: "contain", width: "75%" }}
            />
          </View> */}
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
    borderBottomColor: "#4ECB71",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  menuBox: {
    marginLeft: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuText: {
    fontSize: 20,
    color: "#070033",
  },
  backButton: {
    marginRight: 8,
  },
  logoContainer: {},
});

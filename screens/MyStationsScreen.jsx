import { StyleSheet, Text, View, ScrollView, Modal } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import MyStation from "../components/MyStation";
import { Ionicons } from "@expo/vector-icons";
import { checkPluginState } from "react-native-reanimated/lib/reanimated2/core";

export default function MyStationsScreen() {
  const {
    currentUser,
    loadMyStations,
    myStations,
    nameChangeModalVisible,
    setNameChangeModalVisible,
    stationNameChange,
    setStationNameChange,
  } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [newStationName, setNewStationName] = useState("");

  const toggleAccordion = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleCloseModal = () => {
    setNameChangeModalVisible(false);
    setNewStationName("");
  };

  const handleStationRename = async () => {
    if (newStationName == "") {
      alert("New station name cannot be empty.");
      return;
    }

    try {
      console.log("Renaming user's station");
      console.log("Sending new name -> " + newStationName);
      const data = { newName: newStationName };

      let res = await fetch(
        `https://powerpal-ij11.onrender.com/api/users/update/station-name/user-id=${currentUser._id}/station-id=${stationNameChange._id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      setNameChangeModalVisible(false);
      if (res.status !== 200) {
        const errorData = await res.json();
        alert(errorData);
        console.log("Failed to rename station" + res.status);
        console.log(errorData.msg);
      } else {
        alert("Station name change complete.");
        console.log("Station renamed successfully " + res.status);
        loadMyStations();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMyStations();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Stations</Text>
      </View>
      <ScrollView style={[{ marginBottom: 70 }]}>
        {myStations.length == 0 ? (
          <Text style={[{ marginTop: 20 }, { alignSelf: "center" }]}>
            Looks like you don't have any saved stations!
          </Text>
        ) : (
          myStations.map((station) => (
            <MyStation key={station._id} station={station} />
          ))
        )}
      </ScrollView>
      {nameChangeModalVisible ? (
        <Modal animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.nameChangeTitle}>Station name change</Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => handleCloseModal()}
                >
                  <Ionicons name="close-outline" size={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.subHeader}>Insert new name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewStationName}
                />
              </View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#476BE6" }]}
                onPress={() => handleStationRename()}
              >
                <View>
                  <Text style={styles.buttontext}>Rename</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 10,
    borderBottomColor: "#476BE6",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
  },
  header: {
    fontWeight: "800",
    color: "#070033",
    marginTop: 15,
    fontSize: 35,
    textAlign: "left",
    marginLeft: 8,
  },
  stationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  openContainer: {
    marginBottom: 20, // Increase margin to accommodate the expanded content
  },
  stationName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingBottom: 50,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  nameChangeTitle: {
    textAlign: "right",
    fontSize: 20,
    fontWeight: "bold",
  },
  subHeader: {
    fontWeight: "500",
    paddingBottom: 5,
  },
  button: {
    padding: 15,
    backgroundColor: "#4ECB71",
    fontSize: 16,
    width: "100%",
    alignSelf: "center",
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 30,
  },
  buttontext: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
});

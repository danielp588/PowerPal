import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

export default function MyStation({ station }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteStationActive, setDeleteStationActive] = useState(false);
  const { deleteStation, loadMyStations } = useContext(UserContext);

  const toggleAccordion = () => {
    console.log(station);
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleDeleteStation = async () => {
    await deleteStation(station._id);
    setDeleteStationActive(true);
  };

  const handleRenameStation = () => {
    alert("Rename station pressed.");
  };

  const openWaze = (latitude, longitude) => {
    const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    Linking.openURL(wazeUrl);
  };

  //refresh my stations after station deleted
  useEffect(() => {
    if (deleteStationActive) {
      loadMyStations();
      setDeleteStationActive(false);
      console.log("station load activated");
    }
  }, [deleteStationActive]);

  return (
    <TouchableOpacity
      style={[styles.stationContainer]}
      onPress={toggleAccordion}
      delayPressIn={150}
    >
      <View style={styles.stationHeader}>
        <Text style={styles.stationName}>{station.name}</Text>
        {isOpen ? (
          <Ionicons
            name="chevron-up-outline"
            size={28}
            style={{ color: "#070033" }}
          />
        ) : (
          <Ionicons
            name="chevron-down-outline"
            size={28}
            style={{ color: "#070033" }}
          />
        )}
      </View>
      {isOpen && (
        <View>
          <Text style={{ color: "#070033" }}>
            Address: {station.city}, {station.address}
          </Text>
          <Text style={{ color: "#070033" }}>
            Connector type: {station.connector}
          </Text>
          <Text style={{ color: "#070033" }}>
            Power supply: {station.power_supply} kW
          </Text>
        </View>
      )}
      {isOpen && (
        <View style={styles.actionsView}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#CA6060" }]}
            onPress={() => {
              handleDeleteStation();
            }}
          >
            <View style={styles.buttonInfo}>
              <Ionicons  color={"white"} name="trash-outline" size={18} />
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#476BE6" }]}
            onPress={() => {
              handleRenameStation();
            }}
          >
            <View style={styles.buttonInfo}>
              <Ionicons  color={"white"} name="create-outline" size={16} />
              <Text style={styles.buttonText}>Rename</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4ECB71" }]}
            onPress={() => {
              console.log(station);
              openWaze(station.lat, station.long);
            }}
          >
            <View style={styles.buttonInfo}>
              <Ionicons  color={"white"} name="arrow-redo-outline" size={18} />
              <Text style={styles.buttonText}>Go there</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  stationContainer: {
    borderWidth: 1,
    borderColor: "#070033",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "white",
  },
  stationHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  stationName: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 16,
    color: "#070033",
    maxWidth: "90%",
    marginRight: 5
  },
  button: {
    padding:12,
    borderRadius: 5,
    marginTop: 10,
    borderRadius: 30,
  },
  buttonInfo:{
    flexDirection:"row",
    alignItems:"center"
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  actionsView: {
    flexDirection: "row",
    justifyContent:"space-between"
  },
});

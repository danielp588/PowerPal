import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";

export default function MyStation({ station }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteStationActive, setDeleteStationActive] = useState(false);
  const { deleteStation, loadMyStations } = useContext(UserContext);

  const toggleAccordion = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleDeleteStation = async () => {
    await deleteStation(station.station_ID);
    setDeleteStationActive(true);
  };

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
        <Text style={styles.stationName}>{station.station_name}</Text>
        {isOpen ? (
          <Ionicons name="chevron-up-outline" size={28} style={{color:"#070033"}} />
        ) : (
          <Ionicons name="chevron-down-outline" size={28} style={{color:"#070033"}}/>
        )}
      </View>
      {isOpen && (
        <View>
          <Text style={{color:"#070033"}}>X: {station.X}</Text>
          <Text style={{color:"#070033"}}>Y: {station.Y}</Text>
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
            <View>
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4ECB71" }]}
            onPress={() => {
              //TODO link to navigation app
              alert("Go there pressed");
            }}
          >
            <View>
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
    padding:10,
    margin: 5,
    borderRadius: 5,
    backgroundColor:"white"
  },
  stationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center"
  },
  stationName: {
    fontWeight: "bold",
    fontSize: 16,
    color:"#070033"
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  actionsView: {
    flexDirection: "row",
  },
});

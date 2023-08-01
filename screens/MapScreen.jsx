import React, { useState, useEffect, useContext } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { Linking } from 'react-native';
const haversine = require("haversine");

export default function Map() {
  const { saveStation, setErrorMsg, loadMyStations, myStations, currentUser } =
    useContext(UserContext);
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [saveStationActive, setSaveStationActive] = useState(false);

  const navigation = useNavigation();

  const RequestLocation = async () => {
    console.log("Requesting connection from user");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    console.log("Connection granted from user");
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
  };

  const LoadStations = async () => {
    try {
      console.log("Loading stations data");
      //fetching GAS STATIONS, not electric car stations - havent recieved e-station API
      let res = await fetch(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=ef1d80ed-caa3-4ef8-a987-83ea2849ccaa&limit=20"
      );
      let data = await res.json();
      console.log(data.result.records);
      setStations(data.result.records);
      console.log("Stations data loaded from API");
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkerPress = (station) => {
    setSelectedStation(station);
    setModalVisible(true);
  };

  const handleSaveStation = async (station) => {
    let station_ID = station._id;
    let station_name = station.station_name;
    let X = station.X;
    let Y = station.Y;

    await saveStation(station_ID, station_name, X, Y);
    setSaveStationActive(true);
  };

  handleFastFindPress = async () => {
    if (!userLocation) {
      alert("Must grant access for location to use fast find.");
      return;
    }

    const start = {
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    };

    let end = {
      latitude: stations[0].Y,
      longitude: stations[0].X,
    };

    let shortestDistance = haversine(start, end);
    let closestStationIndex = 0;

    for (let i = 0; i < stations.length; i++) {
      let newEnd = {
        latitude: stations[i].Y,
        longitude: stations[i].X,
      };
      if (haversine(start, newEnd) < shortestDistance) {
        shortestDistance = haversine(start, newEnd);
        closestStationIndex = i;
      }
    }
    //handleMarkerPress(stations[closestStationIndex]);
    openWaze(stations[closestStationIndex].longitude, stations[closestStationIndex].latitude);
  };

  function openWaze(latitude, longitude){
    const wazeUrl = `waze://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    Linking.openURL(wazeUrl);
  };

  useEffect(() => {
    if (saveStationActive) {
      console.log("station load activated");
      loadMyStations();
      setSaveStationActive(false);
    }
  }, [saveStationActive]);

  useEffect(() => {
    RequestLocation();
    LoadStations();
  }, []);

  return (
    <View>
      <MapView style={styles.map}>
        {/*User's location*/}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            pinColor="blue"
          >
            <Callout>
              <Text>That's you</Text>
            </Callout>
          </Marker>
        )}
        {stations.map((station) => (
          <Marker
            key={station.station_number}
            title={station.station_name}
            icon={require("../src/images/station.png")}
            coordinate={{
              latitude: station.Y,
              longitude: station.X,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Callout onPress={() => handleMarkerPress(station)}>
              <View>
                <Text>{station.station_name}</Text>
                <TouchableOpacity style={styles.calloutButton}>
                  <View style={{ alignSelf: "center" }}>
                    <Text>Press for details</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {selectedStation ? (
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.stationName}>
                {selectedStation.station_name}
              </Text>
              <Text>Address: {selectedStation.address}</Text>
              <Text>Phone number: {selectedStation.telephone}</Text>
              <View style={styles.buttonsView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    currentUser
                      ? handleSaveStation(selectedStation)
                      : alert("You must be logged in to save stations.");
                  }}
                >
                  <View>
                    <Text style={styles.buttonText}>Save</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#4ECB71" }]}
                  onPress={() => alert("Go there pressed")}
                  //TODO link to navigation app
                >
                  <View>
                    <Text style={styles.buttonText}>Go There</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#CA6060" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <View>
                    <Text style={styles.buttonText}>Close</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
      <View>
        <TouchableOpacity
          style={[styles.fastFindButton]}
          onPress={() => {
            handleFastFindPress();
          }}
          activeOpacity={0.4}
        >
          <View style={styles.fastFindTextBox}>
            <Ionicons name="flash-outline" size={26} />
            <Text style={{ fontSize: 10 }}>Fast find</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.fastFindButtonShadow}>
          <Ionicons name="flash-outline" size={26} color={"#07003300"} />
          <Text style={[{ fontSize: 10 }, { color: "#07003300" }]}>
            Fast find
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  calloutButton: {
    backgroundColor: "#4ECB71",
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  stationName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#476BE6",
    padding: 15,
    borderRadius: 30,
    margin: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  fastFindTextBox: {
    alignItems: "center",
  },
  fastFindButton: {
    position: "absolute",
    zIndex: 10,
    bottom: 10,
    right: 10,
    backgroundColor: "#4ECB71",
    padding: 12,
    borderRadius: 50,
  },
  fastFindButtonShadow: {
    position: "absolute",
    zIndex: 1,
    bottom: 6,
    right: 10,
    backgroundColor: "#07003330",
    padding: 12,
    borderRadius: 50,
  },
});

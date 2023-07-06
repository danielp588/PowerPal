import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const RequestLocation = async () => {
    console.log("Requesting connection from user");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    console.log("Connection granted from user");
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const LoadStations = async () => {
    try {
      console.log("Loading stations data");
      //fetching GAS STATIONS, not electric car stations - just for practice from external API
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

  useEffect(() => {
    RequestLocation();
    LoadStations();
  }, []);

  return (
    <View>
      <MapView style={styles.map}>
        {stations.map((station) => (
          <Marker
            key={station.station_number}
            title={station.station_name}
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
              <Text>Adress: {selectedStation.address}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
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
    borderRadius: 5,
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
  closeButton: {
    backgroundColor: "#476BE6",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

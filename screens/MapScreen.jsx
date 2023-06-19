import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Modal } from "react-native";
import * as Location from "expo-location";
import Station from "../components/Station";
import { TouchableOpacity } from "react-native";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); //needs to be in context to use in station component

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
    console.log("Loading stations from mongoDB");
    try {
      //fetching GAS STATIONS, not electric car stations - just for practice from external API
      let res = await fetch(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=ef1d80ed-caa3-4ef8-a987-83ea2849ccaa&limit=20"
      );
      let data = await res.json();
      setStations(data.result.records);
      console.log("Stations data loaded from API");
      console.log(stations);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkerPress = (station) => {
    setSelectedStation(station);
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
            onPress={() => handleMarkerPress(station)} //works only after 2's press. TODO
          >
            {selectedStation == station && (
              <Callout>
                <Text>{selectedStation.station_name}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Text>Open details</Text>
                </TouchableOpacity>
              </Callout>
            )}
          </Marker>
        ))}
      </MapView>
      <Modal 
      visible={modalVisible}
       animationType="slide"
       style = {styles.container}
       >
        <Station {...selectedStation} />
        <TouchableOpacity
          style={[styles.button, styles.container]}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </Modal>
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
  button: {
    padding: 5,
    backgroundColor: "#4ECB71",
  },
});

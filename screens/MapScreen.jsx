import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [stations, setStations] = useState([]);

  const requestLocation = async () => {
    console.log("Requesting connection");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    console.log("Connection granted");
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const LoadStations = async () => {
    console.log("Loading stations from mongo");
    try {
      let res = await fetch("http://192.168.1.118:3000/stations");
      let data = await res.json();
      setStations(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestLocation();
    LoadStations();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.longitude);
    console.log(text);
  }

  return (
    <View>
      <MapView
        style={styles.map}
        // initialRegion={{
        //   latitude: location.coords.latitude,
        //   longitude: location.coords.longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      >
        {/*TEST marker which was taken from mongodb. only one for now
        TODO map.stations and show all markers for all stations from mongo. */}
        <Marker
          title={stations[0].name}
          coordinate={{
            latitude: stations[0].latitude,
            longitude: stations[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

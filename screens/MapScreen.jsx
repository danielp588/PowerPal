import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [stations, setStations] = useState([]);

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
      //expo cant read 'localhost' adress, so i switched to my ip adress for
      //the connection to work. might be different on other machines. port is still 3000
      let res = await fetch("http://192.168.1.118:3000/stations");
      let data = await res.json();
      setStations(data);
      console.log("Stations data loaded from mongoDB successfuly")
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    RequestLocation();
    LoadStations();
  }, []);

  return (
    <View>
      <MapView style={styles.map}>
        {/*below is marker which was taken from mongodb. only one for now 
        TODO show all markers for all stations from mongo (stations[0] -> stations.map()) */}
        {stations.length > 0 && (
          <Marker
            title={stations[0].name}
            coordinate={{
              latitude: stations[0].latitude,
              longitude: stations[0].longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        )}
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

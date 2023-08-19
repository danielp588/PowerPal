import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { Linking } from "react-native";
import filter from "lodash.filter";
import { ScreenContainer } from "react-native-screens";
import { Dimensions } from "react-native";

const haversine = require("haversine"); //todo drive time algorithm

export default function Map() {
  const { saveStation, loadMyStations, currentUser } = useContext(UserContext);
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [saveStationActive, setSaveStationActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFoundSearch, setIsFoundSearch] = useState(false);

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
      let res = await fetch(
        `https://powerpal-ij11.onrender.com/api/stations/limit=30`
      );
      let data = await res.json();
      setStations(data);
      console.log("Stations data loaded from API");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenMenu = () => {
    navigation.navigate("Menu");
  };

  const handleMarkerPress = (station) => {
    setSelectedStation(station);
    setModalVisible(true);
  };

  const handleSaveStation = async (station) => {
    await saveStation(station);
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
      latitude: stations[0].lat,
      longitude: stations[0].long,
    };

    let shortestDistance = haversine(start, end);
    let closestStationIndex = 0;

    for (let i = 0; i < stations.length; i++) {
      let newEnd = {
        latitude: stations[i].lat,
        longitude: stations[i].long,
      };
      if (haversine(start, newEnd) < shortestDistance) {
        shortestDistance = haversine(start, newEnd);
        closestStationIndex = i;
      }
    }

    handleMarkerPress(stations[closestStationIndex]);
  };

  const openWaze = (latitude, longitude) => {
    const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    Linking.openURL(wazeUrl);
  };

  const handleSearch = (query) => {
    setIsSearching(true);

    if (query == "") {
      setSearchQuery([]);
      setIsSearching(false);
      setIsFoundSearch(false);
      return;
    }

    //some data is case sensitive, change all to lowercase

    //all relevant stations that are found to match the query will be inserted into filteredData and shown in the search results.
    const filteredData = filter(stations, (item) => {
      return contains(item, query);
    });
    //data found, show it on screen, else shown a msg in app
    if (filteredData.length > 0) {
      setIsFoundSearch(true);
    } else {
      setIsFoundSearch(false);
    }
    setSearchQuery(filteredData);
  };

  const contains = ({ name, city, connector, power_supply }, query) => {
    //looking any relevant station details that are in the query.
    if (
      name.includes(query) ||
      city.includes(query) ||
      connector.includes(query) ||
      power_supply.includes(query)
    ) {
      return true;
    }
    return false;
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
    //view below sets the color for the phone bar that shows the time, battery etc.
    <View style={{ backgroundColor: "#4ECB71" }}>
      <SafeAreaView>
        <MapView style={styles.map}>
          <View>
            <View style={styles.topActionBox}>
              <View style={styles.searchBox}>
                <Ionicons name="search-outline" size={24} />
                <View style={styles.inputBox}>
                  <TextInput
                    style={{ top: 22, left: 42 }}
                    placeholder="Search for station details..."
                    onChangeText={(query) => {
                      handleSearch(query);
                    }}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                  handleOpenMenu();
                }}
              >
                <Ionicons name="menu-outline" size={28} />
              </TouchableOpacity>
            </View>
            <View>
              {isSearching ? (
                <View style={styles.searchedStations}>
                  {isFoundSearch ? (
                    <FlatList
                      data={searchQuery}
                      keyExtractor={(item) => item._id}
                      renderItem={({ item }) => (
                        <View style={styles.listItem}>
                          <TouchableOpacity
                            onPress={() => {
                              handleMarkerPress(item);
                            }}
                          >
                            <Text style={styles.listItemText}>{item.name}</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  ) : (
                    <Text>Search for something else...</Text>
                  )}
                </View>
              ) : null}
            </View>
          </View>

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
              key={station._id}
              title={station.name}
              icon={require("../src/images/station.png")}
              coordinate={{
                latitude: station.lat,
                longitude: station.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Callout onPress={() => handleMarkerPress(station)}>
                <View>
                  <Text>{station.name}</Text>
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
                <Text style={styles.stationName}>{selectedStation.name}</Text>
                <Text>City: {selectedStation.city}</Text>
                <Text>Address: {selectedStation.address}</Text>
                <Text>Connector type: {selectedStation.connector}</Text>
                <Text>Power supply: {selectedStation.power_supply} kW</Text>
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
                    onPress={() =>
                      openWaze(selectedStation.lat, selectedStation.long)
                    }
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
              <Ionicons color={"white"} name="flash-outline" size={26} />
              <Text style={{ fontSize: 10, color: "white" }}>Fast find</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.fastFindButtonShadow}>
            <Ionicons name="flash-outline" size={26} color={"#07003300"} />
            <Text style={[{ fontSize: 10 }, { color: "#07003300" }]}>
              Fast find
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  topActionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  searchBox: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  inputBox: {
    width: "85%",
  },
  menuButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 9,
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchedStations: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 10,
    borderRadius: 10,
    maxHeight: Dimensions.get("window").height / 2,
  },
  listItem: {
    padding: 8,
  },
  listItemText: {
    textAlign: "right",
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
    textAlign: "right",
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
    bottom: 4,
    alignSelf: "center",
    backgroundColor: "#476BE6",
    padding: 12,
    borderRadius: 50,
  },
  fastFindButtonShadow: {
    position: "absolute",
    zIndex: 1,
    bottom: 2,
    alignSelf: "center",
    backgroundColor: "#476BE670",
    padding: 12,
    borderRadius: 50,
  },
});

import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import MyStation from "../components/MyStation";

export default function MyStationsScreen() {
  const { currentUser, loadMyStations, myStations } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prevOpen) => !prevOpen);
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
            <MyStation key={station.station_ID} station={station} />
          ))
        )}
      </ScrollView>
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
    marginTop:15,
    fontSize: 35,
    textAlign: "left",
    marginLeft:8
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
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#476BE6",
    padding: 15,
    borderRadius: 5,
    margin: 15,
  },
});

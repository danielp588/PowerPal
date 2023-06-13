import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Station = (station) => {
  return (
    <View style={styles.container}>
      <Text>{station.name}</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Go there</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Station;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 5,
    margin: 5,
    backgroundColor: "#4ECB71",
  },
});

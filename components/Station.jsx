import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Station = (station) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{station.name}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Go there</Text>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#4ECB71",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
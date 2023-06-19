import { StyleSheet,View, Text } from "react-native";
import React from "react";

export default function MenuScreen() {
  return (
    <View>
      <Text style={styles.header}>Menu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 12,
    fontSize: 35,
    textAlign: "left",
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import MyStations from "../screens/MyStationsScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="My stations" component={MyStations} />
      <Drawer.Screen name="Information" component={MyStations} />
      <Drawer.Screen name="Contact us" component={MyStations} />
      <Drawer.Screen name="Help center" component={MyStations} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

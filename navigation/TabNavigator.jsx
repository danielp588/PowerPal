import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import MapScreen from "../screens/MapScreen";
import MyStationsScreen from "../screens/MyStationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { UserContext } from "../contexts/UserContext";
import LoginScreen from "../screens/LoginScreen";
import DrawerNavigator from "./DrawerNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const { currentUser } = useContext(UserContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { color: "#070033", paddingBottom: 5 },
        tabBarStyle: { height: 55 },
      }}
      initialRouteName="Map"
    >

      {
        currentUser
          ?
          <>
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ focused }) => {
                  let focusedColor;
                  focused ? (focusedColor = "#4ECB71") : (focusedColor = "#070033");
                  return (
                    <Ionicons name="person-outline" color={focusedColor} size={28} />
                  );
                },
              }}
            />

            <Tab.Screen
              name="MyStations"
              component={MyStationsScreen}
              options={{
                tabBarLabel: "My Stations",
                tabBarIcon: ({ focused }) => {
                  let focusedColor;
                  focused ? (focusedColor = "#4ECB71") : (focusedColor = "#070033");
                  return (
                    <Ionicons
                      name="location-outline"
                      color={focusedColor}
                      size={28}
                    />
                  );
                },
              }}
            />
          </>
          :
          <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{
                tabBarLabel: "Login",
                tabBarIcon: ({ focused }) => {
                  let focusedColor;
                  focused ? (focusedColor = "#4ECB71") : (focusedColor = "#070033");
                  return (
                    <Ionicons name="person-outline" color={focusedColor} size={28} />
                  );
                },
              }}
            />
      }

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: "map",
          tabBarIcon: ({ focused }) => {
            let focusedColor;
            focused ? (focusedColor = "#4ECB71") : (focusedColor = "#070033");
            return (
              <Ionicons name="map-outline" color={focusedColor} size={28} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={DrawerNavigator}
        options={{
          tabBarLabel: "menu",
          tabBarIcon: ({ focused }) => {
            let focusedColor;
            focused ? (focusedColor = "#4ECB71") : (focusedColor = "#070033");
            return (
              <Ionicons name="menu-outline" color={focusedColor} size={32} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

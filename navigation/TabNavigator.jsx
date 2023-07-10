import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { UserContext } from "../contexts/UserContext";
import MapScreen from "../screens/MapScreen";
import MyStationsScreen from "../screens/MyStationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import MenuScreen from "../screens/MenuScreen";


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
      
      { currentUser ? (
        <>
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ focused }) => {
                let focusedColor;
                focused
                  ? (focusedColor = "#4ECB71")
                  : (focusedColor = "#070033");
                return (
                  <Ionicons
                    name="person-outline"
                    color={focusedColor}
                    size={28}
                  />
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
                focused
                  ? (focusedColor = "#4ECB71")
                  : (focusedColor = "#070033");
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
          <Tab.Screen
            name="QuickSearch"
            component={ProfileScreen}
            options={{
              tabBarLabel: "Quick Search",
              tabBarIcon: ({ focused }) => {
                let focusedColor;
                focused
                  ? (focusedColor = "#4ECB71")
                  : (focusedColor = "#070033");
                return (
                  <Ionicons
                    name="md-search-outline"
                    color={focusedColor}
                    size={28}
                  />
                );
              },
              tabBarStyle: {
                backgroundColor: "#F00",
              },
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarLabel: "Login",
            tabBarIcon: ({ focused }) => {
              let focusedColor;
              focused ? (focusedColor = "#4ECB71") : (focusedColor = "#070033");
              return (
                <Ionicons
                  name="log-in-outline"
                  color={focusedColor}
                  size={28}
                />
              );
            },
          }}
        />
      )}

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
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
        component={MenuScreen}
        options={{
          tabBarLabel: "Menu",
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

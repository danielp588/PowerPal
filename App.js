import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./navigation/TabNavigator";
import UserContextProvider from "./contexts/UserContext";
import SignUpScreen from "./screens/SignUpScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";

import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "./screens/MenuScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabNavigator"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
          <Stack.Screen name="Menu" component={MenuScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

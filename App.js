import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
<<<<<<< Updated upstream
import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from './contexts/UserContext';
=======
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
>>>>>>> Stashed changes

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </UserContextProvider>
  );
}



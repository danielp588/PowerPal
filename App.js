import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from './contexts/UserContext';
export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </UserContextProvider>
  );
}



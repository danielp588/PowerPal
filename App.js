import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
  );
}



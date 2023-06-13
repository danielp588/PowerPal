import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useContext} from 'react'
import { UserContext } from '../contexts/UserContext'

export default function Profile() {

    const {currentUser} = useContext(UserContext);

  return (
    <View>
      <Text>Profile</Text>
        <Text style={styles.header}>{currentUser.username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    marginTop: 35,
    fontSize: 35,
    textAlign: 'center'
  }
});

import { View, Text, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { UserContext } from '../contexts/UserContext'

export default function Profile() {

    const {authenticateUser} = useContext(UserContext);

    function handleAuthenticateUser(){
      authenticateUser("test", "test123");
    }

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={handleAuthenticateUser}>
        <Text>Some touchable text</Text>
      </TouchableOpacity>
    </View>
  )
}
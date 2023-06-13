import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useContext, useState} from 'react'
import { UserContext } from '../contexts/UserContext';

export default function LoginScreen() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const {authenticateUser, currentUser} = useContext(UserContext);
    function handleAuthenticateUser(){
        authenticateUser(username, password);
        currentUser ? alert(`Welcome ${currentUser.username}`) : alert(`Invalid credentials!`);
    }

  return (
    <View>
      <Text style={styles.header}>Login</Text>
      <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleAuthenticateUser}>
        <View style={styles.button}>
            <Text style={styles.buttontext}>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.button2}>
            <Text style={styles.buttontext}>Sign Up</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        marginTop: 35,
        fontSize: 35,
        textAlign: 'center'
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button:{
        padding: 20,
        backgroundColor: '#4ecb71',
        fontSize: 22,
        width: 200,
        alignSelf: 'center',
        margin: 25,
        borderRadius: 10
    },
    button2:{
        padding: 15,
        backgroundColor: '#070033',
        fontSize: 22,
        width: 200,
        alignSelf: 'center',
        margin: 25,
        borderRadius: 10
    },
    buttontext:{
        color:'#FFF',
        textAlign: 'center',
        fontSize: 22,
    }
  });
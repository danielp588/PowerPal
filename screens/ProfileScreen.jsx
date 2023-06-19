import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [isEditable, setIsEditable] = useState(false);

  function handleOpenEdit() {
    setIsEditable(true);
  }

  function handleLogOut() {
    setCurrentUser(null);
  }

  
  useFocusEffect(
    React.useCallback(() => {
      setIsEditable(false);
    }, []));


    //TODO add labels above each input field

    //Current field should only be opened after "edit details" is pressed
    //regular profile screen presented without input form
  return (
    <View>
      <Text style={styles.header}> Hello {currentUser.firstname}</Text>
      <ScrollView>
        <Text style={styles.headerSmall}>These are your details</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            placeholder={currentUser.firstname}
            editable={isEditable}
          />
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            placeholder={currentUser.lastname}
            editable={isEditable}
          />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            placeholder={currentUser.email}
            editable={isEditable}
          />
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            placeholder={currentUser.username}
            editable={isEditable}
          />
          <TextInput
          //TODO password as dots
          //consider the eye icon that shows you your password
            style={styles.input}
            onChangeText={setPassword}
            placeholder={currentUser.password}
            secureTextEntry={true}
            editable={isEditable}
          />

          <View style={{flexDirection: 'row', alignSelf: "center",}}>
            <TouchableOpacity style={styles.button} onPress={handleOpenEdit}>
              <View>
                <Text style={styles.buttontext}>Edit details</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{ backgroundColor: "#4ECB71"}]} onPress={handleLogOut}>
              <View>
                <Text style={styles.buttontext}>Log out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 12,
    fontSize: 35,
    textAlign: "left",
  },
  headerSmall: {
    marginLeft: 12,
    fontSize: 20,
    textAlign: "left",
  },
  msgText: {
    marginLeft: 12,
    marginBottom: 24,
    fontSize: 16,
    color: "red",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
  button: {
    padding: 15,
    backgroundColor: "#476BE6",
    fontSize: 16,
    maxWidth: "50%",
    alignSelf: "center",
    margin: 10,
    borderRadius: 30,
  },
  buttontext: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
  },
});

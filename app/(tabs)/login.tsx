import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from "../../firebase/firebaseSetup.js";

export default function LoginScreen() {
  const [isOwner, setIsOwner] = useState(false);
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const [name, setName] = useState('');
  const router = useRouter();

  const toggleSwitch = () => setIsOwner((previousState) => !previousState);

  const handleCreateAccount = () => {
    async function createUser() {
      try {
        await createUserWithEmailAndPassword(auth, email, passowrd);
        await setDoc(doc(db, "users", email), {
          name: name,
          is_owner: isOwner
        });
        setEmail('');
        setPassword('');
        setName('');
        router.push(`/mapScreen?isOwner=${isOwner}`);
      } catch (error) {
        console.error("Couldn't create account:", error);
      }
    }

    createUser();
  };

  return (
    <>
    <SafeAreaView>
        <View>
          <Text style={{ fontSize: 50, textAlign: "center" }}>
            Create Account
          </Text>
        </View>
        <View>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                    <Text style={{ fontSize: 25 }}> Log in </Text>
                  </TouchableOpacity>
            <TextInput
              style = {styles.CheckInInput}
              onChangeText={setEmail}
              value={email}
              placeholder={"What is your email?"}
            />
            <TextInput 
              style = {styles.CheckInInput}
              onChangeText={setPassword}
              value={passowrd}
              placeholder={"What is your passowrd?"}
              secureTextEntry={true}
            />
            <TextInput
              style = {styles.CheckInInput}
              onChangeText={setName}
              value={name}
              placeholder={"What is your name?"}
            />
            <View style={styles.container}>
              <Text style={styles.switchText}> Are you an owner? </Text>
              <Switch onValueChange={toggleSwitch} value={isOwner} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e7cbf5",
    padding: 15,
    alignItems: "center",
    marginHorizontal: 75,
    marginTop: 50,
    marginBottom: 30
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    marginHorizontal: 35,
    marginTop: 10,
    paddingLeft: 5,
  },
  CheckInInput: {
    marginHorizontal: 40,
    marginTop: 10,
    paddingLeft: 5,
    backgroundColor: "#d6d6d6",
    borderRadius: 4
  },
  link: {
  textAlign: "center",
  color: "#0000EE",
  fontSize: 15,
  marginTop: 10,
  textDecorationLine: 'underline'
  },
});

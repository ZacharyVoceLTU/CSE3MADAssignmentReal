import React, { useState } from "react";

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../../firebase/firebaseSetup.js";

export default function HomeScreen() {
  const router = useRouter();

  function handleCreateAccount() {
    router.push("/login");
  }

  return (
    <>
      <SafeAreaView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 50 }}>Check In</Text>
        </View>
        <UserLogin></UserLogin>
        <TouchableOpacity onPress={handleCreateAccount}
        testID = "t1" style={styles.link}>
          <Text >Create an account</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

export function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setfailedLogin] = useState(false);

  const router = useRouter();

  function handleLogin() {
    async function signIn() {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        const docSnap = await getDoc(doc(db, 'users', email));
        if (docSnap.exists()) {
          const isOwner: boolean = docSnap.data().is_owner;
          setEmail('');
          setPassword('');
          setfailedLogin(false);
          router.push(`/mapScreen?isOwner=${isOwner}`);
        }
      } catch (error) {
        console.error("Couldn't login: ", error);
        setfailedLogin(true);
      }
    }

    signIn();
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ fontSize: 25 }}> Log in </Text>
      </TouchableOpacity>
      <View>
        {failedLogin ? (
          <Text style={styles.LoginError}> Invalid login </Text>
        ) : (
          <></>
        )}
      </View>
      <TextInput
        style={styles.CheckInInput}
        placeholder=" Email..."
        value={email}
        onChangeText={setEmail}
        
      />
      <TextInput
        style={styles.CheckInInput}
        placeholder=" Passowrd..."
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
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
  LoginError: {
    textAlign: 'center',
    color: 'red',
    marginBottom: -5
  }
});

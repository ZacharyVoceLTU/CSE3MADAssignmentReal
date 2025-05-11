import React, { useState } from "react";

import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseSetup.js";

export default function HomeScreen() {
  const router = useRouter();

  function handleCreateAccount() {
    router.push("/login");
  }

  return (
    <>
      <SafeAreaView style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 50 }}>Check In</Text>
      </SafeAreaView>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.link}>Create an account</Text>
      </TouchableOpacity>
      <UserLogin title="Customer"></UserLogin>
      <OwnerLogin title="Owner"></OwnerLogin>
    </>
  );
}

export function UserLogin({ title }: { title: string }) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [carModel, setCarModel] = useState("");

  const router = useRouter();

  function handleLogin() {
    async function signIn() {
      try {
        await signInWithEmailAndPassword(auth, email, phoneNumber);
        // TODO: Use Contetx API to provide global access to isOwner from firestore
        router.push("/mapScreen");
      } catch (error) {
        console.error("Couldn't login: ", error);
      }
    }

    signIn();
  }

  // TODO: Change to only generic login screen
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ fontSize: 25 }}> {title} </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.CheckInInput}
        placeholder="Your name"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.CheckInInput}
        placeholder="Your Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.CheckInInput}
        placeholder="Your Address"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.CheckInInput}
        placeholder="Your Car Manufacturer"
        value={carModel}
        onChangeText={setCarModel}
      />
    </>
  );
}

export function OwnerLogin({ title }: { title: string }) {
  const [shopName, setShopName] = useState("");

  const router = useRouter();

  function handleLogin() {
    
    router.push("/mapScreen");
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ fontSize: 25 }}> {title} </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.CheckInInput}
        placeholder="Your shop name"
        value={shopName}
        onChangeText={setShopName}
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
    marginVertical: 50,
  },
  CheckInInput: {
    marginHorizontal: 40,
    paddingLeft: 5,
  },
  link: {
    textAlign: "center",
    color: "#0000EE",
    fontSize: 15,
  },
});

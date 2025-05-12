import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

export default function editDetails() {
  const [specailise, setSpecialise] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <>
      <SafeAreaView style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 50 }}> Edit Details </Text>
      </SafeAreaView>

      <View>
        <Text style={styles.inputHeading}> Change Specialise </Text>
        <TextInput
          style={styles.input}
          onChangeText={setSpecialise}
          value={specailise}
        />
      </View>
      <View>
        <Text style={styles.inputHeading}> Change Notes </Text>
        <TextInput style={styles.input} onChangeText={setNotes} value={notes} />
      </View>

      <ChangeContacts />
    </>
  );
}

function ChangeContacts() {
  const router = useRouter();
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  function handleSave() {
    // Upload to firestore
    router.push("/markerDetails");
  }
  
  // Use setDoc merge true

  return (
    <>
      <View>
        <Text style={styles.inputHeading}> Change Contacts</Text>
        <View>
          <Text style={styles.inputSubHeading}> Update Phone No. </Text>
          <TextInput
            style={styles.input}
            onChangeText={setPhoneNo}
            value={phoneNo}
          />
        </View>
        <View>
          <Text style={styles.inputSubHeading}> Update Email </Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text> Save </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  inputHeading: {
    fontSize: 25,
    marginHorizontal: 70,
  },
  inputSubHeading: {
    marginHorizontal: 70,
  },
  input: {
    backgroundColor: "#d6d6d6",
    marginHorizontal: 70,
    paddingBottom: 50,
    marginBottom: 20,
  },
  saveButton: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#e7cbf5",
    marginHorizontal: 70,
  },
});

import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseSetup.js";

export default function editDetails() {
  const [specailise, setSpecialise] = useState("");
  const [notes, setNotes] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const params = useLocalSearchParams();
  const place_id = params.place_id as string;

  useEffect(() => {
    async function getMarkerDetails() {
      try {
        const docRef = doc(db, "mechanic_markers", place_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) { 
          setNotes(docSnap.data().note);
          setSpecialise(docSnap.data().specialise);
          setEmail(docSnap.data().email);
          setPhoneNo(docSnap.data().phone_number);
        }
      } catch (error) {
        console.error("Could not fetch data from firestore: ", error);
      }
    }

    getMarkerDetails();
  }, [place_id]);

  function handleSave() {
    const saveData = async () => {
      try {
        await setDoc(doc(db, "mechanic_markers", place_id), {
          note: notes,
          specialise: specailise,
          email: email,
          phone_number: phoneNo,
        }, {merge: true});
        //setTimeout(() => {
          router.push(`/markerDetails?place_id=${place_id}&isOwner=${true}&updated=${Date.now()}`);
        //}, 500);
      } catch (error) {
        console.error("Couldn't save:", error);
      }
    };

    saveData();
  }

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

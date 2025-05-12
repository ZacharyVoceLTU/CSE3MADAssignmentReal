import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseSetup.js";

export default function Details() {
  // Access markerDetails from firestore using place_id as primary key, use Async
  const [avaliable, setAvaliable] = useState(false);
  const [name, setName] = useState("mechanic");
  const [address, setAddress] = useState("");
  const [Specialise, setSpecialise] = useState(""); // Set by owner themselves
  const [notes, setNotes] = useState(""); // Set by oowner themselves
  const [phoneNo, setphoneNo] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const params = useLocalSearchParams();
  const place_id = params.place_id as string;
  const isOwner = params.isOwner === 'true';

  function handleEdit() {
    router.push("/editDetails");
  }

  function handleBack() {
    router.push('/mapScreen')
  }

  useEffect(() => {
    async function getMarkerDetails() {
      try {
        const docRef = doc(db, "mechanic_markers", place_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().mechanic_name);
          setAddress(docSnap.data().address);
          setphoneNo(docSnap.data().phone_number);
          setWebsite(docSnap.data().website);
          setNotes(docSnap.data().note);
          setSpecialise(docSnap.data().specialise);
          setEmail(docSnap.data().email)
        }
      } catch (error) {
        console.error("Could not fetch data from firestore: ", error);
      }
    }

    getMarkerDetails();
  }, [place_id]);

  if (name === "") {
    <>
      <Text> Fetching data </Text>
    </>
  }

  return (
    <>
      <SafeAreaView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, textAlign: 'center' }}> {name} </Text>
        </View>

        <View style={styles.available}>
          {" "}
          {avaliable ? <Text> Available </Text> : <Text> Not avaliable </Text>}
        </View>
        <View style={styles.info}>
          <Text> Specialise </Text>
          <Text> {Specialise} </Text>
        </View>
        <View style={styles.info}>
          <Text> Notes </Text>
          <Text>located: {address} {'\n'} 
            {notes} 
          </Text>
        </View>
        <View style={styles.info}>
          <Text> Contacts </Text>
          <Text>
            Phone No.:{phoneNo} {'\n'}
            Email: {email }{'\n'}
            Website {website} {'\n'}
          </Text>
        </View>
        <View>
          {isOwner ? (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text> Edit Shop Details </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleBack}>
          <Text> Back to Map </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  available: {
    alignItems: "center",
    backgroundColor: "#f0e6f5",
    marginTop: 30,
    marginHorizontal: 90,
    borderColor: '#ffffff',
    paddingVertical: 15
  },
  info: {
    alignItems: "center",
    backgroundColor: "#f0e6f5",
    marginTop: 30,
    marginHorizontal: 70,
    borderColor: '#ffffff'
  },
  editButton: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#e7cbf5",
    marginTop: 30,
    marginHorizontal: 70,
  },
});

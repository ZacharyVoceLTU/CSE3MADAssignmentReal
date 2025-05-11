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

  const router = useRouter();
  const params = useLocalSearchParams();
  const place_id = params.place_id as string;

  function handleEdit() {
    router.push("/editDetails");
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
        }
      } catch (error) {
        console.error("Could not fetch data from firestore: ", error);
      }
    }

    getMarkerDetails();
  }, [place_id]);

  const isOwner = false;

  if (name === "") {
    <>
      <Text> Fetching data </Text>
    </>;
  }

  // Only render button if firestore shop owner with ContextAPI
  return (
    <>
      <SafeAreaView style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}> {name} </Text>
      </SafeAreaView>

      <View style={styles.info}>
        {" "}
        {avaliable ? <Text> Available </Text> : <Text> Not avaliable </Text>}
        <Text> Hello </Text>
      </View>
      <View style={styles.info}>
        <Text> Specialise </Text>
        <Text> {Specialise} </Text>
      </View>
      <View style={styles.info}>
        <Text> Notes </Text>
        <Text> {notes} </Text>
      </View>
      <View style={styles.info}>
        <Text> Contacts </Text>
        <Text>
          {" "}
          {phoneNo} {website == "" ? "hello" : website}{" "}
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
    </>
  );
}

const styles = StyleSheet.create({
  info: {
    alignItems: "center",
    backgroundColor: "#e7cbf5",
    marginTop: 30,
    marginHorizontal: 70,
  },
  editButton: {
    alignItems: "center",
    backgroundColor: "#dbcffa",
    marginTop: 30,
    marginHorizontal: 70,
  },
});

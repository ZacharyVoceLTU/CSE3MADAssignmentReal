import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

export default function Details() {
  // Access markerDetails from firestore using place_id as primary key, use Async
  const [avaliable, setAvaliable] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [Specialise, setSpecialise] = useState("");
  const [notes, setNotes] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  function handleEdit() {
    router.push("/editDetails");
  }

  // Only render button if firestore shop owner with ContextAPI
  return (
    <>
      <SafeAreaView style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 50 }}> Details </Text>
      </SafeAreaView>

      <View style={styles.info}>
        {" "}
        {avaliable ? <Text> Available </Text> : <Text>not avaliable</Text>}
        <Text> Hello </Text>
      </View>
      <View style={styles.info}>
        <Text> Specialise </Text>
        <Text> Hello </Text>
      </View>
      <View style={styles.info}>
        <Text> Notes </Text>
        <Text> Hello </Text>
      </View>
      <View style={styles.info}>
        <Text> Contacts </Text>
        <Text> Hello </Text>
      </View>
      <View>
        {" "}
        {isOwner ? (
          <TouchableOpacity style={styles.editButton} 
                            onPress={handleEdit}>
            <Text> Edit Shop Details </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}{" "}
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

import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import { useRouter } from "expo-router";

export default function Details() {
  // Use router.useLocalSearchParams from mapScreen.tsx to get
  const [avaliable, setAvaliable] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [Specialise, setSpecialise] = useState("");
  const [notes, setNotes] = useState("");
  // Use array/object to store phoneNumber and email in one?
  const [contacts, setContacts] = useState({});

  const router = useRouter();

  function handleEdit() {
    router.push("/editDetails");
  }

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

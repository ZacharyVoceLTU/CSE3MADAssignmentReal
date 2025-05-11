import React, { useEffect, useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Location from "expo-location";
import { useRouter } from "expo-router";

import Constants from "expo-constants";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseSetup.js";

export default function MapScreen() {
  const router = useRouter();

  function handleBack() {
    router.push("/");
  }

  return (
    <>
      <SafeAreaView style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 50 }}>Map</Text>
      </SafeAreaView>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text> Back </Text>
      </TouchableOpacity>
      <Map />
    </>
  );
}

// Define the structure of a mechanic object returned from Google Places API
interface Mechanic {
  place_id: string; // used as a unique key
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Fetch nearby mechanics details
  useEffect(() => {
    const fetchLocationAndMechanics = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const nearbyMechanics = await getNearbyMechanics(
          location.coords.latitude,
          location.coords.longitude
        );
        setMechanics(nearbyMechanics);
        setLocation(location);
      } catch (err) {
        setError("Failed to fetch location or mechanics.");
        console.error(err);
      }
    };

    const getNearbyMechanics = async (
      latitude: number,
      longitude: number
    ): Promise<Mechanic[]> => {
      const apiKey = Constants.expoConfig?.extra?.API_KEY;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=car_repair&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        return (
          data.results?.map((result: any) => ({
            place_id: result.place_id,
            name: result.name,
            address: result.formatted_address,
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching nearby mechanics:", error);
        return [];
      }
    };

    fetchLocationAndMechanics(); // fetch neaby mechanics
  }, []);

  useEffect(() => {
    // Adds marker details to firestore if it doesn't already exist in there
    const addMechanicToFireStore = async (mechanicData: Mechanic) => {
      // Fetch data from place details api
      const apiKey = Constants.expoConfig?.extra?.API_KEY;
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${mechanicData.place_id}&key=${apiKey}&fields=formatted_address,formatted_phone_number,website`;

      let address: string;
      let phoneNo: string;
      let website: string;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.result);
        address = data.result.formatted_address;
        phoneNo = data.result.formatted_phone_number ?? ""; // Not all mechanics provide phone number
        website = data.result.website ?? ""; // Not all mechanics provide website
      } catch (error) {
        console.error("Error fetching nearby mechanics:", error);
        return [];
      }

      try {
        // Add details to firestore
        await setDoc(doc(db, "mechanic_markers", mechanicData.place_id), {
          mechanic_name: mechanicData.name,
          address: address,
          phone_number: phoneNo,
          website: website,
        });
        console.log(`Mechanic: ${mechanicData.name} added to firestore`);
      } catch (error) {
        console.error("Error adding to firestore:", error);
      }
    };

    async function checkDocumentExists(
      collection: string,
      place_id: string
    ): Promise<boolean> {
      try {
        const docRef = doc(db, collection, place_id); // reference
        const docSnap = await getDoc(docRef); // document snapshot
        return docSnap.exists(); // does it exist
      } catch (error) {
        console.error("Error checking document existance: ", error);
        return false;
      }
    }

    async function addToFirestore() {
      // Checks if marker details exists in firestore, prevents unecessary api calls
      for (const mechanic of mechanics) {
        const docExist = await checkDocumentExists(
          "mechanic_markers",
          mechanic.place_id
        );
        if (!docExist) {
          // Doesn't exist in firestore, add it
          addMechanicToFireStore(mechanic);
        } else {
          console.log(`Mechanic: ${mechanic.name} already exists in firestore`);
        }
      }
    }

    addToFirestore();
  }, [mechanics]);

  function handleDetails(marker: Mechanic) {
    router.push(`/markerDetails?place_id=${marker.place_id}`);
  }

  const renderMechanicsMarkers = () => {
    return mechanics.map((marker) => (
      <Marker
        key={marker.place_id}
        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        title={marker.name}
        description={marker.address}
        onPress={() => handleDetails(marker)}
      />
    ));
  };

  // Display to user whats happening
  if (error) {
    // Check if there is an error
    return (
      <>
        <View>
          <Text> {error} </Text>
        </View>
      </>
    );
  } else if (location == null) {
    // Waiting for promise
    return (
      <>
        <View>
          <Text> fetching location </Text>
        </View>
      </>
    );
  }

  // Render map with user location and nearby mechanics
  return (
    <>
      <View style={styles.map}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={{
            latitude: location?.coords.latitude ?? 0,
            longitude: location?.coords.longitude ?? 0,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {renderMechanicsMarkers()}
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: "5%",
    left: "5%",
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: "#e7cbf5",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
});

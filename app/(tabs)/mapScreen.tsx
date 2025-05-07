
import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as Location from 'expo-location';
import { useRouter } from 'expo-router';


export default function MapScreen() {
  const router = useRouter();

  function handleBack() {
    router.push('/');
  }

  return (
    <>
      <SafeAreaView style = {{alignItems: 'center'}}> 
        <Text style = {{fontSize: 50}}>Map</Text> 
      </SafeAreaView>
      <TouchableOpacity style = {styles.backButton}
                        onPress={handleBack}>
        <Text> Back </Text>
      </TouchableOpacity>
      <Map/>
    </>
  );
}

// Define the structure of a mechanic object returned from Google Places API
interface Mechanic {
  place_id: string; // used as a unique key
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const fetchLocationAndMechanics = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
          return;
        }

        
        const location = await Location.getCurrentPositionAsync({});
        const nearbyMechanics = await getNearbyMechanics(location.coords.latitude, location.coords.longitude);
        setMechanics(nearbyMechanics);
        setLocation(location)
      } catch (err) {
        setError('Failed to fetch location or mechanics.');
        console.error(err);
      }
    };

    fetchLocationAndMechanics();
  }, []);

  const getNearbyMechanics = async (latitude: number, longitude: number): Promise<Mechanic[]> => {
    const apiKey = 'AIzaSyAKDzwQK0tsdBlqqvN1wS1cx1BAqBrfXD8'; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=car_repair&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results?.map((result: any) => ({
        place_id: result.place_id,
        name: result.name,
        description: result.formatted_address,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng
      })) || [];
    } catch (error) {
      console.error('Error fetching nearby mechanics:', error);
      return [];
    }
  };

  function handleDetails() {
    router.push('/markerDetails')
  }

  // TODO: Store marker details in firebase fireStore (Access in markerDetails (use Async)).
  // If have time use custom markers for availbility.
  const renderMechanicsMarkers = () => {
    return mechanics.map((marker, index) => (
      <Marker
        key = {marker.place_id}
        coordinate = {{latitude: marker.latitude,
                      longitude: marker.longitude
        }}
        title = {marker.name}
        description={marker.description}
        onPress={handleDetails}
      />
    ));
  };

  // Display to user whats happening
  if (error) {  // Check if there is an error
    return (
      <>
        <View>
          <Text> {error} </Text>
        </View>
      </>
    )
  } else if (location == null) { // Waiting for promise
    return (
      <>
      <View>
        <Text> fetching location </Text>
      </View>
      </>
    )
  }

  // Render map with user location and nearby mechanics
  return (
    <>
      <View style = {styles.map}>
        <MapView provider={PROVIDER_DEFAULT}
            style = {styles.map}
              initialRegion={{
                latitude: location?.coords.latitude ?? 0,
                longitude: location?.coords.longitude ?? 0,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            }}>

            {renderMechanicsMarkers()}

        </MapView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#e7cbf5',
    alignItems: 'center',
  },
  map: {
    flex: 1
  }
});

// AIzaSyAKDzwQK0tsdBlqqvN1wS1cx1BAqBrfXD8
import React, {useState} from 'react';

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { useRouter } from 'expo-router';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TopBar() {
  const router = useRouter();

  function handleBack() {
    router.push('/');
  }

  function handleDetails() {
    router.push('/markerDetails')
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

      // Only usd to deisgn details screen
      <TouchableOpacity style = {{left: '80%'}}
                        onPress={handleDetails}>
        <Text> Details </Text>
      </TouchableOpacity>

      <Map/>
    </>
  );
}

function Map() {
  const markers = [
    {
      coordinate: {
        latitude: -37.721077,
        longitude: 145.047977,
      },
      title: "Agora",
      desription: "My Coffee"
    }
  ];

  // Store markers in firebase fireStore and grab to render markers. (Use async?)
  // use expo.router to send data to screens when viewing markers and editing
  // If have time use custom marker.
  const renderMarkers = () => {
    return markers.map((marker, index) => (
      <Marker
        key = {index}
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.desription}
      />
    ));
  };

  return (
    <>
      <View style = {styles.map}>
        <MapView provider={PROVIDER_DEFAULT}
            style = {styles.map}
              initialRegion={{
                latitude: -37.721,
                longitude: 145.046,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}>
            
            {renderMarkers()}

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

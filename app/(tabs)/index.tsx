import React, { useState } from 'react';

import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';




// Firebase Imports
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

import '../../firebase.js';

const {firebaseConfig} = require('../../firebase.js');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function HomeScreen() {
const router = useRouter();

  function handleCreateAccount() {
    router.push('/login')
}

  return (
    <>
      <SafeAreaView style = {{alignItems: 'center'}}> 
        <Text style = {{fontSize: 50}}>Check In</Text> 
      </SafeAreaView>
      <TouchableOpacity onPress={handleCreateAccount}>
      <Text style = {styles.link}>
        Create an account 
        </Text>
      </TouchableOpacity>
      <UserLogin title = "Customer"></UserLogin>
      <OwnerLogin title = "Owner"></OwnerLogin>
    </> 
  );
}

export function UserLogin({ title }: { title: string }) {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [carModel, setCarModel] = useState('');

  const router = useRouter();

  function handleLogin() {
    // TODO If successful go to next page, if not then tell user no good
    router.push('/mapScreen');
  }

  return (
    <>
      <TouchableOpacity style = {styles.button}
                        onPress = {handleLogin}>
        <Text style = {{fontSize: 25}}> {title} </Text>
      </TouchableOpacity>
      <TextInput
        style = {styles.CheckInInput}
          placeholder = "Your name"
          value = {email}
          onChangeText = {setEmail}
        />
        <TextInput 
          style = {styles.CheckInInput}
          placeholder='Your Phone number'
          value = {phoneNumber}
          onChangeText = {setPhoneNumber}
        />
        <TextInput 
          style = {styles.CheckInInput}
          placeholder='Your Address'
          value = {location}
          onChangeText = {setLocation}
        />
        <TextInput 
          style = {styles.CheckInInput}
          placeholder='Your Car Manufacturer'
          value = {carModel}
          onChangeText = {setCarModel}
        />
    </>
  );
}

export function OwnerLogin({ title }: { title: string }) {
  const [shopName, setShopName] = useState('');

  const router = useRouter();

  function handleLogin() {
    // Use Contetx API to get global access to isOwner
    router.push('/mapScreen');
  }

  return (
    <>
      <TouchableOpacity style = {styles.button}
                        onPress = {handleLogin}>
        <Text style = {{fontSize: 25}}> {title} </Text>
      </TouchableOpacity>
      <TextInput
      style = {styles.CheckInInput}
        placeholder = "Your shop name"
        value = {shopName}
        onChangeText = {setShopName}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e7cbf5',
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 75,
    marginVertical: 50
  },
  CheckInInput: {
    marginHorizontal: 40,
    paddingLeft: 5
  },
  link: {
    textAlign: 'center',
    color: '#0000EE',
    fontSize: 15,
  }
});

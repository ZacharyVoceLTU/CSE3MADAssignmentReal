import React, { useState } from 'react';

import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <>
      <SafeAreaView style = {{alignItems: 'center'}}> 
        <Text style = {{fontSize: 50}}>Check In</Text> 
      </SafeAreaView>
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
        <Text> Customer </Text>
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
    router.push('/mapScreen');
  }

  return (
    <>
      <TouchableOpacity style = {styles.button}
                        onPress = {handleLogin}>
        <Text> Owner </Text>
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
    marginVertical: 50,
  },
  CheckInInput: {
    marginHorizontal: 40,
    paddingLeft: 5
  }
});

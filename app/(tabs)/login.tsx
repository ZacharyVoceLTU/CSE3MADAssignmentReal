import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import '../../firebase.js';

const {firebaseConfig} = require('../../firebase.js');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function LoginScreen() {
    const [isOwner, setIsOwner] = useState(false);
    const router = useRouter();

    const toggleSwitch = () => setIsOwner(previousState => !previousState)

    const handleCreateAccount = () => {
        router.push('/')
    }

    return (
        <>
            <SafeAreaView>
                <Text style = {{fontSize: 50, textAlign: 'center'}}> Create Account </Text> 
            </SafeAreaView>
            <SafeAreaView style = {styles.input}>
                <View>
                    <TextInput placeholder = {'What is your name?'} />
                    <TextInput placeholder = {'What is your phone number?'} />
                    <View style = {styles.container}>
                        <Text style = {styles.text}> Are you an owner? </Text>
                        <Switch 
                                onValueChange={toggleSwitch}
                                value = {isOwner}/>
                    </View>
                </View>
                <TouchableOpacity onPress = {handleCreateAccount}>
                    <Text> Create account </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        alignItems: 'center',
        marginTop: 150
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginRight: 90,
        fontSize: 16
    }
})
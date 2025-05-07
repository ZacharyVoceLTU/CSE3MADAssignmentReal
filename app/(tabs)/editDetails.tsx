import React, { useState } from "react";

import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { useRouter } from 'expo-router';

export default function editDetails() {
    // use Router.useLocalSearchParams from markerDetails.tsx to get initialise useState
    const [specailise, setSpecialise] = useState('');
    const [notes, setNotes] = useState('')

    return (
        <>
            <SafeAreaView style={{ alignItems: "center", marginBottom: 80 }}>
                <Text style={{ fontSize: 50 }}> Edit Details </Text>
            </SafeAreaView>

            <View>
                <Text style = {styles.inputHeading}> Change Specialise </Text>
                <TextInput
                    style = {styles.input}
                    onChangeText={setSpecialise}
                    value = {specailise}
                />
            </View>
            <View>
                <Text style = {styles.inputHeading}> Change Notes </Text>
                <TextInput 
                    style = {styles.input}
                    onChangeText={setNotes}
                    value = {notes}
                />
            </View>

            <ChangeContacts/>
        </>
    )
}

function ChangeContacts() {
    const router = useRouter();
    // use Router.useLocalSearchParams from markerDetails.tsx to get initialise useState
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');

    function handleSave() {
        // Upload to firestore
        router.push('/markerDetails')
    }

    return (
        <>
            <View>
                <Text style = {styles.inputHeading}> Change Contacts</Text>
                <View>
                    <Text style = {styles.inputSubHeading}> Update Phone No. </Text>
                    <TextInput
                        style = {styles.input}
                        onChangeText={setPhoneNo}
                        value = {phoneNo}
                    />
                </View>
                <View>
                    <Text style = {styles.inputSubHeading}> Update Email </Text>
                    <TextInput
                        style = {styles.input}
                        onChangeText={setEmail}
                        value = {email}
                    />
                </View>
            </View>
            <TouchableOpacity style = {styles.saveButton}
                            onPress={handleSave}>
                <Text> Save </Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    inputHeading: {
        fontSize: 25,
        marginHorizontal: 70
    },
    inputSubHeading: {
        marginHorizontal: 70
    },
    input: {
        backgroundColor: '#dbcffa',
        marginHorizontal: 70,
        paddingBottom: 50,
        marginBottom: 20
    },
    saveButton: {
        alignItems: 'center', 
        backgroundColor: '#dbcffa',
        marginHorizontal: 70
    }
})
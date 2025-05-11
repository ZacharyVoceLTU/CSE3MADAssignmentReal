import { useRouter } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseSetup.js";

export default function LoginScreen() {
  const [isOwner, setIsOwner] = useState(false);
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const router = useRouter();

  const toggleSwitch = () => setIsOwner((previousState) => !previousState);

  const handleCreateAccount = () => {
    async function createUser() {
      try {
        await createUserWithEmailAndPassword(auth, email, passowrd);
        // TODO: Add information like isOwner to firestore
      } catch (error) {
        console.error("Couldn't create account:", error);
      }
    }

    createUser();
    router.push("/mapScreen");
  };

  return (
    <>
      <SafeAreaView>
        <Text style={{ fontSize: 50, textAlign: "center" }}>
          Create Account
        </Text>
      </SafeAreaView>
      <SafeAreaView style={styles.input}>
        <View>
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder={"What is your email?"}
          />
          <TextInput
            onChangeText={setPassword}
            value={passowrd}
            placeholder={"What is your passowrd?"}
          />
          <View style={styles.container}>
            <Text style={styles.text}> Are you an owner? </Text>
            <Switch onValueChange={toggleSwitch} value={isOwner} />
          </View>
        </View>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text> Create account </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    alignItems: "center",
    marginTop: 150,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginRight: 90,
    fontSize: 16,
  },
});
